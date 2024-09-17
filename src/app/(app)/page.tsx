import Image from 'next/image';
import Link from 'next/link';

import ChallengeCard from '@/app/(app)/components/ChallengeCard';
import plusCircleOutline from '@/app/(app)/images/plusCircleOutline.svg';
import { getRoomStreak, getUserRoom } from '@/server/queries';

export default async function Index() {
  const [completedRooms, incompletedRooms] = await getUserRoom();

  let completedRoomsFiltered = completedRooms;

  if (completedRooms) {
    completedRoomsFiltered = completedRooms.filter(function (item) {
      return item !== undefined;
    });
  }

  console.log('COMPLETED ROOMS', completedRoomsFiltered);

  return (
    <div className="relative">
      <div>
        <h2 className="mb-4 font-nexa text-26 font-bold capitalize leading-[115%] text-sand-12">
          Currently Active Challenges
        </h2>

        {!incompletedRooms && (
          <p className="mb-4 font-inter text-base font-normal text-sand-12">
            No active challenges,{' '}
            <Link className="text-blue-600" href={'/explore'}>
              explore our challenges{' '}
            </Link>
            and pick one!
          </p>
        )}
        <div className="flex gap-4 overflow-x-scroll">
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
                      banner={room.challenge.banner}
                    />
                  </Link>
                );
              }
            })}
          <Link
            href="/explore"
            className="flex min-w-[220px] flex-col rounded-[26px] border border-sand-5 bg-sand-1 p-4 font-inter text-base font-medium text-sand-10"
          >
            <p className="pl-2 pt-2">Add challenge</p>
            <Image className="ml-auto mt-auto" src={plusCircleOutline} alt="" />
          </Link>
        </div>
      </div>
      <div>
        <h2 className="mb-4 mt-6 font-nexa text-26 font-bold capitalize leading-[115%] text-sand-12">
          Completed challenges
        </h2>
        <div className="flex gap-4 overflow-x-scroll">
          {completedRoomsFiltered && completedRoomsFiltered.length > 0 ? (
            completedRoomsFiltered.map((room) => {
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
                      banner={room.challenge.banner}
                    />
                  </Link>
                );
              }
            })
          ) : (
            <div className="flex h-[260px] w-[220px] flex-col gap-6 rounded-[26px] border border-sand-5 bg-sand-1 p-6 font-inter text-base font-medium text-sand-10">
              <p>No completed challenge yet.</p>
              <p>Keep pushing!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
