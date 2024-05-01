import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import chevronLeft from '@/app/images/chevronLeft.svg';
import stairs from '@/app/images/stairs_cover.jpg';
import AddMilestoneForm from '@/app/room/[roomID]/AddMilestoneForm';
import Badge from '@/components/badge';
import ChallengeCompleteCard from '@/components/challengeComplete/ChallengeCompleteCard';
import LeaveRoomModal from '@/components/leaveRoom/LeaveRoomModal';
import MilestoneRow from '@/components/MilestoneRow';
import RoomSettingPopover from '@/components/RoomSettingPopover';
import SharePopover from '@/components/sharePopover';
import StreakTrackerCard from '@/components/streakTrackerCard';
import { getRoom, isRoomAdmin, isUserInRoom } from '@/server/queries';

export default async function RoomPage({ params }: { params: { roomID: string } }) {
  const { userId: currentUserID } = auth().protect();

  const roomID = Number(params.roomID);

  if (!(await isUserInRoom(currentUserID, roomID)))
    return (
      <div>
        <p className={'text-title1 text-sand-12'}>This room doesn&apos;t exist</p>
      </div>
    );

  const isAdmin = await isRoomAdmin(currentUserID, roomID);
  const room = await getRoom(roomID);

  if (!room || !room.challenge) {
    notFound();
  }

  const userRooms = room.userRooms;

  return (
    // TODO Mark a challenge as done
    // TODO show image to be uploaded
    // TODO prevent more than 4 images
    <div className="relative min-h-screen">
      <div className={'mb-6 flex justify-between'}>
        <Link href={'/'} className="flex items-center gap-1">
          <Image src={chevronLeft} alt={''} />
          <p className={'text-body-l-mediumtext-sand-12'}>Back</p>
        </Link>
        <div className="flex items-center gap-6">
          <RoomSettingPopover roomID={roomID} />
          {isAdmin && !room.isChallengeCompleted && (
            <SharePopover isLinkActive={room.isLinkActive} link={room.link} roomID={room.id} />
          )}
          <div className="flex">
            {userRooms.map((userRoom, i) => {
              return (
                <img
                  key={userRoom.id}
                  title={userRoom.user.fullName ?? undefined}
                  alt={userRoom.user.fullName ?? undefined}
                  className={'h-12 w-12 rounded-full border-2 border-sand-12 '}
                  style={i !== 0 ? { marginLeft: -24 } : { marginLeft: 0 }}
                  src={userRoom.user.imageUrl}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className={'relative mb-8'}>
        <Image
          className={'h-[400px] w-full rounded-[26px]'}
          style={{ objectFit: 'cover' }}
          placeholder={'blur'}
          src={stairs}
          alt={''}
        ></Image>
        <div
          className={
            'absolute bottom-4 left-4 right-4 rounded-2xl border border-sand-5 bg-white bg-opacity-90 p-8 backdrop-blur'
          }
        >
          <p slot="title" className={'text-large-title mb-4 text-sand-12'}>
            {room.challenge.title}
          </p>
          <div className={'flex flex-wrap gap-6'}>
            <div>
              <p className="text-body-m-bold mb-2 text-sand-12">Date started:</p>
              <p className={'text-body-l-book text-sand-12'}></p>
              <Badge style={'big'} text={room.created.toLocaleDateString()} type={'date'}></Badge>
            </div>
            <div>
              <p className={'text-body-m-bold mb-2 text-sand-12'}>Type:</p>
              <Badge style={'big'} type={'dailyChallenge'}></Badge>
            </div>
            {!room.isChallengeCompleted && (
              <div>
                <p className={'text-body-m-bold mb-2 text-sand-12'}>Current streak:</p>
                <Badge style={'big'} streak={42} type={'streak'}></Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={
          'w-100 mx-auto mb-6 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8'
        }
      >
        <p className={'text-title1 mb-2 text-sand-12'}>Challenge description</p>
        <p className={'text-body-l-book text-sand-12'}>{room.challenge.description}</p>
      </div>
      {!room.isChallengeCompleted && (
        <StreakTrackerCard roomID={roomID} milestones={room.milestones} />
      )}
      <ChallengeCompleteCard roomID={roomID} isChallengeDone={room.isChallengeCompleted} />
      <div
        className={
          'w-100 mx-auto mb-4 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8'
        }
      >
        <p className={'text-title1 mb-2 text-sand-12'}>Your activity</p>
        <div className="relative">
          {!room.isChallengeCompleted && (
            <div className="relative flex gap-4 pb-10 before:absolute before:bottom-0 before:left-6 before:h-full before:border-l-2 before:border-dashed before:border-sand-5 before:[border-image:url('/images/customBorder.svg')_30_round]">
              <div
                className={
                  'z-0 h-[48px] w-[48px] flex-shrink-0 rounded-full border border-sand-5 bg-sand-3'
                }
              ></div>
              <AddMilestoneForm key={room.milestones.length} roomID={roomID} />
            </div>
          )}

          <div>
            {room.milestones.map((milestone, i, row) => {
              return (
                <MilestoneRow
                  key={i}
                  milestone={milestone}
                  isLastRow={i + 1 === row.length}
                  isFirstRow={i === 0}
                  isChallengeDone={room.isChallengeCompleted}
                  isLastMilestone={milestone.isLastMilestone}
                  currentUserID={currentUserID}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h1 className="mb-10 text-2xl">Users in room : </h1>

        {userRooms.map((userRoom, i) => {
          return (
            <div key={userRoom.id} className="mb-6">
              <img src={userRoom.user.imageUrl} className="size-12" />
              <p>{userRoom.user.fullName}</p>
              <p className="text-green-600">{userRoom.isAdmin ? 'Admin' : 'Not admin'}</p>
              <p
                // onClick={() => promoteToAdmin(userRoom.user.id)}
                className="cursor-pointer text-green-600"
              >
                {userRoom.user.id !== currentUserID && !userRoom.isAdmin && 'Promote to admin'}
              </p>
              <p
                // onClick={() => kickFromRoom(userRoom.user.id)}
                className="cursor-pointer text-green-600"
              >
                {userRoom.userID !== currentUserID && !userRoom.isAdmin && 'Kick from the room'}
              </p>
              <p
                // onClick={() => kickFromRoom(userRoom.userID)}
                className="cursor-pointer text-green-600"
              >
                Kick from the room
              </p>
            </div>
          );
        })}
      </div>

      <div className={'py-4'}>
        <LeaveRoomModal roomID={roomID} />
      </div>
    </div>
  );
}
