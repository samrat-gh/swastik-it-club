'use client';

import { Calendar, ChevronRight, MapPin, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function SportsBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const targetDate = new Date(2025, 3, 2, 7, 0, 0).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="container my-8 mt-36 rounded-2xl bg-cover bg-center px-4 py-8 md:px-6">
      <div className="h-auto w-full overflow-hidden rounded-xl !bg-slate-100 backdrop-blur-md dark:!bg-gray-900">
        <div className="z-20 p-4">
          <div className="ml-auto max-w-[25%] rounded-lg bg-black/40 p-3 backdrop-blur-sm dark:bg-white/20">
            <p className="mb-1 text-center text-xs font-medium text-white dark:text-gray-300">
              STARTING IN
            </p>
            <div className="grid grid-flow-col gap-2 text-center">
              {['days', 'hours', 'minutes', 'seconds'].map((unit, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-mono text-xl font-bold text-white md:text-2xl dark:text-gray-300">
                    {String(timeLeft[unit as keyof TimeLeft]).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-white/80 uppercase dark:text-gray-700">
                    {unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="z-10 flex items-center">
          <div className="w-full p-8 md:w-3/5 md:p-12">
            <div className="mb-4 inline-block rounded-full bg-white/40 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm dark:bg-black/20 dark:text-gray-300">
              <Trophy className="mr-1 inline-block h-4 w-4" />
              Annual Event
            </div>

            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl dark:text-gray-300">
              Swastik Sports Week 2025
            </h2>

            <p className="mb-6 max-w-xl text-lg text-white/90 dark:text-gray-400">
              Join us for an exciting week of sports competitions, team events,
              and athletic excellence at Swastik College.
            </p>

            <div className="mb-6 flex flex-col gap-6 sm:flex-row">
              <div className="flex items-center text-white/90 dark:text-gray-300">
                <Calendar className="mr-2 h-5 w-5 text-white dark:text-gray-700" />
                <span>April 2-9, 2025</span>
              </div>

              <div className="flex items-center text-white/90 dark:text-gray-400">
                <MapPin className="mr-2 h-5 w-5 text-white dark:text-gray-700" />
                <span>Swastik College Campus</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/sports-week">
                <Button
                  size="lg"
                  className="cursor-pointer border-white bg-gray-900 !text-white hover:!bg-gray-700 dark:!border-gray-100 dark:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  Register Now
                </Button>
              </Link>

              <Link href="/sports-week">
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-pointer border-white text-white hover:bg-white/10 dark:border-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
