import About from '@/components/about';
import Contact from '@/components/contact';
import Events from '@/components/events';
import Features from '@/components/features';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import SportsBanner from '@/components/sports-banner';
import Team from '@/components/team';

export default function Home() {
  return (
    <main className="min-h-screen">
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
