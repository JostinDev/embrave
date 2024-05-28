'use client';

import Image from 'next/image';

import Badge from '@/app/(app)/components/Badge';
import placeholder from '@/app/(app)/images/challengePlaceholder.png';
import chevronRight from '@/app/(app)/images/chevronRight.svg';

type ChallengeCardProps = {
  id?: number;
  streak?: number;
  type: string;
  challenge: string;
  date?: string;
};

export default function ChallengeCard(props: ChallengeCardProps) {
  function Streak() {
    let streak = props.streak !== 0 && props.streak;

    return (
      <div className="relative">
        {streak ? (
          <div className="absolute left-2 top-2 flex">
            <Badge streak={props.streak} type="streak" style="small" />
          </div>
        ) : (
          ''
        )}
        <Image className="rounded-[10px] pb-3" src={placeholder} alt="" width={200} height={200} />
      </div>
    );
  }

  function Tag() {
    let type = props.type;

    switch (type) {
      case 'goal':
        return <Badge type="goal" style="small" />;
      case 'habit':
        return <Badge type="dailyChallenge" style="small" />;
      default:
        return null;
    }
  }

  return (
    <div className="flex max-w-[220px] cursor-pointer flex-col rounded-[26px] border border-sand-5 bg-sand-2 p-4">
      <Streak />
      <span className="mb-4">
        <Tag />
      </span>
      <p className="pb-2 text-start font-inter text-base font-medium leading-5 text-sand-12">
        {props.challenge}
      </p>
      {props.date ? (
        <p className="font-inter text-xs leading-14 text-sand-11">Created: {props.date}</p>
      ) : (
        ''
      )}
      <Image className="h-7 w-7 self-end" src={chevronRight} alt="" width={20} height={20} />
    </div>
  );
}
