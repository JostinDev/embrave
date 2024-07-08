import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import Badge from '@/app/(app)/components/Badge';
import NoSSR from '@/app/(app)/components/NoSSR';
import chevronLeft from '@/app/(app)/images/chevronLeft.svg';
import stairs from '@/app/(app)/images/stairsCover.jpg';
import ManagePopover from '@/app/(app)/room/[roomID]/manage/ManagePopover';
import type { Milestone } from '@/server/db/schema';
import { getRoom, getRoomStreak, isRoomAdmin, isUserInRoom } from '@/server/queries';
import AddMilestoneForm from './AddMilestoneForm';
import ChallengeCompleteCard from './ChallengeCompleteCard';
import DescriptionCard from './DescriptionCard';
import MilestoneRow from './MilestoneRow';
import SharePopover from './SharePopover';
import StreakTrackerCard from './StreakTrackerCard';

export default async function RoomPage({ params }: { params: { roomID: string } }) {
  const { userId: currentUserID } = auth().protect();

  const roomID = Number(params.roomID);

  if (!(await isUserInRoom(currentUserID, roomID)))
    return (
      <div>
        <p className="font-nexa text-26 font-bold leading-[115%] text-sand-12">
          This room doesn&apos;t exist
        </p>
      </div>
    );

  const isAdmin = await isRoomAdmin(currentUserID, roomID);
  const room = await getRoom(roomID);
  if (!room || !room.challenge) {
    notFound();
  }

  const userRooms = room.userRooms;

  const streak = await getRoomStreak(roomID);

  const connectedUserMilestones: Milestone[] = room.milestones.filter((milestone) => {
    return milestone && milestone.user.id === currentUserID;
  });

  return (
    // TODO show image to be uploaded
    // TODO prevent more than 4 images
    <div className="relative min-h-screen">
      <div className="mb-6 flex justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image src={chevronLeft} alt="" />
          <p className="font-inter text-base font-medium leading-5 text-sand-12">Back</p>
        </Link>
        <div className="flex items-center gap-6">
          {!room.isChallengeCompleted && (
            <ManagePopover
              userRooms={userRooms}
              roomID={roomID}
              isAdmin={isAdmin}
              currentUserID={currentUserID}
            />
          )}
          {isAdmin && !room.isChallengeCompleted && (
            <SharePopover isLinkActive={room.isLinkActive} link={room.link} roomID={room.id} />
          )}
          <div className="flex">
            {userRooms.map(({ user }, i) => {
              return (
                <Image
                  key={user.id}
                  alt={user.fullName ? `Profile picture of ${user.fullName}` : 'Profile picture'}
                  title={user.fullName ?? undefined}
                  width={48}
                  height={48}
                  className="size-12 rounded-full border-2 border-sand-12"
                  style={i !== 0 ? { marginLeft: -24 } : { marginLeft: 0 }}
                  src={user.imageUrl}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative mb-8">
        <Image
          className="h-[450px] w-full rounded-[26px] sm:h-[400px]"
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          src={stairs}
          alt=""
        />
        <div
          className={
            'absolute bottom-4 left-4 right-4 rounded-2xl border border-sand-5 bg-white bg-opacity-90 p-8 backdrop-blur'
          }
        >
          <p slot="title" className="mb-4 font-nexa text-32 font-bold leading-none text-sand-12">
            {room.challenge.title}
          </p>
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="mb-2 font-inter text-sm font-bold leading-4 text-sand-12">
                Date started:
              </p>
              <p className="font-inter text-base leading-18 text-sand-12" />
              <Badge style="big" text={room.created.toLocaleDateString()} type="date" />
            </div>
            <div>
              <p className="mb-2 font-inter text-sm font-bold leading-4 text-sand-12">Type:</p>
              <Badge style="big" type="dailyChallenge" />
            </div>
            {!room.isChallengeCompleted && (
              <div>
                <p className="mb-2 font-inter text-sm font-bold leading-4 text-sand-12">
                  Current streak:
                </p>
                <Badge style="big" streak={streak} type="streak" />
              </div>
            )}
          </div>
        </div>
      </div>

      <NoSSR
        fallback={
          <div className="w-100 mx-auto mb-6 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8">
            <p className="font-nexa text-26 font-bold leading-[115%] text-sand-12">Loading...</p>
          </div>
        }
      >
        <DescriptionCard title="Challenge description" description={room.challenge.description} />
      </NoSSR>

      {!room.isChallengeCompleted && (
        <NoSSR
          fallback={
            <div className="w-100 mx-auto mb-6 max-w-[700px] rounded-[26px] border border-orange-4 bg-orange-2 py-8">
              <p className="pl-8 font-nexa text-26 font-bold leading-[115%] text-orange-10">
                Loading...
              </p>
            </div>
          }
        >
          <StreakTrackerCard roomID={roomID} milestones={connectedUserMilestones} />
        </NoSSR>
      )}

      <NoSSR
        fallback={
          <div className="w-100 relative mx-auto mb-6 flex max-w-[700px] items-center justify-between overflow-hidden rounded-[26px] border border-green-4 bg-green-2 p-8">
            <p className="font-nexa text-26 font-bold leading-[115%] text-green-11">Loading...</p>
          </div>
        }
      >
        <ChallengeCompleteCard roomID={roomID} isChallengeCompleted={room.isChallengeCompleted} />
      </NoSSR>
      <div className="w-100 mx-auto mb-4 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8">
        <p className="mb-2 font-nexa text-26 font-bold leading-[115%] text-sand-12">
          Your activity
        </p>
        <div className="relative">
          {!room.isChallengeCompleted && (
            <div className="relative flex gap-4 pb-10 before:absolute before:bottom-0 before:left-6 before:h-full before:border-l-2 before:border-dashed before:border-sand-5 before:[border-image:url('/images/customBorder.svg')_30_round]">
              <div className="absolute z-0 h-12 w-12 rounded-full border border-sand-5 bg-sand-3" />
              <AddMilestoneForm key={room.milestones.length} roomID={roomID} />
            </div>
          )}

          <div>
            {room.milestones.map((milestone, i, row) => {
              return (
                <MilestoneRow
                  key={milestone.id}
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
    </div>
  );
}
