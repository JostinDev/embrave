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

export default function Menu() {
  const [previousActive, setPreviousActive] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    initBackdrop();
  }, []);

  async function initBackdrop() {
    switch (pathname) {
      case '/':
        await waitForElm('#linkHome').then((el) => placeBackdrop(el));
        break;
      case '/explore':
        await waitForElm('#linkExplore').then((el) => placeBackdrop(el));
        break;
      case '/profile':
        await waitForElm('#linkProfile').then((el) => placeBackdrop(el));
        break;
      case '/premium':
        await waitForElm('#linkPremium').then((el) => placeBackdrop(el));
        break;
    }
  }

  async function hoverState(active: HTMLElement, className: string) {
    if (active.id !== previousActive) {
      active.classList.remove(className);
      if (previousActive) {
        await waitForElm('#' + previousActive).then((el) => {
          el.classList.add(className);
        });
      }
      setPreviousActive(active.id);
    }
  }

  function waitForElm(selector: string): Promise<HTMLElement> {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector) as HTMLElement);
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector) as HTMLElement);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  function placeBackdrop(item: HTMLElement) {
    const backdrop = document.querySelector('#backdrop') as HTMLElement;
    const backdropContainer = document.querySelector('#backdropContainer') as HTMLElement;

    let rect = item.getBoundingClientRect();
    let rectContainer = backdropContainer.getBoundingClientRect();

    let topValue = rect.top - rectContainer.top;

    backdrop.style.top = topValue + 'px';

    hoverState(item, 'hover:bg-sand-3');
  }

  return (
    <div className="fixed left-8 top-32 z-40 hidden flex-col md:bottom-8 md:flex">
      <div className="flex w-[83px] flex-1 flex-col gap-8 rounded-[26px] border border-sand-5 bg-white/40 px-4 pt-6 backdrop-blur-lg transition-[width] lg:w-[255px]">
        <div
          id="backdropContainer"
          className="relative flex flex-col items-center gap-4 font-nexa text-base leading-[18px] lg:items-start"
        >
          <div
            id="backdrop"
            className="pointer-events-none absolute z-30 h-[44px] w-[48px] rounded-[10px] border border-sand-5 bg-sand-1 transition-all lg:w-[221px]"
          />

          <Link
            id="linkHome"
            className="z-30 flex w-full items-end justify-center gap-2 rounded-[10px] py-2 transition-all hover:bg-sand-3 lg:justify-start lg:pl-2"
            onClick={(e) => placeBackdrop(e.target as HTMLElement)}
            href="/"
          >
            <Image className="pointer-events-none" src={home} alt="" />
            <span className="pointer-events-none hidden h-full items-center font-inter text-base leading-18 text-sand-12 lg:flex">
              Home
            </span>
          </Link>

          <Link
            id="linkExplore"
            className="z-30 flex w-full items-end justify-center gap-2 rounded-[10px] py-2 transition-all hover:bg-sand-3 lg:justify-start lg:pl-2"
            onClick={(e) => placeBackdrop(e.target as HTMLElement)}
            href="/explore"
          >
            <Image className="pointer-events-none" src={world} alt="" />
            <span className="pointer-events-none hidden h-full items-center font-inter text-base leading-18 text-sand-12 lg:flex">
              Explore
            </span>
          </Link>

          <Link
            id="linkProfile"
            className="z-30 flex w-full items-end justify-center gap-2 rounded-[10px] py-2 transition-all hover:bg-sand-3 lg:justify-start lg:pl-2"
            onClick={(e) => placeBackdrop(e.target as HTMLElement)}
            href="/profile"
          >
            <Image className="pointer-events-none" src={profile} alt="" />
            <span className="pointer-events-none hidden h-full items-center font-inter text-base leading-18 text-sand-12 lg:flex">
              Profile
            </span>
          </Link>
          <Link
            id="linkPremium"
            className="z-30 flex w-full items-end justify-center gap-2 rounded-[10px] py-2 transition-all hover:bg-sand-3 lg:justify-start lg:pl-2"
            onClick={(e) => placeBackdrop(e.target as HTMLElement)}
            href="/premium"
          >
            <Image className="pointer-events-none" src={profile} alt="" />
            <span className="pointer-events-none hidden h-full items-center font-inter text-base leading-18 text-sand-12 lg:flex">
              Premium
            </span>
          </Link>
        </div>

        <div className="z-30 mb-8 mt-auto lg:pl-2">
          <div className="flex justify-center lg:justify-start">
            <SignOutButton>
              <button
                className="flex h-full items-center gap-2 font-inter text-base leading-18 text-sand-12"
                type="submit"
              >
                <Image src={logout} alt="" />
                <span className="hidden lg:block">Log out</span>
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
