'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, OverlayArrow, Popover } from 'react-aria-components';

import options from '@/app/images/dotsCircleHorizontal.svg';
import logoutRed from '@/app/images/logoutRed.svg';
import user from '@/app/images/userGroup.svg';

type RoomAdminSettingPopoverProps = {
  roomID: number;
  currentUserID: string;
  userID: string;
};
export default function RoomAdminSettingPopover(props: RoomAdminSettingPopoverProps) {
  return (
    <DialogTrigger>
      <Button>
        <Image src={options} alt={''} />
      </Button>
      <Popover className="react-aria-Popover z-[100002!important]">
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
        <Dialog>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image className="h-6 w-6" src={user} alt="" />
              <p className={'text-body-l-medium text-sand-12'}>Make Admin</p>
            </div>
            <div className="flex items-center gap-2">
              <Image className="h-6 w-6" src={logoutRed} alt={''} />
              <p className={'text-body-l-medium text-red-11'}>Remove from Challenge</p>
            </div>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
