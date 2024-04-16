'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Router } from 'next/router';
import { SignOutButton } from '@clerk/nextjs';

import home from '../../public/home.svg';
import logout from '../../public/logout.svg';
import profile from '../../public/profile.svg';
import world from '../../public/world.svg';

export default function Menu() {
  const [previousActive, setPreviousActive] = useState('');

  useEffect(() => {
    initBackdrop();
  }, []);

  async function initBackdrop() {
    switch (Router.pathname) {
      case '/':
        await waitForElm('#linkHome').then((el) => placeBackdrop(el));
        break;
      case '/explore':
        await waitForElm('#linkExplore').then((el) => placeBackdrop(el));
        break;
      case '/profile':
        await waitForElm('#linkProfile').then((el) => placeBackdrop(el));
        break;
    }
  }

  async function hoverState(active, className) {
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

  function waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  function placeBackdrop(item) {
    const backdrop = document.querySelector('#backdrop');
    const backdropContainer = document.querySelector('#backdropContainer');

    let rect = item.getBoundingClientRect();
    let rectContainer = backdropContainer.getBoundingClientRect();

    let topValue = rect.top - rectContainer.top;

    backdrop.style.top = topValue + 'px';

    hoverState(item, 'hover:bg-sand-3');
  }

  return (
    <div className="fixed bottom-8 left-8 top-32 z-40 hidden flex-col md:flex">
      <div className="flex w-[83px] flex-1 flex-col gap-8 rounded-[26px] border border-sand-5 bg-white/40 px-4 pt-6 backdrop-blur-lg transition-[width] lg:w-[255px]">
        <div
          id="backdropContainer"
          className="relative flex flex-col items-center gap-4 font-nexa-book text-base leading-[18px] lg:items-start"
        >
          <div
            id="backdrop"
            className="pointer-events-none absolute z-30 h-[44px] w-[48px] rounded-[10px] border border-sand-5 bg-sand-1 transition-all lg:w-[221px]"
          ></div>

          <Link
            id="linkHome"
            className="z-30 flex w-full items-end justify-center gap-2 rounded-[10px] py-2 transition-all hover:bg-sand-3 lg:justify-start lg:pl-2"
            onClick={(e) => placeBackdrop(e.target)}
            href="/"
          >
            <Image className="pointer-events-none" src={home} alt={''}></Image>
            <span className="text-body-l-book pointer-events-none hidden h-full items-center text-sand-12 lg:flex">
              Home
            </span>
          </Link>

          <Link
            id="linkExplore"
            className="z-30 flex w-full items-end justify-center gap-2 rounded-[10px] py-2 transition-all hover:bg-sand-3 lg:justify-start lg:pl-2"
            onClick={(e) => placeBackdrop(e.target)}
            href="/explore"
          >
            <Image className="pointer-events-none" src={world} alt={''}></Image>
            <span className="text-body-l-book pointer-events-none hidden h-full items-center text-sand-12 lg:flex">
              Explore
            </span>
          </Link>

          <Link
            id="linkProfile"
            className="z-30 flex w-full items-end justify-center gap-2 rounded-[10px] py-2 transition-all hover:bg-sand-3 lg:justify-start lg:pl-2"
            onClick={(e) => placeBackdrop(e.target)}
            href="/profile"
          >
            <Image className="pointer-events-none" src={profile} alt={''}></Image>
            <span className="text-body-l-book pointer-events-none hidden h-full items-center text-sand-12 lg:flex">
              Profile
            </span>
          </Link>
        </div>

        <div className={'z-30 mb-8 mt-auto lg:pl-2'}>
          <div className={'flex justify-center lg:justify-start'}>
            <SignOutButton>
              <button
                className="text-body-l-book flex h-full items-center gap-2 text-sand-12"
                type="submit"
              >
                <Image src={logout} alt={''}></Image>
                <span className={'hidden lg:block'}>Log out</span>
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
