'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, OverlayArrow, Popover } from 'react-aria-components';

import cog from '@/app/(app)/images/cog.svg';
import ManageCurrentUserCard from '@/app/(app)/room/[roomID]/manage/ManageCurrentUserCard';
import ManageUserInRoomCard from '@/app/(app)/room/[roomID]/manage/ManageUserInRoomCard';

type ManagePopoverProps = {
  roomID: number;
  currentUserID: string;
  isAdmin: boolean;
  userRooms: {
    user: { id: string; fullName: string | null; imageUrl: string };
    id: number;
    roomID: number;
    userID: string;
    joined: Date | null;
    isAdmin: boolean | null;
  }[];
};
export default function ManagePopover(props: ManagePopoverProps) {
  const currentUser = props.userRooms.filter((userRoom) => {
    return userRoom.user.id === props.currentUserID;
  });

  const otherUsers = props.userRooms.filter((userRoom) => {
    return userRoom.user.id !== props.currentUserID;
  });
  return (
    <DialogTrigger>
      <Button>
        <Image src={cog} alt="" />
      </Button>
      <Popover>
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
        <Dialog>
          <h1 className="mb-4 font-nexa text-26 font-bold leading-[115%] text-sand-12">
            User management
          </h1>

          {currentUser[0] && (
            <ManageCurrentUserCard
              imageUrl={currentUser[0].user.imageUrl}
              fullName={currentUser[0].user.fullName}
              isAdmin={currentUser[0].isAdmin}
              roomID={props.roomID}
            />
          )}

          {otherUsers.length !== 0 && (
            <div>
              <p className="mb-2 font-inter text-sm font-bold leading-4 text-sand-9">
                Other Participants
              </p>
              {otherUsers.map((user) => {
                return (
                  <ManageUserInRoomCard
                    key={user.user.id}
                    userID={user.user.id}
                    isAdmin={user.isAdmin}
                    roomID={props.roomID}
                    currentUserID={props.currentUserID}
                    currentUserIsAdmin={props.isAdmin}
                    imageUrl={user.user.imageUrl}
                    fullName={user.user.fullName}
                  />
                );
              })}
            </div>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
