import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="from-background to-muted relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br">
      {/* Network background pattern */}
      <div className="absolute inset-0 z-0 h-full w-full opacity-20">
        <div className="absolute inset-0 bg-[url('/network-pattern.svg')] bg-center bg-repeat"></div>
      </div>

      <div className="z-10 container flex flex-col items-center px-4 text-center md:px-6">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Swastik IT Club Logo"
            width={180}
            height={120}
            className="mb-4"
          />
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">
              <span className="text-primary">Swastik</span>{' '}
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                IT Club
              </span>
            </h1>
            <div className="text-primary mt-4 flex items-center justify-center space-x-2 text-lg font-medium md:text-xl">
              <span>LEARN</span>
              <span className="text-2xl">•</span>
              <span>SHARE</span>
              <span className="text-2xl">•</span>
              <span>INNOVATE</span>
              <span className="text-2xl">•</span>
              <span>INSPIRE</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-8 max-w-[700px] text-lg md:text-xl">
          Empowering students with technology skills and fostering innovation at
          Swastik College
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Join the Club
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            Explore Events
          </Button>
        </div>
      </div>

      <div className="from-background absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t to-transparent"></div>
    </section>
  );
}
