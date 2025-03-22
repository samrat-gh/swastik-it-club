import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  // Extend session to hold the access_token
  interface Session {
    user: {
      id: string;
      name: string;
      email?: string;
      image?: string;
    } & DefaultSession;
  }
}
