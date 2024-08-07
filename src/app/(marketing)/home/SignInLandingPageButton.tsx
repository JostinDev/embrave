'use client';

import { useRouter } from 'next/navigation';
import { ClerkProvider, SignInButton } from '@clerk/nextjs';

type SignInLandingPageButtonProps = {
  isSignedIn: boolean;
};

export default function SignInLandingPageButton(props: SignInLandingPageButtonProps) {
  const router = useRouter();

  return (
    <div>
      {props.isSignedIn ? (
        <button
          onClick={() => router.push('/')}
          className="h-fit max-w-fit rounded-lg bg-sand-2 p-3 font-inter text-base leading-18 text-sand-12"
        >
          Go to app
        </button>
      ) : (
        <ClerkProvider>
          <SignInButton mode="modal">
            <button className="h-fit max-w-fit rounded-lg bg-sand-2 p-3 font-inter text-base leading-18 text-sand-12">
              Log in
            </button>
          </SignInButton>
        </ClerkProvider>
      )}
    </div>
  );
}
