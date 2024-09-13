'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import ellipseStreak from '@/app/(marketing)/home/images/ellipseStreak.svg';
import flame from '@/app/(marketing)/home/images/flame.svg';

export default function Flame() {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.to('.flame1', { duration: 0.7, opacity: 1, scrollTrigger: '.flame1', delay: 0.5 });
    gsap.to('.flame2', { duration: 0.7, opacity: 1, scrollTrigger: '.flame2', delay: 1.25 });
    gsap.to('.flame3', { duration: 0.7, opacity: 1, scrollTrigger: '.flame3', delay: 2 });
  }, []);

  return (
    <div className="relative mx-auto mb-64 mt-36 flex flex-wrap justify-center gap-32 md:flex-nowrap md:gap-4">
      <div className="flame1 relative top-1/2 mx-auto flex w-full justify-center opacity-0">
        <Image src={ellipseStreak} alt="ellipse" className="absolute -top-[50px]" />
        <div className="right-1/2 top-1/2 z-20 mx-auto text-center font-nexa text-4xl font-bold text-orange-9 sm:text-5xl">
          <Image src={flame} alt="flame" className="mx-auto mb-5" />
          Day one
          <span className="font-sourceSerif4 font-light italic">, yay!</span>
        </div>
      </div>

      <div className="flame2 relative top-1/2 mx-auto flex w-full justify-center opacity-0">
        <Image src={ellipseStreak} alt="ellipse" className="absolute -top-[50px]" />
        <div className="right-1/2 top-1/2 z-20 mx-auto text-center font-nexa text-4xl font-bold text-orange-9 sm:text-5xl">
          <Image src={flame} alt="flame" className="mx-auto mb-5" />
          Day two
          <span className="font-sourceSerif4 font-light italic">, let&apos;s go!</span>
        </div>
      </div>

      <div className="flame3 relative top-1/2 mx-auto flex w-full justify-center opacity-0">
        <Image src={ellipseStreak} alt="ellipse" className="absolute -top-[50px]" />
        <div className="right-1/2 top-1/2 z-20 mx-auto text-center font-nexa text-4xl font-bold text-orange-9 sm:text-5xl">
          <Image src={flame} alt="flame" className="mx-auto mb-5" />
          Day three
          <span className="font-sourceSerif4 font-light italic">, weee!</span>
        </div>
      </div>
    </div>
  );
}
