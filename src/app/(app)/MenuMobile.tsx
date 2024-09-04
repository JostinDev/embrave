'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignOutButton } from '@clerk/nextjs';

import home from '@/app/(app)/images/home.svg';
import logout from '@/app/(app)/images/logout.svg';
import profile from '@/app/(app)/images/profile.svg';
import world from '@/app/(app)/images/world.svg';

export default function MenuMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(home);
  const pathname = usePathname();

  useEffect(() => {
    async function initBackdrop() {
      switch (pathname) {
        case '/':
          setCurrentIcon(home);
          break;
        case '/explore':
          setCurrentIcon(world);
          break;
        case '/profile':
          setCurrentIcon(profile);
          break;
        case '/premium':
          setCurrentIcon(profile);
          break;
      }
    }
    const handleResize = () => {
      if (window.location.href.includes('explore')) {
        setCurrentIcon(world);
      } else if (window.location.href.includes('profile')) {
        setCurrentIcon(profile);
      } else {
        setCurrentIcon(home);
      }
    };

    initBackdrop();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  return (
    <div
      className="fixed right-8 top-3 z-40 flex h-20 cursor-pointer select-none flex-col md:hidden"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <div className="flex w-[83px] flex-1 flex-col gap-8 rounded-[26px] border border-sand-5 bg-white/40 pb-3 pt-6 backdrop-blur-lg">
        <div
          id="backdropContainerMobile"
          className="relative flex flex-col items-center gap-3 font-nexa text-base leading-[18px]"
        >
          <div
            id="backdropMobile"
            className="absolute -top-2 h-[44px] w-[44px] rounded-[10px] border border-sand-5 bg-sand-1 transition-all"
          />

          <div id="currentPage" className="z-30 flex items-end gap-2 px-4 ">
            <Image className="pointer-events-none" src={currentIcon} alt="" />
          </div>

          <div className={'z-30 flex-col ' + (isMenuOpen ? 'flex' : 'hidden')}>
            <Link
              id="linkHome"
              className={
                'z-30 justify-center px-5 py-2 ' + (currentIcon === home ? 'hidden' : 'flex')
              }
              href="/"
              onClick={() => setCurrentIcon(home)}
            >
              <Image
                className="w-12 rounded-[10px] p-2 transition-all hover:bg-sand-3"
                src={home}
                alt=""
              />
            </Link>

            <Link
              id="linkExplore"
              className={
                'z-30 justify-center px-5 py-2 ' + (currentIcon === world ? 'hidden' : 'flex')
              }
              href="/explore"
              onClick={() => setCurrentIcon(world)}
            >
              <Image
                className="w-12 rounded-[10px] p-2 transition-all hover:bg-sand-3"
                src={world}
                alt=""
              />
            </Link>

            <Link
              id="linkProfile"
              className={
                'z-30 justify-center px-5 py-2 ' + (currentIcon === profile ? 'hidden' : 'flex')
              }
              href="/profile"
              onClick={() => setCurrentIcon(profile)}
            >
              <Image
                className="w-12 rounded-[10px] p-2 transition-all hover:bg-sand-3"
                src={profile}
                alt=""
              />
            </Link>

            <Link
              id="linkPremium"
              className={
                'z-30 justify-center px-5 py-2 ' + (currentIcon === profile ? 'hidden' : 'flex')
              }
              href="/premium"
              onClick={() => setCurrentIcon(profile)}
            >
              <Image
                className="w-12 rounded-[10px] p-2 transition-all hover:bg-sand-3"
                src={profile}
                alt=""
              />
            </Link>

            <div className="z-30 justify-center px-5 py-2 lg:justify-start">
              <SignOutButton>
                <button
                  className="flex h-full w-10 items-center rounded-[10px] p-2 font-inter text-base leading-18 text-sand-12 transition-all hover:bg-sand-3"
                  type="submit"
                >
                  <Image src={logout} alt="" />
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
