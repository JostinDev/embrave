import React from 'react';

type CreditStatusPageProps = {
  plan: string;
  credits: number;
};

export default async function CreditStatus(creditStatusPageProps: CreditStatusPageProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-4 rounded-2xl border border-dashed border-sand-11 bg-white p-4 sm:flex-nowrap sm:gap-6">
      <div className="flex w-full flex-col rounded-lg border border-solid border-sand-7 bg-sand-2 p-3">
        <p className="pb-1 text-center font-inter text-base font-black leading-5 text-sand-12">
          Current Balance:
        </p>
        <p className="text-center font-inter text-base font-medium leading-5 text-sand-9">
          {creditStatusPageProps.plan === 'lifetime'
            ? 'Unlimited credits'
            : creditStatusPageProps.credits}
        </p>
      </div>

      <div className="flex w-full flex-col p-3">
        <p className="pb-1 text-center font-inter text-base font-black leading-5 text-sand-12">
          Your credit balance had been updated.
        </p>
      </div>
    </div>
  );
}
