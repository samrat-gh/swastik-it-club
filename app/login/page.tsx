'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Suspense, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle any error messages from URL parameters

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('google', {
        redirect: false,
      });

      if (result?.error) {
        setError('Error signing in with Google. Please try again.');
        setIsLoading(false);
        return;
      }

      // Manually redirect to the sports week page after successful authentication
      router.refresh();
    } catch (error) {
      setError('Error signing in with Google. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Suspense>
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Use your Google account to sign in
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
          </button>
        </div>
      </div>
    </Suspense>
  );
}
