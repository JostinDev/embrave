'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import fire from '@/app/(app)/images/fire.svg';
import plus from '@/app/(app)/images/orange10Plus.svg';
import { createTickedMilestone } from '@/server/mutations';

type SharePopoverProps = {
  day: string;
  roomID: number;
  isMilestoneDone: boolean;
  index: number;
};
export default function MilestoneTrackerItem(props: SharePopoverProps) {
  const [isMilestoneDone, setIsMilestoneDone] = useState(props.isMilestoneDone);

  useEffect(() => {
    setIsMilestoneDone(props.isMilestoneDone);
  }, [props.isMilestoneDone]);

  async function setTrackerState() {
    setIsMilestoneDone(!isMilestoneDone);
    await createTickedMilestone(new Date(props.day), props.roomID);
  }

  return (
    <div
      onClick={() => setTrackerState()}
      className="flex cursor-pointer select-none flex-col items-center gap-2 text-orange-10"
    >
      <div
        className={`flex h-12 w-12 justify-center rounded-full border border-orange-10 font-nexa text-xl font-bold transition-all hover:bg-orange-4
                   ${isMilestoneDone ? 'border-solid bg-orange-9' : 'border-dashed'}
                   `}
      >
        {isMilestoneDone ? <Image alt="" src={fire}></Image> : <Image alt="" src={plus}></Image>}
      </div>
      <p
        className={`${isMilestoneDone || props.index === 0 ? 'font-inter text-sm font-bold leading-4' : 'font-inter text-sm leading-4'}`}
      >
        {props.index === 0
          ? 'Today'
          : new Date(props.day).toLocaleDateString(undefined, { weekday: 'short' })}
      </p>
    </div>
  );
}
