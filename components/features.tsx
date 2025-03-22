import { Code, Laptop, Lightbulb, Rocket, Trophy, Users } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Features() {
  const features = [
    {
      icon: <Code className="text-primary h-10 w-10" />,
      title: 'Coding Workshops',
      description:
        'Regular hands-on coding sessions in various programming languages and frameworks.',
    },
    {
      icon: <Lightbulb className="text-primary h-10 w-10" />,
      title: 'Tech Talks',
      description:
        'Insightful presentations from industry experts and academic professionals.',
    },
    {
      icon: <Users className="text-primary h-10 w-10" />,
      title: 'Networking',
      description:
        'Connect with like-minded individuals and build your professional network.',
    },
    {
      icon: <Trophy className="text-primary h-10 w-10" />,
      title: 'Competitions',
      description:
        'Participate in hackathons, coding contests, and other tech competitions.',
    },
    {
      icon: <Laptop className="text-primary h-10 w-10" />,
      title: 'Project Mentorship',
      description:
        'Get guidance and support for your personal and team projects.',
    },
    {
      icon: <Rocket className="text-primary h-10 w-10" />,
      title: 'Innovation Lab',
      description:
        'Access to resources and tools to bring your innovative ideas to life.',
    },
  ];

  return (
    <section id="features" className="bg-muted w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What We Offer
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl">
            Explore the various activities and opportunities available to our
            members
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
