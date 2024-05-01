'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import logoutRed from '@/app/images/userGroup.svg';

type AdminRoomModalProps = {
  roomID: number;
};
export default function AdminRoomModal(props: AdminRoomModalProps) {
  return (
    <DialogTrigger>
      <Button className="flex items-center gap-2">
        <Image className="h-6 w-6" src={logoutRed} alt={''} />
        <p className={'text-body-l-medium text-sand-12'}>Manage participants</p>
      </Button>
      <Modal isDismissable>
        <Dialog className={'flex flex-col'}>
          {({ close }) => (
            <form>
              <Heading className={'text-title1 mb-4 text-sand-12'} slot="title">
                Manage users
              </Heading>
              <div className={'mt-6 flex justify-between gap-4'}>
                <Button
                  onPress={close}
                  className="text-body-l-book h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 text-sand-12"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
