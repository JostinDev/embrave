'use client';

import type { ReactNode } from 'react';
import { useIsClient } from 'usehooks-ts';

type NoSSRProps = {
  children: ReactNode;
  fallback: ReactNode;
};
export function NoSSR(props: NoSSRProps) {
  const isClient = useIsClient();
  return isClient ? props.children : props.fallback;
}
