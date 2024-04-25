'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import stairs from '@/app/images/stairs_cover.jpg';
import ChallengeCard from '@/components/challengeCard';
import Label from '@/components/label';
import { createRoom } from '@/server/mutations';

type Challenge = {
  id: number;
  title: string;
  description: string;
  banner: string;
  type: string;
  category: string;
};

type ChallengeModalProps = {
  challenge: Challenge;
};
export default function ChallengeModal({ challenge }: ChallengeModalProps) {
  const router = useRouter();

  return (
    <DialogTrigger>
      <Button>
        <ChallengeCard
          challenge={challenge.title}
          description={challenge.description}
          type={challenge.type}
        ></ChallengeCard>
      </Button>
      <Modal isDismissable>
        <Dialog className={'flex flex-col'}>
          {({ close }) => (
            <form>
              <div className={'relative mb-4'}>
                <Image
                  className={'h-[400px] w-full rounded-[26px]'}
                  style={{ objectFit: 'cover' }}
                  placeholder={'blur'}
                  src={stairs}
                  alt={''}
                ></Image>
                <div
                  className={
                    'absolute bottom-4 left-4 right-4 rounded-2xl border border-sand-5 bg-white bg-opacity-90 p-8 backdrop-blur'
                  }
                >
                  <Heading slot="title" className={'text-large-title mb-4 text-sand-12'}>
                    {challenge.title}
                  </Heading>
                  <div>
                    <p className={'text-body-m-bold mb-2 text-sand-12'}>Type:</p>
                    <Label type={challenge.type}></Label>
                  </div>
                </div>
              </div>
              <div
                className={
                  'w-100 mx-auto mb-4 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8'
                }
              >
                <p className={'text-title1 mb-2 text-sand-12'}>Challenge description</p>
                <p className={'text-body-l-book text-sand-12'}>{challenge.description}</p>
              </div>

              <div
                className={
                  'w-100 mx-auto mb-8 max-w-[700px] rounded-[26px] border border-jade-5 bg-jade-1 p-8'
                }
              >
                <p className={'text-title1 mb-2 text-sand-12'}>
                  Want to challenge yourself? Start now!
                </p>
                <p className={'text-body-l-book mb-6 text-sand-12'}>
                  You can start a new challenge now and then invite friends to join you on your
                  challenge.
                </p>
                <Button
                  onPress={() => {
                    createRoom(challenge.id);
                  }}
                  className={
                    'text-body-l-book h-fit max-w-fit rounded-lg bg-sand-12 p-3 text-sand-3'
                  }
                >
                  Start challenge
                </Button>
              </div>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
