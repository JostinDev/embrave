import Image from 'next/image';

import ProfileCard from '@/app/(app)/profile/ProfileCard';

type UserProps = {
  points: number;
  username: string | null;
  profilePicture: string;
  activeChallenges: number;
};

export default async function User(props: UserProps) {
  return (
    <ProfileCard title="">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="flex flex-row items-center gap-4">
          <Image
            width={64}
            height={64}
            className="h-16 w-16 rounded-full"
            src={props.profilePicture}
            alt=""
          />
          <p className="max-w-[180px] truncate font-nexa text-xl font-bold text-sand-12 sm:max-w-[250px] md:max-w-[180px]">
            {props.username}
          </p>
        </div>
        <div className="flex gap-8 text-center sm:ml-auto">
          <div className="flex flex-col justify-center">
            <p className="font-nexa text-xl font-bold text-sand-12">{props.points}</p>
            <p className="font-inter text-base font-normal text-sand-9">Points</p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-nexa text-xl font-bold text-sand-12">{props.activeChallenges}</p>
            <p className="font-inter text-base font-normal text-sand-9">Challenges</p>
          </div>
        </div>
      </div>
    </ProfileCard>
  );
}
