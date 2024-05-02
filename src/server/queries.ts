import 'server-only';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/server/db';
import * as schema from '@/server/db/schema';
import { userRoom, type Challenge, type Room } from '@/server/db/schema';

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

  const userRooms = await db.query.userRoom.findMany({
    where: eq(schema.userRoom.userID, userId),
    with: {
      room: {
        with: {
          challenge: true,
        },
      },
    },
  });

  type RoomWithChallenge = Room & {
    challenge: Challenge;
  };

  const incompleteRooms: RoomWithChallenge[] = [];
  const completedRooms: RoomWithChallenge[] = [];

  const rooms = userRooms.map((userRoom) => userRoom.room);

  rooms.map((room) => {
    if (room) {
      if (room.isChallengeCompleted) {
        completedRooms.push(room);
      } else {
        incompleteRooms.push(room);
      }
    }
  });

  return [completedRooms, incompleteRooms];
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
          imageUrl: user.imageUrl,
        },
      };
    }),
  };
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
