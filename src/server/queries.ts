import 'server-only';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/server/db';
import * as schema from '@/server/db/schema';
import { challenge, userRoom } from '@/server/db/schema';

type Challenge = {
  id: number;
  title: string;
  description: string;
  banner: string;
  typeID: number;
  categoryID: number;
};

type ChallengeCategory = {
  id: number;
  category: string;
};

type ChallengeType = {
  id: number;
  type: string;
};

type DisplayChallenge = {
  id: number;
  title: string;
  description: string;
  banner: string;
  type: string;
  category: string;
};

type ChallengeItem = {
  challenge: Challenge;
  challenge_category: ChallengeCategory;
  challenge_type: ChallengeType;
};

type SortedChallenges = {
  [category: string]: DisplayChallenge[];
};

type room = {
  id: number;
  link: string;
  challengeID: number | null;
  code: string | null;
  isLinkActive: boolean;
  isChallengeCompleted: boolean;
  created: Date;
  codeCreatedTimestamp: Date;
  challenge: {
    title: string;
    type: {
      type: string;
    };
  } | null;
};

function groupChallengesByCategory(challenges: ChallengeItem[]) {
  const sortedChallenges: SortedChallenges = {};

  challenges.forEach(({ challenge, challenge_category, challenge_type }) => {
    const category = challenge_category.category;
    if (!sortedChallenges[category]) {
      sortedChallenges[category] = [];
    }

    const displayChallenge: DisplayChallenge = {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      banner: challenge.banner,
      type: challenge_type.type,
      category: challenge_category.category,
    };

    sortedChallenges[category]?.push(displayChallenge);
  });

  return sortedChallenges;
}
export async function getChallenges() {
  const challenges = await db
    .select()
    .from(schema.challenge)
    .innerJoin(
      schema.challengeCategory,
      eq(schema.challenge.categoryID, schema.challengeCategory.id),
    )
    .innerJoin(schema.challengeType, eq(schema.challenge.typeID, schema.challengeType.id))
    .orderBy(schema.challengeCategory.category);
  return groupChallengesByCategory(challenges);
}

export async function getUserRoom() {
  const { userId } = auth().protect();

  const rooms = await db.query.userRoom.findMany({
    where: eq(schema.userRoom.userID, userId),
    with: {
      room: {
        with: {
          challenge: {
            with: {
              category: true,
              type: true,
            },
          },
        },
      },
    },
  });

  const incompleteRooms: room[] = [];
  const completedRooms: room[] = [];

  const room = rooms.map((room) => room.room);

  room.map((challenge) => {
    if (challenge) {
      if (challenge.isChallengeCompleted) {
        completedRooms.push(challenge);
      } else {
        incompleteRooms.push(challenge);
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
