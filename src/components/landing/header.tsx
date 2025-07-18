'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { ModeToggle } from '../theme-toggle';

const navLinks = [
  { name: 'Socios', href: '/#partners' },
  { name: 'Servicios', href: '/#services' },
  { name: 'Portafolio', href: '/#portfolio' },
  { name: 'Nosotros', href: '/#about' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-end gap-2">
          <Image
            src="/logonormal.png"
            alt="JRsistemas Logo"
            width={40}
            height={40}
            className="h-10 w-10 dark:hidden"
          />
          <Image
            src="/logodark.png"
            alt="JRsistemas Logo"
            width={40}
            height={40}
            className="h-10 w-10 hidden dark:block"
          />
          <span className="font-roboto font-bold text-xl text-foreground">
            sistemas
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative py-2 transition-colors hover:text-accent"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="accent">
            <Link href="/#contact">Contáctanos</Link>
          </Button>
          <ModeToggle />
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
              <div className="flex justify-between items-center">
                <Link href="/" className="flex items-end gap-2" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/logonormal.png"
                    alt="JRsistemas Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 dark:hidden"
                  />
                  <Image
                    src="/logodark.png"
                    alt="JRsistemas Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 hidden dark:block"
                  />
                  <span className="font-roboto font-bold text-xl text-foreground">
                    sistemas
                  </span>
                </Link>
                <ModeToggle />
              </div>
              <nav className="grid gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group relative py-2 text-lg font-medium transition-colors hover:text-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                ))}
              </nav>
              <Button asChild variant="accent" onClick={() => setIsOpen(false)}>
                <Link href="/#contact">Contáctanos</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
