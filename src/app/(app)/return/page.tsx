import React from 'react';
import { redirect } from 'next/navigation';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';

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

  const lineItems = await stripe.checkout.sessions.listLineItems(checkoutSession.id);

  if (lineItems.data[0] && lineItems.data[0].price) {
    const priceID = lineItems.data[0].price.id;

    const user = await currentUser();

    if (!user)
      return (
        <div className="font-nexa text-26 font-bold leading-[115%] text-sand-12">
          The user is not authenticated
        </div>
      );

    if (priceID === 'price_1P405j05xPAER8V0FZ46vU4m') {
      console.log('lifetime plan');
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          isPremium: true,
        },
      });
    } else if (priceID === 'price_1PZudd05xPAER8V0KQVkPqEZ') {
      console.log('credits plan');

      let currentCredits = 0;
      if (user.publicMetadata.credits && typeof user.publicMetadata.credits === 'number') {
        currentCredits = user.publicMetadata.credits;
      }

      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          credits: currentCredits + 3,
        },
      });
    }
  }

  const customerEmail = checkoutSession.customer_details?.email;

  return (
     
<div className="mt-10">
  <div className="bg-sand-1 border border-sand-5 rounded-[42px] px-4 pb-4 pt-12">
    <h1 className="text-sand-12 font-nexa font-bold text-32 text-center">You are all set!</h1>
    <h2 className="text-sand-11 font-inter font-regular text-base text-center mb-12">Thank you for supporting Embrave! We appreciate you!</h2>

    <p className='font-inter font-regular text-xs text-sand-11 text-center'>
        A confirmation email has been sent to your email. If you have questions feel free to reach out to <a className='underline' href="mailto:orders@embrave.com">orders@embrave.com</a>.
    </p>

  </div>
</div>
  );
}
