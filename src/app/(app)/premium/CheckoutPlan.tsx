'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-aria-components';

import flag from '@/app/(app)/images/flagGreen.svg';
import flameJade from '@/app/(app)/images/flameJade.svg';
import world from '@/app/(app)/images/world.svg';

export default function CheckoutPlan() {
  return (
    <div className="mt-10">
      <div className="rounded-[42px] border border-sand-5 bg-sand-1 px-4 pb-4 pt-12">
        <h1 className="text-center font-nexa text-32 font-bold text-sand-12">
          Select the best option for you
        </h1>
        <h2 className="font-regular mb-12 text-center font-inter text-base text-sand-11">
          Embrave can be enjoyed in many different ways, find the best option for you below.
        </h2>

        <div className="flex items-end gap-6">
          <div className="flex flex-col rounded-[26px] border border-solid border-sand-5 bg-sand-1 p-8">
            <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-sand-3 px-3 py-2 font-inter text-base font-normal text-sand-11">
              <Image className="h-6 w-6" src={world} alt="" />
              <p>Free tier</p>
            </div>
            <p className="mb-8 mt-5 font-nexa text-xl font-bold text-sand-12">
              Continue with your current challenges
            </p>

            <ul className="mb-20 list-disc">
              <li className="mb-2 font-inter text-base font-light text-sand-11">
                Ability to create updates on already started or joined challenges
              </li>
              <li className="font-inter text-base font-light text-sand-11">
                Unlimited picture upload
              </li>
            </ul>

            <p className="mb-4 font-nexa text-xl font-light text-jade-12">
              <span className="font-bold">Free</span> nor need for credits
            </p>

            <Link href={{ pathname: '/' }}>
              <Button className="h-fit w-full rounded-lg bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3">
                Continue with free tier
              </Button>
            </Link>
          </div>

          <div className="flex flex-col rounded-[26px] border border-solid border-jade-5 bg-jade-1 p-8">
            <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-jade-11 px-3 py-2 font-inter text-base font-normal text-jade-1">
              <Image className="h-5 w-5" src={flameJade} alt="" />
              <p>Most popular</p>
            </div>
            <p className="mb-8 mt-5 font-nexa text-xl font-bold leading-8 text-jade-11">
              Push yourself even further with <span>Embrave Premium!</span>
            </p>
            <ul className="mb-24 list-disc">
              <li className="mb-2 font-inter text-base font-light text-jade-11">
                Ability to create updates on already started or joined challenges
              </li>
              <li className="mb-2 font-inter text-base font-light text-jade-11">
                Unlimited picture upload
              </li>
              <li className="font-inter text-base font-medium text-jade-11">
                Ability to start or join unlimited new challenges
              </li>
            </ul>
            <p className="font-inter text-xs font-normal text-sand-11">One-time purchase</p>
            <p className="mb-4 font-nexa text-xl font-light text-jade-12">
              <span className="font-bold">40.00 CHF</span> for unlimited credits
            </p>

            <Link href={{ pathname: '/checkout', query: { plan: 'lifetime' } }}>
              <Button className="h-fit w-full rounded-lg bg-jade-12 p-3 font-inter text-base leading-18 text-jade-3">
                Select Premium
              </Button>
            </Link>
          </div>

          <div className="flex flex-col rounded-[26px] border border-solid border-jade-5 bg-jade-1 p-8">
            <div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-jade-3 px-3 py-2 font-inter text-base font-normal text-jade-11">
              <Image className="h-4 w-4" src={flag} alt="" />
              <p>To push yourself a bit</p>
            </div>
            <p className="mt-5 font-nexa text-xl font-bold leading-8 text-jade-11">
              Need to get a few more credits?
            </p>
            <ul className="mb-20 list-disc">
              <li className="mb-2 font-inter text-base font-light text-jade-11">
                Ability to create updates on already started or joined challenges
              </li>
              <li className="mb-2 font-inter text-base font-light text-jade-11">
                Unlimited picture upload
              </li>
              <li className="font-inter text-base font-medium text-jade-11">
                Ability to join or start 3 new challenges
              </li>
            </ul>
            <p className="font-inter text-xs font-normal text-sand-11">One-time purchase</p>
            <p className="mb-4 font-nexa text-xl font-light text-jade-12">
              <span className="font-bold">9.00 CHF</span> for 3 credits
            </p>

            <Link href={{ pathname: '/checkout', query: { plan: 'credits' } }}>
              <Button className="h-fit w-full rounded-lg bg-jade-12 p-3 font-inter text-base leading-18 text-jade-3">
                Select credits
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
