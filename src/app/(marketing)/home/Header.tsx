import Image from 'next/image';
import { auth } from '@clerk/nextjs/server';

import logo from '@/app/(marketing)/home/images/logoDark.svg';
import SignInLandingPageButton from '@/app/(marketing)/home/SignInLandingPageButton';

export default function Header() {
  const isSignedIn = Boolean(auth().userId);
  return (
    <div className="fixed left-0 top-0 flex w-full items-center justify-between bg-white px-4 pt-8 md:px-8 lg:px-16">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="" />
        <h1 className="hidden font-nexa text-32 font-bold leading-none text-sand-12 sm:block">
          Embrave
        </h1>
      </div>
      <SignInLandingPageButton isSignedIn={isSignedIn} />
    </div>
  );
}
