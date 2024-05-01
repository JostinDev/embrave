'use client';

import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import './style.css';

import React, { useEffect, type Dispatch, type SetStateAction } from 'react';
import Image from 'next/image';

import logoutRed from '@/app/images/logoutRed.svg';
import { leaveRoom } from '@/server/mutations';

type LeaveRoomModalProps = {
  roomID: number;
};
export default function LeaveRoomModal(props: LeaveRoomModalProps) {
  return (
    <DialogTrigger>
      <Button className="flex items-center gap-2">
        <Image className="h-6 w-6" src={logoutRed} alt={''} />
        <p className={'text-body-l-medium text-red-11'}>Leave challenge</p>
      </Button>
      <Modal isDismissable>
        <Dialog className={'flex flex-col'}>
          {({ close }) => (
            <form>
              <Heading className={'text-title1 mb-4 text-sand-12'} slot="title">
                Do you want to leave this challenge?{' '}
              </Heading>
              <p className={'text-body-l-book mb-4 text-sand-12'}>
                Leaving this challenge will remove all your data and cannot be undone.
              </p>
              <p className={'text-body-l-book text-sand-12'}>
                If you want to complete the challenge, this is not the correct way to do it.
              </p>
              <div className={'mt-6 flex justify-between gap-4'}>
                <Button
                  onPress={close}
                  className="text-body-l-book h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 text-sand-12"
                >
                  Cancel
                </Button>
                <Button
                  onPress={async () => await leaveRoom(props.roomID)}
                  className="text-body-l-book h-fit w-full rounded-lg border border-solid border-red-11 bg-red-11 p-3 text-sand-3"
                >
                  Leave challenge
                </Button>
              </div>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
