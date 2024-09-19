import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import hero from '@/app/(app)/hero.png';
import logo from '@/app/(app)/images/logo.svg';

export default function CookiePolicy() {
  return (
    <div>
      <div className="fixed left-8 top-4 z-20 flex flex-col">
        <div className="mb-8 flex items-center gap-4">
          <Image src={logo} alt="" />
          <h1 className="hidden font-nexa text-32 font-bold leading-none text-sand-12 sm:block">
            Embrave
          </h1>
        </div>
      </div>
      <div
        className="fixed z-10 flex min-h-[105px] w-full flex-col bg-cover"
        style={{ backgroundImage: `url(${hero.src})` }}
      ></div>
      <div className="container mx-auto px-4 pt-32">
        <h1 className="mb-4 scroll-mt-28 font-nexa text-4xl font-bold text-sand-12">
          Cookie policy
        </h1>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          This cookie policy (“Policy”) describes what cookies are and how they’re being used by the{' '}
          <a href="https://www.embrave.app">embrave.app</a> website (“Website” or “Service”) and any
          of its related products and services (collectively, “Services”). This Policy is a legally
          binding agreement between you (“User”, “you” or “your”) and Studio NYTZ KLG (doing
          business as “Studio NYTZ”, “we”, “us” or “our”). If you are entering into this Policy on
          behalf of a business or other legal entity, you represent that you have the authority to
          bind such entity to this Policy, in which case the terms “User”, “you” or “your” shall
          refer to such entity. If you do not have such authority, or if you do not agree with the
          terms of this Policy, you must not accept this Policy and may not access and use the
          Website and Services. You should read this Policy so you can understand the types of
          cookies we use, the information we collect using cookies and how that information is used.
          It also describes the choices available to you regarding accepting or declining the use of
          cookies. For further information on how we use, store and keep your personal data secure,
          see our <a href="https://embrave.app/privacy_policy">privacy policy</a>.
        </p>
        <div>
          <h3 className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
            Table of contents
          </h3>
          <ol className="ml-8 list-disc">
            <li>
              <a className="underline" href="#what-are-cookies">
                What are cookies?
              </a>
            </li>
            <li>
              <a className="underline" href="#what-type-of-cookies-do-we-use">
                What type of cookies do we use?
              </a>
            </li>
            <li>
              <a className="underline" href="#what-are-your-cookie-options">
                What are your cookie options?
              </a>
            </li>
            <li>
              <a className="underline" href="#changes-and-amendments">
                Changes and amendments
              </a>
            </li>
            <li>
              <a className="underline" href="#acceptance-of-this-policy">
                Acceptance of this policy
              </a>
            </li>
            <li>
              <a className="underline" href="#contacting-us">
                Contacting us
              </a>
            </li>
          </ol>
        </div>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="what-are-cookies"
        >
          What are cookies?
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Cookies are small pieces of data stored in text files that are saved on your computer or
          other devices when websites are loaded in a browser. They are widely used to remember you
          and your preferences, either for a single visit (through a “session cookie”) or for
          multiple repeat visits (using a “persistent cookie”).
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Session cookies are temporary cookies that are used during the course of your visit to the
          Website, and they expire when you close the web browser.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Persistent cookies are used to remember your preferences within our Website and remain on
          your desktop or mobile device even after you close your browser or restart your computer.
          They ensure a consistent and efficient experience for you while visiting the Website and
          Services.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Cookies may be set by the Website (“first-party cookies”), or by third parties, such as
          those who serve content or provide advertising or analytics services on the Website
          (“third party cookies”). These third parties can recognize you when you visit our website
          and also when you visit certain other websites.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="what-type-of-cookies-do-we-use"
        >
          What type of cookies do we use?
        </h2>
        <h3>Necessary cookies</h3>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Necessary cookies allow us to offer you the best possible experience when accessing and
          navigating through our Website and using its features. For example, these cookies let us
          recognize that you have created an account and have logged into that account to access the
          content.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="what-are-your-cookie-options"
        >
          What are your cookie options?
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you don’t like the idea of cookies or certain types of cookies, you can change your
          browser’s settings to delete cookies that have already been set and to not accept new
          cookies. Visit <a href="https://www.internetcookies.com">internetcookies.com</a> to learn
          more about how to do this.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Please note, however, that if you delete cookies or do not accept them, you might not be
          able to use all of the features the Website and Services offer.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="changes-and-amendments"
        >
          Changes and amendments
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We reserve the right to modify this Policy or its terms related to the Website and
          Services at any time at our discretion. When we do, we will revise the updated date at the
          bottom of this page, post a notification on the main page of the Website. We may also
          provide notice to you in other ways at our discretion, such as through the contact
          information you have provided.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          An updated version of this Policy will be effective immediately upon the posting of the
          revised Policy unless otherwise specified. Your continued use of the Website and Services
          after the effective date of the revised Policy (or such other act specified at that time)
          will constitute your consent to those changes.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="acceptance-of-this-policy"
        >
          Acceptance of this policy
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You acknowledge that you have read this Policy and agree to all its terms and conditions.
          By accessing and using the Website and Services you agree to be bound by this Policy. If
          you do not agree to abide by the terms of this Policy, you are not authorized to access or
          use the Website and Services.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="contacting-us"
        >
          Contacting us
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you have any questions, concerns, or complaints regarding this Policy or the use of
          cookies, we encourage you to contact us using the details below:
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;h&#101;l&#108;o&#64;&#101;mbra&#118;e.a&#112;p">
            hel&#108;o&#64;&#101;m&#98;rave.ap&#112;
          </a>
        </p>
        <div className="mb-4 font-inter text-base leading-18 text-sand-12">
          This document was last updated on September 13, 2024
          <p className="madewith">
            <a href="https://www.websitepolicies.com/cookie-policy-generator?via=madewithbadge">
              <img
                width="200"
                height="25"
                alt="Made with WebsitePolicies cookie policy generator"
                src="https://cdn.websitepolicies.io/img/badge.png"
                srcSet="https://cdn.websitepolicies.io/img/badge_2x.png 2x"
              />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
