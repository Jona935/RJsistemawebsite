'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { name: 'Socios', href: '#partners' },
  { name: 'Servicios', href: '#services' },
  { name: 'Portafolio', href: '#portfolio' },
  { name: 'Nosotros', href: '#about' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="JRsistemas Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="transition-colors hover:text-primary">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild variant="accent">
            <Link href="#contact">Contáctanos</Link>
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
              <Link href="#" className="flex items-center" onClick={() => setIsOpen(false)}>
                <Image
                  src="/logo.svg"
                  alt="JRsistemas Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
              <nav className="grid gap-4">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-lg font-medium transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                ))}
              </nav>
              <Button asChild variant="accent" onClick={() => setIsOpen(false)}>
                <Link href="#contact">Contáctanos</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
