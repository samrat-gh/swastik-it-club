import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const authConfig = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  //   callbacks: {
  //     async signIn({ account, profile }) {
  //       if (account?.provider === 'google') {
  //         return profile?.email_verified && profile.email.endsWith('@example.com');
  //       }
  //       return true; // Do different verification for other providers that don't have `email_verified`
  //     },
  //   },
});
