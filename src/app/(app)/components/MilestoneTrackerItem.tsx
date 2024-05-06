'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import fire from '@/app/(app)/images/fire.svg';
import plus from '@/app/(app)/images/orange-10-plus.svg';
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
        className={`text-title2 flex h-12 w-12 justify-center rounded-full border border-orange-10 transition-all hover:bg-orange-4
                   ${isMilestoneDone ? 'border-solid bg-orange-9' : 'border-dashed'}
                   `}
      >
        {isMilestoneDone ? <Image alt="" src={fire}></Image> : <Image alt="" src={plus}></Image>}
      </div>
      <p
        className={`${isMilestoneDone || props.index === 0 ? 'text-body-m-bold' : 'text-body-m-book'}`}
      >
        {props.index === 0
          ? 'Today'
          : new Date(props.day).toLocaleDateString(undefined, { weekday: 'short' })}
      </p>
    </div>
  );
}
