import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import hero from '@/app/(app)/hero.png';
import logo from '@/app/(app)/images/logo.svg';

export default function TermsAndConditions() {
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
          Terms and conditions
        </h1>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          These terms and conditions (“Agreement”) set forth the general terms and conditions of
          your use of the <a href="https://www.embrave.app">embrave.app</a> website (“Website” or
          “Service”) and any of its related products and services (collectively, “Services”). This
          Agreement is legally binding between you (“User”, “you” or “your”) and Studio NYTZ KLG
          (doing business as “Studio NYTZ”, “we”, “us” or “our”). If you are entering into this
          Agreement on behalf of a business or other legal entity, you represent that you have the
          authority to bind such entity to this Agreement, in which case the terms “User”, “you” or
          “your” shall refer to such entity. If you do not have such authority, or if you do not
          agree with the terms of this Agreement, you must not accept this Agreement and may not
          access and use the Website and Services. By accessing and using the Website and Services,
          you acknowledge that you have read, understood, and agree to be bound by the terms of this
          Agreement. You acknowledge that this Agreement is a contract between you and Studio NYTZ,
          even though it is electronic and is not physically signed by you, and it governs your use
          of the Website and Services.
        </p>
        <div>
          <h3 className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
            Table of contents
          </h3>
          <ol className="ml-8 list-disc">
            <li>
              <a className="underline" href="#accounts-and-membership">
                Accounts and membership
              </a>
            </li>
            <li>
              <a className="underline" href="#user-content">
                User content
              </a>
            </li>
            <li>
              <a className="underline" href="#billing-and-payments">
                Billing and payments
              </a>
            </li>
            <li>
              <a className="underline" href="#accuracy-of-information">
                Accuracy of information
              </a>
            </li>
            <li>
              <a className="underline" href="#backups">
                Backups
              </a>
            </li>
            <li>
              <a className="underline" href="#links-to-other-resources">
                Links to other resources
              </a>
            </li>
            <li>
              <a className="underline" href="#prohibited-uses">
                Prohibited uses
              </a>
            </li>
            <li>
              <a className="underline" href="#intellectual-property-rights">
                Intellectual property rights
              </a>
            </li>
            <li>
              <a className="underline" href="#disclaimer-of-warranty">
                Disclaimer of warranty
              </a>
            </li>
            <li>
              <a className="underline" href="#limitation-of-liability">
                Limitation of liability
              </a>
            </li>
            <li>
              <a className="underline" href="#indemnification">
                Indemnification
              </a>
            </li>
            <li>
              <a className="underline" href="#severability">
                Severability
              </a>
            </li>
            <li>
              <a className="underline" href="#dispute-resolution">
                Dispute resolution
              </a>
            </li>
            <li>
              <a className="underline" href="#assignment">
                Assignment
              </a>
            </li>
            <li>
              <a className="underline" href="#changes-and-amendments">
                Changes and amendments
              </a>
            </li>
            <li>
              <a className="underline" href="#acceptance-of-these-terms">
                Acceptance of these terms
              </a>
            </li>
            <li>
              <a className="underline" href="mailto:hello@embrave.app">
                Contacting us
              </a>
            </li>
          </ol>
        </div>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="accounts-and-membership"
        >
          Accounts and membership
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You must be at least 18 years of age to use the Website and Services. By using the Website
          and Services and by agreeing to this Agreement you warrant and represent that you are at
          least 18 years of age. If you create an account on the Website, you are responsible for
          maintaining the security of your account and you are fully responsible for all activities
          that occur under the account and any other actions taken in connection with it. We may
          monitor and review new accounts before you may sign in and start using the Services.
          Providing false contact information of any kind may result in the termination of your
          account. You must immediately notify us of any unauthorized uses of your account or any
          other breaches of security. We will not be liable for any acts or omissions by you,
          including any damages of any kind incurred as a result of such acts or omissions. We may
          suspend, disable, or delete your account (or any part thereof) if we determine that you
          have violated any provision of this Agreement or that your conduct or content would tend
          to damage our reputation and goodwill. If we delete your account for the foregoing
          reasons, you may not re-register for our Services. We may block your email address and
          Internet protocol address to prevent further registration.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="user-content"
        >
          User content
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We do not own any data, information or material (collectively, “Content”) that you submit
          on the Website in the course of using the Service. You shall have sole responsibility for
          the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual
          property ownership or right to use of all submitted Content. We may monitor and review the
          Content on the Website submitted or created using our Services by you. You grant us
          permission to access, copy, distribute, store, transmit, reformat, display and perform the
          Content of your user account solely as required for the purpose of providing the Services
          to you. Without limiting any of those representations or warranties, we have the right,
          though not the obligation, to, in our own sole discretion, refuse or remove any Content
          that, in our reasonable opinion, violates any of our policies or is in any way harmful or
          objectionable. Unless specifically permitted by you, your use of the Website and Services
          does not grant us the license to use, reproduce, adapt, modify, publish or distribute the
          Content created by you or stored in your user account for commercial, marketing or any
          similar purpose.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="billing-and-payments"
        >
          Billing and payments
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You shall pay all fees or charges to your account in accordance with the fees, charges,
          and billing terms in effect at the time a fee or charge is due and payable. Where Services
          are offered on a free trial basis, payment may be required after the free trial period
          ends, and not when you enter your billing details (which may be required prior to the
          commencement of the free trial period). If, in our judgment, your purchase constitutes a
          high-risk transaction, we will require you to provide us with a copy of your valid
          government-issued photo identification, and possibly a copy of a recent bank statement for
          the credit or debit card used for the purchase. We reserve the right to change products
          and product pricing at any time.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="accuracy-of-information"
        >
          Accuracy of information
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Occasionally there may be information on the Website that contains typographical errors,
          inaccuracies or omissions that may relate to promotions and offers. We reserve the right
          to correct any errors, inaccuracies or omissions, and to change or update information or
          cancel orders if any information on the Website or Services is inaccurate at any time
          without prior notice (including after you have submitted your order). We undertake no
          obligation to update, amend or clarify information on the Website including, without
          limitation, pricing information, except as required by law. No specified update or refresh
          date applied on the Website should be taken to indicate that all information on the
          Website or Services has been modified or updated.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="backups"
        >
          Backups
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We perform regular backups of the Website and its Content, however, these backups are for
          our own administrative purposes only and are in no way guaranteed. You are responsible for
          maintaining your own backups of your data. We do not provide any sort of compensation for
          lost or incomplete data in the event that backups do not function properly. We will do our
          best to ensure complete and accurate backups, but assume no responsibility for this duty.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="links-to-other-resources"
        >
          Links to other resources
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Although the Website and Services may link to other resources (such as websites, mobile
          applications, etc.), we are not, directly or indirectly, implying any approval,
          association, sponsorship, endorsement, or affiliation with any linked resource, unless
          specifically stated herein. We are not responsible for examining or evaluating, and we do
          not warrant the offerings of, any businesses or individuals or the content of their
          resources. We do not assume any responsibility or liability for the actions, products,
          services, and content of any other third parties. You should carefully review the legal
          statements and other conditions of use of any resource which you access through a link on
          the Website. Your linking to any other off-site resources is at your own risk.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="prohibited-uses"
        >
          Prohibited uses
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          In addition to other terms as set forth in the Agreement, you are prohibited from using
          the Website and Services or Content: (a) for any unlawful purpose; (b) to solicit others
          to perform or participate in any unlawful acts; (c) to violate any international, federal,
          provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or
          violate our intellectual property rights or the intellectual property rights of others;
          (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or
          discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national
          origin, or disability; (f) to submit false or misleading information; (g) to upload or
          transmit viruses or any other type of malicious code that will or may be used in any way
          that will affect the functionality or operation of the Website and Services, third party
          products and services, or the Internet; (h) to spam, phish, pharm, pretext, spider, crawl,
          or scrape; (i) for any obscene or immoral purpose; or (j) to interfere with or circumvent
          the security features of the Website and Services, third party products and services, or
          the Internet. We reserve the right to terminate your use of the Website and Services for
          violating any of the prohibited uses.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="intellectual-property-rights"
        >
          Intellectual property rights
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          “Intellectual Property Rights” means all present and future rights conferred by statute,
          common law or equity in or in relation to any copyright and related rights, trademarks,
          designs, patents, inventions, goodwill and the right to sue for passing off, rights to
          inventions, rights to use, and all other intellectual property rights, in each case
          whether registered or unregistered and including all applications and rights to apply for
          and be granted, rights to claim priority from, such rights and all similar or equivalent
          rights or forms of protection and any other results of intellectual activity which subsist
          or will subsist now or in the future in any part of the world. This Agreement does not
          transfer to you any intellectual property owned by Studio NYTZ or third parties, and all
          rights, titles, and interests in and to such property will remain (as between the parties)
          solely with Studio NYTZ. All trademarks, service marks, graphics and logos used in
          connection with the Website and Services, are trademarks or registered trademarks of
          Studio NYTZ or its licensors. Other trademarks, service marks, graphics and logos used in
          connection with the Website and Services may be the trademarks of other third parties.
          Your use of the Website and Services grants you no right or license to reproduce or
          otherwise use any of Studio NYTZ or third party trademarks.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="disclaimer-of-warranty"
        >
          Disclaimer of warranty
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You agree that such Service is provided on an “as is” and “as available” basis and that
          your use of the Website and Services is solely at your own risk. We expressly disclaim all
          warranties of any kind, whether express or implied, including but not limited to the
          implied warranties of merchantability, fitness for a particular purpose and
          non-infringement. We make no warranty that the Services will meet your requirements, or
          that the Service will be uninterrupted, timely, secure, or error-free; nor do we make any
          warranty as to the results that may be obtained from the use of the Service or as to the
          accuracy or reliability of any information obtained through the Service or that defects in
          the Service will be corrected. You understand and agree that any material and/or data
          downloaded or otherwise obtained through the use of Service is done at your own discretion
          and risk and that you will be solely responsible for any damage or loss of data that
          results from the download of such material and/or data. We make no warranty regarding any
          goods or services purchased or obtained through the Service or any transactions entered
          into through the Service unless stated otherwise. No advice or information, whether oral
          or written, obtained by you from us or through the Service shall create any warranty not
          expressly made herein.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="limitation-of-liability"
        >
          Limitation of liability
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          To the fullest extent permitted by applicable law, in no event will Studio NYTZ, its
          affiliates, directors, officers, employees, agents, suppliers or licensors be liable to
          any person for any indirect, incidental, special, punitive, cover or consequential damages
          (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of
          content, impact on business, business interruption, loss of anticipated savings, loss of
          business opportunity) however caused, under any theory of liability, including, without
          limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise,
          even if the liable party has been advised as to the possibility of such damages or could
          have foreseen such damages. To the maximum extent permitted by applicable law, the
          aggregate liability of Studio NYTZ and its affiliates, officers, employees, agents,
          suppliers and licensors relating to the services will be limited to an amount no greater
          than one dollar or any amounts actually paid in cash by you to Studio NYTZ for the prior
          one month period prior to the first event or occurrence giving rise to such liability. The
          limitations and exclusions also apply if this remedy does not fully compensate you for any
          losses or fails of its essential purpose.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="indemnification"
        >
          Indemnification
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You agree to indemnify and hold Studio NYTZ and its affiliates, directors, officers,
          employees, agents, suppliers and licensors harmless from and against any liabilities,
          losses, damages or costs, including reasonable attorneys’ fees, incurred in connection
          with or arising from any third party allegations, claims, actions, disputes, or demands
          asserted against any of them as a result of or relating to your Content, your use of the
          Website and Services or any willful misconduct on your part.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="severability"
        >
          Severability
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          All rights and restrictions contained in this Agreement may be exercised and shall be
          applicable and binding only to the extent that they do not violate any applicable laws and
          are intended to be limited to the extent necessary so that they will not render this
          Agreement illegal, invalid or unenforceable. If any provision or portion of any provision
          of this Agreement shall be held to be illegal, invalid or unenforceable by a court of
          competent jurisdiction, it is the intention of the parties that the remaining provisions
          or portions thereof shall constitute their agreement with respect to the subject matter
          hereof, and all such remaining provisions or portions thereof shall remain in full force
          and effect.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="dispute-resolution"
        >
          Dispute resolution
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          The formation, interpretation, and performance of this Agreement and any disputes arising
          out of it shall be governed by the substantive and procedural laws of Switzerland without
          regard to its rules on conflicts or choice of law and, to the extent applicable, the laws
          of Switzerland. The exclusive jurisdiction and venue for actions related to the subject
          matter hereof shall be the courts located in Switzerland, and you hereby submit to the
          personal jurisdiction of such courts. You hereby waive any right to a jury trial in any
          proceeding arising out of or related to this Agreement. The United Nations Convention on
          Contracts for the International Sale of Goods does not apply to this Agreement.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="assignment"
        >
          Assignment
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You may not assign, resell, sub-license or otherwise transfer or delegate any of your
          rights or obligations hereunder, in whole or in part, without our prior written consent,
          which consent shall be at our own sole discretion and without obligation; any such
          assignment or transfer shall be null and void. We are free to assign any of its rights or
          obligations hereunder, in whole or in part, to any third party as part of the sale of all
          or substantially all of its assets or stock or as part of a merger.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="changes-and-amendments"
        >
          Changes and amendments
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We reserve the right to modify this Agreement or its terms related to the Website and
          Services at any time at our discretion. When we do, we will revise the updated date at the
          bottom of this page, post a notification on the main page of the Website. We may also
          provide notice to you in other ways at our discretion, such as through the contact
          information you have provided.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          An updated version of this Agreement will be effective immediately upon the posting of the
          revised Agreement unless otherwise specified. Your continued use of the Website and
          Services after the effective date of the revised Agreement (or such other act specified at
          that time) will constitute your consent to those changes.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="acceptance-of-these-terms"
        >
          Acceptance of these terms
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You acknowledge that you have read this Agreement and agree to all its terms and
          conditions. By accessing and using the Website and Services you agree to be bound by this
          Agreement. If you do not agree to abide by the terms of this Agreement, you are not
          authorized to access or use the Website and Services.
        </p>
        <h2
          className="mb-4 mt-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="contacting-us"
        >
          Contacting us
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you have any questions, concerns, or complaints regarding this Agreement, we encourage
          you to contact us using the details below:
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#104;e&#108;&#108;&#111;&#64;e&#109;b&#114;ave.a&#112;&#112;">
            h&#101;&#108;&#108;&#111;&#64;emb&#114;&#97;&#118;e&#46;a&#112;p
          </a>
        </p>
        <div>
          This document was last updated on September 13, 2024
          <p className="madewith">
            <a href="https://www.websitepolicies.com/terms-and-conditions-generator?via=madewithbadge">
              <img
                width="200"
                height="25"
                alt="Made with WebsitePolicies terms and conditions generator"
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
