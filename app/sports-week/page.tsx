import { ArrowLeft, Calendar, MapPin, Trophy, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import SportsNav from './component/sports-nav';

export default function SportsWeekPage() {
  const sports = [
    { id: 'cricket', name: 'Cricket', participants: 44, teams: 4 },
    { id: 'football', name: 'Football', participants: 66, teams: 6 },
    { id: 'basketball', name: 'Basketball', participants: 40, teams: 4 },
    { id: 'volleyball', name: 'Volleyball', participants: 48, teams: 6 },
    { id: 'badminton', name: 'Badminton', participants: 32, teams: 0 },
    { id: 'table-tennis', name: 'Table Tennis', participants: 24, teams: 0 },
  ];

  return (
    <>
      <SportsNav />
      <main className="min-h-screen pt-20 pb-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex flex-col items-start justify-center">
            <Link href="/" className="">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Sports Week 2025</h1>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="text-primary mr-2 h-4 w-4" />
                  <p>April 2-9, 2025 | Starting at 7:00 AM</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Participants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="text-primary mr-2 h-4 w-4" />
                  <p>250+ Students from Various Departments</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <MapPin className="text-primary mr-2 h-4 w-4" />
                  <p>Swastik College Sports Complex</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">About Sports Week</h2>
            <p className="text-muted-foreground mb-4">
              The annual Swastik College Sports Week is a celebration of
              athletic excellence, teamwork, and sportsmanship. Students from
              all departments come together to compete in various sports
              disciplines, showcasing their talents and building lasting
              friendships. The event promotes physical fitness, mental
              well-being, and a healthy competitive spirit.
            </p>
            <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Sports Week"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="mb-6 flex items-center text-2xl font-bold">
              <Trophy className="text-primary mr-2 h-6 w-6" />
              Sports & Participants
            </h2>

            <Tabs defaultValue="cricket" className="w-full">
              <TabsList className="mb-6 grid grid-cols-3 md:grid-cols-6">
                {sports.map((sport) => (
                  <TabsTrigger key={sport.id} value={sport.id}>
                    {sport.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {sports.map((sport) => (
                <TabsContent
                  key={sport.id}
                  value={sport.id}
                  className="rounded-lg border p-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 text-xl font-bold">{sport.name}</h3>
                      <p className="text-muted-foreground mb-4">
                        {sport.teams > 0
                          ? `${sport.participants} participants across ${sport.teams} teams will compete in the ${sport.name} tournament.`
                          : `${sport.participants} individual participants will compete in the ${sport.name} tournament.`}
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Format:</span>
                          <span>{sport.teams > 0 ? 'Team' : 'Individual'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Venue:</span>
                          <span>{sport.name} Court/Field</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Preliminary Rounds:</span>
                          <span>April 2-5, 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Finals:</span>
                          <span>April 8, 2025</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative h-[200px] overflow-hidden rounded-lg">
                      <Image
                        src={`/placeholder.svg?height=400&width=600&text=${sport.name}`}
                        alt={sport.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="mb-2 font-bold">Participants</h4>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="bg-muted h-8 w-8 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">
                              Participant {i + 1}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Department
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4">
                      View All Participants
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="mb-10">
            <h2 className="mb-6 text-2xl font-bold">Schedule</h2>
            <div className="overflow-hidden rounded-lg border">
              <table className="divide-border min-w-full divide-y">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                      Date
                    </th>
                    <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                      Time
                    </th>
                    <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                      Event
                    </th>
                    <th className="text-muted-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                      Venue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-border divide-y">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      April 2, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">7:00 AM</td>
                    <td className="px-6 py-4">Opening Ceremony</td>
                    <td className="px-6 py-4 whitespace-nowrap">Main Ground</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      April 2, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">9:00 AM</td>
                    <td className="px-6 py-4">Cricket - Preliminary Rounds</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Cricket Field
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      April 3, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">9:00 AM</td>
                    <td className="px-6 py-4">Football - Preliminary Rounds</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Football Ground
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      April 4, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">9:00 AM</td>
                    <td className="px-6 py-4">Basketball & Volleyball</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Indoor Courts
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      April 5, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">9:00 AM</td>
                    <td className="px-6 py-4">Badminton & Table Tennis</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Indoor Stadium
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      April 8, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">10:00 AM</td>
                    <td className="px-6 py-4">Finals - All Sports</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Respective Venues
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      April 9, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">4:00 PM</td>
                    <td className="px-6 py-4">
                      Closing Ceremony & Prize Distribution
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      College Auditorium
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Ready to Participate?</h2>
            <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
              Registration is open until March 25, 2025. Join your
              department&apos;s team or register as an individual participant.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Register Now
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
