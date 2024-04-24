import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ClerkLoaded, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

import ChallengeCard from '@/components/challengeCard';
import { getUserRoom } from '@/server/queries';

export default async function Index() {
  const rooms = await getUserRoom();

  return (
    <div className="relative">
      <ClerkLoaded>
        <SignedIn>
          <div>
            <p className="text-title2 mb-4 text-sand-12">Currently Active Challenges</p>
            <div className="flex flex-wrap gap-4">
              {rooms
                ? rooms.map((room) => {
                    if (room && room.challenge) {
                      return (
                        <Link key={room.id} href={`/room/${room.id}`}>
                          <ChallengeCard
                            id={room.id}
                            challenge={room.challenge.title}
                            description={room.challenge.description}
                            date={room.created.toDateString()}
                            type={'habit'}
                            streak={0}
                          ></ChallengeCard>
                        </Link>
                      );
                    }
                  })
                : ''}
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className={'flex flex-col'}>
            <p className="text-title2 mb-2 text-sand-12">You are not logged in</p>
            <SignInButton mode="modal">
              <button
                className={'text-body-l-book h-fit max-w-fit rounded-lg bg-sand-12 p-3 text-sand-3'}
              >
                Login
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </ClerkLoaded>
    </div>
  );
}
