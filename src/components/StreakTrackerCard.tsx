'use client';

import React from 'react';
import Image from 'next/image';

import chevronDownOrange from '@/app/images/chevronDownOrange.svg';
import LocalStorageManager from '@/app/utils/LocalStorageManager';
import MilestoneTrackerItem from '@/components/MilestoneTrackerItem';

type StreakTrackerCardProps = {
  roomID: number;
  milestones: {
    title: string | null;
    roomID: number | null;
    id: number;
    description: string | null;
    userID: string;
    timestamp: Date;
    isLastMilestone: boolean;
    ticked: boolean | null;
    medias: {}[];
  }[];
};

export default function StreakTrackerCard(props: StreakTrackerCardProps) {
  const [isOpen, setOpen] = React.useState(true);

  function saveCardState() {
    LocalStorageManager.set('isRoomDescriptionAccordionOpen', String(!isOpen));
    setOpen(!isOpen);
  }
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
        'w-100 mx-auto mb-6 max-w-[700px] rounded-[26px] border border-orange-4 bg-orange-2 p-8'
      }
    >
      <div onClick={() => saveCardState()} className="flex w-fit cursor-pointer gap-2">
        <p className="text-title1 text-orange-10">Streak Tracker</p>
        <Image
          className={`mt-0.5 h-fit w-6 select-none transition ${!isOpen && 'rotate-180'} `}
          src={chevronDownOrange}
          alt=""
        />
      </div>
      {isOpen && (
        <div>
          <p className="text-body-l-book mb-6 mt-2 text-orange-10">
            Check each day that you reached your goal to uphold your streak! You can fill out the
            last 7 days.
          </p>
          <div className="flex flex-row-reverse justify-between">
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
