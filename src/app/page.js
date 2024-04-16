'use client';

// This is a client component 👈🏽
import '../app/globals.css';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ChallengeCard from '@/component/challengeCard';
import user from '../../public/user.png';
import client from '../client';

export default function Index() {
  const [room, setRoom] = useState([]);
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    fetchDetails();
    fetchRooms();
  }, []);

  const fetchDetails = async () => {
    return client('api/user')
      .then(() => {
        setIsLogged(true);
      })
      .catch(() => {
        console.error('User not logged in');
        setIsLogged(false);
      });
  };

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

  function HomePage() {
    console.log('isLogged : ', isLogged);
    if (isLogged !== null) {
      if (isLogged) {
        return (
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
        );
      } else {
        return (
          <div className={'flex flex-col'}>
            <p className="text-title2 mb-2 text-sand-12">You are not logged in</p>
            <a
              className={'text-body-l-book h-fit max-w-fit rounded-lg bg-sand-12 p-3 text-sand-3'}
              href={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/oauth2/authorization/auth0`}
            >
              Login
            </a>
          </div>
        );
      }
    }
  }

  return (
    <div className="relative min-h-screen">
      <HomePage />
    </div>
  );
}
