'use client';

import { useOptimistic } from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, Form, Heading, Modal } from 'react-aria-components';
import { useLocalStorage } from 'usehooks-ts';

import ChallengeCompleteTracker from '@/app/(app)/components/ChallengeCompleteCard/ChallengeCompleteTracker';
import chevronDownGreen from '@/app/(app)/images/chevronDownGreen.svg';
import { setChallengeDone } from '@/server/mutations';

type ChallengeCompleteCardProps = {
  roomID: number;
  isChallengeCompleted: boolean;
};

export default function ChallengeCompleteCard(props: ChallengeCompleteCardProps) {
  const [isChallengeCompleted, setOptimisticIsChallengeCompleted] = useOptimistic(
    props.isChallengeCompleted,
  );
  const [isRoomCompleteAccordionOpen, setIsRoomCompleteAccordionOpen] = useLocalStorage(
    'isRoomCompleteAccordionOpen',
    true,
  );

  async function completeChallengeAction() {
    setOptimisticIsChallengeCompleted(true);
    await setChallengeDone(props.roomID);
  }

  return (
    <div className="w-100 relative mx-auto mb-6 flex max-w-[700px] items-center justify-between overflow-hidden rounded-[26px] border border-green-4 bg-green-2 p-8">
      {isChallengeCompleted && (
        <div className="confetti absolute left-0 top-0 h-16 w-full animate-confetti bg-repeat-x" />
      )}
      <div>
        <div
          onClick={() => setIsRoomCompleteAccordionOpen(!isRoomCompleteAccordionOpen)}
          className="flex w-fit cursor-pointer gap-2"
        >
          <p className="font-nexa text-26 font-bold leading-[115%] text-green-11">
            {isChallengeCompleted
              ? 'Congrats! You completed the challenge!'
              : 'Completed the Challenge?'}
          </p>
          <Image
            className={`mt-0.5 h-fit w-6 select-none transition ${!isRoomCompleteAccordionOpen && 'rotate-180'} `}
            src={chevronDownGreen}
            alt=""
          />
        </div>
        {isRoomCompleteAccordionOpen && (
          <p className="mt-2 font-inter text-base leading-18 text-green-11">
            {isChallengeCompleted
              ? 'You were successful! Good on you for pushing yourself outside your such perfect feat!'
              : 'Mark the challenge as done, once you have completed it.'}
          </p>
        )}
      </div>
      {isRoomCompleteAccordionOpen && (
        <DialogTrigger>
          <Button isDisabled={isChallengeCompleted}>
            <ChallengeCompleteTracker isChallengeCompleted={isChallengeCompleted} />
          </Button>
          <Modal
            isDismissable
            className="w-[90%] max-w-[480px] rounded-2xl border border-sand-5 bg-sand-1 p-6 shadow-[0px_8px_20px_rgba(0,0,0/0.1)]"
          >
            <Dialog role="alertdialog" className="outline-none">
              {({ close }) => (
                <Form action={completeChallengeAction}>
                  <Heading
                    className="mb-4 font-nexa text-26 font-bold leading-[115%] text-sand-12"
                    slot="title"
                  >
                    Do you want to complete this challenge?
                  </Heading>
                  <p className="mb-4 font-inter text-base leading-18 text-sand-12">
                    By completing the challenge, you will not be able to post any new milestones or
                    delete the existing ones.
                  </p>
                  <p className="font-inter text-base leading-18 text-sand-12">
                    A completed challenge only allows you to read the posted milestone.
                  </p>
                  <div className="mt-6 flex justify-between gap-4">
                    <Button
                      onPress={close}
                      className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-white p-3 font-inter text-base leading-18 text-sand-12"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onPress={close}
                      className="h-fit w-full rounded-lg border border-solid border-sand-12 bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3"
                    >
                      Complete challenge
                    </Button>
                  </div>
                </Form>
              )}
            </Dialog>
          </Modal>
        </DialogTrigger>
      )}
    </div>
  );
}
