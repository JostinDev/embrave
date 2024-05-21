'use client';

import { Button } from 'react-aria-components';

type buttonProps = {
  label: string;
};

export default function MainButton(props: buttonProps) {
  return (
    <Button className="h-fit max-w-fit rounded-lg bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3">
      {props.label}
    </Button>
  );
}
