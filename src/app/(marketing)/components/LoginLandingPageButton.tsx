'use client';

import { useRouter } from 'next/navigation';
import { ClerkProvider, SignInButton } from '@clerk/nextjs';

type LoginLandingPageButtonProps = {
  isSignedIn: boolean;
};

export default function LoginLandingPageButton(props: LoginLandingPageButtonProps) {
  const router = useRouter();

  return (
    <div>
      {props.isSignedIn ? (
        <button
          onClick={() => router.push('/')}
          className="text-body-l-book h-fit max-w-fit rounded-lg bg-sand-2 p-3 text-sand-12"
        >
          Go to app
        </button>
      ) : (
        <ClerkProvider>
          <SignInButton mode="modal">
            <button className="text-body-l-book h-fit max-w-fit rounded-lg bg-sand-2 p-3 text-sand-12">
              Log in
            </button>
          </SignInButton>
        </ClerkProvider>
      )}
    </div>
  );
}
