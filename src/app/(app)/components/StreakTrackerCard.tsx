'use client';

import React from 'react';
import Image from 'next/image';
import { useLocalStorage } from 'usehooks-ts';

import MilestoneTrackerItem from '@/app/(app)/components/MilestoneTrackerItem';
import chevronDownOrange from '@/app/(app)/images/chevronDownOrange.svg';
import type { Milestone } from '@/server/db/schema';

type StreakTrackerCardProps = {
  roomID: number;
  milestones: Milestone[];
};

export default function StreakTrackerCard(props: StreakTrackerCardProps) {
  const [isRoomTrackerAccordionOpen, setIsRoomTrackerAccordionOpen] = useLocalStorage(
    'isRoomTrackerAccordionOpen',
    true,
  );

  function getWeekdays() {
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);

    let weekdays: string[] = [];
    for (let i = 0; i < 7; i++) {
      const dateString = new Date(
        yourDate.getTime() - offset * 60 * 1000 - 1000 * 60 * 60 * 24 * i,
      ).toISOString();
      weekdays[i] = dateString ? dateString.split('T')[0] || '' : '';
    }
    return weekdays;
  }

  const weekdays = getWeekdays();

  function formatMilestoneDate(milestoneDate: Date) {
    const offsetAdjustedDate = new Date(
      milestoneDate.getTime() - new Date().getTimezoneOffset() * 60000,
    );
    return offsetAdjustedDate.toISOString().split('T')[0]!;
  }

  const milestoneDoneAt = props.milestones.map((milestone) =>
    formatMilestoneDate(milestone.timestamp),
  );

  return (
    <div
      className={
        'w-100 mx-auto mb-6 max-w-[700px] rounded-[26px] border border-orange-4 bg-orange-2 py-8'
      }
    >
      <div
        onClick={() => setIsRoomTrackerAccordionOpen(!isRoomTrackerAccordionOpen)}
        className="flex w-fit cursor-pointer gap-2 pl-8 "
      >
        <p className="text-title1 text-orange-10">Streak Tracker</p>
        <Image
          className={`mt-0.5 h-fit w-6 select-none transition ${!isRoomTrackerAccordionOpen && 'rotate-180'} `}
          src={chevronDownOrange}
          alt=""
        />
      </div>
      {isRoomTrackerAccordionOpen && (
        <div>
          <p className="text-body-l-book mb-4 mt-2 px-8 text-orange-10">
            Check each day that you reached your goal to uphold your streak! You can fill out the
            last 7 days.
          </p>
          <div className="no-scrollbar flex flex-row-reverse justify-between gap-6 overflow-x-scroll rounded-[10px] bg-orange-3 p-6 px-4 sm:overflow-hidden sm:bg-transparent md:px-8">
            {weekdays.map((day: string, i: number) => {
              //TODO a streak is not shared between users. It's personal
              const isMilestoneDone = (milestoneDoneAt as string[]).includes(day);
              return (
                <div key={i}>
                  <MilestoneTrackerItem
                    roomID={props.roomID}
                    day={day}
                    index={i}
                    isMilestoneDone={isMilestoneDone}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
