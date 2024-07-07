import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-aria-components';

import cart from '@/app/(app)/images/cart.svg';

type RemainingCreditsProps = {
  credits: number;
  cost: number;
};

export default function RemainingCredits(props: RemainingCreditsProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-4 rounded-2xl border border-dashed border-sand-11 bg-white p-4 sm:flex-nowrap sm:gap-6">
      <div className="flex w-full flex-col rounded-lg border border-solid border-sand-7 bg-sand-2 p-3">
        <p className="pb-1 text-center font-inter text-base font-black leading-5 text-sand-12">
          Current Balance:
        </p>
        <p className="text-center font-inter text-base font-medium leading-5 text-sand-9">
          {props.credits} credits
        </p>
      </div>

      {props.credits <= 0 ? (
        <Link className="w-full" href="/premium">
          <Button className="w-full rounded-lg bg-sand-12 p-3 font-inter text-base leading-18 text-sand-3">
            <span className="flex items-center justify-center gap-2">
              <Image src={cart} alt="" />
              <p>Buy more credits</p>
            </span>
          </Button>
        </Link>
      ) : (
        <div className="flex w-full flex-col p-3">
          <p className="pb-1 text-center font-inter text-base font-black leading-5 text-sand-12">
            Starting the challenge:
          </p>
          <p className="text-center font-inter text-base font-medium leading-5 text-sand-10">
            - {props.cost} credit
          </p>
        </div>
      )}
    </div>
  );
}
