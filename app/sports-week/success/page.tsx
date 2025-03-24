'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timeout = setTimeout(() => {
      router.push('/sports-week');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-12">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          Registration Successful!
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Thank you for registering for Sports Week. We will contact you with
          further details.
        </p>
        <div className="mt-6">
          <Link
            href="/sports-week"
            className="text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            ← Back to Sports Week
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          You will be redirected automatically in 5 seconds...
        </p>
      </div>
    </div>
  );
}
