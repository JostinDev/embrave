import { getChallenges } from '@/server/queries';
import ChallengeModal from './ChallengeModal';

export default async function Challenge() {
  const challengeItems = await getChallenges();

  return (
    <div className="relative">
      <h1 className="mb-8 font-nexa text-32 font-bold leading-none">Challenges</h1>
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
                    <ChallengeModal challenge={challenge} />
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
