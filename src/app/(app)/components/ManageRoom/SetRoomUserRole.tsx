'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'react-aria-components';

import userGroup from '@/app/(app)/images/userGroup.svg';
import { setUserRoomRole } from '@/server/mutations';

type SetRoomUserRoleProps = {
  roomID: number;
  userID: string;
  isAdmin: boolean | null;
};

export default function SetRoomUserRole(props: SetRoomUserRoleProps) {
  return (
    <Button
      onPress={() => setUserRoomRole(props.roomID, props.userID, !props.isAdmin)}
      className="flex items-center gap-2"
    >
      <Image className="h-6 w-6" src={userGroup} alt="" />
      <p className={'text-body-l-medium text-sand-12'}>
        {props.isAdmin ? 'Make participant' : 'Make Admin'}
      </p>
    </Button>
  );
}
