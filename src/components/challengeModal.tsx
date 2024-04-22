'use client';

import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import ChallengeCard from '@/components/challengeCard';

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
  return (
    <DialogTrigger>
      <Button>
        <ChallengeCard
          challenge={challenge.title}
          description={challenge.description}
          type={challenge.type}
        ></ChallengeCard>
      </Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <form>
              <Heading slot="title" className={'text-title2'}>
                Start a new challenge
              </Heading>
              <p>{challenge.description}</p>
              <Button onPress={close}>Cancel</Button>
              <Button onPress={close}>Start</Button>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
