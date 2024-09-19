import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import hero from '@/app/(app)/hero.png';
import logo from '@/app/(app)/images/logo.svg';

export default function AcceptableUsePolicy() {
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
          Acceptable use policy
        </h1>

        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          This acceptable use policy (“Policy”) sets forth the general guidelines and acceptable and
          prohibited uses of the <a href="https://www.embrave.app">embrave.app</a> website
          (“Website” or “Service”) and any of its related products and services (collectively,
          “Services”). This Policy is a legally binding agreement between you (“User”, “you” or
          “your”) and Studio NYTZ KLG (doing business as “Studio NYTZ”, “we”, “us” or “our”). If you
          are entering into this Policy on behalf of a business or other legal entity, you represent
          that you have the authority to bind such entity to this Policy, in which case the terms
          “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or
          if you do not agree with the terms of this Policy, you must not accept this Policy and may
          not access and use the Website and Services. By accessing and using the Website and
          Services, you acknowledge that you have read, understood, and agree to be bound by the
          terms of this Policy. You acknowledge that this Policy is a contract between you and
          Studio NYTZ, even though it is electronic and is not physically signed by you, and it
          governs your use of the Website and Services.
        </p>
        <div>
          <h3 className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
            Table of contents
          </h3>
          <ol className="ml-8 list-disc">
            <li>
              <a className="underline" href="#prohibited-activities-and-uses">
                Prohibited activities and uses
              </a>
            </li>
            <li>
              <a className="underline" href="#system-abuse">
                System abuse
              </a>
            </li>
            <li>
              <a className="underline" href="#service-resources">
                Service resources
              </a>
            </li>
            <li>
              <a className="underline" href="#no-spam-policy">
                No spam policy
              </a>
            </li>
            <li>
              <a className="underline" href="#defamation-and-objectionable-content">
                Defamation and objectionable content
              </a>
            </li>
            <li>
              <a className="underline" href="#copyrighted-content">
                Copyrighted content
              </a>
            </li>
            <li>
              <a className="underline" href="#security">
                Security
              </a>
            </li>
            <li>
              <a className="underline" href="#enforcement">
                Enforcement
              </a>
            </li>
            <li>
              <a className="underline" href="#reporting-violations">
                Reporting violations
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
          id="prohibited-activities-and-uses"
        >
          Prohibited activities and uses
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You may not use the Website and Services to publish content or engage in activity that is
          illegal under applicable law, that is harmful to others, or that would subject us to
          liability, including, without limitation, in connection with any of the following, each of
          which is prohibited under this Policy:
        </p>
        <ul>
          <li>Distributing malware or other malicious code.</li>
          <li>Disclosing sensitive personal information about others.</li>
          <li>
            Collecting, or attempting to collect, personal information about third parties without
            their knowledge or consent.
          </li>
          <li>Distributing pornography or adult related content.</li>
          <li>Promoting or facilitating prostitution or any escort services.</li>
          <li>
            Hosting, distributing or linking to child pornography or content that is harmful to
            minors.
          </li>
          <li>
            Promoting or facilitating gambling, violence, terrorist activities or selling weapons or
            ammunition.
          </li>
          <li>
            Engaging in the unlawful distribution of controlled substances, drug contraband or
            prescription medications.
          </li>
          <li>
            Managing payment aggregators or facilitators such as processing payments on behalf of
            other businesses or charities.
          </li>
          <li>
            Facilitating pyramid schemes or other models intended to seek payments from public
            actors.
          </li>
          <li>Threatening harm to persons or property or otherwise harassing behavior.</li>
          <li>Purchasing any of the offered Services on someone else’s behalf.</li>
          <li>Misrepresenting or fraudulently representing products or services.</li>
          <li>Infringing the intellectual property or other proprietary rights of others.</li>
          <li>
            Facilitating, aiding, or encouraging any of the above activities through the Website and
            Services.
          </li>
        </ul>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="system-abuse"
        >
          System abuse
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Any User in violation of the Website and Services security is subject to criminal and
          civil liability, as well as immediate account termination. Examples include, but are not
          limited to the following:
        </p>
        <ul>
          <li>
            Use or distribution of tools designed for compromising security of the Website and
            Services.
          </li>
          <li>
            Intentionally or negligently transmitting files containing a computer virus or corrupted
            data.
          </li>
          <li>
            Accessing another network without permission, including to probe or scan for
            vulnerabilities or breach security or authentication measures.
          </li>
          <li>
            Unauthorized scanning or monitoring of data on any network or system without proper
            authorization of the owner of the system or network.
          </li>
        </ul>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="service-resources"
        >
          Service resources
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You may not consume excessive amounts of the resources of the Website and Services or use
          the Website and Services in any way which results in performance issues or which
          interrupts the Services for other Users. Prohibited activities that contribute to
          excessive use, include without limitation:
        </p>
        <ul>
          <li>
            Deliberate attempts to overload the Website and Services and broadcast attacks (i.e.
            denial of service attacks).
          </li>
          <li>
            Engaging in any other activities that degrade the usability and performance of the
            Website and Services.
          </li>
        </ul>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="no-spam-policy"
        >
          No spam policy
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You may not use the Website and Services to send spam or bulk unsolicited messages. We
          maintain a zero tolerance policy for use of the Website and Services in any manner
          associated with the transmission, distribution or delivery of any bulk email, including
          unsolicited bulk or unsolicited commercial email, or the sending, assisting, or
          commissioning the transmission of commercial email that does not comply with the U.S.
          CAN-SPAM Act of 2003 (“SPAM”).
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Your products or services advertised via SPAM (i.e. Spamvertised) may not be used in
          conjunction with the Website and Services. This provision includes, but is not limited to,
          SPAM sent via fax, phone, postal mail, email, instant messaging, or newsgroups.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Sending emails through the Website and Services to purchased email lists (“safe lists”)
          will be treated as SPAM.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="defamation-and-objectionable-content"
        >
          Defamation and objectionable content
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We value the freedom of expression and encourage Users to be respectful with the content
          they post. We are not a publisher of User content and are not in a position to investigate
          the veracity of individual defamation claims or to determine whether certain material,
          which we may find objectionable, should be censored. However, we reserve the right to
          moderate, disable or remove any content to prevent harm to others or to us or the Website
          and Services, as determined in our sole discretion.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="copyrighted-content"
        >
          Copyrighted content
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Copyrighted material must not be published via the Website and Services without the
          explicit permission of the copyright owner or a person explicitly authorized to give such
          permission by the copyright owner. Upon receipt of a claim for copyright infringement, or
          a notice of such violation, we may, at our discretion, run an investigation and, upon
          confirmation, may remove the infringing material from the Website and Services. We may
          terminate the Service of Users with repeated copyright infringements. Further procedures
          may be carried out if necessary. We will assume no liability to any User of the Website
          and Services for the removal of any such material. If you believe your copyright is being
          infringed by a person or persons using the Website and Services, please get in touch with
          us to report copyright infringement.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="security"
        >
          Security
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You take full responsibility for maintaining reasonable security precautions for your
          account. You are responsible for protecting and updating any login account provided to you
          for the Website and Services. You must protect the confidentiality of your login details,
          and you should change your password periodically.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="enforcement"
        >
          Enforcement
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We reserve our right to be the sole arbiter in determining the seriousness of each
          infringement and to immediately take corrective actions, including but not limited to:
        </p>
        <ul>
          <li>
            Suspending or terminating your Service with or without notice upon any violation of this
            Policy. Any violations may also result in the immediate suspension or termination of
            your account.
          </li>
          <li>
            Disabling or removing any content which is prohibited by this Policy, including to
            prevent harm to others or to us or the Website and Services, as determined by us in our
            sole discretion.
          </li>
          <li>
            Reporting violations to law enforcement as determined by us in our sole discretion.
          </li>
          <li>
            A failure to respond to an email from our abuse team within 2 days, or as otherwise
            specified in the communication to you, may result in the suspension or termination of
            your account.
          </li>
        </ul>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Suspended and terminated User accounts due to violations will not be re-activated.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Nothing contained in this Policy shall be construed to limit our actions or remedies in
          any way with respect to any of the prohibited activities. We reserve the right to take any
          and all additional actions we may deem appropriate with respect to such activities,
          including without limitation taking action to recover the costs and expenses of
          identifying offenders and removing them from the Website and Services, and levying
          cancellation charges to cover our costs. In addition, we reserve at all times all rights
          and remedies available to us with respect to such activities at law or in equity.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="reporting-violations"
        >
          Reporting violations
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you have discovered and would like to report a violation of this Policy, please contact
          us immediately. We will investigate the situation and provide you with full assistance.
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
          If you have any questions, concerns, or complaints regarding this Policy, we encourage you
          to contact us using the details below:
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#104;el&#108;&#111;&#64;em&#98;r&#97;ve&#46;a&#112;p">
            &#104;e&#108;lo&#64;e&#109;brav&#101;&#46;a&#112;&#112;
          </a>
        </p>
        <div>
          This document was last updated on September 13, 2024
          <p className="mb-4 font-inter text-base leading-18 text-sand-12">
            <a href="https://www.websitepolicies.com/acceptable-use-policy-generator?via=madewithbadge">
              <img
                width="200"
                height="25"
                alt="Made with WebsitePolicies acceptable use policy generator"
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
