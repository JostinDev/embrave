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

import copy from '@/app/(app)/images/clipboard-copy.svg';
import reload from '@/app/(app)/images/reload.svg';
import { generateNewRoomLink, setIsLinkActive } from '@/server/mutations';

type SharePopoverProps = {
  link: string;
  roomID: number;
  isLinkActive: boolean;
};
export default function SharePopover(props: SharePopoverProps) {
  let [selected, setSelected] = React.useState(props.isLinkActive);

  async function setSwitchState(isSelected: boolean) {
    setSelected(isSelected);
    await setIsLinkActive(isSelected, props.roomID);
  }

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
      <Button className="h-fit rounded-lg bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3">
        Share
      </Button>
      <Popover>
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
        <Dialog>
          <div className="flex flex-col">
            <TextField
              className="mb-4"
              isReadOnly
              key={props.link}
              defaultValue={`https://embrave.app/room/join/${props.link}`}
            >
              <Label className="mb-2 block font-inter text-base font-medium leading-5 text-sand-12">
                Room link
              </Label>
              <div className="flex">
                <Input className="rounded-l-lg border-b border-l border-t border-sand-5 px-2 font-inter text-base leading-18 text-sand-12" />
                <Button
                  key={props.link}
                  onPress={() => {
                    copyToClipBoard(`https://embrave.app/room/join/${props.link}`);
                  }}
                  className="h-fit rounded-r-lg bg-sand-12 px-2 py-3 font-inter text-base leading-18 text-sand-3"
                >
                  <Image src={copy} alt="" />
                </Button>
              </div>
            </TextField>
            <Switch isSelected={selected} onChange={(isSelected) => setSwitchState(isSelected)}>
              <p className="font-inter text-base font-medium leading-5 text-sand-12">
                Activate share link
              </p>
              <div className="indicator" />
            </Switch>
            <form className="mt-4" action={generateNewRoomLink.bind(null, props.roomID)}>
              <button className="mt-2 flex gap-2 font-inter text-base font-medium leading-5 text-sand-12">
                <p>Generate new link</p>
                <Image className="h-5 w-5" src={reload} alt="" />
              </button>
            </form>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
