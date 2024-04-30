'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import cross from '@/app/images/cross.svg';
import stairs from '@/app/images/stairs_cover.jpg';
import Badge from '@/components/badge';
import ChallengeCard from '@/components/challengeCard/challengeCard';
import { createRoom } from '@/server/mutations';

import './style.css';

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
        <ChallengeCard challenge={challenge.title} type={challenge.type}></ChallengeCard>
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
                <Button
                  onPress={close}
                  className={
                    'bg absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-sand-5 bg-sand-1'
                  }
                >
                  <Image src={cross} alt={''} />
                </Button>
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
                    <Badge type={challenge.type} style={'big'}></Badge>
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
                  'w-100 mx-auto mb-8 max-w-[700px] rounded-[26px] border border-jade-5 bg-jade-2 p-8'
                }
              >
                <p className={'text-title1 text-green-11 mb-2'}>
                  Want to challenge yourself? Start now!
                </p>
                <p className={'text-body-l-book text-green-11 mb-6'}>
                  You can start a new challenge now and then invite friends to join you on your
                  challenge.
                </p>
                <Button
                  onPress={async () => {
                    await createRoom(challenge.id);
                  }}
                  className={
                    'text-body-l-book text-green-1 bg-green-11 h-fit max-w-fit rounded-lg p-3'
                  }
                >
                  Let’s go!
                </Button>
              </div>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
