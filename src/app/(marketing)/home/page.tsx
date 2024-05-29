import Image from 'next/image';
import { auth } from '@clerk/nextjs/server';

import hero from './heroLanding.png';
import LoginLandingPageButton from './LoginLandingPageButton';
import logo from './logoWhite.svg';

export default function LandingPage() {
  const isSignedIn = Boolean(auth().userId);
  return (
    <div>
      <Image
        className="h-[400px] w-full"
        style={{ objectFit: 'cover' }}
        placeholder="blur"
        src={hero}
        alt=""
      />
      <div className="container mx-auto">
        <div className="absolute left-0 top-0 flex w-full items-center justify-between px-4 pt-8 md:px-8 lg:px-16">
          <div className="flex items-center gap-4">
            <Image src={logo} alt="" />
            <h1 className="hidden font-nexa text-32 font-bold leading-none text-sand-1 sm:block">
              Embrave
            </h1>
          </div>
          <LoginLandingPageButton isSignedIn={isSignedIn} />
        </div>
        <div className="relative z-10 mx-auto -mt-[150px] h-[423px] w-[90%] max-w-[950px] rounded-[48px] border border-solid border-sand-5 bg-sand-1 p-14 text-center">
          <h1 className="font-nexa text-90 font-extrabold leading-[120%] text-sand-12">
            Start today to challenge{' '}
            <span className="font-sourceSerif4 text-90 font-light italic leading-[120%]">
              yourself.
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
