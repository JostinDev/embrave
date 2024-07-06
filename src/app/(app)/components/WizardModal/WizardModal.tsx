'use client';

import React from 'react';
import { Dialog, DialogTrigger, Modal } from 'react-aria-components';
import { Wizard } from 'react-use-wizard';

import Step1 from '@/app/(app)/components/WizardModal/Steps/Step1';
import Step2 from '@/app/(app)/components/WizardModal/Steps/Step2';
import Step3 from '@/app/(app)/components/WizardModal/Steps/Step3';

export default function WizardModal() {
  return (
    <DialogTrigger>
      <Modal
        isKeyboardDismissDisabled={true}
        isDismissable={false}
        defaultOpen={true}
        className="mx-auto w-full max-w-[480px] rounded-2xl border border-sand-5 bg-sand-1 p-6 shadow-[0px_8px_20px_rgba(0,0,0/0.1)]"
      >
        <Dialog role="alertdialog" className="flex flex-col outline-none">
          <Wizard>
            <Step1 />
            <Step2 />
            <Step3 />
          </Wizard>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
