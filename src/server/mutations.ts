'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/server/db';
import { milestone } from '@/server/db/schema';

export async function createMilestone(prevState: any, formData: FormData) {
  // TODO: protect mutation
  const { userId } = auth().protect();

  const schema = z.object({
    roomID: z.coerce.number(),
    title: z.string().optional(),
    description: z.string(),
  });
  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await db.insert(milestone).values({
    userID: userId,
    roomID: result.data.roomID,
    title: result.data.title,
    description: result.data.description,
    timestamp: new Date(),
  });

  revalidatePath('/');
}

export async function deleteMilestone(id: number) {
  // TODO: protect mutation
  const { rowCount } = await db.delete(milestone).where(eq(milestone.id, id));
  if (rowCount === 0) {
    return { error: 'Milestone not found' };
  }

  revalidatePath('/');
}

export async function generateNewRoomLink(roomID: number) {
  // TODO: protect mutation
  revalidatePath('/');
}
