import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { challenge, challengeCategory, challengeType } from '@/server/db/schema';

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

  console.log(sortedChallenges);
  return sortedChallenges;
}
export async function getChallenges() {
  const challenges = await db
    .select()
    .from(challenge)
    .innerJoin(challengeCategory, eq(challenge.categoryID, challengeCategory.id))
    .innerJoin(challengeType, eq(challenge.typeID, challengeType.id))
    .orderBy(challengeCategory.category);
  return groupChallengesByCategory(challenges);
}
