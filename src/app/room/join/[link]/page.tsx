import React from 'react';
import { auth } from '@clerk/nextjs/server';

import JoinRoomModal from '@/components/JoinRoomModal/JoinRoomModal';
import { getRoomByLink } from '@/server/queries';

export default async function JoinRoom({ params }: { params: { link: string } }) {
  auth().protect();
  const challengeName = await getRoomByLink(params.link);
  return (
    <div>
      {challengeName ? (
        <JoinRoomModal challengeName={challengeName} link={params.link} />
      ) : (
        <p className="text-title1 text-sand-12">This room does not exist</p>
      )}
    </div>
  );
}
