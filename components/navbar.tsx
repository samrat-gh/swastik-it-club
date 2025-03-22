'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ThemeToggle } from './theme-toogle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#features', label: 'What We Offer' },
    { href: '#events', label: 'Events' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/95 shadow-sm backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Swastik IT Club Logo"
            width={80}
            height={40}
          />
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'hover:text-primary text-sm font-medium transition-colors',
                pathname === link.href ? 'text-primary' : 'text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <ThemeToggle />
          <Link href="/login">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Login
            </Button>
          </Link>

          <Button className="bg-primary hover:bg-primary/90 !text-gray-800 dark:text-white">
            Join Us
          </Button>
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="bg-background border-b md:hidden">
          <div className="container mx-auto space-y-4 px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'hover:text-primary text-sm font-medium transition-colors',
                    pathname === link.href ? 'text-primary' : 'text-foreground'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="hidden items-center space-x-4 md:flex">
              <ThemeToggle />
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Login
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-gray-800 dark:text-white">
                Join Us
              </Button>
            </div>
            {/* <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 w-full"
              >
                Login
              </Button>
              <Button className="bg-primary hover:bg-primary/90 w-full text-white">
                Join Us
              </Button>
            </div> */}
          </div>
        </div>
      )}
    </header>
  );
}
