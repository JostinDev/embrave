'use client';

import Image from 'next/image';
import { Button, Dialog, DialogTrigger, Heading, Modal } from 'react-aria-components';

import Badge from '@/app/(app)/components/Badge';
import ChallengeCard from '@/app/(app)/components/ChallengeCard';
import cross from '@/app/(app)/images/cross.svg';
import stairs from '@/app/(app)/images/stairsCover.jpg';
import type { Challenge } from '@/server/db/schema';
import { createRoom } from '@/server/mutations';

type ChallengeModalProps = {
  challenge: Challenge;
};

export default function ChallengeModal({ challenge }: ChallengeModalProps) {
  return (
    <DialogTrigger>
      <Button>
        <ChallengeCard challenge={challenge.title} type={challenge.type} />
      </Button>
      <Modal
        isDismissable
        className="absolute top-4 w-[90%] max-w-[1100px] rounded-[44px] border border-sand-5 bg-sand-1 px-4 pb-6 pt-4 shadow-[0px_8px_20px_rgba(0,0,0/0.1)] sm:top-auto"
      >
        <Dialog className="flex flex-col outline-none">
          {({ close }) => (
            <form>
              <div className="relative mb-4">
                <Image
                  className="h-[400px] w-full rounded-[26px]"
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  src={stairs}
                  alt=""
                />
                <Button
                  onPress={close}
                  className="bg absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-sand-5 bg-sand-1"
                >
                  <Image src={cross} alt="" />
                </Button>
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-sand-5 bg-white bg-opacity-90 p-8 backdrop-blur">
                  <Heading
                    slot="title"
                    className="mb-4 font-nexa text-32 font-bold leading-none text-sand-12"
                  >
                    {challenge.title}
                  </Heading>
                  <div>
                    <p className="mb-2 font-inter text-sm font-bold leading-4 text-sand-12">
                      Type:
                    </p>
                    <Badge type={challenge.type} style="big" />
                  </div>
                </div>
              </div>
              <div className="w-100 mx-auto mb-4 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8">
                <p className="mb-2 font-nexa text-26 font-bold leading-[115%] text-sand-12">
                  Challenge description
                </p>
                <p className="font-inter text-base leading-18 text-sand-12">
                  {challenge.description}
                </p>
              </div>

              <div className="w-100 mx-auto max-w-[700px] rounded-[26px] border border-jade-5 bg-jade-2 p-8">
                <p className="mb-2 font-nexa text-26 font-bold leading-[115%] text-green-11">
                  Want to challenge yourself? Start now!
                </p>
                <p className="mb-6 font-inter text-base leading-18 text-green-11">
                  You can start a new challenge now and then invite friends to join you on your
                  challenge.
                </p>
                <Button
                  onPress={async () => {
                    await createRoom(challenge.id);
                  }}
                  className="h-fit max-w-fit rounded-lg bg-green-11 p-3 font-inter text-base leading-18 text-green-1"
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
