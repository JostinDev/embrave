'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import logoutRed from '@/app/(app)/images/logoutRed.svg';
import { kickFromRoom } from '@/server/mutations';

type KickUserFromRoomProps = {
  roomID: number;
  userID: string;
};

export default function KickUserFromRoom(props: KickUserFromRoomProps) {
  return (
    <DialogTrigger>
      <Button className="flex items-center gap-2">
        <Image className="h-6 w-6" src={logoutRed} alt={''} />
        <p className={'font-inter text-base font-medium leading-5 text-red-11'}>Remove</p>
      </Button>
      <Modal
        isDismissable
        className="w-[90%] max-w-[480px] rounded-2xl border border-sand-5 bg-sand-1 p-6 shadow-[0px_8px_20px_rgba(0,0,0/0.1)]"
      >
        <Dialog role="alertdialog" className="flex flex-col outline-none">
          {({ close }) => (
            <div>
              <Heading
                className="mb-4 font-nexa text-26 font-bold leading-[115%] text-sand-12"
                slot="title"
              >
                Do you want to kick this user?
              </Heading>
              <p className="mb-4 font-inter text-base leading-18 text-sand-12">
                Kicking this user will remove all the milestones they posted and this action cannot
                be undone.
              </p>
              <div className="mt-6 flex justify-between gap-4">
                <Button
                  onPress={close}
                  className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 font-inter text-base leading-18 text-sand-12"
                >
                  Cancel
                </Button>
                <Button
                  onPress={async () => await kickFromRoom(props.roomID, props.userID)}
                  className="h-fit w-full rounded-lg border border-solid border-red-11 bg-red-11 p-3 font-inter text-base leading-18 text-sand-3"
                >
                  Kick
                </Button>
              </div>
            </div>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
