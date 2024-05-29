'use client';

import React, { useActionState, useState } from 'react';
import Image from 'next/image';
import { Button, FieldError, Form, Input, Label, TextArea, TextField } from 'react-aria-components';

import spinner from '@/app/(app)/images/spinner.svg';
import { createMilestone } from '@/server/mutations';

export default function AddMilestoneForm({ roomID }: { roomID: number }) {
  const [state, formAction, isPending] = useActionState(createMilestone, { errors: {} });
  const [files, setFiles] = useState<File[]>();
  return (
    <Form className="w-full" action={formAction} validationErrors={state?.errors}>
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
          <Label className="font-inter text-base font-medium leading-5 text-sand-12">Images</Label>
          <input
            disabled={isPending}
            multiple
            name="images[]"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => {
              if (!e.target.files) return; // Check if files property exists
              if (e.target.files.length > 4) return; //handle here
              setFiles(Array.from(e.target.files));
            }}
          />
        </div>
      </div>

      <Button
        isDisabled={isPending}
        type="submit"
        className="flex h-fit items-center gap-2 rounded-lg bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3"
      >
        Add a Milestone
        {isPending && <Image className="h-4 w-4" src={spinner} alt="" />}
      </Button>
    </Form>
  );
}
