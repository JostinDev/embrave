import React from 'react';
import { currentUser } from '@clerk/nextjs/server';

import { getRoomByLink } from '@/server/queries';
import JoinRoomModal from './JoinRoomModal';

export default async function JoinRoom({ params }: { params: { link: string } }) {
  const user = await currentUser();

  if (!user)
    return (
      <div className="font-nexa text-26 font-bold leading-[115%] text-sand-12">
        The user is not authenticated
      </div>
    );

  let currentCredits = 0;
  if (user.publicMetadata.credits && typeof user.publicMetadata.credits === 'number') {
    currentCredits = user.publicMetadata.credits;
  }

  let isPremium = false;
  if (user.publicMetadata.isPremium && typeof user.publicMetadata.isPremium === 'boolean') {
    isPremium = user.publicMetadata.isPremium;
  }

  const challengeName = await getRoomByLink(params.link);
  return (
    <div>
      {challengeName ? (
        <JoinRoomModal
          credits={currentCredits}
          isPremium={isPremium}
          challengeName={challengeName}
          link={params.link}
        />
      ) : (
        <p className="font-nexa text-26 font-bold leading-[115%] text-sand-12">
          This room does not exist
        </p>
      )}
    </div>
  );
}
