'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import confetti from '@/app/images/confetti.svg';
import fire from '@/app/images/fire.svg';
import plus from '@/app/images/orange-10-plus.svg';
import ChallengeCompleteTracker from '@/components/ChallengeCompleteTracker';
import { createTickedMilestone } from '@/server/mutations';

type SharePopoverProps = {
  roomID: number;
  isChallengeDone: boolean;
};
export default function ChallengeCompleteCard(props: SharePopoverProps) {
  const [isChallengeDone, setIsMilestoneDone] = useState(props.isChallengeDone);

  useEffect(() => {
    setIsMilestoneDone(props.isChallengeDone);
  }, [props.isChallengeDone]);

  async function setTrackerState() {
    setIsMilestoneDone(!isChallengeDone);
  }

  return (
    <div
      className={
        'w-100 border-green-4 bg-green-2 relative mx-auto mb-6 flex max-w-[700px] items-center justify-between overflow-hidden rounded-[26px] border p-8'
      }
    >
      {isChallengeDone && (
        <div
          className={'confetti animate-confetti absolute left-0 top-0 h-16 w-full bg-repeat-x'}
        />
      )}
      <div>
        <p className={'text-title1 text-green-11 mb-2'}>
          {isChallengeDone ? 'Congrats! You completed the challenge!' : 'Completed the Challenge?'}
        </p>
        <p className={'text-body-l-book text-green-11'}>
          {isChallengeDone
            ? 'You were successful! Good on you for pushing yourself outside your such perfect feat!'
            : 'Mark the challenge as done, once you have completed it.'}
        </p>
      </div>
      <ChallengeCompleteTracker
        onPress={() => setTrackerState()}
        roomID={props.roomID}
        isChallengeDone={isChallengeDone}
      />
    </div>
  );
}
