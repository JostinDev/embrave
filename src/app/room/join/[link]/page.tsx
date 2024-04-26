import { auth } from '@clerk/nextjs/server';

import { joinRoom } from '@/server/mutations';

export default async function JoinRoom({ params }: { params: { link: string } }) {
  auth().protect();
  await joinRoom(params.link);
}
