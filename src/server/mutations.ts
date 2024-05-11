'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import RandomStringGenerator from '@/app/utils/randomStringGenerator';
import { db } from '@/server/db';
import { milestone, milestoneMedia, room, userRoom } from '@/server/db/schema';
import { isChallengeComplete, isLinkActive, isRoomAdmin, isUserInRoom } from './queries';

export async function createRoom(challengeID: number) {
  const { userId } = auth().protect();

  const date = new Date();

  const randomLink = RandomStringGenerator(32);

  const newRoom = await db
    .insert(room)
    .values({
      challengeID: challengeID,
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

export async function joinRoom(link: string) {
  const { userId } = auth().protect();

  const result: { roomID: number }[] = await db
    .select({ roomID: room.id })
    .from(room)
    .where(eq(room.link, link));
  const date = new Date();

  if (!result[0]) {
    return { error: "This room doesn't exist" };
  }

  if (await isChallengeComplete(result[0].roomID)) {
    return { error: 'This challenge is already done' };
  }

  if (!(await isLinkActive(result[0].roomID))) {
    return { error: "The link isn't active" };
  }

  if (await isUserInRoom(userId, result[0].roomID)) {
    redirect(`/room/${result[0].roomID}`);
  }

  await db.insert(userRoom).values({
    roomID: result[0].roomID,
    userID: userId,
    joined: date,
    isAdmin: false,
  });
  redirect(`/room/${result[0].roomID}`);
}

export async function leaveRoom(roomID: number) {
  const { userId } = auth().protect();

  if (!(await isUserInRoom(userId, roomID))) {
    return { error: "You're not in the room" };
  }

  if (await isChallengeComplete(roomID)) {
    return { error: 'The challenge is already completed' };
  }

  // Delete userRoom relation
  const { rowCount: deletedUserRoom } = await db
    .delete(userRoom)
    .where(and(eq(userRoom.roomID, roomID), eq(userRoom.userID, userId)));

  if (deletedUserRoom === 0) {
    return { error: 'Room not found' };
  }

  // Delete user milestone from the room
  await db.delete(milestone).where(and(eq(milestone.roomID, roomID), eq(milestone.userID, userId)));

  // Get number of users still in the room
  const result = await db.select().from(userRoom).where(eq(userRoom.roomID, roomID));

  // Delete room if no users are in it
  if (result.length === 0) {
    await db.delete(room).where(and(eq(room.id, roomID)));
  }

  redirect('/');
}

export async function kickFromRoom(roomID: number, userIDToKick: string) {
  const { userId } = auth().protect();

  if (!(await isUserInRoom(userId, roomID))) {
    return { error: "You're not in the room" };
  }

  if (await isChallengeComplete(roomID)) {
    return { error: 'The challenge is already completed' };
  }

  if (!(await isRoomAdmin(userId, roomID)))
    return { error: "You're not allowed to set this property" };

  // Delete userRoom relation
  const { rowCount: deletedUserRoom } = await db
    .delete(userRoom)
    .where(and(eq(userRoom.roomID, roomID), eq(userRoom.userID, userIDToKick)));

  if (deletedUserRoom === 0) {
    return { error: 'Room not found' };
  }

  // Delete user milestone from the room
  await db
    .delete(milestone)
    .where(and(eq(milestone.roomID, roomID), eq(milestone.userID, userIDToKick)));

  revalidatePath('/room/');
}

export async function setUserRoomRole(roomID: number, userID: string, isAdmin: boolean) {
  const { userId } = auth().protect();

  if (!(await isRoomAdmin(userId, roomID)))
    return { error: "You're not allowed to set this property" };

  if (!(await isUserInRoom(userId, roomID))) {
    return { error: "You're not in the room" };
  }

  if (await isChallengeComplete(roomID)) {
    return { error: 'The challenge is already completed' };
  }

  await db
    .update(userRoom)
    .set({ isAdmin: isAdmin })
    .where(and(eq(userRoom.roomID, roomID), eq(userRoom.userID, userID)));
  revalidatePath('/room/');
}

export async function setChallengeDone(roomID: number) {
  const { userId } = auth().protect();

  if (!(await isRoomAdmin(userId, roomID)))
    return { error: "You're not allowed to set this property" };

  if (!(await isUserInRoom(userId, roomID))) {
    return { error: "You're not allowed to set this property" };
  }

  await db.update(room).set({ isChallengeCompleted: true }).where(eq(room.id, roomID));

  await db.insert(milestone).values({
    userID: userId,
    roomID: roomID,
    title: '',
    description: '',
    isLastMilestone: true,
    ticked: false,
    timestamp: new Date(),
  });
  revalidatePath('/room/');
}

export async function createMilestone(prevState: any, formData: FormData) {
  const { userId } = auth().protect();

  const MAX_FILE_SIZE = 4500000;
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  const formDataImages = Array.from(formData.getAll('images[]'));

  const images = formDataImages
    .map((entry: FormDataEntryValue) => {
      if (entry instanceof File) {
        return entry;
      }
      return null; // or throw an error
    })
    .filter((file: File | null) => file !== null) as File[];

  const schema = z.object({
    roomID: z.coerce.number(),
    title: z.string().optional(),
    description: z.string(),
  });

  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  if (images.length > 4) {
    return { error: 'Too many files' };
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    if (!image) return;
    if (image.size > MAX_FILE_SIZE) {
      return { error: 'The image is too heavy' };
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
      return { error: 'The image is too heavy' };
    }
  }

  if (await isChallengeComplete(result.data.roomID)) {
    return { error: 'This challenge is already done' };
  }

  if (!(await isUserInRoom(userId, result.data.roomID))) {
    return { error: "You're not allowed to create a milestone" };
  }

  const newMilestone = await db
    .insert(milestone)
    .values({
      userID: userId,
      roomID: result.data.roomID,
      title: result.data.title,
      description: result.data.description,
      ticked: false,
      timestamp: new Date(),
    })
    .returning({ insertedID: milestone.id });

  const milestoneItem = newMilestone[0];

  if (milestoneItem) {
    images.map(async (image) => {
      if (image.size === 0) return;
      const blob = await put(image.name, image, {
        access: 'public',
      });
      await db.insert(milestoneMedia).values({
        milestoneID: milestoneItem.insertedID,
        link: blob.url,
      });
    });
  }
  revalidatePath('/room/');
}

export async function createTickedMilestone(day: Date, roomID: number) {
  const { userId } = auth().protect();

  if (await isChallengeComplete(roomID)) {
    return { error: 'This challenge is already done' };
  }

  if (!(await isUserInRoom(userId, roomID))) {
    return { error: "You're not allowed to create a milestone" };
  }

  const userMilestones = await db
    .select()
    .from(milestone)
    .where(and(eq(milestone.roomID, roomID), eq(milestone.userID, userId)));

  if (userMilestones.length !== 0) {
    for (const element of userMilestones) {
      if (sameDay(day, element.timestamp)) {
        if (element.ticked) {
          await db.delete(milestone).where(and(eq(milestone.id, element.id)));
          revalidatePath('/room/');
          return;
        }
        return {
          info: "Can't set this day as not done. An existing update exists on the same day.",
        };
      }
    }
  }

  await db.insert(milestone).values({
    userID: userId,
    roomID: roomID,
    title: '',
    description: '',
    ticked: true,
    timestamp: day,
  });

  revalidatePath('/room/');
}

function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export async function deleteMilestone(id: number, roomID: number | null) {
  const { userId } = auth().protect();

  if (!roomID) return { error: 'This challenge is already done' };

  if (await isChallengeComplete(roomID)) {
    return { error: 'This challenge is already done' };
  }

  const { rowCount } = await db
    .delete(milestone)
    .where(and(eq(milestone.id, id), eq(milestone.userID, userId)));

  if (rowCount === 0) {
    return { error: 'Milestone not found' };
  }

  revalidatePath('/room/');
}

export async function generateNewRoomLink(roomID: number) {
  const { userId } = auth().protect();

  if (await isChallengeComplete(roomID)) {
    return { error: 'This challenge is already done' };
  }

  if (!(await isRoomAdmin(userId, roomID)))
    return { error: "You're not allowed to generate a new link" };

  const randomLink = RandomStringGenerator(32);

  await db.update(room).set({ link: randomLink }).where(eq(room.id, roomID));
  revalidatePath('/room/');
}

export async function setIsLinkActive(isActive: boolean, roomID: number) {
  const { userId } = auth().protect();

  if (await isChallengeComplete(roomID)) {
    return { error: 'This challenge is already done' };
  }

  if (!(await isRoomAdmin(userId, roomID)))
    return { error: "You're not allowed to set this property" };

  await db.update(room).set({ isLinkActive: isActive }).where(eq(room.id, roomID));
}
