import Link from 'next/link';

import ChallengeCard from '@/app/(app)/components/ChallengeCard';
import { getRoomStreak, getUserRoom } from '@/server/queries';

export default async function Index() {
  const [completedRooms, incompletedRooms] = await getUserRoom();
  return (
    <div className="relative">
      <div>
        <p className="mb-4 font-nexa text-xl font-bold text-sand-12">Currently Active Challenges</p>

        {!incompletedRooms && (
          <p className="mb-4 font-inter text-base font-normal text-sand-12">
            No active challenges,{' '}
            <Link className="text-blue-600" href={'/explore'}>
              explore our challenges{' '}
            </Link>
            and pick one!
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          {incompletedRooms &&
            incompletedRooms.map(async (room) => {
              if (room && room.challenge) {
                let date =
                  room.created.getDate() +
                  '.' +
                  room.created.getMonth() +
                  '.' +
                  room.created.getFullYear();
                const streak = await getRoomStreak(room.id);
                return (
                  <Link key={room.id} href={`/room/${room.id}`}>
                    <ChallengeCard
                      id={room.id}
                      challenge={room.challenge.title}
                      date={date}
                      type={room.challenge.type}
                      streak={streak}
                      users={room.users}
                    />
                  </Link>
                );
              }
            })}
        </div>
      </div>
      <div>
        <p className="mb-4 mt-6 font-nexa text-xl font-bold text-sand-12">Challenges completed</p>
        {!completedRooms && (
          <p className="mb-4 font-inter text-base font-normal text-sand-12">
            Once you complete a challenge, it will show up here!
          </p>
        )}
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
                        users={room.users}
                      />
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
