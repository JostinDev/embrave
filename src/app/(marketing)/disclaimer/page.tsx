import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import hero from '@/app/(app)/hero.png';
import logo from '@/app/(app)/images/logo.svg';

export default function Disclaimer() {
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
        <h1 className="mb-4 scroll-mt-28 font-nexa text-4xl font-bold text-sand-12">Disclaimer</h1>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          This disclaimer (“Disclaimer”) sets forth the general guidelines, disclosures, and terms
          of your use of the <a href="https://www.embrave.app">embrave.app</a> website (“Website” or
          “Service”) and any of its related products and services (collectively, “Services”). This
          Disclaimer is a legally binding agreement between you (“User”, “you” or “your”) and Studio
          NYTZ KLG (doing business as “Studio NYTZ”, “we”, “us” or “our”). If you are entering into
          this Policy on behalf of a business or other legal entity, you represent that you have the
          authority to bind such entity to this Policy, in which case the terms “User”, “you” or
          “your” shall refer to such entity. If you do not have such authority, or if you do not
          agree with the terms of this Policy, you must not accept this Policy and may not access
          and use the Website and Services. By accessing and using the Website and Services, you
          acknowledge that you have read, understood, and agree to be bound by the terms of this
          Disclaimer. You acknowledge that this Disclaimer is a contract between you and Studio
          NYTZ, even though it is electronic and is not physically signed by you, and it governs
          your use of the Website and Services.
        </p>
        <div>
          <h3 className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
            Table of contents
          </h3>
          <ol className="ml-8 list-disc">
            <li>
              <Link className="underline" href="#representation">
                Representation
              </Link>
            </li>
            <li>
              <Link className="underline" href="#content-and-postings">
                Content and postings
              </Link>
            </li>
            <li>
              <Link className="underline" href="#fitness-and-medical-disclaimer">
                Fitness and medical disclaimer
              </Link>
            </li>
            <li>
              <Link className="underline" href="#fair-use-notice">
                Fair use notice
              </Link>
            </li>
            <li>
              <Link className="underline" href="#indemnification-and-warranties">
                Indemnification and warranties
              </Link>
            </li>
            <li>
              <Link className="underline" href="#changes-and-amendments">
                Changes and amendments
              </Link>
            </li>
            <li>
              <Link className="underline" href="#acceptance-of-this-disclaimer">
                Acceptance of this disclaimer
              </Link>
            </li>
            <li>
              <Link className="underline" href="#contacting-us">
                Contacting us
              </Link>
            </li>
          </ol>
        </div>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="representation"
        >
          Representation
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Any views or opinions represented on the Website belong solely to the content creators and
          do not represent those of people, institutions or organizations that Studio NYTZ or
          creators may or may not be associated with in professional or personal capacity, unless
          explicitly stated. Any views or opinions are not intended to malign any religion, ethnic
          group, club, organization, company, or individual.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="content-and-postings"
        >
          Content and postings
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You may not modify, print or copy any part of the Website and Services. Inclusion of any
          part of the Website and Services in another work, whether in printed or electronic or
          another form or inclusion of any part of the Website and Services on another resource by
          embedding, framing or otherwise without the express permission of Studio NYTZ is
          prohibited.{' '}
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You may submit new content and comment on the existing content on the Website. You may not
          impersonate any other person through the Website and Services. You may not post content
          that is defamatory, fraudulent, obscene, threatening, invasive of another person’s privacy
          rights or that is otherwise unlawful. You may not post content that infringes on the
          intellectual property rights of any other person or entity. You may not post any content
          that includes any computer virus or other code designed to disrupt, damage, or limit the
          functioning of any computer software or hardware. By submitting or posting content on the
          Website, you grant Studio NYTZ the right to edit and, if necessary, remove any content at
          any time and for any reason.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="fitness-and-medical-disclaimer"
        >
          Fitness and medical disclaimer
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          The information available on the Website is for general health information only and is not
          intended to be a substitute for professional medical advice, diagnosis or treatment. You
          should not rely exclusively on information provided on the Website for your health needs.
          All specific medical questions should be presented to your own health care provider and
          you should seek medical advice regarding your health and before starting any nutrition,
          weight loss or any other type of workout program.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you choose to use the information available on the Website without prior consultation
          with and consent of your physician, you are agreeing to accept full responsibility for
          your decisions and agreeing to hold harmless Studio NYTZ, its agents, employees,
          contractors, and any affiliated companies from any liability with respect to injury or
          illness to you or your property arising out of or connected with your use of this
          information.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          There may be risks associated with participating in activities presented on the Website
          for people in good or poor health or with pre-existing physical or mental health
          conditions. If you choose to participate in these risks, you do so of your own free will
          and accord, knowingly and voluntarily assuming all risks associated with such activities.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          The results obtained from the information available on the Website may vary, and will be
          based on your individual background, physical health, previous experience, capacity,
          ability to act, motivation and other variables. There are no guarantees concerning the
          level of success you may experience.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="fair-use-notice"
        >
          Fair use notice
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          The content on the Website and Services may contain copyrighted material, the use of which
          may not have been specifically authorized by the copyright owner. We are providing such
          material under the fair use doctrine, as we believe this constitutes a fair use of any
          such copyrighted material as provided for in section 107 of the United States Copyright
          law.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          The content is distributed for educational, research, and informational purposes only. We
          do not claim ownership of any copyrighted material which remains the property of its
          respective owners.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          The inclusion of any copyrighted material does not imply endorsement, approval, or
          sponsorship by the copyright owner. If you wish to use copyrighted material from the
          Website and Services for purposes that exceed fair use, you must obtain permission from
          the copyright owner.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="indemnification-and-warranties"
        >
          Indemnification and warranties
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          While we have made every attempt to ensure that the information contained on the Website
          is correct, Studio NYTZ is not responsible for any errors or omissions, or for the results
          obtained from the use of this information. All information on the Website is provided “as
          is”, with no guarantee of completeness, accuracy, timeliness or of the results obtained
          from the use of this information, and without warranty of any kind, express or implied. In
          no event will Studio NYTZ, or its partners, employees or agents, be liable to you or
          anyone else for any decision made or action taken in reliance on the information on the
          Website, or for any consequential, special or similar damages, even if advised of the
          possibility of such damages. Information contained on the Website are subject to change at
          any time and without warning.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="changes-and-amendments"
        >
          Changes and amendments
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We reserve the right to modify this Disclaimer or its terms related to the Website and
          Services at any time at our discretion. When we do, we will revise the updated date at the
          bottom of this page, post a notification on the main page of the Website. We may also
          provide notice to you in other ways at our discretion, such as through the contact
          information you have provided.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          An updated version of this Disclaimer will be effective immediately upon the posting of
          the revised Disclaimer unless otherwise specified. Your continued use of the Website and
          Services after the effective date of the revised Disclaimer (or such other act specified
          at that time) will constitute your consent to those changes.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="acceptance-of-this-disclaimer"
        >
          Acceptance of this disclaimer
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You acknowledge that you have read this Disclaimer and agree to all its terms and
          conditions. By accessing and using the Website and Services you agree to be bound by this
          Disclaimer. If you do not agree to abide by the terms of this Disclaimer, you are not
          authorized to access or use the Website and Services.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="contacting-us"
        >
          Contacting us
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you have any questions, concerns, or complaints regarding this Disclaimer, we encourage
          you to contact us using the details below:
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#104;el&#108;o&#64;&#101;&#109;brav&#101;&#46;a&#112;p">
            h&#101;&#108;&#108;o&#64;&#101;&#109;b&#114;&#97;&#118;e.&#97;pp
          </a>
        </p>
        <div>
          This document was last updated on September 13, 2024
          <p className="mb-4 font-inter text-base leading-18 text-sand-12">
            <a href="https://www.websitepolicies.com/disclaimer-generator?via=madewithbadge">
              <img
                width="200"
                height="25"
                alt="Made with WebsitePolicies disclaimer generator"
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
