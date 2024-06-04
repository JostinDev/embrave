'use client';

import React from 'react';
import { useWizard } from 'react-use-wizard';

type WizardModalStep1Props = {};

export default function Step1(props: WizardModalStep1Props) {
  const { nextStep } = useWizard();
  return (
    <>
      <p className="mb-4 font-nexa text-xl font-bold text-sand-12">Step 1</p>
      <p className="font-inter text-base leading-18 text-sand-12">Welcome to Embrave !</p>
      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={() => nextStep()}
          className="h-fit w-[207px] rounded-lg border border-solid border-sand-12 bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3"
        >
          Next
        </button>
      </div>
    </>
  );
}
