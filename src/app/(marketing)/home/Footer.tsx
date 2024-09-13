import Image from 'next/image';
import Link from 'next/link';

import logoMountain from '@/app/(app)/images/logoMountain.svg';
import logoNYTZ from '@/app/(app)/images/logoNYTZ.svg';

export default function Footer() {
  return (
    <div>
      <Image src={logoMountain} alt="" className="mx-auto mb-16 mt-52" />
      <div className="mb-10 flex flex-col items-center px-16 text-center lg:flex-row lg:text-left">
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
          <p className="font-nexa text-base font-light text-sand-12">A product by Studio NYTZ</p>
          <Image src={logoNYTZ} alt="" />
        </div>
      </div>
    </div>
  );
}
