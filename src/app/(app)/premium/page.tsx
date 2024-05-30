'use client';

import React from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { getCheckoutSessionClientSecret } from '@/server/mutations';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Page() {
  return (
    <div className="mt-10">
      <p className="mb-4 font-nexa text-26 font-bold leading-[115%] text-sand-12">
        Get Embrave Premium
      </p>
      <p className="mb-4 font-inter text-base font-medium leading-5 text-sand-12">
        All users get 3 credits upon creating an account. Creating or joining a room costs 1 credit.
      </p>

      <p className="mb-4 font-inter text-base font-medium leading-5 text-sand-12">
        Get Embrave premium now for unlimited credits
      </p>

      <div id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret: getCheckoutSessionClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
