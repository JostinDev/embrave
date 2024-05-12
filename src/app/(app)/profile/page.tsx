import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export default async function Page() {
  const user = await currentUser();

  if (!user) return <div className="text-title1 text-sand-12">The user is not authenticated</div>;

  let currentPoints = 0;
  if (user.publicMetadata.points && typeof user.publicMetadata.points === 'number') {
    currentPoints = user.publicMetadata.points;
  }

  return (
    <div>
      <UserButton />
      <p className="text-body-l-medium text-sand-12">You have {currentPoints} points</p>
    </div>
  );
}
