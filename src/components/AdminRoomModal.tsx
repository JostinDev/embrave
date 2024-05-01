'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import options from '@/app/images/dotsCircleHorizontal.svg';
import logoutRed from '@/app/images/userGroup.svg';
import Badge from '@/components/Badge';

type AdminRoomModalProps = {
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

export default function AdminRoomModal(props: AdminRoomModalProps) {
  return (
    <DialogTrigger>
      <Button className="flex items-center gap-2">
        <Image className="h-6 w-6" src={logoutRed} alt="" />
        <p className="text-body-l-medium text-sand-12">Manage participants</p>
      </Button>
      <Modal isDismissable>
        <Dialog className="flex flex-col">
          {({ close }) => (
            <form>
              <Heading className="text-title1 mb-4 text-sand-12" slot="title">
                User management
              </Heading>

              {props.users.map((user) => {
                return (
                  <div key={user.id} className="mb-6">
                    <div className="flex items-center gap-2">
                      <Image
                        alt=""
                        src={user.user.imageUrl}
                        width={64}
                        height={64}
                        className="size-12 rounded-full border-2 border-solid border-sand-12"
                      />
                      <p className="text-body-l-medium text-sand-12">{user.user.fullName}</p>
                      <Badge
                        hideIcon={true}
                        type={user.isAdmin ? 'admin' : 'participant'}
                        style="big"
                      />
                      <Image className="ml-auto" src={options} alt="" />
                    </div>

                    <p className="text-green-600">{user.isAdmin ? 'Admin' : 'Not admin'}</p>
                    <p
                      // onClick={() => promoteToAdmin(userRoom.user.id)}
                      className="cursor-pointer text-green-600"
                    >
                      {user.user.id !== props.currentUserID && !user.isAdmin && 'Promote to admin'}
                    </p>
                    <p
                      // onClick={() => kickFromRoom(userRoom.user.id)}
                      className="cursor-pointer text-green-600"
                    >
                      {user.userID !== props.currentUserID && !user.isAdmin && 'Kick from the room'}
                    </p>
                    <p
                      // onClick={() => kickFromRoom(userRoom.userID)}
                      className="cursor-pointer text-green-600"
                    >
                      Kick from the room
                    </p>
                  </div>
                );
              })}

              <div className="mt-6 flex justify-between gap-4">
                <Button
                  onPress={close}
                  className="text-body-l-book h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 text-sand-12"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
