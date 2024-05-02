'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from 'react-aria-components';

import chevronDown from '@/app/images/chevronDown.svg';
import chevronDownOrange from '@/app/images/chevronDownOrange.svg';
import LocalStorageManager from '@/app/utils/LocalStorageManager';

type buttonProps = {
  title: string;
  description: string;
};

export default function DescriptionCard(props: buttonProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (LocalStorageManager.get('isRoomDescriptionAccordionOpen')) {
      setIsOpen(LocalStorageManager.get('isRoomDescriptionAccordionOpen') === 'true');
    } else {
      LocalStorageManager.set('isRoomDescriptionAccordionOpen', 'true');
    }
  }, []);

  function saveCardState() {
    LocalStorageManager.set('isRoomDescriptionAccordionOpen', String(!isOpen));
    setIsOpen(!isOpen);
  }

  return (
    <div className="w-100 mx-auto mb-6 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8">
      <div onClick={() => saveCardState()} className="flex w-fit cursor-pointer gap-2">
        <p className="text-title1 text-sand-12">{props.title}</p>
        <Image
          className={`h-fit w-6 select-none transition ${!isOpen && 'rotate-180'} `}
          src={chevronDown}
          alt=""
        />
      </div>

      {isOpen && <p className="text-body-l-book mt-2 text-sand-12">{props.description}</p>}
    </div>
  );
}
