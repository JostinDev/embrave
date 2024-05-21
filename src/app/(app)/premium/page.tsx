'use client';

import React, { useCallback } from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Page() {
  // Define a function to fetch the client secret
  const fetchClientSecret = useCallback(() => {
    return fetch('/api/checkout_sessions', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };
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
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
