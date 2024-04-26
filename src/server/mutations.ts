'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { and, count, eq, exists } from 'drizzle-orm';
import { z } from 'zod';

import RandomStringGenerator from '@/app/utils/RandomStringGenerator';
import { db } from '@/server/db';
import { milestone, room, userRoom } from '@/server/db/schema';
import { isRoomAdmin, isUserInRoom } from './queries';

export async function createRoom(challengeID: number) {
  const { userId } = auth().protect();

  const date = new Date();

  const randomLink = RandomStringGenerator(32);
  const randomCode = RandomStringGenerator(6);

  const newRoom = await db
    .insert(room)
    .values({
      challengeID: challengeID,
      code: randomCode,
      link: randomLink,
      created: date,
      codeCreatedTimestamp: date,
    })
    .returning({ insertedID: room.id });

  if (newRoom[0]) {
    await db.insert(userRoom).values({
      roomID: newRoom[0].insertedID,
      userID: userId,
      joined: date,
      isAdmin: true,
    });

    // Navigate to the new post page
    revalidatePath('/');
    redirect(`/room/${newRoom[0].insertedID}`);
  }
}

export async function createMilestone(prevState: any, formData: FormData) {
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

  if (!(await isUserInRoom(userId, result.data.roomID))) {
    return { error: "You're not allowed to create a milestone" };
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
  const { userId } = auth().protect();

  const { rowCount } = await db
    .delete(milestone)
    .where(and(eq(milestone.id, id), eq(milestone.userID, userId)));

  if (rowCount === 0) {
    return { error: 'Milestone not found' };
  }

  revalidatePath('/');
}

export async function generateNewRoomLink(roomID: number) {
  const { userId } = auth().protect();

  if (!(await isRoomAdmin(userId, roomID)))
    return { error: "You're not allowed to generate a new link" };

  const randomLink = RandomStringGenerator(32);

  await db.update(room).set({ link: randomLink }).where(eq(room.id, roomID));
  revalidatePath('/');
}
