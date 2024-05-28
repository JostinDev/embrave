'use client';

import React, { useOptimistic } from 'react';
import Image from 'next/image';
import { Button, Form } from 'react-aria-components';
import { twJoin } from 'tailwind-merge';

import fire from '@/app/(app)/images/fire.svg';
import plus from '@/app/(app)/images/orange10Plus.svg';
import { createTickedMilestone } from '@/server/mutations';

type MilestoneTrackerItemProps = {
  day: string;
  roomID: number;
  isMilestoneDone: boolean;
  index: number;
};

export default function MilestoneTrackerItem(props: MilestoneTrackerItemProps) {
  const [isMilestoneDone, setOptimisticIsMilestoneDone] = useOptimistic(props.isMilestoneDone);

  async function setTrackerState() {
    setOptimisticIsMilestoneDone(!isMilestoneDone);
    await createTickedMilestone(new Date(props.day), props.roomID);
  }

  return (
    <Form action={setTrackerState}>
      <Button
        type="submit"
        className="flex cursor-pointer select-none flex-col items-center gap-2 text-orange-10 outline-none"
      >
        <div
          className={twJoin(
            'flex h-12 w-12 justify-center rounded-full border border-orange-10 font-nexa text-xl font-bold transition-all hover:bg-orange-4',
            isMilestoneDone ? 'border-solid bg-orange-9' : 'border-dashed',
          )}
        >
          {isMilestoneDone ? <Image alt="" src={fire}></Image> : <Image alt="" src={plus}></Image>}
        </div>
        <p
          className={twJoin(
            'font-inter text-sm leading-4',
            (isMilestoneDone || props.index === 0) && 'font-bold',
          )}
        >
          {props.index === 0
            ? 'Today'
            : new Date(props.day).toLocaleDateString(undefined, { weekday: 'short' })}
        </p>
      </Button>
    </Form>
  );
}
