import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

import Credits from '@/app/(app)/profile/Credits';
import Settings from '@/app/(app)/profile/Settings';
import Stats from '@/app/(app)/profile/Stats';
import User from '@/app/(app)/profile/User';

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

  return (
    <div className="flex w-full max-w-[1132px] gap-4">
      <div className="flex w-full flex-col gap-6">
        <User profilePicture={user.imageUrl} points={currentPoints} username={user.username} />
        <Stats />
        <Credits isPremium={isPremium} credits={currentCredits} />
      </div>
      <div className="flex w-full flex-col gap-6">
        <Settings />
      </div>
    </div>
  );
}
