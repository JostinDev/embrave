'use client';

import Image from 'next/image';
import type { User } from '@clerk/nextjs/server';

import Badge from '@/app/(app)/components/Badge';
import placeholder from '@/app/(app)/explore/ChallengeModal/challengePlaceholder.png';
import chevronRight from '@/app/(app)/images/chevronRight.svg';

type ChallengeCardProps = {
  id?: number;
  streak?: number;
  type: string;
  challenge: string;
  date?: string;
  banner: string;
  users?: Pick<User, 'id' | 'fullName' | 'imageUrl'>[] | undefined;
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
        <Image
          className="mb-3 h-[94px] rounded-[10px]"
          style={{ objectFit: 'cover' }}
          src={props.banner ? `/images/challenge/${props.banner}` + '.png' : placeholder}
          blurDataURL={`/images/challenge/${props.banner}` + '.png'}
          alt=""
          width={200}
          height={200}
        />
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
    <div className="flex h-full w-[220px] cursor-pointer flex-col rounded-[26px] border border-sand-5 bg-sand-1 p-4">
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
      {props.users && (
        <div className="flex">
          {props.users.map((user, i) => {
            return (
              <Image
                key={user.id}
                alt={user.fullName ? `Profile picture of ${user.fullName}` : 'Profile picture'}
                title={user.fullName ?? undefined}
                width={48}
                height={48}
                className="mt-3 size-8 rounded-full border border-sand-12"
                style={i !== 0 ? { marginLeft: -16 } : { marginLeft: 0 }}
                src={user.imageUrl}
              />
            );
          })}
        </div>
      )}

      <Image
        className="mt-auto h-7 w-7 self-end"
        src={chevronRight}
        alt=""
        width={20}
        height={20}
      />
    </div>
  );
}
