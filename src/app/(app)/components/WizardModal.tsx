'use client';

import React, { useActionState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogTrigger,
  Form,
  Heading,
  Modal,
} from 'react-aria-components';
import { useWizard, Wizard } from 'react-use-wizard';

import { leaveRoom } from '@/server/mutations';

type WizardModalProps = {};
export default function WizardModal(props: WizardModalProps) {
  const [state, formAction, isPending] = useActionState(leaveRoom, { errors: {} });
  let [selectedTermOfServices, setSelectedTermOfServices] = React.useState(false);

  const Step1 = () => {
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
  };

  const Step2 = () => {
    const { previousStep, nextStep } = useWizard();

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
  };

  const Step3 = () => {
    const { previousStep } = useWizard();
    return (
      <>
        <p className="mb-4 font-nexa text-xl font-bold text-sand-12">Step 3</p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Please accept the terms of service before continuing
        </p>
        <Checkbox isSelected={selectedTermOfServices} onChange={setSelectedTermOfServices}>
          <div className="checkbox cursor-pointer">
            <svg viewBox="0 0 18 18" aria-hidden="true">
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
  };

  return (
    <DialogTrigger>
      <Modal
        isKeyboardDismissDisabled={true}
        isDismissable={false}
        defaultOpen={true}
        className="w-[90%] max-w-[480px] rounded-2xl border border-sand-5 bg-sand-1 p-6 shadow-[0px_8px_20px_rgba(0,0,0/0.1)]"
      >
        <Dialog role="alertdialog" className="flex flex-col outline-none">
          {({ close }) => (
            <Form className="w-full">
              <Wizard>
                <Step1 />
                <Step2 />
                <Step3 />
              </Wizard>
            </Form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
