import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

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

  return (
    <div>
      <UserButton />
      <p className="font-inter text-base font-medium leading-5 text-sand-12">
        You have {currentPoints} points
      </p>
      <p className="font-inter text-base font-medium leading-5 text-sand-12">
        You have {currentCredits} credits left
      </p>
    </div>
  );
}
