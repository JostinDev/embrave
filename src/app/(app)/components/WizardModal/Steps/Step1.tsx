'use client';

import React, { useActionState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Checkbox, FieldError, Form } from 'react-aria-components';
import { useWizard } from 'react-use-wizard';
import { twJoin, twMerge } from 'tailwind-merge';

import spinner from '@/app/(app)/images/spinner.svg';
import wave from '@/app/(app)/images/wave.png';
import { setUserHasAcceptedTerms } from '@/server/mutations';

export default function Step1() {
  const [state, formAction, isPending] = useActionState(setUserHasAcceptedTerms, { errors: {} });
  let [selected, setSelection] = React.useState(false);
  const { nextStep } = useWizard();

  if (state?.success) {
    nextStep();
  }

  return (
    <Form action={formAction} validationErrors={state?.errors}>
      <Image className="mx-auto mb-10 h-16 w-16" src={wave} alt={''} />
      <p className="mb-2 text-center font-nexa text-[32px] font-bold text-sand-12">
        Welcome to Embrave!
      </p>
      <p className="mb-10 text-center font-nexa text-xl font-bold text-sand-11">
        Awesome that you are joining us and trying to push yourself outside your comfort zone.
      </p>
      <div
        className={twMerge(
          'flex flex-col rounded-3xl bg-sky-3 p-6',
          state && state.errors?.['termsOfService'] && !selected && true && 'bg-red-3',
        )}
      >
        <div className="flex gap-4">
          <Checkbox
            id="termsOfService"
            isSelected={selected}
            onChange={setSelection}
            isInvalid={state && state.errors?.['termsOfService'] && !selected && true}
            name="termsOfService"
          >
            <div className="checkbox cursor-pointer">
              <svg className="ml-[1px]" viewBox="0 0 18 18" aria-hidden="true">
                <polyline points="1 9 7 14 15 4" />
              </svg>
            </div>
          </Checkbox>
          <label
            htmlFor="termsOfService"
            aria-label="I accept the terms and conditions"
            className="cursor-pointer font-inter text-base leading-5 text-sand-11"
          >
            I agree to the{' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={'/terms_and_conditions'}
              className="text-sky-11 underline"
            >
              Terms and Conditions
            </Link>
            ,{' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={'/privacy_policy'}
              className="text-sky-11 underline"
            >
              Privacy Policy
            </Link>
            ,{' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={'/disclaimer'}
              className="text-sky-11 underline"
            >
              Disclaimer
            </Link>
            ,{' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={'/acceptable_use_policy'}
              className="text-sky-11 underline"
            >
              Acceptable Use Policy
            </Link>{' '}
            and the{' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={'/cookie_policy'}
              className="text-sky-11 underline"
            >
              Cookie Policy
            </Link>
            . By checking this box, you affirm that you are at least 18 years of age or the age of
            majority in the jurisdiction you are accessing Embrave from.
          </label>
        </div>
        <FieldError />
        <p className="font-regular mt-1 font-inter text-xs leading-18 text-red-11">
          {state &&
            state.errors?.['termsOfService'] &&
            !selected &&
            true &&
            'Please agree to the Terms and Conditions and Privacy Statement to continue'}
        </p>
      </div>

      <div className="mt-4 flex gap-4">
        <Button
          isDisabled={isPending}
          type="submit"
          className="relative flex h-fit w-full justify-center rounded-lg border border-solid border-sand-12 bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3"
        >
          <p
            className={twMerge('opacity-100 transition-all duration-200', isPending && 'opacity-0')}
          >
            Continue
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
