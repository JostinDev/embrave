import { headers } from 'next/headers';
import type { UserJSON } from '@clerk/backend';
import { clerkClient, type WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { z } from 'zod';

import stripe from '@/config/stripe';
import { setBaseCredits } from '@/server/mutations';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
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
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  if (event.type === 'user.created') {
    const newUser = event.data;
    await setBaseCredits(newUser.id);
    await createStripeCustomer(newUser);
  } else if (event.type === 'user.updated') {
    const updatedUser = event.data;
    await updateStripeCustomer(updatedUser);
  } else if (event.type === 'user.deleted') {
    const deletedUser = event.data;
    if (!deletedUser.id) throw new Error('User ID is missing from the event data');
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
  const clerkUser = await clerkClient.users.getUser(clerkUserID);
  const customerID = clerkUser.publicMetadata.stripeCustomerID;
  const parseResult = z.string().optional().safeParse(customerID);
  if (!parseResult.success) {
    throw new Error('User’s Stripe customer ID is malformed');
  }
  const safeCustomerID = parseResult.data;

  if (!safeCustomerID) return;

  await stripe.customers.del(safeCustomerID, undefined, { idempotencyKey: clerkUserID });
}
