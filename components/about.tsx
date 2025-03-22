import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function About() {
  return (
    <section id="about" className="bg-background w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About Our Club
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl">
            Swastik IT Club is a student-led organization dedicated to fostering
            technological innovation and skill development.
          </p>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="text-muted-foreground">
              To create a collaborative environment where students can learn,
              share knowledge, and develop technical skills that prepare them
              for the future of technology.
            </p>

            <h3 className="mt-8 text-2xl font-bold">Our Vision</h3>
            <p className="text-muted-foreground">
              To be the leading technology club that inspires innovation,
              fosters technical excellence, and builds a community of future
              tech leaders.
            </p>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-xl shadow-xl">
            <div className="from-primary/20 absolute inset-0 z-10 bg-gradient-to-br to-purple-500/20"></div>
            <Image
              src="/about-image.jpg"
              alt="Students collaborating"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Established</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2018</p>
              <CardDescription>
                Founded with a vision to promote tech culture
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Members</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">200+</p>
              <CardDescription>
                Active student participants from various departments
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">50+</p>
              <CardDescription>
                Successful tech projects completed by our members
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
