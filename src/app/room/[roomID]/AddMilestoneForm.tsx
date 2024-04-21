'use client';

import React from 'react';
import { Button, FieldError, Form, Input, Label, TextField } from 'react-aria-components';
import { useFormState } from 'react-dom';

import { createMilestone } from '@/server/mutations';

export default function AddMilestoneForm({ roomID }: { roomID: number }) {
  const [state, formAction] = useFormState(createMilestone, { errors: {} });

  return (
    <Form action={formAction} validationErrors={state?.errors}>
      <h2 className="mt-10 text-2xl">Milestone</h2>
      <input type="hidden" name="roomID" value={roomID} />
      {/* TODO only allow 4 pictures to be uploaded */}
      <input
        id="image-file"
        type="file"
        accept=".png, .jpg, .jpeg"
        multiple
        // onChange={(e) => manageSelectedPictures(e.target.files)}
      />
      <img className="w-40" id="pic" src=""></img>

      <div className="flex w-fit flex-col">
        <TextField className="flex flex-col gap-1" name="title">
          <Label>Title</Label>
          <Input className="border border-b-gray-400" />
        </TextField>

        <TextField className="flex flex-col gap-1" name="description" isRequired>
          <Label>Description</Label>
          <Input className="border border-b-gray-400" />
          <FieldError />
        </TextField>
      </div>

      <Button type="submit" className="text-xl">
        SEND
      </Button>
    </Form>
  );
}
