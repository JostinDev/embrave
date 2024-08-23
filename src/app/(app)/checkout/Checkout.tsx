'use client';

import React, { useState } from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation'

import {
  getCheckoutSessionClientSecretCredits,
  getCheckoutSessionClientSecretLifetime,
} from '@/server/mutations';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPlan() {

  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')

  if (!plan) {
    redirect('/')
  }

  return (
    <div className="mt-10">
      <div className="bg-sand-1 border border-sand-5 rounded-[42px] px-4 pb-4 pt-12">
        <h1 className="text-sand-12 font-nexa font-bold text-32 text-center">Payment</h1>
        <h2 className="text-sand-11 font-inter font-regular text-base text-center mb-12">Please follow the instructions below</h2>

		<div>
        {plan === "lifetime" ? (
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
