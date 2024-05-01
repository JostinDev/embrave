import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Image from 'next/image';
import { ClerkProvider } from '@clerk/nextjs';

import hero from '@/app/images/hero.png';
import logo from '@/app/images/logo.svg';
import Menu from '@/components/Menu';
import MenuMobile from '@/components/MenuMobile';

import '@/app/globals.css';

import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const nexa = localFont({
  src: [
    {
      path: '../fonts/nexa/Nexa-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/nexa/Nexa-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/nexa/Nexa-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/nexa/Nexa-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-nexa',
});

type RootLayoutProps = {
  children: React.ReactNode;
};

async function getUser() {
  return {
    name: 'Jostin',
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getUser();

  return (
    <html lang="en" className={`${inter.variable} ${nexa.variable}`}>
      <body>
        <ClerkProvider>
          <div>
            <div className="fixed left-8 top-4 z-20 flex flex-col md:bottom-8">
              <div className="mb-8 flex items-center gap-4">
                <Image src={logo} alt={''}></Image>
                <h1 className="text-large-title hidden text-sand-12 lg:block">Embrave</h1>
              </div>
            </div>
            <Menu />
            <MenuMobile />
            <div
              className="fixed z-10 flex min-h-[105px] w-full flex-col bg-cover md:min-h-[191px]"
              style={{ backgroundImage: `url(${hero.src})` }}
            >
              <div className="flex max-w-[1800px] flex-1 pl-36 lg:pl-80">
                <p className={'text-hero -mb-4 hidden self-end text-sand-12 md:block'}>
                  HEJ {user.name}
                </p>
              </div>
            </div>
            <div className="relative max-w-[1800px] px-4 pt-[120px] md:pl-36 md:pt-[220px] lg:pl-80">
              <p className={'text-mobile-hero -mb-6 self-end text-sand-12 md:hidden'}>
                HEJ {user.name}
              </p>
              {children}
            </div>
          </div>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
