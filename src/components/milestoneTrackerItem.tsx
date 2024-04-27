'use client';

import React from 'react';
import Image from 'next/image';

import fire from '@/app/images/fire.svg';
import plus from '@/app/images/orange-10-plus.svg';
import { createTickedMilestone } from '@/server/mutations';

type SharePopoverProps = {
  day: string;
  roomID: number;
  isMilestoneDone: boolean;
  index: number;
};
export default function MilestoneTrackerItem(props: SharePopoverProps) {
  return (
    <div
      onClick={() => createTickedMilestone(new Date(props.day), props.roomID)}
      className={'flex cursor-pointer flex-col items-center gap-2 text-orange-10'}
    >
      <div
        className={`text-title2 flex h-12 w-12 justify-center rounded-full border border-orange-10 transition-all hover:bg-orange-4
                   ${props.isMilestoneDone ? 'border-solid bg-orange-9' : 'border-dashed'}
                   `}
      >
        {props.isMilestoneDone ? (
          <Image alt={''} src={fire}></Image>
        ) : (
          <Image alt={''} src={plus}></Image>
        )}
      </div>
      <p
        className={`${props.isMilestoneDone || props.index === 0 ? 'text-body-m-bold' : 'text-body-m-book'}`}
      >
        {props.index === 0
          ? 'Today'
          : new Date(props.day).toLocaleDateString(undefined, { weekday: 'short' })}
      </p>
    </div>
  );
}
