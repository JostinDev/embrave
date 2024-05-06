'use client';

import React from 'react';
import Image from 'next/image';
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
        <p className="text-title1 text-sand-12">{props.title}</p>
        <Image
          className={`h-fit w-6 select-none transition ${!isRoomDescriptionAccordionOpen && 'rotate-180'} `}
          src={chevronDown}
          alt=""
        />
      </div>

      {isRoomDescriptionAccordionOpen && (
        <p className="text-body-l-book mt-2 text-sand-12">{props.description}</p>
      )}
    </div>
  );
}
