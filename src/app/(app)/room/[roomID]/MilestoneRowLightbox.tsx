'use client';

import React from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

import type { MilestoneMedia } from '@/server/db/schema';

type MilestoneRowLightboxProps = {
  medias: MilestoneMedia[];
};

export default function MilestoneRowLightbox(props: MilestoneRowLightboxProps) {
  const [open, setOpen] = React.useState(false);

  const slides = props.medias.map((media) => {
    return { src: media.link };
  });

  return (
    <div className="flex flex-row flex-wrap gap-4 pl-16 sm:flex-nowrap">
      {props.medias.map((media) => {
        return (
          <button key={media.id} type="button" onClick={() => setOpen(true)}>
            <Image
              width={400}
              height={400}
              alt=""
              className="flex h-16 w-24 rounded-2xl object-cover drop-shadow sm:h-24 sm:w-36"
              src={media.link}
            />
          </button>
        );
      })}
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} />
    </div>
  );
}
