// import NextAuth from 'next-auth';
// import Google from 'next-auth/providers/google';

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//       authorization: {
//         params: {
//           prompt: 'consent',
//           access_type: 'offline',
//           response_type: 'code',
//         },
//       },
//     }),
//   ],
// });

// import { handlers } from '@/app/auth';

// export const { GET, POST } = handlers;

import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
