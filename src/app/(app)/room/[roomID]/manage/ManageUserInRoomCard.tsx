'use client';

import React, { useOptimistic } from 'react';
import Image from 'next/image';
import { Button, Form } from 'react-aria-components';

import Badge from '@/app/(app)/components/Badge';
import userGroup from '@/app/(app)/images/userGroup.svg';
import { setUserRoomRole } from '@/server/mutations';
import KickUserFromRoom from './KickUserFromRoom';

type ManageUserInRoomCardProps = {
  userID: string;
  isAdmin: boolean | null;
  roomID: number;
  currentUserID: string;
  imageUrl: string;
  fullName: string | null;
  currentUserIsAdmin: boolean;
};

export default function ManageUserInRoomCard(props: ManageUserInRoomCardProps) {
  const [isAdmin, setOptimisticIsAdmin] = useOptimistic(props.isAdmin);

  async function setUserRole() {
    setOptimisticIsAdmin(!isAdmin);
    await setUserRoomRole(props.roomID, props.userID, !props.isAdmin);
  }

  return (
    <div key={props.userID} className="mb-6">
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
              key={isAdmin ? 'admin' : 'participant'}
              hideIcon={true}
              type={isAdmin ? 'admin' : 'participant'}
              style="big"
            />
          </div>
        </div>
        {props.currentUserID !== props.userID && props.currentUserIsAdmin && (
          <div className="flex flex-col gap-4">
            <Form action={setUserRole}>
              <Button className="flex items-center gap-2" type="submit">
                <Image className="h-6 w-6" src={userGroup} alt="" />
                <p className={'font-inter text-base font-medium leading-5 text-sand-12'}>
                  {isAdmin ? 'Make participant' : 'Make Admin'}
                </p>
              </Button>
            </Form>{' '}
            <KickUserFromRoom roomID={props.roomID} userID={props.userID} />
          </div>
        )}
      </div>
    </div>
  );
}
