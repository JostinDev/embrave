import { auth } from '@clerk/nextjs/server';

import { joinRoom } from '@/server/mutations';

export default async function JoinRoom({ params }: { params: { link: string } }) {
  auth().protect();
  const result = await joinRoom(params.link);
  if (result.error) {
    return <p className={'text-title1 text-sand-12'}>{result.error}</p>;
  }
}
