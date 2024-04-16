import Image from 'next/image';

import Menu from '@/component/menu';
import MenuMobile from '@/component/menu-mobile';
import hero from '../../public/hero.png';
import logo from '../../public/logo.svg';

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
    <html lang="en">
      <body>
        <div>
          <div className="fixed bottom-8 left-8 top-4 z-20 flex flex-col">
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
      </body>
    </html>
  );
}
