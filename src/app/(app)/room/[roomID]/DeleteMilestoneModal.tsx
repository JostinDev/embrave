'use client';

import React, { useActionState } from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, Form, Heading, Modal } from 'react-aria-components';
import { twJoin, twMerge } from 'tailwind-merge';

import spinner from '@/app/(app)/images/spinner.svg';
import trash from '@/app/(app)/images/trash.svg';
import { deleteMilestone } from '@/server/mutations';

type DeleteMilestoneModalProps = {
  roomID: number;
  milestoneID: number;
};
export default function DeleteMilestoneModal(props: DeleteMilestoneModalProps) {
  const [state, formAction, isPending] = useActionState(deleteMilestone, { errors: {} });

  return (
    <DialogTrigger>
      <Button className="flex items-center gap-2">
        <Image className="h-6 w-6" src={trash} alt="" />
      </Button>
      <Modal
        isDismissable
        className="w-[90%] max-w-[480px] rounded-2xl border border-sand-5 bg-sand-1 p-6 shadow-[0px_8px_20px_rgba(0,0,0/0.1)]"
      >
        <Dialog role="alertdialog" className="flex flex-col outline-none">
          {({ close }) => (
            <Form className="w-full" action={formAction}>
              <input type="hidden" name="roomID" value={props.roomID} />
              <input type="hidden" name="milestoneID" value={props.milestoneID} />
              <Heading
                className="mb-4 font-nexa text-26 font-bold leading-[115%] text-sand-12"
                slot="title"
              >
                Are you sure you want to delete this milestone?
              </Heading>
              <p className="mb-4 font-inter text-base leading-18 text-sand-12">
                Deleting this milestone will remove all your data and cannot be undone.
              </p>
              <div className="mt-6 flex justify-between gap-4">
                <Button
                  onPress={close}
                  className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 font-inter text-base leading-18 text-sand-12"
                >
                  Cancel
                </Button>

                <Button
                  isDisabled={isPending}
                  type="submit"
                  className="relative flex h-fit w-full items-center justify-center gap-2 rounded-lg border border-solid border-red-11 bg-red-11 p-3 font-inter text-base leading-18 text-sand-3 transition-all"
                >
                  <p
                    className={twMerge(
                      'opacity-100 transition-all duration-200',
                      isPending && 'opacity-0',
                    )}
                  >
                    Delete
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
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
