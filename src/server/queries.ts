import 'server-only';

import { auth, clerkClient, type User } from '@clerk/nextjs/server';
import { and, count, eq, inArray } from 'drizzle-orm';

import { db } from '@/server/db';
import * as schema from '@/server/db/schema';
import { userRoom, type Challenge } from '@/server/db/schema';
import { saveHighestStreak } from '@/server/mutations';

type SortedChallenges = {
  [category: string]: Challenge[];
};

function groupChallengesByCategory(challenges: Challenge[]) {
  const sortedChallenges: SortedChallenges = {};

  challenges.forEach((challenge) => {
    const category = challenge.category;
    if (!sortedChallenges[category]) {
      sortedChallenges[category] = [];
    }

    sortedChallenges[category]?.push(challenge);
  });

  return sortedChallenges;
}
export async function getChallenges() {
  const challenges = await db.select().from(schema.challenge).orderBy(schema.challenge.category);
  return groupChallengesByCategory(challenges);
}

export async function getUserRoom() {
  const { userId } = auth().protect();

  const currentUserRoomMembership = await db.query.userRoom.findMany({
    where: eq(schema.userRoom.userID, userId),
    with: {
      room: {
        with: {
          challenge: true,
        },
      },
    },
  });

  const allCurrentUserRoomIDs = currentUserRoomMembership.map((userRoom) => userRoom.roomID);
  if (allCurrentUserRoomIDs.length === 0) return [];

  // Get all userRooms for all roomIDs
  const allMemberships = await db.query.userRoom.findMany({
    where: inArray(schema.userRoom.roomID, allCurrentUserRoomIDs),
  });

  const allUserIDs = allMemberships.map((userRoom) => userRoom.userID);
  const allUserResponse = await clerkClient.users.getUserList({ userId: allUserIDs });

  const usersInRoom = allUserResponse.data.map((clerkUser) => {
    return {
      id: clerkUser.id,
      fullName: clerkUser.fullName,
      imageUrl: clerkUser.imageUrl,
    };
  });

  const usersGroupedByRoom = allMemberships.reduce(
    (acc, membership) => {
      const user = usersInRoom.find((user) => user.id === membership.userID);
      if (!user) throw new Error('User not found');
      return {
        ...acc,
        [membership.roomID]: [...(acc[membership.roomID] || []), user],
      };
    },
    {} as { [roomID: number]: Pick<User, 'id' | 'fullName' | 'imageUrl'>[] },
  );

  const currentUserRoomMembershipWithAllUsers = currentUserRoomMembership.map((membership) => {
    return {
      ...membership,
      user: usersInRoom.find((user) => user.id === membership.userID),
      room: {
        ...membership.room,
        users: usersGroupedByRoom[membership.roomID],
      },
    };
  });

  const rooms = currentUserRoomMembershipWithAllUsers.map((userRoom) => userRoom.room);

  return [
    rooms.map((room) => {
      if (room && room.isChallengeCompleted) return room;
    }),
    rooms.map((room) => {
      if (room && !room.isChallengeCompleted) return room;
    }),
  ];
}

// Get the room and its challenge embedded like { id, code, link, created, codeCreatedTimestamp, challenge: { id, title, description, banner, typeID, categoryID, type: { id, type }, category: { id, category } } }
export async function getRoom(id: number) {
  const { userId } = auth().protect();

  if (!(await isUserInRoom(userId, id))) {
    return;
  }

  const room = await db.query.room.findFirst({
    where: eq(schema.room.id, id),
    with: {
      challenge: true,
      milestones: {
        orderBy: (milestone, { desc }) => [desc(milestone.timestamp)],
        with: {
          medias: true,
        },
      },
      userRooms: true,
    },
  });

  if (!room) return;

  const roomUserIDs = room.userRooms.map((userRoom) => userRoom.userID);
  const milestoneUserIDs = room.milestones.map((milestone) => milestone.userID);
  const allUserIDs = [...roomUserIDs, ...milestoneUserIDs];
  const allUserResponse = await clerkClient.users.getUserList({ userId: allUserIDs });

  return {
    ...room,
    userRooms: room.userRooms.map((userRoom) => {
      const user = allUserResponse.data.find((user) => user.id === userRoom.userID);
      console.log(user);
      if (!user) throw new Error('User not found');

      return {
        ...userRoom,
        user: {
          id: user.id,
          fullName: user.fullName,
          imageUrl: user.imageUrl,
        },
      };
    }),
    milestones: room.milestones.map((milestone) => {
      const user = allUserResponse.data.find((user) => user.id === milestone.userID);
      if (!user) throw new Error('Milestone user not found');

      return {
        ...milestone,
        user: {
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          imageUrl: user.imageUrl,
        },
      };
    }),
  };
}

export async function getRoomStreak(roomID: number) {
  const { userId } = auth().protect();

  if (!(await isUserInRoom(userId, roomID))) {
    return;
  }

  const milestones = await db.query.milestone.findMany({
    columns: {
      timestamp: true,
    },
    where: and(eq(schema.milestone.roomID, roomID), eq(schema.milestone.userID, userId)),
    orderBy: (milestone, { desc }) => [desc(milestone.timestamp)],
  });

  if (!milestones) return;

  let streakCount = 0;
  let currentDate = new Date().setHours(0, 0, 0, 0); // Current date without time

  let isMilestoneDoneToday = false;

  for (let i = 0; i < milestones.length; i++) {
    const milestone = milestones[i];
    if (!milestone) continue;
    const milestoneDate = new Date(milestone.timestamp).setHours(0, 0, 0, 0);
    const diffInDays = Math.floor((currentDate - milestoneDate) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) {
      // If milestone date is today, increment streak count. Only increment if it's not already done today
      if (!isMilestoneDoneToday) {
        streakCount++;
        isMilestoneDoneToday = true;
      }
    } else if (diffInDays === 1) {
      // If milestone date is yesterday, update current date to yesterday
      currentDate = milestoneDate;
      streakCount++;
    } else {
      // If there's more than 1 day gap, break the loop
      break;
    }
  }

  await saveHighestStreak(streakCount);

  return streakCount;
}

export async function isRoomAdmin(userID: string, roomID: number) {
  const result = await db
    .select()
    .from(schema.userRoom)
    .where(
      and(
        eq(schema.userRoom.userID, userID),
        eq(schema.userRoom.isAdmin, true),
        eq(schema.userRoom.roomID, roomID),
      ),
    );
  return result.length !== 0;
}

export async function isUserInRoom(userID: string, roomID: number) {
  const dbResult = await db
    .select()
    .from(userRoom)
    .where(and(eq(userRoom.userID, userID), eq(userRoom.roomID, roomID)));

  return dbResult.length !== 0;
}

export async function isLinkActive(roomID: number) {
  const dbResult = await db.select().from(schema.room).where(eq(schema.room.id, roomID));

  if (dbResult.length !== 0 && dbResult[0]) {
    return dbResult[0].isLinkActive;
  }
  return false;
}

export async function getRoomByLink(link: string) {
  auth().protect();

  const room = await db.query.room.findFirst({
    where: eq(schema.room.link, link),
    with: {
      challenge: true,
    },
  });

  if (room && room.challenge) {
    return room.challenge.title;
  }

  return '';
}

export async function isChallengeComplete(roomID: number) {
  const { userId } = auth().protect();

  if (!(await isUserInRoom(userId, roomID))) {
    return;
  }

  const dbResult = await db.select().from(schema.room).where(eq(schema.room.id, roomID));

  if (dbResult.length !== 0 && dbResult[0]) {
    return dbResult[0].isChallengeCompleted;
  }
  return false;
}

export async function isStripeCheckoutSessionValid(sessionID: string) {
  auth().protect();

  const dbResult = await db
    .select()
    .from(schema.stripeCheckoutSessionID)
    .where(eq(schema.stripeCheckoutSessionID.sessionID, sessionID));

  return !(dbResult.length !== 0 && dbResult[0]);
}

export async function getChallengeNumber() {
  const { userId } = auth().protect();

  const milestoneCount = await db
    .select({ count: count() })
    .from(schema.milestone)
    .where(and(eq(schema.milestone.userID, userId), eq(schema.milestone.ticked, true)));

  const updateCount = await db
    .select({ count: count() })
    .from(schema.milestone)
    .where(and(eq(schema.milestone.userID, userId), eq(schema.milestone.ticked, false)));

  let milestoneNumber = milestoneCount[0]?.count ?? 0;
  let updateNumber = updateCount[0]?.count ?? 0;

  return { milestoneNumber, updateNumber };
}

export async function getActiveRooms() {
  const { userId } = auth().protect();

  const challenges = await db.query.userRoom.findMany({
    columns: {},
    where: and(eq(schema.userRoom.userID, userId)),
    with: {
      room: {
        columns: {
          isChallengeCompleted: true,
        },
        with: {
          challenge: {
            columns: {
              type: true,
            },
          },
        },
      },
    },
  });

  let goalChallengeNumber = 0;
  let habitChallengeNumber = 0;

  challenges.forEach((room) => {
    if (!room.room.isChallengeCompleted) {
      if (room.room.challenge.type === 'goal') {
        goalChallengeNumber++;
      }
      if (room.room.challenge.type === 'habit') {
        habitChallengeNumber++;
      }
    }
  });

  return { goalChallengeNumber, habitChallengeNumber };
}
