import { currentUser } from '@clerk/nextjs/server';

import { getChallenges } from '@/server/queries';
import ChallengeModal from './ChallengeModal';

export default async function Challenge() {
  const challengeItems = await getChallenges();

  const user = await currentUser();

  if (!user)
    return (
      <div className="font-nexa text-26 font-bold leading-[115%] text-sand-12">
        The user is not authenticated
      </div>
    );

  let currentCredits = 0;
  if (user.publicMetadata.credits && typeof user.publicMetadata.credits === 'number') {
    currentCredits = user.publicMetadata.credits;
  }

  let isPremium = false;
  if (user.publicMetadata.isPremium && typeof user.publicMetadata.isPremium === 'boolean') {
    isPremium = user.publicMetadata.isPremium;
  }

  return (
    <div className="relative">
      {Object.entries(challengeItems).map(([category, challenges], i) => {
        if (!challenges || challenges.length === 0) return;
        return (
          <div key={i}>
            <h2 className="mb-4 font-nexa text-26 font-bold capitalize leading-[115%]">
              {category}
            </h2>
            <div key={0} className="mb-8 flex flex-wrap gap-4">
              {challenges.map((challenge, j) => {
                return (
                  <div key={j}>
                    <ChallengeModal
                      isPremium={isPremium}
                      credits={currentCredits}
                      challenge={challenge}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
