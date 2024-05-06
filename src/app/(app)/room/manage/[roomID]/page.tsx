import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import Badge from '@/app/(app)/components/Badge';
import KickUserFromRoom from '@/app/(app)/components/ManageRoom/KickUserFromRoom';
import LeaveRoomModal from '@/app/(app)/components/ManageRoom/LeaveRoomModal';
import SetRoomUserRole from '@/app/(app)/components/ManageRoom/SetRoomUserRole';
import chevronLeft from '@/app/(app)/images/chevronLeft.svg';
import { getRoom, isRoomAdmin, isUserInRoom } from '@/server/queries';

export default async function ManageUserRoomPage({ params }: { params: { roomID: string } }) {
  const { userId: currentUserID } = auth().protect();

  const roomID = Number(params.roomID);

  if (!(await isUserInRoom(currentUserID, roomID)))
    return (
      <div>
        <p className="text-title1 text-sand-12">This room doesn&apos;t exist</p>
      </div>
    );

  const isAdmin = await isRoomAdmin(currentUserID, roomID);
  const room = await getRoom(roomID);

  if (!room || !room.challenge) {
    notFound();
  }

  const currentUser = room.userRooms.filter((userRoom) => {
    return userRoom.user.id === currentUserID;
  });

  const otherUsers = room.userRooms.filter((userRoom) => {
    return userRoom.user.id !== currentUserID;
  });

  return (
    <div className="relative">
      <Link href={`/room/${roomID}`} className="mb-6 flex items-center gap-1">
        <Image src={chevronLeft} alt="" />
        <p className="text-body-l-medium text-sand-12">Back to challenge</p>
      </Link>

      <h1 className="text-title1 mb-4 text-sand-12">User management</h1>

      {currentUser[0] && (
        <div className="mb-6">
          <p className="text-body-m-bold mb-2 text-sand-9">You</p>
          <div className="flex max-w-[600px] flex-wrap items-center justify-between gap-2 rounded-lg border border-solid border-sand-4 bg-sand-1 p-4">
            <div className="flex items-center gap-4">
              <Image
                alt=""
                src={currentUser[0].user.imageUrl}
                width={64}
                height={64}
                className="size-12 rounded-full border-2 border-solid border-sand-12"
              />
              <div className="flex flex-col gap-1">
                <p className="text-body-l-medium text-sand-12">{currentUser[0].user.fullName}</p>
                <Badge
                  key={currentUser[0].isAdmin ? 'admin' : 'participant'}
                  hideIcon={true}
                  type={currentUser[0].isAdmin ? 'admin' : 'participant'}
                  style="big"
                />
              </div>
            </div>
            <LeaveRoomModal roomID={roomID} />
          </div>
        </div>
      )}

      {otherUsers.length !== 0 && (
        <div>
          <p className="text-body-m-bold mb-2 text-sand-9">Other Participants</p>
          {otherUsers.map((user) => {
            return (
              <div key={user.id} className="mb-6">
                <div className="flex max-w-[600px] flex-wrap items-center justify-between gap-2 rounded-lg border border-solid border-sand-4 bg-sand-1 p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      alt=""
                      src={user.user.imageUrl}
                      width={64}
                      height={64}
                      className="size-12 rounded-full border-2 border-solid border-sand-12"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-body-l-medium text-sand-12">{user.user.fullName}</p>
                      <Badge
                        key={user.isAdmin ? 'admin' : 'participant'}
                        hideIcon={true}
                        type={user.isAdmin ? 'admin' : 'participant'}
                        style="big"
                      />
                    </div>
                  </div>
                  {currentUserID !== user.user.id && isAdmin && (
                    <div className="flex flex-col gap-4">
                      <SetRoomUserRole
                        roomID={roomID}
                        userID={user.user.id}
                        isAdmin={user.isAdmin}
                      />
                      <KickUserFromRoom roomID={roomID} userID={user.user.id} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
