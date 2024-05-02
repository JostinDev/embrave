import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

import ChallengeCard from '@/components/ChallengeCard/ChallengeCard';
import { getUserRoom } from '@/server/queries';

export default async function Index() {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="relative">
        <div className="flex flex-col">
          <p className="text-title2 mb-2 text-sand-12">You are not logged in</p>
          <SignInButton mode="modal">
            <button className="text-body-l-book h-fit max-w-fit rounded-lg bg-sand-12 p-3 text-sand-3">
              Login
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  const [completedRooms, incompletedRooms] = await getUserRoom();
  return (
    <div className="relative">
      <div>
        <p className="text-title2 mb-4 text-sand-12">Currently Active Challenges</p>
        <div className="flex flex-wrap gap-4">
          {incompletedRooms
            ? incompletedRooms.map((room) => {
                if (room && room.challenge) {
                  let date =
                    room.created.getDate() +
                    '.' +
                    room.created.getMonth() +
                    '.' +
                    room.created.getFullYear();
                  return (
                    <Link key={room.id} href={`/room/${room.id}`}>
                      <ChallengeCard
                        id={room.id}
                        challenge={room.challenge.title}
                        date={date}
                        type={room.challenge.type}
                        streak={0}
                      ></ChallengeCard>
                    </Link>
                  );
                }
              })
            : ''}
        </div>
      </div>
      <div>
        <p className="text-title2 mb-4 mt-6 text-sand-12">Challenges completed</p>
        <div className="flex flex-wrap gap-4">
          {completedRooms
            ? completedRooms.map((room) => {
                if (room && room.challenge) {
                  let date =
                    room.created.getDate() +
                    '.' +
                    room.created.getMonth() +
                    '.' +
                    room.created.getFullYear();
                  return (
                    <Link key={room.id} href={`/room/${room.id}`}>
                      <ChallengeCard
                        id={room.id}
                        challenge={room.challenge.title}
                        date={date}
                        type={room.challenge.type}
                        streak={0}
                      ></ChallengeCard>
                    </Link>
                  );
                }
              })
            : ''}
        </div>
      </div>
    </div>
  );
}
