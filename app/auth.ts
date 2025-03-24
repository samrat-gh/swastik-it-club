import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import { createUser, fetchUserWithEmail } from '@/app/_actions/user';
import { authConfig } from '@/lib/auth.config';
import db from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await fetchUserWithEmail(user?.email || '');
        console.log('dbUser', dbUser);
        if (!dbUser) {
          const res = await createUser({
            name: user.name!,
            email: user.email!,
            image: user.image!,
          });
          token.id = res.id;
          return token;
        }

        token.id = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.picture = dbUser.image;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        // session.user.id = token.id;
        session.user.name = token.name as string;
        session.user.email = token.email!;
        session.user.image = token.picture as string;
      }

      return session;
    },

    redirect() {
      return '/login';
    },
  },
});
