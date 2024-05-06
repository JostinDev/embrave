import { ClerkProvider, SignInButton } from '@clerk/nextjs';

export default function LandingPage() {
  return (
    <div>
      <p>Igor</p>
      <ClerkProvider>
        <SignInButton mode="modal">
          <button className="text-body-l-book h-fit max-w-fit rounded-lg bg-sand-12 p-3 text-sand-3">
            Login
          </button>
        </SignInButton>
      </ClerkProvider>
    </div>
  );
}
