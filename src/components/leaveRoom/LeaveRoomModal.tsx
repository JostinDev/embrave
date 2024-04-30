'use client';

import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import './style.css';

import React from 'react';

type JoinRoomModalProps = {
  roomID: number;
};
export default function LeaveRoomModal(props: JoinRoomModalProps) {
  return (
    <DialogTrigger>
      <Button>
        <p className={'text-title1 text-red-11'}>Leave the challenge</p>
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
  onPress={async () => ''}
  className="text-body-l-book border-red-11 bg-red-11 h-fit w-full rounded-lg border border-solid p-3 text-sand-3"
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
