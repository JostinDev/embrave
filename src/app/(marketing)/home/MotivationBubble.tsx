'use client';

import Image from 'next/image';

import ellipseAwesome from '@/app/(marketing)/home/images/ellipseAwesome.svg';
import ellipseLookAtMe from '@/app/(marketing)/home/images/ellipseLookAtMe.svg';
import ellipseNoRun from '@/app/(marketing)/home/images/ellipseNoRun.svg';

export default function MotivationBubble() {
  return (
    <div className="relative mb-52 mt-40 w-full">
      <div className="mx-auto flex items-center justify-center md:mr-72">
        <Image src={ellipseAwesome} alt="ellipse" className="absolute z-10" />
        <div className="z-20 mx-auto text-center md:text-start">
          <p className="mb-1 font-sourceSerif4 text-4xl font-light italic text-orange-9 sm:text-5xl">
            &quot;Awesome!&quot;
          </p>
          <p className="font-nexa text-base font-bold text-orange-8">Your gym partner</p>
        </div>
      </div>

      <div className="mx-auto mt-20 flex items-center justify-center md:ml-60 md:mt-8">
        <Image src={ellipseNoRun} alt="ellipse" className="absolute z-10" />
        <div className="z-20 mx-auto text-center md:text-start">
          <p className="mb-1 font-sourceSerif4 text-4xl font-light italic text-purple-9 sm:text-5xl">
            No run today?
          </p>
          <p className="font-nexa text-base font-bold text-purple-8">
            Your best friend preparing for a marathon
          </p>
        </div>
      </div>

      <div className="mx-auto mt-20 flex items-center justify-center md:mr-60 md:mt-10">
        <Image src={ellipseLookAtMe} alt="ellipse" className="absolute z-10" />
        <div className="z-20 mx-auto text-center md:text-start">
          <p className="mb-1 font-sourceSerif4 text-4xl font-light italic text-sky-11 sm:text-5xl">
            “Look at me go!”
          </p>
          <p className="font-nexa text-base font-bold text-sky-8">You to yourself</p>
        </div>
      </div>
    </div>
  );
}
