'use client';

import React, { useEffect, useState, type MouseEventHandler } from 'react';
import Image from 'next/image';

import check from '@/app/(app)/images/Check.svg';
import plus from '@/app/(app)/images/green-11-plus.svg';

type ChallengeCompleteTrackerProps = {
  isChallengeCompleted: boolean;
};

export default function ChallengeCompleteTracker(props: ChallengeCompleteTrackerProps) {
  return (
    <div className="flex cursor-pointer select-none flex-col items-center gap-2">
      <div
        className={`flex h-12 w-12 justify-center rounded-full border border-green-11 font-nexa text-xl font-bold transition-all ${props.isChallengeCompleted ? 'border-solid bg-green-11 hover:bg-green-8' : 'border-dashed hover:bg-green-4'}`}
      >
        {props.isChallengeCompleted ? (
          <Image alt="" src={check}></Image>
        ) : (
          <Image alt="" src={plus}></Image>
        )}
      </div>
    </div>
  );
}
