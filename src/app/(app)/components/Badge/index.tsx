'use client';

import Image from 'next/image';

import calendarBlue from './calendarBlue.svg';
import calendarPurple from './calendarPurple.svg';
import checkCircleGreen from './checkCircleGreen.svg';
import flagGreen from './flagGreen.svg';
import flagOrange from './flagOrange.svg';
import flame from './flame.svg';
import globeCrimson from './globeCrimson.svg';

const labelTypes = [
  'dailyChallenge',
  'update',
  'habit',
  'milestone',
  'date',
  'goal',
  'challengeCompleted',
  'streak',
  'admin',
  'participant',
] as const;

type LabelType = (typeof labelTypes)[number];

const icons: Record<LabelType, any> = {
  dailyChallenge: calendarBlue,
  update: calendarPurple,
  habit: calendarBlue,
  milestone: flagOrange,
  date: flagGreen,
  goal: globeCrimson,
  challengeCompleted: checkCircleGreen,
  streak: flame,
  admin: null,
  participant: null,
};

const texts: Record<LabelType, string | null> = {
  dailyChallenge: 'Daily Challenge',
  update: 'Update',
  habit: 'Daily Challenge',
  milestone: 'Milestone',
  date: null,
  goal: 'Goal Challenge',
  challengeCompleted: 'Challenge completed',
  streak: null,
  admin: 'Admin',
  participant: 'Participant',
};

const styles: Record<LabelType, string> = {
  dailyChallenge: 'bg-sky-3 text-sky-11',
  update: 'bg-purple-3 text-purple-11',
  habit: 'bg-sky-3 text-sky-11',
  milestone: 'bg-orange-3 text-orange-10',
  date: 'bg-jade-3 text-jade-11',
  goal: 'bg-crimson-3 text-crimson-11',
  challengeCompleted: 'bg-green-3 text-green-11',
  streak: 'bg-orange-3 text-orange-10',
  admin: 'bg-sky-3 text-sky-11',
  participant: 'bg-purple-3 text-purple-11',
};

type LabelProps = {
  type: LabelType;
  text?: string;
  style: 'big' | 'small';
  streak?: number;
  hideIcon?: boolean;
};

export default function Badge(props: LabelProps) {
  const style = styles[props.type];
  const icon = icons[props.type];

  let text = texts[props.type];
  if (props.type === 'streak' && props.streak) {
    text = props.streak.toString();
  }
  if (props.type === 'date' && props.text) {
    text = props.text;
  }

  return (
    <div className={'flex h-fit w-fit items-center gap-1 rounded-lg p-1.5 ' + style}>
      {!props.hideIcon && icon && (
        <Image className={props.style === 'big' ? 'h-4 w-4' : 'h-3 w-3'} alt="" src={icon} />
      )}
      <p
        className={
          props.style === 'big'
            ? 'font-inter text-base leading-18'
            : 'font-inter text-xs leading-14'
        }
      >
        {text}
      </p>
    </div>
  );
}
