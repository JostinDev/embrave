'use client';

import { useEffect, useState } from 'react';

import client from '@/client';
import ChallengeCard from '@/components/challengeCard';

interface ChallengeData {
  id: number;
  title: string;
  description: string;
  type: {
    type: string;
  };
  category: {
    category: string;
  };
}

export default function Challenge() {
  const [challenge, setChallenge] = useState({});

  useEffect(() => {
    fetchChallenge();
  }, []);

  const fetchChallenge = async () => {
    try {
      const responseJSON: ChallengeData[] = await client('api/challenge');
      const sortedData = sortByCategory(responseJSON);
      setChallenge(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  async function createRoom(id: number) {
    const data = { challenge_id: id };
    await client('api/room', {
      body: data,
    });
  }

  function sortByCategory(data: ChallengeData[]) {
    const sortedData: { [key: string]: ChallengeData[] } = {};

    data.forEach((item: ChallengeData) => {
      const category = item.category.category;
      if (!sortedData[category]) {
        sortedData[category] = [];
      }
      sortedData[category]?.push(item);
    });

    return sortedData;
  }

  return (
    <div className="relative min-h-screen">
      <h1 className="text-large-title mb-8">Challenges</h1>

      {Object.keys(challenge).map((category, i) => (
        <div key={i}>
          <h2 className={'text-title1 mb-4'}>{category}</h2>
          <div key={category} className="mb-8 flex flex-wrap gap-4">
            {(challenge as { [key: string]: ChallengeData[] })[category]?.map(
              (challengeItem: ChallengeData, j: number) => {
                return (
                  <div key={j} onClick={() => createRoom(challengeItem.id)}>
                    <ChallengeCard
                      challenge={challengeItem.title}
                      description={challengeItem.description}
                      type={challengeItem.type.type}
                    ></ChallengeCard>
                  </div>
                );
              },
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
