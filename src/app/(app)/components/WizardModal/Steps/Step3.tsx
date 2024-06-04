'use client';

import React, { useActionState } from 'react';
import { Checkbox } from 'react-aria-components';
import { useWizard } from 'react-use-wizard';

import { leaveRoom } from '@/server/mutations';

type WizardModalStep3Props = {};

export default function Step3(props: WizardModalStep3Props) {
  const { previousStep } = useWizard();

  const [state, formAction, isPending] = useActionState(leaveRoom, { errors: {} });
  let [selectedTermOfServices, setSelectedTermOfServices] = React.useState(false);

  return (
    <>
      <p className="mb-4 font-nexa text-xl font-bold text-sand-12">Step 3</p>
      <p className="mb-4 font-inter text-base leading-18 text-sand-12">
        Please accept the terms of service before continuing
      </p>
      <Checkbox isSelected={selectedTermOfServices} onChange={setSelectedTermOfServices}>
        <div className="checkbox cursor-pointer">
          <svg className="ml-[1px]" viewBox="0 0 18 18" aria-hidden="true">
            <polyline points="1 9 7 14 15 4" />
          </svg>
        </div>
        <p className="cursor-pointer font-inter text-base leading-18 text-sand-12">
          I accept the terms and conditions
        </p>
      </Checkbox>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => previousStep()}
          className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 font-inter text-base leading-18 text-sand-12"
        >
          Back
        </button>

        <button className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3">
          Finish
        </button>
      </div>
    </>
  );
}
