'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import calendarBlue from '@/app/images/calendarBlue.svg';
import calendarPurple from '@/app/images/calendarPurple.svg';
import flagGreen from '@/app/images/flagGreen.svg';
import flagOrange from '@/app/images/flagOrange.svg';
import fire from '@/app/images/flame.svg';
import globeCrimson from '@/app/images/globeCrimson.svg';

type LabelProps = {
  type: string;
  text?: string;
  style: 'big' | 'small';
  streak?: number;
};

export default function Badge(props: LabelProps) {
  const [style, setStyle] = useState('');
  const [icon, setIcon] = useState(calendarBlue);
  const [text, setText] = useState('');

  useEffect(() => {
    switch (props.type) {
      case 'dailyChallenge':
        setStyle('bg-sky-3 text-sky-11');
        setIcon(calendarBlue);
        setText('Daily Challenge');
        break;
      case 'update':
        setStyle('bg-purple-3 text-purple-11');
        setIcon(calendarPurple);
        setText('Update');
        break;
      case 'habit':
        setStyle('bg-sky-3 text-sky-11');
        setIcon(calendarBlue);
        setText('Daily Challenge');
        break;
      case 'milestone':
        setStyle('bg-orange-3 text-orange-10');
        setIcon(flagOrange);
        setText('Milestone');
        break;
      case 'date':
        setStyle('bg-jade-3 text-jade-11');
        setIcon(flagGreen);
        if (props.text) {
          setText(props.text);
        }
        break;
      case 'goal':
        setStyle('bg-crimson-3 text-crimson-11');
        setIcon(globeCrimson);
        setText('Goal Challenge');
        break;
      case 'streak':
        setStyle('bg-orange-3 text-orange-10');
        setIcon(fire);
        if (props.streak) {
          setText(props.streak.toString());
        }
        break;
    }
  }, []);

  return (
    <div className={'flex h-fit w-fit items-center gap-1 rounded-lg p-1.5 ' + style}>
      <Image className={props.style === 'big' ? 'h-4 w-4' : 'h-3 w-3'} alt="" src={icon} />
      <p className={props.style === 'big' ? 'text-body-l-book' : 'text-body-s-book'}>{text}</p>
    </div>
  );
}
