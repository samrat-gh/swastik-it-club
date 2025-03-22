import { Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Team() {
  const teamMembers = [
    {
      name: 'Aditya Sharma',
      role: 'President',
      bio: 'Computer Science student with expertise in web development and AI.',
      image: '/team-member1.jpg',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#',
      },
    },
    {
      name: 'Priya Patel',
      role: 'Vice President',
      bio: 'Information Technology student passionate about cybersecurity and blockchain.',
      image: '/team-member2.jpg',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#',
      },
    },
    {
      name: 'Rahul Verma',
      role: 'Technical Lead',
      bio: 'Full-stack developer with experience in React, Node.js, and cloud technologies.',
      image: '/team-member3.jpg',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#',
      },
    },
    {
      name: 'Neha Singh',
      role: 'Event Coordinator',
      bio: 'Creative problem-solver with strong organizational and communication skills.',
      image: '/team-member4.jpg',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#',
      },
    },
  ];

  return (
    <section id="team" className="bg-muted w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl">
            The dedicated individuals who make Swastik IT Club possible
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden border-none shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={member.image || '/placeholder.svg'}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <CardHeader className="pt-4 pb-2">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  {member.role}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-2">
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </CardContent>

              <CardFooter className="flex justify-start gap-2">
                <Link
                  href={member.social.linkedin}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href={member.social.github}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href={member.social.twitter}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
