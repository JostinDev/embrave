import Image from 'next/image';
import { ClerkProvider } from '@clerk/nextjs';

import logo from '@/app/(app)/images/logo.svg';
import hero from './hero.png';

import '@/app/globals.css';

import { Toaster } from 'sonner';

import Menu from './Menu';
import MenuMobile from './MenuMobile';

type RootLayoutProps = {
  children: React.ReactNode;
};

async function getUser() {
  return {
    name: 'Jostin',
  };
}

export default async function AppLayout({ children }: RootLayoutProps) {
  const user = await getUser();

  return (
    <ClerkProvider>
      <div>
        <div className="fixed left-8 top-4 z-20 flex flex-col md:bottom-8">
          <div className="mb-8 flex items-center gap-4">
            <Image src={logo} alt=""></Image>
            <h1 className="hidden font-nexa text-32 font-bold leading-none text-sand-12 lg:block">
              Embrave
            </h1>
          </div>
        </div>
        <Menu />
        <MenuMobile />
        <div
          className="fixed z-10 flex min-h-[105px] w-full flex-col bg-cover md:min-h-[191px]"
          style={{ backgroundImage: `url(${hero.src})` }}
        >
          <div className="flex max-w-[1800px] flex-1 pl-36 lg:pl-80">
            <p className="-mb-4 hidden self-end font-nexa text-6xl font-black uppercase italic text-sand-12 md:block">
              HEJ {user.name}
            </p>
          </div>
        </div>
        <div className="relative max-w-[1800px] px-4 pt-[120px] md:pl-36 md:pt-[220px] lg:pl-80">
          {children}
        </div>
      </div>
      <Toaster />
    </ClerkProvider>
  );
}
