import { currentUser } from '@clerk/nextjs/server';

import Credits from '@/app/(app)/profile/Credits';
import Points from '@/app/(app)/profile/Points';
import Settings from '@/app/(app)/profile/Settings';
import Stats from '@/app/(app)/profile/Stats';
import User from '@/app/(app)/profile/User';
import { getActiveRooms, getChallengeNumber } from '@/server/queries';

export default async function Page() {
  const user = await currentUser();

  if (!user)
    return (
      <div className="font-nexa text-26 font-bold leading-[115%] text-sand-12">
        The user is not authenticated
      </div>
    );

  let currentPoints = 0;
  if (user.publicMetadata.points && typeof user.publicMetadata.points === 'number') {
    currentPoints = user.publicMetadata.points;
  }

  let currentCredits = 0;
  if (user.publicMetadata.credits && typeof user.publicMetadata.credits === 'number') {
    currentCredits = user.publicMetadata.credits;
  }

  let isPremium = false;
  if (user.publicMetadata.isPremium && typeof user.publicMetadata.isPremium === 'boolean') {
    isPremium = user.publicMetadata.isPremium;
  }

  let highestStreak = 0;
  if (user.publicMetadata.highestStreak && typeof user.publicMetadata.highestStreak === 'number') {
    highestStreak = user.publicMetadata.highestStreak;
  }

  const { milestoneNumber, updateNumber } = await getChallengeNumber();

  const { goalChallengeNumber, habitChallengeNumber } = await getActiveRooms();

  return (
    <div className="my-5 flex w-full max-w-[1132px] flex-col gap-4 lg:flex-row">
      <div className="flex w-full flex-col gap-6">
        <User profilePicture={user.imageUrl} points={currentPoints} username={user.username} />
        <Stats
          goalChallengeNumber={goalChallengeNumber}
          habitChallengeNumber={habitChallengeNumber}
          milestoneCount={milestoneNumber}
          updateCount={updateNumber}
          highestStreak={highestStreak}
        />
        <Credits isPremium={isPremium} credits={currentCredits} />
      </div>
      <div className="flex w-full flex-col gap-6">
        <Settings />
        <Points points={currentPoints} />
      </div>
    </div>
  );
}
