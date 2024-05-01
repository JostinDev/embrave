import client from '@/client';
import ChallengeModal from '@/components/ChallengeCard/ChallengeModal';
import { getChallenges } from '@/server/queries';

export default async function Challenge() {
  const challengeItems = await getChallenges();

  async function createRoom(id: number) {
    const data = { challenge_id: id };
    await client('api/room', {
      body: JSON.stringify(data),
    });
  }

  return (
    <div className="relative">
      <h1 className="text-large-title mb-8">Challenges</h1>
      {Object.entries(challengeItems).map(([category, challenges], i) => {
        if (!challenges || challenges.length === 0) return;
        return (
          <div key={i}>
            <h2 className="text-title1 mb-4">{category}</h2>
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
