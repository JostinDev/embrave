'use client';

import React, { useActionState, useState } from 'react';
import Image from 'next/image';
import { Button, FieldError, Form, Input, Label, TextArea, TextField } from 'react-aria-components';
import { twJoin, twMerge } from 'tailwind-merge';

import spinner from '@/app/(app)/images/spinner.svg';
import compressImages from '@/app/utils/compressImages';
import { createMilestone } from '@/server/mutations';

export default function AddMilestoneForm({ roomID }: { roomID: number }) {
  const [state, formAction, isPending] = useActionState(
    (state: any, payload: FormData) => createMilestone(state, payload, files),
    { errors: {} },
  );
  const [files, setFiles] = useState<File[]>([]);
  return (
    <Form className="w-full pl-16" action={formAction} validationErrors={state?.errors}>
      <input type="hidden" name="roomID" value={roomID} />
      <div className="flex flex-col">
        <TextField className="mb-4 flex flex-col gap-2" name="title" isRequired>
          <Label className="font-inter text-base font-medium leading-5 text-sand-12">Title</Label>
          <Input disabled={isPending} className="h-10 rounded-md border border-sand-5 p-2" />
        </TextField>

        <TextField className="mb-4 flex flex-col gap-2" name="description" isRequired>
          <Label className="font-inter text-base font-medium leading-5 text-sand-12">
            Description
          </Label>
          <TextArea disabled={isPending} className="h-20 rounded-md border border-sand-5 p-2" />
          <FieldError />
        </TextField>

        <div className="mb-4 flex flex-col gap-2">
          <Label className="font-inter text-base font-medium leading-5 text-sand-12">
            Images (4 max)
          </Label>
          <input
            disabled={isPending}
            multiple
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={async (e) => {
              if (!e.target.files) return;
              let files = Array.from(e.target.files);
              if (e.target.files.length > 4) {
                files = files.slice(0, 4);
              }
              const compressedFiles = await compressImages(files, 1000, 800, 0.8);
              setFiles(compressedFiles);
            }}
          />
        </div>
      </div>

      <Button
        isDisabled={isPending}
        type="submit"
        className="relative flex h-fit items-center gap-2 rounded-lg bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3 transition-all"
      >
        <p className={twMerge('opacity-100 transition-all duration-200', isPending && 'opacity-0')}>
          Add a Milestone
        </p>
        <Image
          className={twJoin(
            'absolute left-1/2 h-4 w-4 -translate-x-1/2 opacity-0 transition-all duration-200',
            isPending && 'opacity-100',
          )}
          src={spinner}
          alt=""
        />
      </Button>
    </Form>
  );
}
