'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { del, put } from '@vercel/blob';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { Points } from '@/app/enum/pointsEnum';
import RandomStringGenerator from '@/app/utils/randomStringGenerator';
import stripe from '@/config/stripe';
import { db } from '@/server/db';
import {
  milestone,
  milestoneMedia,
  room,
  stripeCheckoutSessionID,
  userRoom,
} from '@/server/db/schema';
import { isChallengeComplete, isLinkActive, isRoomAdmin, isUserInRoom } from './queries';

const MAX_FILE_SIZE = 4500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export async function createRoom(prevState: any, formData: FormData) {
  const { userId } = auth().protect();

  const schema = z.object({
    challengeID: z.coerce.number(),
  });

  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await removeCredit();
  const date = new Date();

  const randomLink = RandomStringGenerator(32);

  const newRoom = await db
    .insert(room)
    .values({
      challengeID: result.data.challengeID,
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

    await addPoints(Points.CreateRoom);

    // Navigate to the new post page
    revalidatePath('/');
    redirect(`/room/${newRoom[0].insertedID}`);
  }
}

export async function joinRoom(prevState: any, formData: FormData) {
  const { userId } = auth().protect();

  const schema = z.object({
    link: z.string(),
  });

  const form = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!form.success) {
    return { errors: form.error.flatten().fieldErrors };
  }

  const result: { roomID: number }[] = await db
    .select({ roomID: room.id })
    .from(room)
    .where(eq(room.link, form.data.link));
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

  await addPoints(Points.JoinRoom);
  await removeCredit();

  redirect(`/room/${result[0].roomID}`);
}

export async function leaveRoom(prevState: any, formData: FormData) {
  const { userId } = auth().protect();

  const schema = z.object({
    roomID: z.coerce.number(),
  });

  const formResult = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!formResult.success) {
    return { errors: formResult.error.flatten().fieldErrors };
  }

  if (!(await isUserInRoom(userId, formResult.data.roomID))) {
    return { error: "You're not in the room" };
  }

  if (await isChallengeComplete(formResult.data.roomID)) {
    return { error: 'The challenge is already completed' };
  }

  const milestonesToDelete = await db
    .select({ milestoneID: milestone.id })
    .from(milestone)
    .where(and(eq(milestone.roomID, formResult.data.roomID), eq(milestone.userID, userId)));

  if (milestonesToDelete.length !== 0) {
    for (const row of milestonesToDelete) {
      const deletedMediaLink: { deletedLink: string }[] = await db
        .delete(milestoneMedia)
        .where(eq(milestoneMedia.milestoneID, row.milestoneID))
        .returning({ deletedLink: milestoneMedia.link });

      if (deletedMediaLink.length !== 0) {
        for (const row of deletedMediaLink) {
          await del(row.deletedLink);
        }
      }
    }
  }

  // Delete user milestone from the room
  await db
    .delete(milestone)
    .where(and(eq(milestone.roomID, formResult.data.roomID), eq(milestone.userID, userId)));

  // Delete userRoom relation
  const { rowCount: deletedUserRoom } = await db
    .delete(userRoom)
    .where(and(eq(userRoom.roomID, formResult.data.roomID), eq(userRoom.userID, userId)));

  if (deletedUserRoom === 0) {
    return { error: 'Room not found' };
  }

  // Get number of users still in the room
  const result = await db
    .select()
    .from(userRoom)
    .where(eq(userRoom.roomID, formResult.data.roomID));

  // Delete room if no users are in it
  if (result.length === 0) {
    await db.delete(room).where(and(eq(room.id, formResult.data.roomID)));
  }

  redirect('/');
}

export async function kickFromRoom(prevState: any, formData: FormData) {
  const { userId } = auth().protect();

  const schema = z.object({
    roomID: z.coerce.number(),
    userID: z.string(),
  });

  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  if (!(await isUserInRoom(userId, result.data.roomID))) {
    return { error: "You're not in the room" };
  }

  if (await isChallengeComplete(result.data.roomID)) {
    return { error: 'The challenge is already completed' };
  }

  if (!(await isRoomAdmin(userId, result.data.roomID)))
    return { error: "You're not allowed to set this property" };

  // Delete userRoom relation
  const { rowCount: deletedUserRoom } = await db
    .delete(userRoom)
    .where(and(eq(userRoom.roomID, result.data.roomID), eq(userRoom.userID, result.data.userID)));

  if (deletedUserRoom === 0) {
    return { error: 'Room not found' };
  }

  // Delete user milestone from the room
  await db
    .delete(milestone)
    .where(and(eq(milestone.roomID, result.data.roomID), eq(milestone.userID, result.data.userID)));

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

  await addPoints(Points.CompleteChallenge);

  revalidatePath('/room/');
}

export async function createMilestone(prevState: any, formData: FormData) {
  const { userId } = auth().protect();

  const formDataImages = Array.from(formData.getAll('images[]'));

  const images = formDataImages
    .map((entry: FormDataEntryValue) => {
      if (entry instanceof File) {
        return entry;
      }
      return null; // or throw an error
    })
    .filter((file: File | null) => file !== null) as File[];

  let isImageValid = true;
  if (images[0]) {
    isImageValid = images[0].size !== 0;
  }

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

  if (isImageValid) {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (!image) return;
      if (image.size > MAX_FILE_SIZE) {
        return { error: 'The image is too heavy' };
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
        return { error: 'The file type is not accepted' };
      }
      if (image.size === 0) return { error: 'The image is undefined' };
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

  if (milestoneItem && isImageValid) {
    await Promise.all(
      images.map(async (image) => {
        const blob = await put(image.name, image, {
          access: 'public',
        });
        await db.insert(milestoneMedia).values({
          milestoneID: milestoneItem.insertedID,
          link: blob.url,
        });
      }),
    );
  }

  await addPoints(Points.UpdateMilestone);

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

  await addPoints(Points.TickedMilestone);

  revalidatePath('/room/');
}

function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export async function deleteMilestone(prevState: any, formData: FormData) {
  const { userId } = auth().protect();

  const schema = z.object({
    roomID: z.coerce.number(),
    milestoneID: z.coerce.number(),
  });

  const formResult = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!formResult.success) {
    return { errors: formResult.error.flatten().fieldErrors };
  }

  if (await isChallengeComplete(formResult.data.roomID)) {
    return { error: 'This challenge is already done' };
  }

  const deletedMediaLink: { deletedLink: string }[] = await db
    .delete(milestoneMedia)
    .where(eq(milestoneMedia.milestoneID, formResult.data.milestoneID))
    .returning({ deletedLink: milestoneMedia.link });

  if (deletedMediaLink.length !== 0) {
    for (const row of deletedMediaLink) {
      await del(row.deletedLink);
    }
  }

  const { rowCount } = await db
    .delete(milestone)
    .where(and(eq(milestone.id, formResult.data.milestoneID), eq(milestone.userID, userId)));

  if (rowCount === 0) {
    return { error: 'Milestone not found' };
  }

  revalidatePath('/');
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

export async function addPoints(points: number) {
  const user = await currentUser();
  if (!user) return { error: 'User not authenticated' };

  let currentPoints = 0;
  if (user.publicMetadata.points && typeof user.publicMetadata.points === 'number') {
    currentPoints = user.publicMetadata.points;
  }

  const updatedPoints = currentPoints + points;

  await clerkClient.users.updateUserMetadata(user?.id, {
    publicMetadata: {
      points: updatedPoints,
    },
  });
}

export async function removeCredit() {
  const user = await currentUser();
  if (!user) return { error: 'User not authenticated' };

  let isPremium = false;
  if (user.publicMetadata.isPremium && typeof user.publicMetadata.isPremium === 'boolean') {
    isPremium = user.publicMetadata.isPremium;
  }

  let currentCredits = 0;
  if (user.publicMetadata.credits && typeof user.publicMetadata.credits === 'number') {
    currentCredits = user.publicMetadata.credits;
  }

  if (!isPremium) {
    if (currentCredits <= 0) redirect(`/premium`);

    const updatedCredits = currentCredits - 1;

    await clerkClient.users.updateUserMetadata(user?.id, {
      publicMetadata: {
        credits: updatedCredits,
      },
    });
  }
}

export async function setBaseCredits(userID: string) {
  let currentCredits = 3;

  console.log('setBaseCredits', userID);

  await clerkClient.users.updateUserMetadata(userID, {
    publicMetadata: {
      credits: currentCredits,
    },
  });
}

export async function userHasWatchedTutorial(userID: string, hasWatchedTutorial: boolean) {
  await clerkClient.users.updateUserMetadata(userID, {
    publicMetadata: {
      hasWatchedTutorial: hasWatchedTutorial,
    },
  });
}

export async function removeAllUserData(userId: string) {
  const milestonesToDelete = await db
    .select({ milestoneID: milestone.id })
    .from(milestone)
    .where(eq(milestone.userID, userId));

  if (milestonesToDelete.length !== 0) {
    for (const row of milestonesToDelete) {
      const deletedMediaLink: { deletedLink: string }[] = await db
        .delete(milestoneMedia)
        .where(eq(milestoneMedia.milestoneID, row.milestoneID))
        .returning({ deletedLink: milestoneMedia.link });

      if (deletedMediaLink.length !== 0) {
        for (const row of deletedMediaLink) {
          await del(row.deletedLink);
        }
      }
    }
    // Delete user milestone from the room
    await db.delete(milestone).where(eq(milestone.userID, userId));
  }

  const deletedRoomID: { deletedId: number }[] = await db
    .delete(userRoom)
    .where(eq(userRoom.userID, userId))
    .returning({ deletedId: userRoom.roomID });

  if (deletedRoomID.length === 0) {
    return { error: 'Room not found' };
  }

  for (const row of deletedRoomID) {
    const result = await db.select().from(userRoom).where(eq(userRoom.roomID, row.deletedId));

    // Delete room if no users are in it
    if (result.length === 0) {
      await db.delete(room).where(eq(room.id, row.deletedId));
    }
  }
}

export async function setUserHasWatchedTutorial(prevState: any, formData: FormData) {
  const { userId } = auth().protect();

  const schema = z.object({
    termsOfService: z.string().includes('on'),
  });

  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      hasWatchedTutorial: true,
    },
  });

  revalidatePath('/');
}

export async function getCheckoutSessionClientSecretLifetime() {
  const checkoutSession = await createCheckoutSession(true);

  if (!checkoutSession.client_secret) {
    throw new Error('Stripe checkout session’s client secret is missing');
  }

  return checkoutSession.client_secret;
}

export async function getCheckoutSessionClientSecretCredits() {
  const checkoutSession = await createCheckoutSession(false);

  if (!checkoutSession.client_secret) {
    throw new Error('Stripe checkout session’s client secret is missing');
  }

  return checkoutSession.client_secret;
}

async function createCheckoutSession(isLifetime: boolean) {
  const user = await currentUser();
  if (!user) throw new Error('User not authenticated');

  const customerID: unknown = user.publicMetadata.stripeCustomerID;

  const parseResult = z.string().optional().safeParse(customerID);
  if (!parseResult.success) {
    throw new Error('User’s Stripe customer ID is malformed');
  }
  const safeCustomerID = parseResult.data;

  const origin = headers().get('origin');
  if (!origin) throw new Error('Origin header is missing');

  if (isLifetime) {
    return await stripe.checkout.sessions.create({
      mode: 'payment',
      ui_mode: 'embedded',
      line_items: [
        {
          price: 'price_1P405j05xPAER8V0FZ46vU4m',
          quantity: 1,
        },
      ],
      customer: safeCustomerID,
      return_url: `${origin}/return?sessionID={CHECKOUT_SESSION_ID}`,
    });
  } else {
    return await stripe.checkout.sessions.create({
      mode: 'payment',
      ui_mode: 'embedded',
      line_items: [
        {
          price: 'price_1PZudd05xPAER8V0KQVkPqEZ',
          quantity: 1,
        },
      ],
      customer: safeCustomerID,
      return_url: `${origin}/return?sessionID={CHECKOUT_SESSION_ID}`,
    });
  }
}

export async function setStripeCheckoutSessionID(sessionID: string) {
  const { userId } = auth().protect();

  await db.insert(stripeCheckoutSessionID).values({
    userID: userId,
    sessionID: sessionID,
  });

  revalidatePath('/');
}

export async function saveHighestStreak(currentStreak: number) {
  const user = await currentUser();
  if (!user) return { error: 'User not authenticated' };

  let highestStreak = 0;
  if (user.publicMetadata.highestStreak && typeof user.publicMetadata.highestStreak === 'number') {
    highestStreak = user.publicMetadata.highestStreak;
  }

  if (currentStreak > highestStreak) {
    await clerkClient.users.updateUserMetadata(user?.id, {
      publicMetadata: {
        highestStreak: currentStreak,
      },
    });
  }
  revalidatePath('/');
}

export async function deleteAccount(prevState: any, formData: FormData) {
  const { userId } = auth().protect();

  const schema = z.object({
    userId: z.coerce.string(),
  });

  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await clerkClient.users.deleteUser(userId);

  revalidatePath('/');
}
