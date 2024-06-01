'use client';

import React, { useOptimistic } from 'react';
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
  const [isAdmin, setOptimisticIsAdmin] = useOptimistic(props.isAdmin);

  async function setUserRole() {
    setOptimisticIsAdmin(!isAdmin);
    await setUserRoomRole(props.roomID, props.userID, !props.isAdmin);
  }

  return (
    <Button onPress={() => setUserRole()} className="flex items-center gap-2">
      <Image className="h-6 w-6" src={userGroup} alt="" />
      <p className={'font-inter text-base font-medium leading-5 text-sand-12'}>
        {isAdmin ? 'Make participant' : 'Make Admin'}
      </p>
    </Button>
  );
}
