'use client';

import React, { useActionState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogTrigger, Form, Heading, Input, Modal } from 'react-aria-components';
import { twJoin, twMerge } from 'tailwind-merge';

import spinner from '@/app/(app)/images/spinner.svg';
import { joinRoom } from '@/server/mutations';

type JoinRoomModalProps = {
  link: string;
  challengeName: string;
};
export default function JoinRoomModal(props: JoinRoomModalProps) {
  const [state, formAction, isPending] = useActionState(joinRoom, { errors: {} });

  const router = useRouter();

  return (
    <DialogTrigger>
      <Modal
        defaultOpen
        className="mx-auto w-full max-w-[480px] rounded-2xl border border-sand-5 bg-sand-1 p-6 shadow-[0px_8px_20px_rgba(0,0,0/0.1)]"
        isOpen={true}
      >
        <Dialog className="flex flex-col outline-none">
          <Form action={formAction}>
            <Input hidden={true} name="link" value={props.link} />

            <Heading
              className="mb-4 font-nexa text-26 font-bold leading-[115%] text-sand-12"
              slot="title"
            >
              Do you want to join this challenge?
            </Heading>
            <p className="mb-2 font-inter text-base leading-18 text-sand-11">
              You are about to join the challenge:
            </p>
            <p className="mb-4 font-inter text-base font-black leading-18 text-sand-11">
              {props.challengeName}
            </p>

            <p className="font-inter text-base font-black leading-18 text-red-800">{state.error}</p>
            <div className="mt-6 flex justify-between gap-4">
              <Button
                onPress={() => router.push('/')}
                className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 font-inter text-base leading-18 text-sand-12"
              >
                Cancel
              </Button>

              <Button
                isDisabled={isPending}
                type="submit"
                className="relative flex h-fit w-full items-center justify-center gap-2 rounded-lg bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3 transition-all"
              >
                <p
                  className={twMerge(
                    'opacity-100 transition-all duration-200',
                    isPending && 'opacity-0',
                  )}
                >
                  Join challenge
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
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
