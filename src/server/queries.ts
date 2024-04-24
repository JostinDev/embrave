import 'server-only';

import { clerkClient, currentUser, getAuth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import * as schema from '@/server/db/schema';
import { milestone } from '@/server/db/schema';

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
  const user = await currentUser();
  if (!user) return;

  const rooms = await db.query.userRoom.findMany({
    where: eq(schema.userRoom.userID, user.id),
    with: {
      room: {
        with: {
          challenge: {
            with: true,
          },
        },
      },
    },
  });

  const room = rooms.map((room) => room.room);

  console.log(room);
  return room;
}

// Get the room and its challenge embedded like { id, code, link, created, codeCreatedTimestamp, challenge: { id, title, description, banner, typeID, categoryID, type: { id, type }, category: { id, category } } }
export async function getRoom(id: number) {
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
        user,
      };
    }),
    milestones: room.milestones.map((milestone) => {
      const user = allUserResponse.data.find((user) => user.id === milestone.userID);
      if (!user) throw new Error('Milestone user not found');

      return {
        ...milestone,
        user,
      };
    }),
  };
}
