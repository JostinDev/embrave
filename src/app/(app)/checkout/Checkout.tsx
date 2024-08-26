'use client';

import React from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import {
  getCheckoutSessionClientSecretCredits,
  getCheckoutSessionClientSecretLifetime,
} from '@/server/mutations';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPlan() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  if (!plan) {
    redirect('/');
  }

  return (
    <div className="mt-10">
      <div className="rounded-[42px] border border-sand-5 bg-sand-1 px-4 pb-4 pt-12">
        <h1 className="text-center font-nexa text-32 font-bold text-sand-12">Payment</h1>
        <h2 className="font-regular mb-12 text-center font-inter text-base text-sand-11">
          Please follow the instructions below
        </h2>

        <div>
          {plan === 'lifetime' ? (
            <div className="mt-10" id="checkout">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ fetchClientSecret: getCheckoutSessionClientSecretLifetime }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          ) : (
            <div className="mt-10" id="checkout">
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
    </div>
  );
}
