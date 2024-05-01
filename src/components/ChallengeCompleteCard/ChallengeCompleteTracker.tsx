'use client';

import React, { useEffect, useState, type MouseEventHandler } from 'react';
import Image from 'next/image';

import check from '@/app/images/Check.svg';
import plus from '@/app/images/green-11-plus.svg';

type SharePopoverProps = {
  roomID: number;
  isChallengeDone: boolean;
};
export default function ChallengeCompleteTracker(props: SharePopoverProps) {
  const [isChallengeDone, setIsMilestoneDone] = useState(props.isChallengeDone);

  useEffect(() => {
    setIsMilestoneDone(props.isChallengeDone);
  }, [props.isChallengeDone]);

  async function setTrackerState() {
    setIsMilestoneDone(!isChallengeDone);
  }

  return (
    <div className="flex cursor-pointer select-none flex-col items-center gap-2">
      <div
        className={`text-title2 flex h-12 w-12 justify-center rounded-full border border-green-11 transition-all
                   ${isChallengeDone ? 'border-solid bg-green-11 hover:bg-green-8' : 'border-dashed hover:bg-green-4'}
                   `}
      >
        {isChallengeDone ? <Image alt="" src={check}></Image> : <Image alt="" src={plus}></Image>}
      </div>
    </div>
  );
}
