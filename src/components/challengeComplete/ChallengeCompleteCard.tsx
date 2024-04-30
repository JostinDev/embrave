'use client';

import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import ChallengeCompleteTracker from '@/components/challengeComplete/ChallengeCompleteTracker';
import { setChallengeDone } from '@/server/mutations';

type SharePopoverProps = {
  roomID: number;
  isChallengeDone: boolean;
};

export default function ChallengeCompleteCard(props: SharePopoverProps) {
  const [isChallengeDone, setIsMilestoneDone] = useState(props.isChallengeDone);
  const [isOpen, setOpen] = React.useState(false);

  useEffect(() => {
    setIsMilestoneDone(props.isChallengeDone);
  }, [props.isChallengeDone]);

  async function setTrackerState() {
    if (!isChallengeDone) {
      setIsMilestoneDone(true);
      await setChallengeDone(props.roomID);
    }
    setOpen(false);
  }

  return (
    <div
      className={
        'w-100 relative mx-auto mb-6 flex max-w-[700px] items-center justify-between overflow-hidden rounded-[26px] border border-green-4 bg-green-2 p-8'
      }
    >
      {isChallengeDone && (
        <div
          className={'confetti absolute left-0 top-0 h-16 w-full animate-confetti bg-repeat-x'}
        />
      )}
      <div>
        <p className={'text-title1 mb-2 text-green-11'}>
          {isChallengeDone ? 'Congrats! You completed the challenge!' : 'Completed the Challenge?'}
        </p>
        <p className={'text-body-l-book text-green-11'}>
          {isChallengeDone
            ? 'You were successful! Good on you for pushing yourself outside your such perfect feat!'
            : 'Mark the challenge as done, once you have completed it.'}
        </p>
      </div>
      <DialogTrigger>
        <Button onPress={() => !isChallengeDone && setOpen(true)}>
          <ChallengeCompleteTracker roomID={props.roomID} isChallengeDone={isChallengeDone} />
        </Button>
        <Modal
          isDismissable
          className="shadow:[0px_8px_20px_rgba(0,0,0/0.1)] w-[90%] max-w-[480px] rounded-2xl border border-sand-5 bg-sand-1 p-6"
          isOpen={isOpen}
          onOpenChange={setOpen}
        >
          <Dialog className="outline-none">
            {({ close }) => (
              <form>
                <Heading className={'text-title1 mb-4 text-sand-12'} slot="title">
                  Do you want to complete this challenge?
                </Heading>
                <p className={'text-body-l-book mb-4 text-sand-12'}>
                  By completing the challenge, you will not be able to post any new milestones or
                  delete the existing ones.
                </p>
                <p className={'text-body-l-book text-sand-12'}>
                  A completed challenge only allows you to read the posted milestone.
                </p>
                <div className={'mt-6 flex justify-between gap-4'}>
                  <Button
                    onPress={close}
                    className="text-body-l-book h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 text-sand-12"
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => setTrackerState()}
                    className="text-body-l-book h-fit w-full rounded-lg border border-solid border-sand-12 bg-sand-12 p-3 text-sand-3"
                  >
                    Complete challenge
                  </Button>
                </div>
              </form>
            )}
          </Dialog>
        </Modal>
      </DialogTrigger>
    </div>
  );
}
