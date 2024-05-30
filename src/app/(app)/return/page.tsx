import React from 'react';
import { redirect } from 'next/navigation';
import { auth, clerkClient } from '@clerk/nextjs/server';

import stripe from '@/config/stripe';

type CheckoutReturnPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CheckoutReturnPage({ searchParams }: CheckoutReturnPageProps) {
  const { userId } = auth().protect();

  if (typeof searchParams?.sessionID !== 'string') {
    throw new Error('Missing or invalid sessionID in search params');
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(searchParams.sessionID);

  if (checkoutSession.status !== 'complete') redirect('/premium');

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      isPremium: true,
    },
  });

  const customerEmail = checkoutSession.customer_details?.email;

  return (
    <section>
      <p>
        We appreciate your business! A confirmation email will be sent to {customerEmail}. If you
        have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
      </p>
    </section>
  );
}
