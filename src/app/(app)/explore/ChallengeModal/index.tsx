'use client';

import React, { useActionState } from 'react';
import Image from 'next/image';
import { Button, Dialog, DialogTrigger, Form, Heading, Modal } from 'react-aria-components';
import { twJoin, twMerge } from 'tailwind-merge';

import Badge from '@/app/(app)/components/Badge';
import ChallengeCard from '@/app/(app)/components/ChallengeCard';
import RemainingCredits from '@/app/(app)/components/RemainingCredits';
import cross from '@/app/(app)/images/cross.svg';
import spinner from '@/app/(app)/images/spinner.svg';
import stairs from '@/app/(app)/images/stairsCover.jpg';
import type { Challenge } from '@/server/db/schema';
import { createRoom } from '@/server/mutations';

type ChallengeModalProps = {
  challenge: Challenge;
  credits: number;
  isPremium: boolean;
};

export default function ChallengeModal({ challenge, credits, isPremium }: ChallengeModalProps) {
  const [state, formAction, isPending] = useActionState(createRoom, { errors: {} });

  return (
    <DialogTrigger>
      <Button className="h-full">
        <ChallengeCard
          banner={challenge.banner}
          challenge={challenge.title}
          type={challenge.type}
        />
      </Button>
      <Modal
        isDismissable
        className="mx-auto w-full max-w-[1100px] overscroll-contain rounded-[44px] border border-sand-5 bg-sand-1 p-4 shadow-[0px_8px_20px_rgba(0,0,0/0.1)] sm:top-auto"
      >
        <Dialog className="flex flex-col outline-none">
          {({ close }) => (
            <Form className="w-full" action={formAction}>
              <input type="hidden" name="challengeID" value={challenge.id} />
              <div className="relative mb-4">
                <Image
                  className="h-[400px] w-full rounded-[26px]"
                  height={540}
                  width={960}
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL={`/images/challenge/${challenge.banner}` + '.png'}
                  src={challenge.banner ? `/images/challenge/${challenge.banner}` + '.png' : stairs}
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

              {credits > 0 && (
                <div className="w-100 mx-auto mb-4 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8">
                  <p className="mb-2 font-nexa text-26 font-bold leading-[115%] text-sand-12">
                    Challenge description
                  </p>
                  <p className="font-inter text-base leading-5 text-sand-11">
                    {challenge.description}
                  </p>
                </div>
              )}

              {credits <= 0 && (
                <div className="w-100 mx-auto max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-2 p-8">
                  <p className="mb-2 font-nexa text-26 font-bold leading-[115%] text-sand-12">
                    Not enough credits
                  </p>
                  <p className="mb-6 font-inter text-base leading-5 text-sand-11">
                    Your current balance is not sufficient to join this challenge. Please by more
                    credits in order to start this challenge.
                  </p>
                  <RemainingCredits isPremium={isPremium} credits={credits} cost={1} />
                </div>
              )}

              {credits > 0 && (
                <div className="w-100 mx-auto max-w-[700px] rounded-[26px] border border-jade-5 bg-jade-2 p-8">
                  <p className="mb-2 font-nexa text-26 font-bold leading-[115%] text-green-11">
                    Want to challenge yourself? Start now!
                  </p>
                  <p className="mb-6 font-inter text-base leading-18 text-green-11">
                    You can start a new challenge now and then invite friends to join you on your
                    challenge.
                  </p>

                  <RemainingCredits isPremium={isPremium} credits={credits} cost={1} />

                  <Button
                    isDisabled={isPending || (credits <= 0 && !isPremium)}
                    type="submit"
                    className={twMerge(
                      'relative mt-6 flex h-fit items-center gap-2 rounded-lg bg-green-11 p-3 font-inter text-base leading-18 text-green-1 transition-all',
                      credits <= 0 && !isPremium && 'bg-sand-10',
                    )}
                  >
                    <p
                      className={twMerge(
                        'opacity-100 transition-all duration-200',
                        isPending && 'opacity-0',
                      )}
                    >
                      Start challenge
                    </p>
                    <Image
                      className={twJoin(
                        'absolute left-1/2 h-4 w-4 -translate-x-1/2 opacity-0 transition-all duration-200',
                        isPending && 'opacity-100',
                      )}
                      src={spinner}
                      alt=""
                    />
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
