'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClerkLoaded, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

import client from '@/client';
import ChallengeCard from '@/components/challengeCard';
import MainButton from '@/components/mainButton';

type Room = {
  room: {
    id: number;
    challenge: {
      title: string;
      type: {
        type: string;
      };
    };
    created: string;
  };
  streak: number;
};

export default function Index() {
  const [room, setRoom] = useState<Room[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const responseJSON = await client('api/room');

      for (const room of responseJSON) {
        const streakResponse = await client(`api/room/streak/${room.room.id}`);
        room.streak = streakResponse;
      }
      setRoom(responseJSON);
      console.log('GET ALL ROOMS : ', responseJSON);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <ClerkLoaded>
        <SignedIn>
          <div>
            <p className="text-title2 mb-4 text-sand-12">Currently Active Challenges</p>
            <div className="flex flex-wrap gap-4">
              {room.map((room) => {
                return (
                  <Link key={room.room.id} href={`/room/${room.room.id}`}>
                    <ChallengeCard
                      id={room.room.id}
                      challenge={room.room.challenge.title}
                      type={room.room.challenge.type.type}
                      streak={room.streak}
                      date={room.room.created}
                    ></ChallengeCard>
                  </Link>
                );
              })}
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className={'flex flex-col'}>
            <p className="text-title2 mb-2 text-sand-12">You are not logged in</p>
            <SignInButton mode="modal">
              <MainButton label={'Login'} />
            </SignInButton>
          </div>
        </SignedOut>
      </ClerkLoaded>
    </div>
  );
}
