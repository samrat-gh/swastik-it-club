import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { fullName, email, semester, faculty, phoneNumber, sports } =
      await req.json();

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !semester ||
      !faculty ||
      !sports ||
      sports.length === 0
    ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if participant already exists
    const existingParticipant = await prisma.participant.findUnique({
      where: { email },
    });

    if (existingParticipant) {
      return NextResponse.json(
        { message: 'You have already registered for Sports Week' },
        { status: 400 }
      );
    }

    // Create participant
    const participant = await prisma.participant.create({
      data: {
        fullName,
        email,
        semester,
        faculty,
        phoneNumber,
        sports,
        // user: {
        //   connect: { email }, // Assuming the user is identified by their email
        // },
      },
    });

    return NextResponse.json(
      {
        message: 'Registration successful',
        participant: {
          fullName: participant.fullName,
          email: participant.email,
          sports: participant.sports,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
