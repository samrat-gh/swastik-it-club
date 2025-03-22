'use server';

import db from '@/lib/db';

export async function fetchUserWithEmail(email: string) {
  const res = await db.user.findUnique({
    where: { email },
  });

  return res;
}

export async function createUser(data: {
  name: string;
  email: string;
  image: string;
}) {
  console.log(data);
  const res = await db.user.create({
    data,
  });
  console.log(res);
  return res;
}
