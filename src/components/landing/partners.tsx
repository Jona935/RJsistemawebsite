'use client';

import * as React from 'react';
import { Briefcase, Zap, CloudCog, ShieldCheck, Layers, Globe } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const partners = [
  { name: 'Innovate Inc.', icon: <Briefcase className="h-10 w-10" /> },
  { name: 'Quantum Solutions', icon: <Zap className="h-10 w-10" /> },
  { name: 'Apex Digital', icon: <CloudCog className="h-10 w-10" /> },
  { name: 'Stellar Systems', icon: <ShieldCheck className="h-10 w-10" /> },
  { name: 'Nexus Group', icon: <Layers className="h-10 w-10" /> },
  { name: 'Visionary Labs', icon: <Globe className="h-10 w-10" /> },
  { name: 'Dynamic Devs', icon: <Briefcase className="h-10 w-10" /> },
  { name: 'Quantum Leap', icon: <Zap className="h-10 w-10" /> },
  { name: 'Cloud Co', icon: <CloudCog className="h-10 w-10" /> },
  { name: 'Secure Solutions', icon: <ShieldCheck className="h-10 w-10" /> },
  { name: 'Layer One', icon: <Layers className="h-10 w-10" /> },
  { name: 'Global Tech', icon: <Globe className="h-10 w-10" /> },
];

export default function Partners() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section id="partners" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We partner with innovative companies to deliver exceptional results and drive digital transformation.
          </p>
        </div>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {partners.map((partner, index) => (
              <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                <div className="p-1">
                  <div className="flex flex-col h-32 items-center justify-center gap-2 p-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all text-muted-foreground">
                    {partner.icon}
                    <span className="text-sm font-medium text-center">{partner.name}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
