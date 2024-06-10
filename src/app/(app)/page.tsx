import Link from 'next/link';

import ChallengeCard from '@/app/(app)/components/ChallengeCard';
import { getRoomStreak, getUserRoom } from '@/server/queries';

export default async function Index() {
  const [completedRooms, incompletedRooms] = await getUserRoom();
  return (
    <div className="relative">
      <div>
        <p className="mb-4 font-nexa text-xl font-bold text-sand-12">Currently Active Challenges</p>
        <div className="flex flex-wrap gap-4">
          {incompletedRooms
            ? incompletedRooms.map(async (room) => {
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
                      />
                    </Link>
                  );
                }
              })
            : ''}
        </div>
      </div>
      <div>
        <p className="mb-4 mt-6 font-nexa text-xl font-bold text-sand-12">Challenges completed</p>
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
