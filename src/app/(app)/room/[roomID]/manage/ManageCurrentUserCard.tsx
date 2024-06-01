'use client';

import React from 'react';
import Image from 'next/image';

import Badge from '@/app/(app)/components/Badge';
import LeaveRoomModal from '@/app/(app)/room/[roomID]/manage/LeaveRoomModal';

type ManageCurrentUserCardProps = {
  imageUrl: string;
  fullName: string | null;
  isAdmin: boolean | null;
  roomID: number;
};

export default function ManageCurrentUserCard(props: ManageCurrentUserCardProps) {
  return (
    <div className="mb-6">
      <p className="mb-2 font-inter text-sm font-bold leading-4 text-sand-9">You</p>
      <div className="flex max-w-[600px] flex-wrap items-center justify-between gap-2 rounded-lg border border-solid border-sand-4 bg-sand-1 p-4">
        <div className="flex items-center gap-4">
          <Image
            alt=""
            src={props.imageUrl}
            width={64}
            height={64}
            className="size-12 rounded-full border-2 border-solid border-sand-12"
          />
          <div className="flex flex-col gap-1">
            <p className="font-inter text-base font-medium leading-5 text-sand-12">
              {props.fullName}
            </p>
            <Badge
              key={props.isAdmin ? 'admin' : 'participant'}
              hideIcon={true}
              type={props.isAdmin ? 'admin' : 'participant'}
              style="big"
            />
          </div>
        </div>
        <LeaveRoomModal roomID={props.roomID} />
      </div>
    </div>
  );
}
