'use client';

import React, { useActionState } from 'react';
import Image from 'next/image';
import { Button, Checkbox, FieldError, Form } from 'react-aria-components';
import { useWizard } from 'react-use-wizard';
import { twJoin, twMerge } from 'tailwind-merge';

import spinner from '@/app/(app)/images/spinner.svg';
import { setUserHasWatchedTutorial } from '@/server/mutations';

export default function Step3() {
  const { previousStep } = useWizard();

  const [state, formAction, isPending] = useActionState(setUserHasWatchedTutorial, { errors: {} });
  let [selected, setSelection] = React.useState(false);

  return (
    <Form action={formAction} validationErrors={state?.errors}>
      <p className="mb-4 font-nexa text-xl font-bold text-sand-12">Step 3</p>
      <p className="mb-4 font-inter text-base leading-18 text-sand-12">
        Please accept the terms of service before continuing
      </p>
      <Checkbox
        isSelected={selected}
        onChange={setSelection}
        isInvalid={state && state.errors['termsOfService'] && !selected && true}
        name="termsOfService"
      >
        <div className="checkbox cursor-pointer">
          <svg className="ml-[1px]" viewBox="0 0 18 18" aria-hidden="true">
            <polyline points="1 9 7 14 15 4" />
          </svg>
        </div>
        <p
          aria-label="I accept the terms and conditions"
          className={twMerge(
            'cursor-pointer font-inter text-base leading-18 text-sand-12',
            state && state.errors['termsOfService'] && 'text-red-11',
          )}
        >
          I accept the terms and conditions
        </p>
        <FieldError />
      </Checkbox>
      <p className="mb-4 mt-2 font-inter text-base leading-18 text-red-11">
        {state &&
          state.errors['termsOfService'] &&
          'Please accept the terms of service before continuing'}
      </p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => previousStep()}
          className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 font-inter text-base leading-18 text-sand-12"
        >
          Back
        </button>

        <Button
          isDisabled={isPending}
          type="submit"
          className="relative flex h-fit w-full justify-center rounded-lg border border-solid border-sand-12 bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3"
        >
          <p
            className={twMerge('opacity-100 transition-all duration-200', isPending && 'opacity-0')}
          >
            Finish
          </p>
          <Image
            className={twJoin(
              'absolute left-1/2 h-4 w-4 -translate-x-1/2 opacity-0 transition-all duration-200',
              isPending && 'opacity-100',
            )}
            src={spinner}
            alt=""
          />
        </Button>
      </div>
    </Form>
  );
}
