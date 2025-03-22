import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-muted w-full border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/swastik-logo.png"
                alt="Swastik IT Club Logo"
                width={50}
                height={50}
              />
              <div>
                <h3 className="font-bold">
                  <span className="text-primary">Swastik</span>{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                    IT Club
                  </span>
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering students with technology skills and fostering
              innovation at Swastik College.
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-primary"
                >
                  What We Offer
                </Link>
              </li>
              <li>
                <Link
                  href="#events"
                  className="text-muted-foreground hover:text-primary"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="text-muted-foreground hover:text-primary"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Subscribe to Our Newsletter</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Stay updated with our latest events and announcements.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Your email" className="max-w-[220px]" />
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} Swastik IT Club. All rights
            reserved.
          </p>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary text-xs"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary text-xs"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
