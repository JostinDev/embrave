import { eq } from 'drizzle-orm';

import { db } from '@/server/db';
import { challenge, challengeCategory } from '@/server/db/schema';

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

type ChallengeItem = {
  challenge: Challenge;
  challenge_category: ChallengeCategory;
};

type SortedChallenges = {
  [category: string]: Challenge[];
};

function groupChallengesByCategory(challenges: ChallengeItem[]) {
  const sortedChallenges: SortedChallenges = {};

  challenges.forEach(({ challenge, challenge_category }) => {
    const category = challenge_category.category;
    if (!sortedChallenges[category]) {
      sortedChallenges[category] = [];
    }
    sortedChallenges[category]?.push(challenge);
  });

  return sortedChallenges;
}
export async function getChallenges() {
  const challenges = await db
    .select()
    .from(challenge)
    .innerJoin(challengeCategory, eq(challenge.categoryID, challengeCategory.id))
    .orderBy(challengeCategory.category);

  return groupChallengesByCategory(challenges);
}
