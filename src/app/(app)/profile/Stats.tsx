import Image from 'next/image';

import calendarBlue from '@/app/(app)/images/calendarBlue.svg';
import calendarPurple from '@/app/(app)/images/calendarPurple.svg';
import fire from '@/app/(app)/images/fireOutline.svg';
import flag from '@/app/(app)/images/flagGreen.svg';
import globe from '@/app/(app)/images/globeRed.svg';
import ProfileCard from '@/app/(app)/profile/ProfileCard';

type StatsProps = {
  milestoneCount: number;
  updateCount: number;
  goalChallengeNumber: number;
  habitChallengeNumber: number;
};

export default async function Stats(statsProps: StatsProps) {
  return (
    <ProfileCard title="Stats">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="border-solide flex w-full flex-col gap-4 rounded-[26px] border border-sky-5 bg-sky-1 p-8 text-center">
            <Image className="mx-auto mb-2 h-8 w-8" src={calendarBlue} alt="" />
            <p className="font-nexa text-[26px] font-bold leading-3 text-sky-11">
              {statsProps.habitChallengeNumber}
            </p>
            <p className="font-inter text-sm font-normal leading-3 text-sky-11">Daily challenges</p>
          </div>
          <div className="border-solide flex w-full flex-col gap-4 rounded-[26px] border border-red-5 bg-red-1 p-8 text-center">
            <Image className="mx-auto mb-2 h-8 w-8" src={globe} alt="" />
            <p className="font-nexa text-[26px] font-bold leading-3 text-red-11">
              {statsProps.goalChallengeNumber}
            </p>
            <p className="font-inter text-sm font-normal leading-3 text-red-11">Goal challenges</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="border-solide flex w-full flex-col gap-4 rounded-[26px] border border-orange-5 bg-orange-1 px-5 py-8 text-center">
            <Image className="mx-auto mb-2 h-8 w-8" src={fire} alt="" />
            <p className="font-nexa text-[26px] font-bold leading-3 text-orange-11">21 days</p>
            <p className="font-inter text-sm font-normal leading-3 text-orange-11">
              Longest streak
            </p>
          </div>
          <div className="border-solide flex w-full flex-col gap-4 rounded-[26px] border border-purple-5 bg-purple-1 px-5 py-8 text-center">
            <Image className="mx-auto mb-2 h-8 w-8" src={calendarPurple} alt="" />
            <p className="font-nexa text-[26px] font-bold leading-3 text-purple-11">
              {statsProps.updateCount}
            </p>
            <p className="font-inter text-sm font-normal leading-3 text-purple-11">Updates</p>
          </div>
          <div className="border-solide flex w-full flex-col gap-4 rounded-[26px] border border-jade-5 bg-jade-1 px-5 py-8 text-center">
            <Image className="mx-auto mb-2 h-8 w-8" src={flag} alt="" />
            <p className="font-nexa text-[26px] font-bold leading-3 text-jade-11">
              {statsProps.milestoneCount}
            </p>
            <p className="font-inter text-sm font-normal leading-3 text-jade-11">Milestones</p>
          </div>
        </div>
      </div>
    </ProfileCard>
  );
}
