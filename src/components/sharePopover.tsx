'use client';

import React from 'react';
import Image from 'next/image';
import {
  Button,
  Dialog,
  DialogTrigger,
  Input,
  Label,
  OverlayArrow,
  Popover,
  Switch,
  TextField,
} from 'react-aria-components';

import copy from '@/app/images/clipboard-copy.svg';
import reload from '@/app/images/reload.svg';
import { generateNewRoomLink } from '@/server/mutations';

type SharePopoverProps = {
  link: string;
  roomID: number;
};
export default function SharePopover(props: SharePopoverProps) {
  //TODO refresh component when new link is generated
  function copyToClipBoard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        /* clipboard successfully set */
      },
      () => {
        /* clipboard write failed */
      },
    );
  }

  return (
    <DialogTrigger>
      <Button className="text-body-l-book h-fit rounded-lg bg-sand-12 p-3 text-sand-3">
        Share
      </Button>
      <Popover>
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
        <Dialog>
          <div className="fley flex-col">
            <TextField
              className={'mb-4'}
              isReadOnly
              key={props.link}
              defaultValue={`https://embrave.app/room/join/${props.link}`}
            >
              <Label className={'text-body-l-medium mb-2 block text-sand-12'}>Room link</Label>
              <div className={'flex'}>
                <Input
                  className={
                    'text-body-l-book rounded-l-lg border-b border-l border-t border-sand-5 px-2 text-sand-12 '
                  }
                />
                <Button
                  key={props.link}
                  onPress={() => {
                    copyToClipBoard(`https://embrave.app/room/join/${props.link}`);
                  }}
                  className="text-body-l-book h-fit rounded-r-lg bg-sand-12 px-2 py-3 text-sand-3"
                >
                  <Image src={copy} alt={''} />
                </Button>
              </div>
            </TextField>
            <Switch>
              <p className={'text-body-l-medium text-sand-12'}>Activate share link</p>
              <div className="indicator" />
            </Switch>
            <form className={'mt-4'} action={generateNewRoomLink.bind(null, props.roomID)}>
              <button className={'text-body-l-medium mt-2 flex gap-2 text-sand-12'}>
                <p>Generate new link</p>
                <Image className={'h-5 w-5'} src={reload} alt={''} />
              </button>
            </form>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
