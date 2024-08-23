'use client';

import React from 'react';
import Image from 'next/image';

import flag from '@/app/(app)/images/flagGreen.svg';
import flameJade from '@/app/(app)/images/flameJade.svg';
import world from '@/app/(app)/images/world.svg';
import { Button } from 'react-aria-components';
import Link from 'next/link';

export default function CheckoutPlan() {

  return (
    <div className="mt-10">
      <div className="bg-sand-1 border border-sand-5 rounded-[42px] px-4 pb-4 pt-12">
        <h1 className="text-sand-12 font-nexa font-bold text-32 text-center">Select the best option for you</h1>
        <h2 className="text-sand-11 font-inter font-regular text-base text-center mb-12">Embrave can be enjoyed in many different ways, find the best option for you below.</h2>
        
        <div className="flex items-end gap-6">

			<div className="flex flex-col rounded-[26px] border border-solid border-sand-5 bg-sand-1 p-8">
				<div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-sand-3 px-3 py-2 font-inter text-base font-normal text-sand-11">
				<Image className="h-6 w-6" src={world} alt="" />
				<p>Free tier</p>
				</div>
				<p className="mt-5 mb-8 font-nexa text-xl font-bold text-sand-12">
				Continue with your current challenges
				</p>
						
				<ul className="list-disc mb-20">
					<li className="text-sand-11 font-inter text-base font-light mb-2">Ability to create updates on already started or joined challenges</li>
					<li className="text-sand-11 font-inter text-base font-light">Unlimited picture upload</li>
				</ul>

				<p className="font-nexa text-xl font-light text-jade-12 mb-4">
					<span className="font-bold">Free</span> nor need for credits
				</p>

				<Link href={{pathname: '/'}}>
					<Button className="h-fit w-full rounded-lg bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3">Continue with free tier</Button>
				</Link>

			</div>

			<div className="flex flex-col rounded-[26px] border border-solid border-jade-5 bg-jade-1 p-8">
				<div className="flex w-fit items-center justify-center gap-1 rounded-lg bg-jade-11 px-3 py-2 font-inter text-base font-normal text-jade-1">
					<Image className="h-5 w-5" src={flameJade} alt="" />
				<p>Most popular</p>
				</div>
				<p className="mt-5 mb-8 font-nexa text-xl font-bold leading-8 text-jade-11">
				Push yourself even further with <span>Embrave Premium!</span>
				</p>
				<ul className="list-disc mb-24">
					<li className="text-jade-11 font-inter text-base font-light mb-2">Ability to create updates on already started or joined challenges</li>
					<li className="text-jade-11 font-inter text-base font-light mb-2">Unlimited picture upload</li>
					<li className="text-jade-11 font-inter text-base font-medium">Ability to start or join unlimited new challenges</li>
				</ul>
				<p className="font-inter text-xs font-normal text-sand-11">One-time purchase</p>
				<p className="font-nexa text-xl font-light text-jade-12 mb-4">
					<span className="font-bold">40.00 CHF</span> for unlimited credits
				</p>

				<Link href={{pathname: '/checkout', query: { plan: 'lifetime' }}}>
					<Button className="h-fit w-full rounded-lg bg-jade-12 p-3 font-inter text-base leading-18 text-jade-3">Select Premium</Button>
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
				<ul className="list-disc mb-20">
					<li className="text-jade-11 font-inter text-base font-light mb-2">Ability to create updates on already started or joined challenges</li>
					<li className="text-jade-11 font-inter text-base font-light mb-2">Unlimited picture upload</li>
					<li className="text-jade-11 font-inter text-base font-medium">Ability to join or start 3 new challenges</li>
				</ul>
				<p className="font-inter text-xs font-normal text-sand-11">One-time purchase</p>
				<p className="font-nexa text-xl font-light text-jade-12 mb-4">
					<span className="font-bold">9.00 CHF</span> for 3 credits
				</p>

				<Link href={{pathname: '/checkout', query: { plan: 'credits' }}}>
					<Button className="h-fit w-full rounded-lg bg-jade-12 p-3 font-inter text-base leading-18 text-jade-3">Select credits</Button>
				</Link>
			</div>
        </div>
      </div>
    </div>
  );
}
