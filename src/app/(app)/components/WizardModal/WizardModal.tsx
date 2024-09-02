'use client';

import React from 'react';
import { Dialog, DialogTrigger, Modal } from 'react-aria-components';
import { Wizard } from 'react-use-wizard';

import Step1 from '@/app/(app)/components/WizardModal/Steps/Step1';
import Step2 from '@/app/(app)/components/WizardModal/Steps/Step2';

export default function WizardModal() {
  return (
    <DialogTrigger>
      <Modal
        isKeyboardDismissDisabled={true}
        isDismissable={false}
        defaultOpen={true}
        className="mx-auto w-full max-w-[886px] rounded-2xl border border-sand-5 bg-sand-1 px-8 pb-8 pt-[72px] shadow-[0px_8px_20px_rgba(0,0,0/0.1)]"
      >
        <Dialog role="alertdialog" className="flex flex-col outline-none">
          <Wizard>
            <Step1 />
            <Step2 />
          </Wizard>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
