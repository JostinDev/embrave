import React from 'react';
import Image from 'next/image';

import hero from '@/app/(app)/hero.png';
import logo from '@/app/(app)/images/logo.svg';

export default function TermsAndConditions() {
  return (
    <div>
      <div className="fixed left-8 top-4 z-20 flex flex-col md:bottom-8">
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
        <h1 className="mb-4 font-nexa text-xl font-bold text-sand-12">Embrave User Agreement</h1>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Welcome to Embrave! This User Agreement (&quot;Agreement&quot;) is a legal contract
          between you and Embrave governing your use of the Embrave website (the &quot;Site&quot;)
          and any services provided through the Site.
        </p>
        <h2 className="mb-4 font-nexa text-xl font-bold text-sand-12">1. Acceptance of Terms</h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          By accessing or using the Site, you agree to be bound by this Agreement.If you do not
          agree to all the terms and conditions of this Agreement, you may not use the Site.
        </p>
        <h2 className="mb-4 font-nexa text-xl font-bold text-sand-12">2. Description of Service</h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Embrave provides a platform where users can find and participate in various challenges,
          which may include physical, mental, or other activities. These challenges may vary in
          difficulty and risk level.
        </p>
        <h2 className="mb-4 font-nexa text-xl font-bold text-sand-12">3. User Responsibilities</h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You understand and acknowledge that participation in any challenge is entirely voluntary
          and at your own risk. You agree to take full responsibility for your actions and any
          consequences that may arise from participating in challenges listed on the Site.
        </p>
        <h2 className="mb-4 font-nexa text-xl font-bold text-sand-12">4. Assumption of Risk</h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You acknowledge that some challenges listed on the Site may involve inherent risks,
          including but not limited to physical injury, emotional distress, or property damage. You
          agree to assume all risks associated with participating in any challenge and to exercise
          caution and judgment at all times.
        </p>
        <h2 className="mb-4 font-nexa text-xl font-bold text-sand-12">5. Release of Liability</h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You hereby release Embrave, its affiliates, and their respective officers, directors,
          employees, and agents from any and all liability, claims, demands, and damages (actual and
          consequential) of every kind and nature, known and unknown, arising out of or in any way
          connected with your participation in any challenge listed on the Site.
        </p>
        <h2 className="mb-4 font-nexa text-xl font-bold text-sand-12">6. Content Guidelines</h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You agree not to post any content that is unlawful, harmful, threatening, abusive,
          harassing, defamatory, vulgar, obscene, libelous, invasive of another&apos;s privacy,
          hateful, or racially, ethnically, or otherwise objectionable.
        </p>
        <h2 className="mb-4 font-nexa text-xl font-bold text-sand-12">7. Intellectual Property</h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          You acknowledge that all content on the Site, including but not limited to text, graphics,
          logos, images, and software, is the property of Embrave or its licensors and is protected
          by copyright, trademark, and other intellectual property laws.
        </p>
        <h2 className="mb-4 font-nexa text-xl font-bold text-sand-12">
          8. Modifications to Service
        </h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          Embrave reserves the right to modify or discontinue, temporarily or permanently, the Site
          or any part thereof with or without notice. You agree that Embrave shall not be liable to
          you or to any third party for any modification, suspension, or discontinuance of the Site.
        </p>
        <h2 className="mb-4 font-nexa text-xl font-bold text-sand-12">9. Governing Law</h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          This Agreement shall be governed by and construed in accordance with the laws of [Your
          jurisdiction], without regard to its conflict of law principles.
        </p>
        <h2 className="mb-4 font-nexa text-xl font-bold text-sand-12">10. Contact Information</h2>
        <p className="mb-4 font-inter text-base leading-18 text-sand-12">
          If you have any questions or concerns about this Agreement, please contact us at [contact
          email]. By using the Embrave website, you acknowledge that you have read, understood, and
          agree to be bound by this Agreement.
        </p>
      </div>
    </div>
  );
}
