import Image from 'next/image';
import Link from 'next/link';

import logoMountain from '@/app/(app)/images/logoMountain.svg';
import logoNYTZ from '@/app/(app)/images/logoNYTZ.svg';

export default function Footer() {
  return (
    <div>
      <Image src={logoMountain} alt="" className="mx-auto mb-16 mt-52" />
      <div className="mb-10 flex flex-col items-center px-16 text-center md:flex-row md:text-left">
        <div className="flex flex-col gap-4 md:flex-row md:gap-16">
          <Link href="/" className="font-nexa text-base font-light text-sand-12 underline">
            Privacy Statement
          </Link>
          <Link
            href="/terms_and_conditions"
            target="_blank"
            className="font-nexa text-base font-light text-sand-12 underline"
          >
            Terms & Conditions
          </Link>
        </div>
        <div className="mx-auto mt-10 flex items-center gap-4 md:mx-0 md:ml-auto md:mt-0">
          <p className="font-nexa text-base font-light text-sand-12">A product by Studio NYTZ</p>
          <Image src={logoNYTZ} alt="" />
        </div>
      </div>
    </div>
  );
}
