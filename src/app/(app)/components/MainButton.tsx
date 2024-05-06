'use client';

import { Button } from 'react-aria-components';

type buttonProps = {
  label: string;
};

export default function MainButton(props: buttonProps) {
  return (
    <Button className="text-body-l-book h-fit max-w-fit rounded-lg bg-sand-12 p-3 text-sand-3">
      {props.label}
    </Button>
  );
}
