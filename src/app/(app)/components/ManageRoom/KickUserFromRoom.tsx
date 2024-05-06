'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'react-aria-components';

import logoutRed from '@/app/(app)/images/logoutRed.svg';
import { kickFromRoom } from '@/server/mutations';

type KickUserFromRoomProps = {
  roomID: number;
  userID: string;
};

export default function KickUserFromRoom(props: KickUserFromRoomProps) {
  return (
    <Button
      onPress={() => kickFromRoom(props.roomID, props.userID)}
      className="flex items-center gap-2"
    >
      <Image className="h-6 w-6" src={logoutRed} alt={''} />
      <p className={'text-body-l-medium text-red-11'}>Remove</p>
    </Button>
  );
}
