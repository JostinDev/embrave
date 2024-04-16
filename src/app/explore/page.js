'use client';

import { useEffect, useState } from 'react';

import client from '@/client';
import ChallengeCard from '@/components/challengeCard';

export default function Challenge() {
  const [challenge, setChallenge] = useState([]);

  useEffect(() => {
    fetchChallenge();
  }, []);

  const fetchChallenge = async () => {
    try {
      const responseJSON = await client('api/challenge');
      const sortedData = sortByCategory(responseJSON);
      setChallenge(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  async function createRoom(id) {
    const data = { challenge_id: id };
    await client('api/room', {
      body: data,
    });
  }

  function sortByCategory(data) {
    const sortedData = {};

    data.forEach((item) => {
      const category = item.category.category;
      if (!sortedData[category]) {
        sortedData[category] = [];
      }
      sortedData[category].push(item);
    });

    return sortedData;
  }

  return (
    <div className="relative min-h-screen">
      <h1 className="text-large-title mb-8">Challenges</h1>

      {Object.keys(challenge).map((category, i) => (
        <div key={i}>
          <h2 className={'text-title1 mb-4'}>{category}</h2>
          <div key={challenge.id} className="mb-8 flex flex-wrap gap-4">
            {challenge[category].map((challenge, i) => {
              return (
                <div key={i} onClick={() => createRoom(challenge.id)}>
                  <ChallengeCard
                    challenge={challenge.title}
                    description={challenge.description}
                    type={challenge.type.type}
                  ></ChallengeCard>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
