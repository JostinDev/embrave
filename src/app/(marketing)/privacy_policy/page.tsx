import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import hero from '@/app/(app)/hero.png';
import logo from '@/app/(app)/images/logo.svg';

export default function PrivacyPolicy() {
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
          Privacy policy
        </h1>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We respect your privacy and are committed to protecting it through our compliance with
          this privacy policy (“Policy”). This Policy describes the types of information we may
          collect from you or that you may provide (“Personal Information”) on the{' '}
          <a href="https://www.embrave.app">embrave.app</a> website (“Website” or “Service”) and any
          of its related products and services (collectively, “Services”), and our practices for
          collecting, using, maintaining, protecting, and disclosing that Personal Information. It
          also describes the choices available to you regarding our use of your Personal Information
          and how you can access and update it.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          This Policy is a legally binding agreement between you (“User”, “you” or “your”) and
          Studio NYTZ KLG (doing business as “Studio NYTZ”, “we”, “us” or “our”). If you are
          entering into this Policy on behalf of a business or other legal entity, you represent
          that you have the authority to bind such entity to this Policy, in which case the terms
          “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or
          if you do not agree with the terms of this Policy, you must not accept this Policy and may
          not access and use the Website and Services. By accessing and using the Website and
          Services, you acknowledge that you have read, understood, and agree to be bound by the
          terms of this Policy. This Policy does not apply to the practices of companies that we do
          not own or control, or to individuals that we do not employ or manage.
        </p>
        <div>
          <h3 className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
            Table of contents
          </h3>
          <ol className="ml-8 list-disc">
            <li>
              <Link className="underline" href="#collection-of-personal-information">
                Collection of personal information
              </Link>
            </li>
            <li>
              <Link className="underline" href="#use-and-processing-of-collected-information">
                Use and processing of collected information
              </Link>
            </li>
            <li>
              <Link className="underline" href="#payment-processing">
                Payment processing
              </Link>
            </li>
            <li>
              <Link className="underline" href="#managing-information">
                Managing information
              </Link>
            </li>
            <li>
              <Link className="underline" href="#disclosure-of-information">
                Disclosure of information
              </Link>
            </li>
            <li>
              <Link className="underline" href="#retention-of-information">
                Retention of information
              </Link>
            </li>
            <li>
              <Link className="underline" href="#transfer-of-information">
                Transfer of information
              </Link>
            </li>
            <li>
              <Link className="underline" href="#region-specific-notices">
                Region specific notices
              </Link>
            </li>
            <li>
              <Link className="underline" href="#how-to-exercise-your-rights">
                How to exercise your rights
              </Link>
            </li>
            <li>
              <Link className="underline" href="#cookies">
                Cookies
              </Link>
            </li>
            <li>
              <Link className="underline" href="#privacy-of-children">
                Privacy of children
              </Link>
            </li>
            <li>
              <Link className="underline" href="#do-not-track-signals">
                Do Not Track signals
              </Link>
            </li>
            <li>
              <Link className="underline" href="#links-to-other-resources">
                Links to other resources
              </Link>
            </li>
            <li>
              <Link className="underline" href="#information-security">
                Information security
              </Link>
            </li>
            <li>
              <Link className="underline" href="#data-breach">
                Data breach
              </Link>
            </li>
            <li>
              <Link className="underline" href="#changes-and-amendments">
                Changes and amendments
              </Link>
            </li>
            <li>
              <Link className="underline" href="#acceptance-of-this-policy">
                Acceptance of this policy
              </Link>
            </li>
            <li>
              <Link className="underline" href="mailto:hello@embrave.app">
                Contacting us
              </Link>
            </li>
          </ol>
        </div>
        <h2
          className="mb-4 mt-10 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="collection-of-personal-information"
        >
          Collection of personal information
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You can access and use the Website and Services without telling us who you are or
          revealing any information by which someone could identify you as a specific, identifiable
          individual. If, however, you wish to use some of the features offered on the Website, you
          may be asked to provide certain Personal Information (for example, your name and email
          address).
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We receive and store any information you knowingly provide to us when you create an
          account, publish content, make a purchase, or fill any forms on the Website. When
          required, this information may include the following:
        </p>
        <ul>
          <li>Account details (such as user name, unique user ID, password, etc)</li>
          <li>Contact information (such as email address, phone number, etc)</li>
          <li>Basic personal information (such as name, country of residence, etc)</li>
          <li>
            Any other materials you willingly submit to us (such as articles, images, feedback, etc)
          </li>
        </ul>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Some of the information we collect is directly from you via the Website and Services.
          However, we may also collect Personal Information about you from other sources such as
          social media platforms, public databases, third-party data providers, and our joint
          partners. Personal Information we collect from other sources may include demographic
          information, such as age and gender, device information, such as IP addresses, location,
          such as city and state, and online behavioral data, such as information about your use of
          social media websites, page view information and search results and links.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You can choose not to provide us with your Personal Information, but then you may not be
          able to take advantage of some of the features on the Website. Users who are uncertain
          about what information is mandatory are welcome to contact us.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="use-and-processing-of-collected-information"
        >
          Use and processing of collected information
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We act as a data controller and a data processor when handling Personal Information,
          unless we have entered into a data processing agreement with you in which case you would
          be the data controller and we would be the data processor.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Our role may also differ depending on the specific situation involving Personal
          Information. We act in the capacity of a data controller when we ask you to submit your
          Personal Information that is necessary to ensure your access and use of the Website and
          Services. In such instances, we are a data controller because we determine the purposes
          and means of the processing of Personal Information.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We act in the capacity of a data processor in situations when you submit Personal
          Information through the Website and Services. We do not own, control, or make decisions
          about the submitted Personal Information, and such Personal Information is processed only
          in accordance with your instructions. In such instances, the User providing Personal
          Information acts as a data controller.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          In order to make the Website and Services available to you, or to meet a legal obligation,
          we may need to collect and use certain Personal Information. If you do not provide the
          information that we request, we may not be able to provide you with the requested products
          or services. Any of the information we collect from you may be used for the following
          purposes:
        </p>
        <ul>
          <li>Create and manage user accounts</li>
          <li>Deliver products or services</li>
          <li>Improve products and services</li>
          <li>Send marketing and promotional communications</li>
          <li>Send product and service updates</li>
          <li>Respond to inquiries and offer support</li>
          <li>Improve user experience</li>
          <li>Enforce terms and conditions and policies</li>
          <li>Protect from abuse and malicious users</li>
          <li>Respond to legal requests and prevent harm</li>
          <li>Run and operate the Website and Services</li>
        </ul>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Processing your Personal Information depends on how you interact with the Website and
          Services, where you are located in the world and if one of the following applies: (a) you
          have given your consent for one or more specific purposes; (b) provision of information is
          necessary for the performance of this Policy with you and/or for any pre-contractual
          obligations thereof; (c) processing is necessary for compliance with a legal obligation to
          which you are subject; (d) processing is related to a task that is carried out in the
          public interest or in the exercise of official authority vested in us; (e) processing is
          necessary for the purposes of the legitimate interests pursued by us or by a third party.
          We may also combine or aggregate some of your Personal Information in order to better
          serve you and to improve and update our Website and Services.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We rely on the following legal bases upon which we collect and process your Personal
          Information:
        </p>
        <ul>
          <li>User’s consent</li>
          <li>Performance of a contract</li>
          <li>Employment or social security obligations</li>
          <li>Compliance with the law and legal obligations</li>
          <li>Our own legitimate interests</li>
        </ul>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Note that under some legislations we may be allowed to process information until you
          object to such processing by opting out, without having to rely on consent or any other of
          the legal bases above. In any case, we will be happy to clarify the specific legal basis
          that applies to the processing, and in particular whether the provision of Personal
          Information is a statutory or contractual requirement, or a requirement necessary to enter
          into a contract.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="payment-processing"
        >
          Payment processing
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          In case of Services requiring payment, you may need to provide your credit card details or
          other payment account information, which will be used solely for processing payments. We
          use third-party payment processors (“Payment Processors”) to assist us in processing your
          payment information securely.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Payment Processors adhere to the latest security standards as managed by the PCI Security
          Standards Council, which is a joint effort of brands like Visa, MasterCard, American
          Express and Discover. Sensitive and private data exchange happens over a SSL secured
          communication channel and is encrypted and protected with digital signatures, and the
          Website and Services are also in compliance with strict vulnerability standards in order
          to create as secure of an environment as possible for Users. We will share payment data
          with the Payment Processors only to the extent necessary for the purposes of processing
          your payments, refunding such payments, and dealing with complaints and queries related to
          such payments and refunds.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Please note that the Payment Processors may collect some Personal Information from you,
          which allows them to process your payments (e.g., your email address, address, credit card
          details, and bank account number) and handle all the steps in the payment process through
          their systems, including data collection and data processing. The Payment Processors’ use
          of your Personal Information is governed by their respective privacy policies which may or
          may not contain privacy protections as protective as this Policy. We suggest that you
          review their respective privacy policies.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="managing-information"
        >
          Managing information
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You are able to delete certain Personal Information we have about you. The Personal
          Information you can delete may change as the Website and Services change. When you delete
          Personal Information, however, we may maintain a copy of the unrevised Personal
          Information in our records for the duration necessary to comply with our obligations to
          our affiliates and partners, and for the purposes described below. If you would like to
          delete your Personal Information or permanently delete your account, you can do so on the
          settings page of your account on the Website.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="disclosure-of-information"
        >
          Disclosure of information
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          To maintain the highest level of privacy and to protect your Personal Information to the
          full extent, we do not share your Personal Information with any third parties.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          However, we may also disclose any Personal Information we collect, use or receive if
          required or permitted by law, such as to comply with a subpoena or similar legal process,
          and when we believe in good faith that disclosure is necessary to protect our rights,
          protect your safety or the safety of others, investigate fraud, or respond to a government
          request.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          In the event we go through a business transition, such as a merger or acquisition by
          another company, or sale of all or a portion of its assets, your user account, and your
          Personal Information will likely be among the assets transferred.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="retention-of-information"
        >
          Retention of information
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We will retain and use your Personal Information for the period necessary to comply with
          our legal obligations, as long as your user account remains active, to enforce our Policy,
          resolve disputes, and unless a longer retention period is required or permitted by law.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We may use any aggregated data derived from or incorporating your Personal Information
          after you update or delete it, but not in a manner that would identify you personally.
          Once the retention period expires, Personal Information shall be deleted. Therefore, the
          right to access, the right to erasure, the right to rectification, and the right to data
          portability cannot be enforced after the expiration of the retention period.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="transfer-of-information"
        >
          Transfer of information
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Depending on your location, data transfers may involve transferring and storing your
          information in a country other than your own, including USA. The transfer of your Personal
          Information to countries outside the European Union will be made only if you have
          explicitly consented to it or in the cases provided for by the GDPR and the UK DPA and
          will be processed in your interest.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You are entitled to learn about the legal basis of information transfers to a country
          outside the European Union or to any international organization governed by public
          international law or set up by two or more countries, such as the UN, and about the
          security measures taken by us to safeguard your information. If any such transfer takes
          place, you can find out more by checking the relevant sections of this Policy or inquire
          with us using the information provided in the contact section. Note that we are dedicated
          to ensuring the security of your personal data, adhering strictly to the guidelines
          outlined in our privacy notice and conforming to the applicable legal requirements.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="region-specific-notices"
        >
          Region specific notices
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Out of respect for your privacy, we have implemented additional measures to comply with
          the obligations and rights associated with the collection of Personal Information as
          dictated by the laws governing the regions of our users.
        </p>
        <h3 className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
          Disclosures for residents of Australia
        </h3>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you are a resident of Australia, you have certain rights in relation to your Personal
          Information based on the Australian Privacy Act 1988 (“Privacy Act 1988”) that we comply
          with as part of our commitment to your privacy. This supplemental section, together with
          other relevant sections of the Policy, provides information about your rights and how to
          exercise them. Unless otherwise expressly stated, all terms in this section have the same
          meaning as defined in the Privacy Act 1988.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (a) Right to access and correct: You have the right to access Personal Information we hold
          about you. You also have the right to request corrections to your Personal Information if
          you think the information is inaccurate, out-of-date, incomplete, irrelevant or
          misleading.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (b) Right to restrict processing: You can request that we stop or restrict the processing
          of your Personal Information in certain circumstances, such as when you contest the
          accuracy of your data.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (c) Right to data portability: You have the right to request the transfer of your Personal
          Information to a different service provider as long as it is technically possible to do so
          or directly to you.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (d) Right to not be subject to automated decision-making: You have the right to opt out of
          decisions based solely on automated processing of your Personal Information, particularly
          when these decisions have legal or similarly significant effects on you.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (e) Right to anonymity: You are generally able to use a pseudonym or remain anonymous when
          interacting with us. However, in some circumstances, you may have to provide certain
          Personal Information. For example, we may require Personal Information to assess your
          eligibility for a program or service. We will inform you if you are not able to remain
          anonymous or use a pseudonym when dealing with us.
        </p>
        <h3 className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
          Disclosures for residents of Brazil
        </h3>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you are a resident of Brazil, you have certain rights in relation to your Personal
          Information based on the Brazilian General Data Protection Law (“LGPD”) that we comply
          with as part of our commitment to your privacy. This supplemental section, together with
          other relevant sections of the Policy, provides information about your rights and how to
          exercise them. Unless otherwise expressly stated, all terms in this section have the same
          meaning as defined in the LGPD.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (a) Right to know and access: You have the right to confirm whether we process your
          Personal Information and, if so, access it. This ensures you are fully informed about the
          data we hold and how it&apos;s used.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (b) Right to correct: You have the right to correct Personal Information if you find any
          of it in our possession to be incorrect or outdated as we are committed to maintaining the
          accuracy and relevance of your Personal Information.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (c) Right to anonymize and block: You can request the anonymization or blocking of
          Personal Information that is unnecessary, excessive, or not processed in compliance with
          the LGPD.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (d) Right to data portability: You have the right to transfer your data to another service
          provider or product supplier, promoting your freedom to choose services without losing
          your data history.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (e) Right to delete: If we have processed your data based on consent, you can request its
          deletion, except where law requires or permits us to retain it.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (f) Right to information about third parties: You can ask about the third parties with
          whom we share your data, ensuring transparency in our data sharing practices.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (g) Right to information on consent denial: You have the right to be informed about the
          consequences of not providing consent to make informed decisions about the use of your
          Personal Information.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (h) Right to withdraw consent: You can withdraw your consent for data processing at any
          time to ensure control over your Personal Information.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (i) Right to review automated decisions: You can request a review of decisions made solely
          based on automated processing of your data to ensure fairness and accuracy in processes
          that significantly impact you.
        </p>
        <h3 className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
          Disclosures for residents of Canada
        </h3>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you are a resident of Canada, you have certain rights in relation to your Personal
          Information based on the Personal Information Protection and Electronic Documents Act
          (“PIPEDA”) that we comply with as part of our commitment to your privacy. This
          supplemental section, together with other relevant sections of the Policy, provides
          information about your rights and how to exercise them. Unless otherwise expressly stated,
          all terms in this section have the same meaning as defined in the PIPEDA.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (a) Right to access: You have the right to access the Personal Information we hold about
          you if you wish to review, verify, or correct your information.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (b) Right to correct: We strive to maintain the accuracy of your Personal Information and
          will promptly make necessary corrections when you identify inaccuracies in your data.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (c) Right to withdraw consent: You can withdraw your consent regarding the handling of
          your Personal Information at any time, subject to legal or contractual limitations.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (d) Right to complain: You have the right to file a complaint with the Privacy
          Commissioner of Canada if you feel your Personal Information is being handled in a way
          that violates PIPEDA.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (e) Right to challenge compliance: You can challenge our compliance with PIPEDA, including
          how we handle your Personal Information, consent, access requests, and how we respond to
          your correction requests.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (f) Right to know about breaches: You have the right to be notified in cases of a security
          breach involving your Personal Information that poses a real risk of significant harm.
        </p>
        <h3 className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
          Disclosures for residents of the EU/EEA and the UK
        </h3>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you are a resident of the European Union (“EU”), the European Economic Area (“EEA”), or
          the United Kingdom (“UK”), you have certain rights in relation to your Personal
          Information based on the GDPR and the UK DPA that we comply with as part of our commitment
          to your privacy. Unless otherwise expressly stated, all terms in this section have the
          same meaning as defined in the GDPR and the UK DPA.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (a) Right to withdraw consent: You have the right to withdraw consent where you have
          previously given your consent to the processing of your Personal Information. To the
          extent that the legal basis for our processing of your Personal Information is consent,
          you have the right to withdraw that consent at any time. Withdrawal will not affect the
          lawfulness of processing before the withdrawal.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (b) Right to access: You have the right to learn if your Personal Information is being
          processed by us, obtain disclosure regarding certain aspects of the processing, and obtain
          a copy of your Personal Information undergoing processing.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (c) Right to rectification: You have the right to verify the accuracy of your information
          and ask for it to be updated or corrected. You also have the right to request us to
          complete the Personal Information you believe is incomplete.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (d) Right to object to the processing: You have the right to object to the processing of
          your information if the processing is carried out on a legal basis other than consent.
          Where Personal Information is processed for the public interest, in the exercise of an
          official authority vested in us, or for the purposes of the legitimate interests pursued
          by us, you may object to such processing by providing a ground related to your particular
          situation to justify the objection.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (e) Right to restrict processing: You have the right, under certain circumstances, to
          restrict the processing of your Personal Information. These circumstances include: the
          accuracy of your Personal Information is contested by you and we must verify its accuracy;
          the processing is unlawful, but you oppose the erasure of your Personal Information and
          request the restriction of its use instead; we no longer need your Personal Information
          for the purposes of processing, but you require it to establish, exercise or defend your
          legal claims; you have objected to processing pending the verification of whether our
          legitimate grounds override your legitimate grounds. Where processing has been restricted,
          such Personal Information will be marked accordingly and, with the exception of storage,
          will be processed only with your consent or for the establishment, to exercise or defense
          of legal claims, for the protection of the rights of another natural, or legal person or
          for reasons of important public interest.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (f) Right to delete: You have the right, under certain circumstances, to obtain the
          erasure of your Personal Information from us. These circumstances include: the Personal
          Information is no longer necessary in relation to the purposes for which it was collected
          or otherwise processed; you withdraw consent to consent-based processing; you object to
          the processing under certain rules of applicable data protection law; the processing is
          for direct marketing purposes; and the personal data have been unlawfully processed.
          However, there are exclusions of the right to erasure such as where processing is
          necessary: for exercising the right of freedom of expression and information; for
          compliance with a legal obligation; or for the establishment, to exercise or defense of
          legal claims.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (g) Right to data portability: You have the right to receive your Personal Information
          that you have provided to us in a structured, commonly used, and machine-readable format
          and, if technically feasible, to have it transmitted to another controller without any
          hindrance from us, provided that such transmission does not adversely affect the rights
          and freedoms of others.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (h) Right to complaint: You have the right to complain to a data protection authority
          about our collection and use of your Personal Information. If you are not satisfied with
          the outcome of your complaint directly with us, you have the right to lodge a complaint
          with your local data protection authority. For more information, please contact your local
          data protection authority in the EU or the EEA. This provision is applicable provided that
          your Personal Information is processed by automated means and that the processing is based
          on your consent, on a contract which you are part of, or on pre-contractual obligations
          thereof.
        </p>
        <h3 className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
          Disclosures for residents of New Zealand
        </h3>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you are a resident of New Zealand, you have certain rights in relation to your Personal
          Information based on the New Zealand’s Privacy Act 2020 (“Privacy Act 2020”) that we
          comply with as part of our commitment to your privacy. This supplemental section, together
          with other relevant sections of the Policy, provides information about your rights and how
          to exercise them. Unless otherwise expressly stated, all terms in this section have the
          same meaning as defined in the Privacy Act 2020.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (a) Right to Access: You have the right to access your Personal Information that we hold,
          enabling you to review and understand the data we have about you for transparency and
          accuracy.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (b) Right to Correction: If your Personal Information is incorrect or outdated, you have
          the right to request its correction, ensuring that the information we hold is accurate and
          up-to-date.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (c) Right to Make a Complaint: If you believe your privacy rights have been breached, you
          have the right to make a complaint to a data protection authority.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (d) Right to Object to Automated Decision-making: You can object to decisions made solely
          on automated processing of your Personal Information that have significant effects on you,
          ensuring a fair and transparent decision-making process.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (e) Right to Data Portability: Where applicable, you have the right to request the
          transfer of your Personal Information to another service provider if technically possible
          or directly to you.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (f) Right to Anonymity and Pseudonymity: Where possible, you have the option to interact
          with us without revealing your identity or by using a pseudonym, offering flexibility and
          control over your personal engagement.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (g) Notification of Data Breaches: In the event of a data breach that may harm your
          privacy, we will notify you promptly, taking immediate steps to mitigate any potential
          impacts.
        </p>
        <h3 className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12">
          Disclosures for residents of the USA
        </h3>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you are a resident of California, Colorado, Connecticut, Delaware, Iowa, Maryland,
          Utah, or Virginia, you have certain rights and we aim to take reasonable steps to allow
          you to correct, amend, delete, or limit the use of your Personal Information. This
          supplemental section, together with other relevant sections of the Policy, provides
          information about your rights and how to exercise them under the California Consumer
          Privacy Act and the California Privacy Rights Act (collectively, “CCPA”), the Colorado
          Privacy Act (“CPA”), the Connecticut Data Privacy Act (“CDPA”), the Delaware Online
          Privacy and Protection Act (“DOPPA”), the Iowa Consumer Data Protection Act (“ICDPA”), the
          Maryland Personal Information Protection Act (“PIPA”), the Utah Consumer Privacy Act
          (“UCPA”), the Virginia Consumer Data Protection Act (“VCDPA”), and any and all regulations
          arising therefrom. Unless otherwise expressly stated, all terms in this section have the
          same meaning as defined in the related state laws.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          In addition to the rights as explained in this Policy, if you provide Personal Information
          as defined in the statute to obtain Services for personal, family, or household use, you
          have the right to submit requests related to your Personal Information once a calendar
          year. Note that there are circumstances when we may not be able to comply with your
          request such as when we are not able to verify your request or find that providing a full
          response conflicts with other legal obligations or regulatory requirements. You will be
          notified if it’s the case.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (a) Right to know and right to access: You have the right to request certain information
          we have collected about you. Once we receive and confirm a verifiable request from you, we
          will disclose to you, to the extent permitted by law:
        </p>
        <ul>
          <li>The specific pieces of Personal Information we hold about you.</li>
          <li>The categories of sources from which Information about you is collected.</li>
          <li>The purposes for collecting, selling, or sharing your Personal Information.</li>
        </ul>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You have the right to request that the Personal Information is delivered in a format that
          is both portable and easily usable, as long as it is technically possible to do so.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (b) Right to correct: You have the right to request that we correct your inaccurate
          Personal Information taking into account the nature of the Personal Information and the
          purposes of the processing of the Personal Information.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (c) Right to delete: You have the right to request deletion of your Personal Information.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (d) Right to opt-out of the sale and sharing: You have the right to opt-out of the sale of
          your Personal Information which may include selling, disclosing, or transferring Personal
          Information to another business or a third party for monetary or other valuable
          consideration.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (e) Right to consent to or limit the use of your sensitive personal information: You have
          the right to consent to the use of your Sensitive Personal information and to direct us to
          restrict its use and disclosure solely to what is essential for carrying out or delivering
          the Services in a manner reasonably anticipated by an average user, or for certain
          business objectives as specified by law. However, we do not use Sensitive Personal
          Information for any purposes other than those legally permitted or beyond the scope of
          your consent.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (f) Right to non-discrimination: You have the right to not be discriminated against in the
          Services or quality of Services you receive from us for exercising your rights. We may
          not, and will not, treat you differently because of your data subject request activity,
          and we may not and will not deny goods or Services to you, charge different rates for
          goods or Services, provide a different level quality of goods or Services, or suggest that
          we would treat you differently because of your data subject request activity.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          (g) Shine the Light: California residents that have an established business relationship
          with us have the right to know how their personal information is disclosed to third
          parties for their direct marketing purposes under California’s “Shine the Light” law, or
          the right to opt out of such practices.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          To exercise any of your rights, simply contact us using the details below. After we
          receive and verify your request, we will process it to the extent possible within our
          capabilities.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="how-to-exercise-your-rights"
        >
          How to exercise your rights
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Any requests to exercise your rights can be directed to us through the contact details
          provided in this document. Please note that we may ask you to verify your identity before
          responding to such requests. Your request must provide sufficient information that allows
          us to verify that you are the person you are claiming to be or that you are the authorized
          representative of such person. If we receive your request from an authorized
          representative, we may request evidence that you have provided such an authorized
          representative with power of attorney or that the authorized representative otherwise has
          valid written authority to submit requests on your behalf.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You must include sufficient details to allow us to properly understand the request and
          respond to it. We cannot respond to your request or provide you with Personal Information
          unless we first verify your identity or authority to make such a request and confirm that
          the Personal Information relates to you.
        </p>
        <h2 className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12" id="cookies">
          Cookies
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Our Website and Services use “cookies” to help personalize your online experience. A
          cookie is a text file that is placed on your hard disk by a web page server. Cookies
          cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely
          assigned to you, and can only be read by a web server in the domain that issued the cookie
          to you. If you choose to decline cookies, you will not be able to use and experience the
          features of the Website and Services.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We may use cookies to collect, store, and track information for security and
          personalization, to operate the Website and Services, and for statistical purposes. Please
          note that you have the ability to accept or decline cookies. Most web browsers
          automatically accept cookies by default, but you can modify your browser settings to
          decline cookies if you prefer.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="privacy-of-children"
        >
          Privacy of children
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We do not knowingly collect any Personal Information from children under the age of 18. If
          you are under the age of 18, please do not submit any Personal Information through the
          Website and Services. If you have reason to believe that a child under the age of 18 has
          provided Personal Information to us through the Website and Services, please contact us to
          request that we delete that child’s Personal Information from our Services.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We encourage parents and legal guardians to monitor their children’s Internet usage and to
          help enforce this Policy by instructing their children never to provide Personal
          Information through the Website and Services without their permission. We also ask that
          all parents and legal guardians overseeing the care of children take the necessary
          precautions to ensure that their children are instructed to never give out Personal
          Information when online without their permission.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="do-not-track-signals"
        >
          Do Not Track signals
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Some browsers incorporate a Do Not Track feature that signals to websites you visit that
          you do not want to have your online activity tracked. Tracking is not the same as using or
          collecting information in connection with a website. For these purposes, tracking refers
          to collecting personally identifiable information from users who use or visit a website or
          online service as they move across different websites over time. How browsers communicate
          the Do Not Track signal is not yet uniform. As a result, the Website and Services are not
          yet set up to interpret or respond to Do Not Track signals communicated by your browser.
          Even so, as described in more detail throughout this Policy, we limit our use and
          collection of your Personal Information. For a description of Do Not Track protocols for
          browsers and mobile devices or to learn more about the choices available to you, visit{' '}
          <a href="https://www.internetcookies.com">internetcookies.com</a>
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="links-to-other-resources"
        >
          Links to other resources
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          The Website and Services contain links to other resources that are not owned or controlled
          by us. Please be aware that we are not responsible for the privacy practices of such other
          resources or third parties. We encourage you to be aware when you leave the Website and
          Services and to read the privacy statements of each and every resource that may collect
          Personal Information.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="information-security"
        >
          Information security
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We secure information you provide on computer servers in a controlled, secure environment,
          protected from unauthorized access, use, or disclosure. We maintain reasonable
          administrative, technical, and physical safeguards in an effort to protect against
          unauthorized access, use, modification, and disclosure of Personal Information in our
          control and custody. However, no data transmission over the Internet or wireless network
          can be guaranteed.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Therefore, while we strive to protect your Personal Information, you acknowledge that (a)
          there are security and privacy limitations of the Internet which are beyond our control;
          (b) the security, integrity, and privacy of any and all information and data exchanged
          between you and the Website and Services cannot be guaranteed; and (c) any such
          information and data may be viewed or tampered with in transit by a third party, despite
          best efforts.
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          As the security of Personal Information depends in part on the security of the device you
          use to communicate with us and the security you use to protect your credentials, please
          take appropriate measures to protect this information.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="data-breach"
        >
          Data breach
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          In the event we become aware that the security of the Website and Services has been
          compromised or Users’ Personal Information has been disclosed to unrelated third parties
          as a result of external activity, including, but not limited to, security attacks or
          fraud, we reserve the right to take reasonably appropriate measures, including, but not
          limited to, investigation and reporting, as well as notification to and cooperation with
          law enforcement authorities. In the event of a data breach, we will make reasonable
          efforts to notify affected individuals if we believe that there is a reasonable risk of
          harm to the User as a result of the breach or if notice is otherwise required by law. When
          we do, we will post a notice on the Website, send you an email.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
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
          will constitute your consent to those changes. However, we will not, without your consent,
          use your Personal Information in a manner materially different than what was stated at the
          time your Personal Information was collected.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="acceptance-of-this-policy"
        >
          Acceptance of this policy
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You acknowledge that you have read this Policy and agree to all its terms and conditions.
          By accessing and using the Website and Services and submitting your information you agree
          to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you
          are not authorized to access or use the Website and Services.
        </p>
        <h2
          className="mb-4 scroll-mt-28 font-nexa text-2xl font-bold text-sand-12"
          id="contacting-us"
        >
          Contacting us
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you have any questions regarding the information we may hold about you or if you wish
          to exercise your rights, you may use the following data subject request form to submit
          your request:
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          <a href="https://app.websitepolicies.com/dsar/view/up7ek0an">
            Submit a data access request
          </a>
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you have any other questions, concerns, or complaints regarding this Policy, we
          encourage you to contact us using the details below:
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;hell&#111;&#64;&#101;&#109;&#98;r&#97;ve.a&#112;&#112;">
            &#104;e&#108;lo&#64;em&#98;r&#97;ve.&#97;p&#112;
          </a>
        </p>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          We will attempt to resolve complaints and disputes and make every reasonable effort to
          honor your wish to exercise your rights as quickly as possible and in any event, within
          the timescales provided by applicable data protection laws.
        </p>
        <div className="mb-4 font-inter text-base leading-18 text-sand-12">
          This document was last updated on September 13, 2024
          <p className="madewith">
            <a href="https://www.websitepolicies.com/privacy-policy-generator?via=madewithbadge">
              <img
                width="200"
                height="25"
                alt="Made with WebsitePolicies privacy policy generator"
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
