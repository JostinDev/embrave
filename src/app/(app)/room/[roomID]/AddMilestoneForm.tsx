'use client';

import React, { useState } from 'react';
import { Button, FieldError, Form, Input, Label, TextArea, TextField } from 'react-aria-components';
import { useFormState } from 'react-dom';

import { createMilestone } from '@/server/mutations';

export default function AddMilestoneForm({ roomID }: { roomID: number }) {
  const [state, formAction] = useFormState(createMilestone, { errors: {} });
  const [files, setFiles] = useState<File[]>();
  return (
    <Form className="w-full" action={formAction} validationErrors={state?.errors}>
      <input type="hidden" name="roomID" value={roomID} />
      <div className="flex flex-col">
        <TextField className="mb-4 flex flex-col gap-2" name="title" isRequired>
          <Label className="text-body-l-medium text-sand-12">Title</Label>
          <Input className="h-10 rounded-md border border-sand-5 p-2" />
        </TextField>

        <TextField className="mb-4 flex flex-col gap-2" name="description" isRequired>
          <Label className="text-body-l-medium text-sand-12">Description</Label>
          <TextArea className="h-20 rounded-md border border-sand-5 p-2" />
          <FieldError />
        </TextField>

        <div className="mb-4 flex flex-col gap-2">
          <Label className="text-body-l-medium text-sand-12">Images</Label>
          <input
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
        type="submit"
        className="text-body-l-book h-fit rounded-lg bg-sand-12 p-3 text-sand-3"
      >
        Add a Milestone
      </Button>
    </Form>
  );
}
