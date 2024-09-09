'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import ellipseBlue from '@/app/(marketing)/home/images/ellipseBlue.svg';
import ellipseEnd from '@/app/(marketing)/home/images/ellipseEnd.svg';
import ellipseGreen from '@/app/(marketing)/home/images/ellipseGreen.svg';
import ellipseOrange from '@/app/(marketing)/home/images/ellipseOrange.svg';
import ellipsePurple from '@/app/(marketing)/home/images/ellipsePurple.svg';

export default function Slider() {
  useEffect(() => {
    gsap.to('.slide1', { duration: 0.7, opacity: 0, delay: 2 });
    gsap.fromTo('.slide2', { opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 2 });
    gsap.to('.slide2', { duration: 0.7, opacity: 0, delay: 4 });

    gsap.fromTo('.slide3', { opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 4 });
    gsap.to('.slide3', { duration: 0.7, opacity: 0, delay: 6 });

    gsap.fromTo('.slide4', { opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 6 });
    gsap.to('.slide4', { duration: 0.7, opacity: 0, delay: 8 });

    gsap.fromTo('.slide5', { opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 8 });
  }, []);

  return (
    <div className="relative mx-auto flex h-screen max-w-[820px] justify-center">
      <div className="slide1 absolute top-[45%] mx-auto flex w-full items-center justify-center">
        <Image src={ellipseOrange} alt="ellipse" className="absolute z-10 " />
        <p className="right-1/2 top-1/2 z-20 mx-auto text-center font-nexa text-4xl font-bold text-orange-9 sm:text-5xl">
          <span className="font-sourceSerif4 font-light italic">Climb </span>a mountain?
        </p>
      </div>

      <div className="slide2 absolute top-[45%] mx-auto flex w-full max-w-[820px] items-center justify-center opacity-0 ">
        <Image src={ellipsePurple} alt="ellipse" className="absolute z-10" />
        <p className="right-1/2 top-1/2 z-20 mx-auto text-center font-nexa text-4xl font-bold text-purple-9 sm:text-5xl">
          Find new <span className="font-sourceSerif4 font-light italic">friends</span>?
        </p>
      </div>

      <div className="slide3 absolute top-[45%] mx-auto flex w-full max-w-[820px] items-center justify-center opacity-0 ">
        <Image src={ellipseGreen} alt="ellipse" className="absolute z-10" />
        <p className="right-1/2 top-1/2 z-20 mx-auto text-center font-nexa text-4xl font-bold text-jade-9 sm:text-5xl">
          Cold plunges <span className="font-sourceSerif4 font-light italic">every day</span>?
        </p>
      </div>

      <div className="slide4 absolute top-[45%] mx-auto flex w-full max-w-[820px] items-center justify-center opacity-0 ">
        <Image src={ellipseBlue} alt="ellipse" className="absolute z-10" />
        <p className="text-blue-9 right-1/2 top-1/2 z-20 mx-auto text-center font-nexa text-4xl font-bold sm:text-5xl">
          <span className="font-sourceSerif4 font-light italic">No social media </span>for a week?
        </p>
      </div>

      <div className="slide5 absolute top-[40%] mx-auto flex w-full max-w-[820px] items-center justify-center opacity-0 ">
        <Image src={ellipseEnd} alt="ellipse" className="absolute z-10 " />
        <p className="right-1/2 top-1/2 z-20 mx-auto text-center font-nexa text-5xl font-bold text-sand-12">
          Challenge yourself and change{' '}
          <span className="font-sourceSerif4 font-light italic">your life!</span>
        </p>
      </div>
    </div>
  );
}