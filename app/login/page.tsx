'use client';

import { signIn } from 'next-auth/react';

const LoginPage = () => {
  return (
    <div className="grid h-screen w-full place-content-center">
      <form
        action={() => {
          signIn('google');
        }}
      >
        <button
          type="submit"
          className="rounded-md bg-slate-500 px-6 py-2 transition-transform duration-200 hover:bg-slate-600 active:scale-95"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
