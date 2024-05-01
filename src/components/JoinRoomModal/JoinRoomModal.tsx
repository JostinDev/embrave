'use client';

import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import './style.css';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { joinRoom } from '@/server/mutations';

type JoinRoomModalProps = {
  link: string;
  challengeName: string;
};
export default function JoinRoomModal(props: JoinRoomModalProps) {
  const [error, setError] = useState('');
  const router = useRouter();

  async function joinRoomWithLink() {
    const result = await joinRoom(props.link);
    if (result && result.error) {
      setError(result.error);
    }
  }

  function cancelJoinRoom() {
    router.push('/');
  }

  return (
    <DialogTrigger>
      <Button></Button>
      <Modal defaultOpen isOpen={true}>
        <Dialog className={'flex flex-col'}>
          <form>
            <Heading className={'text-title1 mb-4 text-sand-12'} slot="title">
              Do you want to join this challenge?
            </Heading>
            <p className={'text-body-l-book mb-2 text-sand-12'}>
              You are about to join the challenge:
            </p>
            <p className={'text-body-l-heavy mb-4 text-sand-12'}>{props.challengeName}</p>

            <p className={'text-body-l-heavy text-red-800'}>{error}</p>
            <div className={'mt-6 flex justify-between gap-4'}>
              <Button
                onPress={() => cancelJoinRoom()}
                className="text-body-l-book h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 text-sand-12"
              >
                Cancel
              </Button>
              <Button
                onPress={async () => joinRoomWithLink()}
                className="text-body-l-book h-fit w-full rounded-lg border border-solid border-sand-12 bg-sand-12 p-3 text-sand-3"
              >
                Join challenge
              </Button>
            </div>
          </form>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
