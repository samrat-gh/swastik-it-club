'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export default function UserMenu() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!session) {
    return (
      <Link href="/login" className="cursor-pointer">
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
        >
          Login
        </Button>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 rounded-full bg-white p-2 hover:shadow-md"
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || 'User'}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
            {session.user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
      </button>

      {isMenuOpen && (
        <div className="ring-opacity-5 absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black">
          <div className="px-4 py-2">
            <p className="text-sm font-medium text-gray-900">
              {session.user?.name}
            </p>
            <p className="text-sm text-gray-500">{session.user?.email}</p>
          </div>
          <div className="border-t border-gray-100">
            <button
              onClick={() => signOut()}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
