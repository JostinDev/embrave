import Image from 'next/image';
import { ClerkProvider } from '@clerk/nextjs';

import logo from '@/app/(app)/images/logo.svg';
import hero from './hero.png';

import '@/app/globals.css';

import { currentUser } from '@clerk/nextjs/server';
import { Toaster } from 'sonner';

import WizardModal from '@/app/(app)/components/WizardModal/WizardModal';
import Menu from './Menu';
import MenuMobile from './MenuMobile';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: RootLayoutProps) {
  const user = await currentUser();

  if (!user)
    return (
      <div className="font-nexa text-26 font-bold leading-[115%] text-sand-12">
        The user is not authenticated
      </div>
    );

  let showTutorial = false;
  if (typeof user.publicMetadata.hasWatchedTutorial === 'boolean') {
    if (!user.publicMetadata.hasWatchedTutorial) {
      showTutorial = true;
    }
  } else {
    showTutorial = true;
  }

  let isPremium = false;
  if (user.publicMetadata.isPremium && typeof user.publicMetadata.isPremium === 'boolean') {
    isPremium = user.publicMetadata.isPremium;
  }

  return (
    <ClerkProvider>
      {showTutorial && <WizardModal />}
      <div>
        <div className="fixed left-8 top-4 z-20 flex flex-col md:bottom-8">
          <div className="mb-8 flex items-center gap-4">
            <Image src={logo} alt="" />
            <h1 className="hidden font-nexa text-32 font-bold leading-none text-sand-12 lg:block">
              Embrave
            </h1>
          </div>
        </div>
        <Menu isPremium={isPremium} />
        <MenuMobile isPremium={isPremium} />
        <div
          className="fixed z-10 flex min-h-[105px] w-full flex-col bg-cover md:min-h-[150px]"
          style={{ backgroundImage: `url(${hero.src})` }}
        ></div>
        <div className="relative max-w-[1800px] px-4 pt-[121px] md:pl-36 md:pt-[180px] lg:pl-80">
          {children}
        </div>
      </div>
      <Toaster />
    </ClerkProvider>
  );
}
