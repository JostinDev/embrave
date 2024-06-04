'use client';

import React from 'react';
import { useWizard } from 'react-use-wizard';

type WizardModalStep2Props = {};

export default function Step2(props: WizardModalStep2Props) {
  const { nextStep, previousStep } = useWizard();
  return (
    <>
      <p className="mb-4 font-nexa text-xl font-bold text-sand-12">Step 2</p>
      <p className="font-inter text-base leading-18 text-sand-12">
        Explain the point system here !
      </p>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => previousStep()}
          className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 font-inter text-base leading-18 text-sand-12"
        >
          Back
        </button>

        <button
          onClick={() => nextStep()}
          className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3"
        >
          Next
        </button>
      </div>
    </>
  );
}
