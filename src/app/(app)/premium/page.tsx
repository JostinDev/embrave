import React from 'react';
import { currentUser } from '@clerk/nextjs/server';

import CheckoutPlan from '@/app/(app)/premium/CheckoutPlan';

export default async function Page() {
  const user = await currentUser();

  if (!user)
    return (
      <div className="font-nexa text-26 font-bold leading-[115%] text-sand-12">
        The user is not authenticated
      </div>
    );

  let isPremium = false;
  if (user.publicMetadata.isPremium && typeof user.publicMetadata.isPremium === 'boolean') {
    isPremium = user.publicMetadata.isPremium;
  }

  if (isPremium) {
    return (
      <div className="font-nexa text-26 font-bold leading-[115%] text-sand-12">
        You are already a premium user
      </div>
    );
  }

  return (
    <div className="mt-10">
      <p className="mb-4 font-nexa text-26 font-bold leading-[115%] text-sand-12">
        Find the perfect plan for you
      </p>
      <CheckoutPlan />
    </div>
  );
}
