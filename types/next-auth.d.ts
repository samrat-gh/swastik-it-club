import { DefaultSession } from 'next-auth';

import { Role } from './user';
declare module 'next-auth' {
  // Extend session to hold the access_token
  interface Session {
    user: {
      id: string;
      name: string;
      email?: string;
      role: Role;
      image?: string;
    } & DefaultSession;
  }
}
