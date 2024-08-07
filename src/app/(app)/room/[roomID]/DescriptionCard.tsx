'use client';

import React from 'react';
import Image from 'next/image';
import { twJoin } from 'tailwind-merge';
import { useLocalStorage } from 'usehooks-ts';

import chevronDown from '@/app/(app)/images/chevronDown.svg';

type buttonProps = {
  title: string;
  description: string;
};

export default function DescriptionCard(props: buttonProps) {
  const [isRoomDescriptionAccordionOpen, setIsRoomDescriptionAccordionOpen] = useLocalStorage(
    'isRoomDescriptionAccordionOpen',
    true,
  );

  return (
    <div className="w-100 mx-auto mb-6 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8">
      <div
        onClick={() => setIsRoomDescriptionAccordionOpen(!isRoomDescriptionAccordionOpen)}
        className="flex w-fit cursor-pointer gap-2"
      >
        <p className="font-nexa text-26 font-bold leading-[115%] text-sand-12">{props.title}</p>
        <Image
          className={twJoin(
            'h-fit w-6 select-none transition',
            !isRoomDescriptionAccordionOpen && 'rotate-180',
          )}
          src={chevronDown}
          alt=""
        />
      </div>

      {isRoomDescriptionAccordionOpen && (
        <p className="mt-2 font-inter text-base leading-18 text-sand-11">{props.description}</p>
      )}
    </div>
  );
}
