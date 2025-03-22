import { getSession } from 'next-auth/react';

import SportsBanner from '@/app/sports-week/component/sports-banner';
import About from '@/components/about';
import Contact from '@/components/contact';
import Events from '@/components/events';
import Features from '@/components/features';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Team from '@/components/team';

export default async function Home() {
  const user = await getSession();
  console.log(user);
  return (
    <main className="min-h-screen">
      <Navbar />
      <SportsBanner />
      <Hero />
      <About />
      <Features />
      <Events />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
