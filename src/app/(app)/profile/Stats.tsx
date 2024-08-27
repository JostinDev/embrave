import Image from 'next/image';

import calendarBlue from '@/app/(app)/images/calendarBlue.svg';
import calendarPurple from '@/app/(app)/images/calendarPurple.svg';
import flag from '@/app/(app)/images/flagGreen.svg';
import globe from '@/app/(app)/images/globeRed.svg';
import ProfileCard from '@/app/(app)/profile/ProfileCard';

export default async function Stats() {
  return (
    <ProfileCard title="Stats">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="border-solide flex w-full flex-col gap-4 rounded-[26px] border border-sky-5 bg-sky-1 p-8 text-center">
            <Image className="mx-auto h-8 w-8" src={calendarBlue} alt="" />
            <p className="font-nexa text-[26px] font-bold leading-6 text-sky-11">32</p>
            <p className="font-inter text-sm font-normal leading-4 text-sky-11">Daily challenges</p>
          </div>
          <div className="border-solide flex w-full flex-col gap-4 rounded-[26px] border border-red-5 bg-red-1 p-8 text-center">
            <Image className="mx-auto h-8 w-8" src={globe} alt="" />
            <p className="font-nexa text-[26px] font-bold leading-6 text-red-11">42</p>
            <p className="font-inter text-sm font-normal leading-4 text-red-11">Goal challenges</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="border-solide flex w-full flex-col gap-4 rounded-[26px] border border-purple-5 bg-purple-1 p-8 text-center">
            <Image className="mx-auto h-8 w-8" src={calendarPurple} alt="" />
            <p className="font-nexa text-[26px] font-bold leading-6 text-purple-11">23123</p>
            <p className="font-inter text-sm font-normal leading-4 text-purple-11">Updates</p>
          </div>
          <div className="border-solide flex w-full flex-col gap-4 rounded-[26px] border border-jade-5 bg-jade-1 p-8 text-center">
            <Image className="mx-auto h-8 w-8" src={flag} alt="" />
            <p className="font-nexa text-[26px] font-bold leading-6 text-jade-11">21</p>
            <p className="font-inter text-sm font-normal leading-4 text-jade-11">Milestones</p>
          </div>
        </div>
      </div>
    </ProfileCard>
  );
}
