import { headers } from 'next/headers';
import { clerkClient, type UserJSON, type WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { z } from 'zod';

import stripe from '@/config/stripe';
import { removeAllUserData, setBaseCredits, userHasWatchedTutorial } from '@/server/mutations';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svixID = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svixID || !svixTimestamp || !svixSignature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;

  // Verify the payload with the headers
  try {
    event = wh.verify(body, {
      'svix-id': svixID,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  if (event.type === 'user.created') {
    const newUser = event.data;
    console.log('new user', newUser);
    await setBaseCredits(newUser.id);
    await userHasWatchedTutorial(newUser.id, false);
    await createStripeCustomer(newUser);
  } else if (event.type === 'user.updated') {
    const updatedUser = event.data;
    await updateStripeCustomer(updatedUser);
  } else if (event.type === 'user.deleted') {
    const deletedUser = event.data;
    if (!deletedUser.id) throw new Error('User ID is missing from the event data');
    await removeAllUserData(deletedUser.id);
    await deleteStripeCustomer(deletedUser.id);
  }

  return new Response('', { status: 200 });
}

async function createStripeCustomer(clerkUser: UserJSON) {
  const primaryEmailAddress = clerkUser.email_addresses.find(
    (email) => email.id === clerkUser.primary_email_address_id,
  );

  const fullName = `${clerkUser.first_name} ${clerkUser.last_name}`.trim();

  const newStripeCustomer = await stripe.customers.create(
    {
      metadata: {
        user_id: clerkUser.id,
      },
      email: primaryEmailAddress?.email_address,
      name: fullName,
    },
    { idempotencyKey: clerkUser.id },
  );

  await clerkClient.users.updateUserMetadata(clerkUser.id, {
    publicMetadata: {
      stripeCustomerID: newStripeCustomer.id,
    },
  });
}

async function updateStripeCustomer(clerkUser: UserJSON) {
  const customerID = clerkUser.public_metadata?.stripeCustomerID;
  const parseResult = z.string().optional().safeParse(customerID);
  if (!parseResult.success) {
    throw new Error('User’s Stripe customer ID is malformed');
  }
  const safeCustomerID = parseResult.data;

  if (!safeCustomerID) {
    await createStripeCustomer(clerkUser);
    return;
  }

  const primaryEmailAddress = clerkUser.email_addresses.find(
    (email) => email.id === clerkUser.primary_email_address_id,
  );
  const fullName = `${clerkUser.first_name} ${clerkUser.last_name}`.trim();

  await stripe.customers.update(safeCustomerID, {
    email: primaryEmailAddress?.email_address,
    name: fullName,
  });
}

async function deleteStripeCustomer(clerkUserID: string) {
  const { data: foundCustomers } = await stripe.customers.search({
    query: `metadata['user_id']:'${clerkUserID}'`,
  });

  if (foundCustomers.length === 0) {
    console.info('No Stripe customer found for deleted user with ID:', clerkUserID);
    return;
  }

  if (foundCustomers.length > 1) {
    console.warn('More than one Stripe customer found for deleted user with ID:', clerkUserID);
  }

  // Delete all found customers. Normally, there should be only one, but if there are more, we still want to delete them all.
  await Promise.all(
    foundCustomers.map((customer) =>
      stripe.customers.del(customer.id, undefined, { idempotencyKey: clerkUserID }),
    ),
  );
}
