'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, OverlayArrow, Popover } from 'react-aria-components';

import Badge from '@/app/(app)/components/Badge';
import cog from '@/app/(app)/images/cog.svg';
import KickUserFromRoom from './KickUserFromRoom';
import LeaveRoomModal from './LeaveRoomModal';
import SetRoomUserRole from './SetRoomUserRole';

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
            <div className="mb-6">
              <p className="mb-2 font-inter text-sm font-bold leading-4 text-sand-9">You</p>
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
                    <p className="font-inter text-base font-medium leading-5 text-sand-12">
                      {currentUser[0].user.fullName}
                    </p>
                    <Badge
                      key={currentUser[0].isAdmin ? 'admin' : 'participant'}
                      hideIcon={true}
                      type={currentUser[0].isAdmin ? 'admin' : 'participant'}
                      style="big"
                    />
                  </div>
                </div>
                <LeaveRoomModal roomID={props.roomID} />
              </div>
            </div>
          )}

          {otherUsers.length !== 0 && (
            <div>
              <p className="mb-2 font-inter text-sm font-bold leading-4 text-sand-9">
                Other Participants
              </p>
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
                          <p className="font-inter text-base font-medium leading-5 text-sand-12">
                            {user.user.fullName}
                          </p>
                          <Badge
                            key={user.isAdmin ? 'admin' : 'participant'}
                            hideIcon={true}
                            type={user.isAdmin ? 'admin' : 'participant'}
                            style="big"
                          />
                        </div>
                      </div>
                      {props.currentUserID !== user.user.id && props.isAdmin && (
                        <div className="flex flex-col gap-4">
                          <SetRoomUserRole
                            roomID={props.roomID}
                            userID={user.user.id}
                            isAdmin={user.isAdmin}
                          />
                          <KickUserFromRoom roomID={props.roomID} userID={user.user.id} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
