'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, CodeXml } from 'lucide-react';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'About', href: '#about' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2 font-bold font-headline text-lg">
          <CodeXml className="h-6 w-6 text-primary" />
          <span>JR Servicios Digitales</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="transition-colors hover:text-primary">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-6 p-6">
              <Link href="#" className="flex items-center gap-2 font-bold font-headline text-lg" onClick={() => setIsOpen(false)}>
                <CodeXml className="h-6 w-6 text-primary" />
                <span>JR Servicios</span>
              </Link>
              <nav className="grid gap-4">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-lg font-medium transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                ))}
              </nav>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setIsOpen(false)}>
                <Link href="#contact">Contact Us</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
