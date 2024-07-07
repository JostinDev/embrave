'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import flag from '@/app/(app)/images/flagGreen.svg';
import flameJade from '@/app/(app)/images/flameJade.svg';
import world from '@/app/(app)/images/world.svg';
import {
  getCheckoutSessionClientSecretCredits,
  getCheckoutSessionClientSecretLifetime,
} from '@/server/mutations';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Page() {
  const [isLifetime, setIsLifetime] = useState(true);

  return (
    <div className="mt-10">
      <p className="mb-4 font-nexa text-26 font-bold leading-[115%] text-sand-12">
        Find the perfect plan for you
      </p>
      <div className="flex gap-6">
        <div
          onClick={() => setIsLifetime(false)}
          className="flex h-[320px] cursor-pointer flex-col rounded-[26px] border border-solid border-jade-5 bg-jade-1 p-8"
        >
          <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-jade-3 px-3 py-2 font-inter text-base font-normal text-jade-11">
            <Image className="h-4 w-4" src={flag} alt="" />
            <p>To push yourself a bit</p>
          </div>
          <p className="mt-5 font-nexa text-26 font-bold leading-8 text-jade-11">
            Need to get a few more credits?
          </p>
          <p className="mt-4 font-inter text-base font-normal leading-5 text-jade-11">
            If you have used all your credits, you can buy 3 credits to join or start new
            challenges.
          </p>
          <div className="mt-auto">
            <p className="font-inter text-xs font-normal text-sand-11">One-time purchase</p>
            <p className="font-nexa text-xl font-light text-jade-12">
              <span className="font-bold">9.00 CHF</span> for 3 credits
            </p>
          </div>
        </div>

        <div
          onClick={() => setIsLifetime(true)}
          className="flex h-[320px] cursor-pointer flex-col rounded-[26px] border border-solid border-jade-5 bg-jade-1 p-8"
        >
          <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-jade-11 px-3 py-2 font-inter text-base font-normal text-jade-1">
            <Image className="h-5 w-5" src={flameJade} alt="" />
            <p>Most popular</p>
          </div>
          <p className="mt-5 font-nexa text-26 font-bold leading-8 text-jade-11">
            Push yourself even further with <span>Embrave Premium!</span>
          </p>
          <p className="mt-4 font-inter text-base font-normal leading-5 text-jade-11">
            Find the perfect challenge to get outside your comfort zone. Embrave offers a wide range
            of different challenges, to get you to challenge yourself.
          </p>
          <div className="mt-auto">
            <p className="font-inter text-xs font-normal text-sand-11">One-time purchase</p>
            <p className="font-nexa text-xl font-light text-jade-12">
              <span className="font-bold">40.00 CHF</span> for unlimited credits
            </p>
          </div>
        </div>

        <div className="flex h-[320px] flex-col rounded-[26px] border border-solid border-sand-5 bg-sand-1 p-8">
          <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-sand-3 px-3 py-2 font-inter text-base font-normal text-sand-11">
            <Image className="h-6 w-6" src={world} alt="" />
            <p>Free tier</p>
          </div>
          <p className="mt-5 font-nexa text-26 font-bold leading-8 text-sand-12">
            Continue with your current challenges
          </p>
          <p className="mt-4 font-inter text-base font-normal leading-5 text-sand-11">
            If you don’t want to join or start new challenges, you can still enjoy the cool features
            of Embrave like posting updates or adding milestones to your existing challenges.
          </p>
          <div className="mt-auto">
            <p className="font-nexa text-xl font-light text-jade-12">
              <span className="font-bold">Free</span> nor need for credits
            </p>
          </div>
        </div>
      </div>

      <div key={isLifetime.toString()}>
        {isLifetime ? (
          <div className="mt-10" id="checkout">
            <p>lifetime</p>

            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret: getCheckoutSessionClientSecretLifetime }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        ) : (
          <div className="mt-10" id="checkout">
            <p>credits</p>

            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret: getCheckoutSessionClientSecretCredits }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </div>
    </div>
  );
}
