'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, OverlayArrow, Popover } from 'react-aria-components';

import cog from '@/app/images/cog.svg';
import AdminRoomModal from '@/components/AdminRoomModal';
import LeaveRoomModal from '@/components/LeaveRoomModal';

type RoomSettingPopoverProps = {
  roomID: number;
  users: {
    user: { id: string; fullName: string | null; imageUrl: string };
    id: number;
    roomID: number | null;
    userID: string;
    joined: Date | null;
    isAdmin: boolean | null;
  }[];
  currentUserID: string;
};
export default function RoomSettingPopover(props: RoomSettingPopoverProps) {
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
          <div className="flex flex-col gap-4">
            <AdminRoomModal
              currentUserID={props.currentUserID}
              users={props.users}
              roomID={props.roomID}
            />
            <LeaveRoomModal roomID={props.roomID} />
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}