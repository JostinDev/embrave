'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

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
      <Modal
        defaultOpen
        className="w-[90%] max-w-[480px] rounded-2xl border border-sand-5 bg-sand-1 p-6 shadow-[0px_8px_20px_rgba(0,0,0/0.1)]"
        isOpen={true}
      >
        <Dialog className="flex flex-col outline-none">
          <form>
            <Heading
              className="mb-4 font-nexa text-26 font-bold leading-[115%] text-sand-12"
              slot="title"
            >
              Do you want to join this challenge?
            </Heading>
            <p className="mb-2 font-inter text-base leading-18 text-sand-12">
              You are about to join the challenge:
            </p>
            <p className="mb-4 font-inter text-base font-black leading-18 text-sand-12">
              {props.challengeName}
            </p>

            <p className="font-inter text-base font-black leading-18 text-red-800">{error}</p>
            <div className="mt-6 flex justify-between gap-4">
              <Button
                onPress={() => cancelJoinRoom()}
                className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 font-inter text-base leading-18 text-sand-12"
              >
                Cancel
              </Button>
              <Button
                onPress={async () => joinRoomWithLink()}
                className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3"
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
