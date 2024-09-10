import Image from 'next/image';

import plus from '@/app/(app)/images/plusCircle.svg';
import star from '@/app/(app)/images/starPurple.svg';
import ProfileCard from '@/app/(app)/profile/ProfileCard';

type PointsProps = {
  points: number;
};

export default async function Points(props: PointsProps) {
  return (
    <ProfileCard title="Points">
      <div className="flex flex-col gap-4">
        <div className="border-solide flex w-full flex-col gap-4 rounded-[26px] border border-plum-5 bg-plum-1 p-5 text-center">
          <Image className="mx-auto mb-4 h-8 w-8" src={star} alt="" />
          <p className="font-nexa text-[26px] font-bold leading-3 text-plum-11">{props.points}</p>
          <p className="font-inter text-sm font-normal leading-3 text-plum-11">Points collected</p>
        </div>

        <div className="rounded-[26px] border border-solid border-sand-5 bg-sand-1 p-6">
          <p className="mb-4 font-nexa text-lg font-bold leading-8 text-sand-12">
            How to get points
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <Image className="h-6 w-6" src={plus} alt="" />
              <div>
                <p className="font-inter text-sm font-semibold text-sand-12">10 points</p>
                <p className="font-inter text-sm font-light text-sand-9">
                  When you start or join a new challenge
                </p>
                <p></p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image className="h-6 w-6" src={plus} alt="" />
              <div>
                <p className="font-inter text-sm font-semibold text-sand-12">20 points</p>
                <p className="font-inter text-sm font-light text-sand-9">
                  When you complete a challenge
                </p>
                <p></p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image className="h-6 w-6" src={plus} alt="" />
              <div>
                <p className="font-inter text-sm font-semibold text-sand-12">1 point</p>
                <p className="font-inter text-sm font-light text-sand-9">When you post an update</p>
                <p></p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Image className="h-6 w-6" src={plus} alt="" />
              <div>
                <p className="font-inter text-sm font-semibold text-sand-12">1 point</p>
                <p className="font-inter text-sm font-light text-sand-9">
                  When you post a milestone
                </p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileCard>
  );
}
