'use client';

import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import ChallengeCard from '@/components/challengeCard';
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
        <Dialog>
          {({ close }) => (
            <form>
              <Heading slot="title" className={'text-title2 text-sand-12'}>
                Start a new challenge
              </Heading>
              <p className={'text-body-m-book text-sand-12'}>{challenge.description}</p>
              <div className={'mt-4 flex gap-4'}>
                <Button
                  onPress={close}
                  className={
                    'text-body-l-book h-fit max-w-fit rounded-lg bg-sand-12 p-3 text-sand-3'
                  }
                >
                  Close
                </Button>
                <Button
                  onPress={() => {
                    createRoom(challenge.id);
                  }}
                  className={
                    'text-body-l-book h-fit max-w-fit rounded-lg bg-sand-12 p-3 text-sand-3'
                  }
                >
                  Start
                </Button>
              </div>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
