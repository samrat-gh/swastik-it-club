import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Events() {
  const events = [
    {
      title: 'Web Development Bootcamp',
      date: 'April 15, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Computer Lab, Swastik College',
      description:
        'A comprehensive bootcamp covering HTML, CSS, JavaScript, and React fundamentals.',
      status: 'Upcoming',
      image: '/event-webdev.jpg',
    },
    {
      title: 'AI & Machine Learning Workshop',
      date: 'May 5, 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'Seminar Hall, Swastik College',
      description:
        'Introduction to AI concepts and hands-on practice with machine learning algorithms.',
      status: 'Upcoming',
      image: '/event-ai.jpg',
    },
    {
      title: 'Annual Hackathon',
      date: 'June 10-12, 2025',
      time: '48 Hours',
      location: 'Main Campus, Swastik College',
      description:
        'Our flagship event where teams compete to build innovative solutions to real-world problems.',
      status: 'Registration Open',
      image: '/event-hackathon.jpg',
    },
  ];

  return (
    <section id="events" className="bg-background w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl">
            Join us for exciting workshops, hackathons, and tech talks
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg">
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>
                <div className="absolute top-3 right-3 z-20">
                  <Badge variant="secondary" className="bg-primary text-white">
                    {event.status}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{event.description}</p>

                <div className="text-muted-foreground flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{event.date}</span>
                </div>

                <div className="text-muted-foreground flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{event.time}</span>
                </div>

                <div className="text-muted-foreground flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 w-full"
                >
                  Register Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
