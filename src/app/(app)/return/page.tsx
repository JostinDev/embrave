import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';

import sparkles from '@/app/(app)/images/sparkles.svg';
import CreditStatus from '@/app/(app)/return/CreditStatus';
import stripe from '@/config/stripe';
import { sendBuyConfirmationCredits, sendBuyConfirmationPremium } from '@/server/mail';
import { setStripeCheckoutSessionID } from '@/server/mutations';
import { isStripeCheckoutSessionValid } from '@/server/queries';

type CheckoutReturnPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CheckoutReturnPage({ searchParams }: CheckoutReturnPageProps) {
  const { userId } = auth().protect();
  const user = await currentUser();

  if (!user)
    return (
      <div className="font-nexa text-26 font-bold leading-[115%] text-sand-12">
        The user is not authenticated
      </div>
    );

  let plan = '';

  if (typeof searchParams?.sessionID !== 'string') {
    throw new Error('Missing or invalid sessionID in search params');
  }

  const isValidSession = await isStripeCheckoutSessionValid(searchParams.sessionID);
  if (!isValidSession) redirect('/');

  const checkoutSession = await stripe.checkout.sessions.retrieve(searchParams.sessionID);

  if (checkoutSession.status !== 'complete') redirect('/premium');

  const customerEmail = checkoutSession.customer_details?.email;
  if (!customerEmail) redirect('/premium');

  const lineItems = await stripe.checkout.sessions.listLineItems(checkoutSession.id);

  let currentCredits = 0;
  if (user.publicMetadata.credits && typeof user.publicMetadata.credits === 'number') {
    currentCredits = user.publicMetadata.credits;
  }

  if (lineItems.data[0] && lineItems.data[0].price) {
    const priceID = lineItems.data[0].price.id;

    if (priceID === 'price_1P405j05xPAER8V0FZ46vU4m') {
      console.log('lifetime plan');
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          isPremium: true,
        },
      });
      await sendBuyConfirmationPremium(customerEmail);
      plan = 'lifetime';
    } else if (priceID === 'price_1PZudd05xPAER8V0KQVkPqEZ') {
      console.log('credits plan');

      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          credits: currentCredits + 3,
        },
      });
      await sendBuyConfirmationCredits(customerEmail);
      currentCredits = currentCredits + 3;
      plan = 'credits';
    }
  }

  await setStripeCheckoutSessionID(checkoutSession.id);

  return (
    <div className="mt-10 rounded-[42px] border border-sand-5 bg-sand-1 px-4 pb-4 pt-12">
      <div className="mx-auto max-w-[500px]">
        <h1 className="text-center font-nexa text-32 font-bold text-sand-12">You are all set!</h1>
        <h2 className="font-regular mb-8 text-center font-inter text-base text-sand-11">
          Thank you for supporting Embrave! We appreciate you!
        </h2>

        <div className="mx-auto mb-4">
          <CreditStatus credits={currentCredits} plan={plan} />
        </div>

        <div className="flex flex-col rounded-[26px] border border-solid border-jade-5 bg-jade-1 px-8 pb-6 pt-8">
          <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-jade-11 px-3 py-2 font-inter text-base font-normal text-jade-1">
            <Image className="h-5 w-5" src={sparkles} alt="" />
            <p>Your choice</p>
          </div>
          <p className="mb-6 mt-5 font-nexa text-xl font-bold leading-8 text-jade-11">
            {plan === 'lifetime'
              ? 'Push yourself even further with Embrave Premium!'
              : 'To push yourself a bit'}
          </p>
          <ul className="list-disc pl-6">
            <li className="mb-2 font-inter text-base font-light text-jade-11">
              Ability to create updates on already started or joined challenges
            </li>
            <li className="mb-2 font-inter text-base font-light text-jade-11">
              Unlimited picture upload
            </li>
            {plan === 'lifetime' && (
              <li className="mb-2 font-inter text-base font-medium text-jade-11">
                Ability to start or join unlimited new challenges
              </li>
            )}
          </ul>
        </div>
      </div>
      <p className="font-regular mt-8 text-center font-inter text-xs text-sand-11">
        A confirmation email has been sent to your email. If you have questions feel free to reach
        out to{' '}
        <a className="underline" href="mailto:hello@embrave.app">
          hello@embrave.app
        </a>
        .
      </p>
    </div>
  );
}
