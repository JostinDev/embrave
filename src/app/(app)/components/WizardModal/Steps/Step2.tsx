'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'react-aria-components';

import calendar from '@/app/(app)/images/calendarGreen.svg';
import globe from '@/app/(app)/images/globeCrimson.svg';
import sparkles from '@/app/(app)/images/sparklesOrange.svg';
import spinner from '@/app/(app)/images/spinner.svg';
import startFlag from '@/app/(app)/images/startFlag.png';
import { setUserHasWatchedWizard } from '@/server/mutations';

export default function Step2() {
  return (
    <div>
      <Image className="mx-auto mb-10 h-16 w-16" src={startFlag} alt={''} />
      <p className="mb-2 text-center font-nexa text-[32px] font-bold text-sand-12">
        Start your first challenge
      </p>
      <p className="mb-10 text-center font-nexa text-xl font-bold text-sand-11">
        You are now ready to start your first Embrave challenge. Some key points below:
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6	rounded-3xl bg-orange-3 p-6 text-orange-11">
          <Image className="h-12 w-12" src={sparkles} alt={''} />
          <div className="gap- flex flex-col">
            <p className="font-nexa text-xl font-bold">Credits</p>
            <p className="font-regular font-inter text-base">
              To join or start a challenge you need credits. The first 3 credits are on the house.
              Afterwards we have attractive packages to get more credits
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6	rounded-3xl bg-crimson-3 p-6 text-crimson-11">
          <Image className="h-12 w-12" src={globe} alt={''} />
          <div className="flex flex-col gap-1">
            <p className="font-nexa text-xl font-bold">Share your challenge with friends</p>
            <p className="font-regular font-inter text-base">
              Want to hold yourself accountable? Or simply just challenge yourself together with
              friends? No worries, you can share a challenge and invite your friends to participate.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6	rounded-3xl bg-jade-3 p-6 text-jade-11">
          <Image className="h-12 w-12" src={calendar} alt={''} />
          <div className="flex flex-col gap-1">
            <p className="font-nexa text-xl font-bold">Post updates</p>
            <p className="font-regular font-inter text-base">
              Pushing yourself outside of your comfort zone is a journey. You can post updates for
              yourself or share them with your friends to see the progress you are making. Just keep
              it SFW.
            </p>
          </div>
        </div>
      </div>

      <Button
        onPress={() => setUserHasWatchedWizard()}
        type="submit"
        className="relative mt-10 flex h-fit w-full justify-center rounded-lg border border-solid border-sand-12 bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3"
      >
        <p className="opacity-100 transition-all duration-200">Start your Embrave journey</p>
        <Image
          className="absolute left-1/2 h-4 w-4 -translate-x-1/2 opacity-0 transition-all duration-200"
          src={spinner}
          alt=""
        />
      </Button>
    </div>
  );
}
