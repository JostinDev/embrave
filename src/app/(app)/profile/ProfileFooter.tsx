import Image from 'next/image';
import Link from 'next/link';

import logoNYTZ from '@/app/(app)/images/logoNYTZ.svg';

export default function ProfileFooter() {
  return (
    <div className="mb-10 mt-10 flex max-w-[1132px] flex-col items-center text-center lg:flex-row lg:text-left">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <Link
          href="/privacy_policy"
          target="_blank"
          className="font-nexa text-xs font-light text-sand-12 underline"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms_and_conditions"
          target="_blank"
          className="font-nexa text-xs font-light text-sand-12 underline"
        >
          Terms & Conditions
        </Link>

        <Link
          href="/disclaimer"
          target="_blank"
          className="font-nexa text-xs font-light text-sand-12 underline"
        >
          Disclaimer
        </Link>

        <Link
          href="/acceptable_use_policy"
          target="_blank"
          className="font-nexa text-xs font-light text-sand-12 underline"
        >
          Acceptable Use Policy
        </Link>

        <Link
          href="/cookie_policy"
          target="_blank"
          className="font-nexa text-xs font-light text-sand-12 underline"
        >
          Cookie Policy
        </Link>
      </div>
      <div className="mx-auto mt-10 flex items-center gap-4 lg:mx-0 lg:ml-auto lg:mt-0">
        <p className="block font-nexa text-base font-light text-sand-12 lg:hidden xl:block">
          A product by Studio NYTZ
        </p>
        <Image src={logoNYTZ} alt="" />
      </div>
    </div>
  );
}
