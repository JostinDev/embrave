'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import logoutRed from '@/app/images/userGroup.svg';
import Badge from '@/components/Badge';
import RoomAdminSettingPopover from '@/components/RoomAdminSettingPopover';

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
                        key={user.isAdmin ? 'admin' : 'participant'}
                        hideIcon={true}
                        type={user.isAdmin ? 'admin' : 'participant'}
                        style="big"
                      />
                      {props.currentUserID !== user.user.id && (
                        <div className="ml-auto">
                          <RoomAdminSettingPopover
                            userAdmin={user.isAdmin}
                            roomID={props.roomID}
                            userID={user.user.id}
                            currentUserID={props.currentUserID}
                          />
                        </div>
                      )}
                    </div>
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
