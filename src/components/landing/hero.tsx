'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroSlides = [
  {
    title: 'Innovative Digital Solutions',
    description: 'Transforming your ideas into powerful web experiences, streamlined automations, and robust IT infrastructures. We build the future of your business, one line of code at a time.',
    image: 'https://placehold.co/600x600.png',
    hint: 'abstract digital art',
  },
  {
    title: 'Expert Web Design Services',
    description: 'Creating stunning, responsive websites that not only look great but also perform exceptionally. Let us build your online presence.',
    image: 'https://placehold.co/600x600.png',
    hint: 'modern website design',
  },
  {
    title: 'Intelligent Automation',
    description: 'Boost efficiency and reduce manual workload with our custom automation solutions. We streamline your processes so you can focus on what matters.',
    image: 'https://placehold.co/600x600.png',
    hint: 'glowing circuit board',
  },
];


export default function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section id="hero" className="w-full py-12 md:py-16">
       <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.title}>
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
                  <div className="flex flex-col justify-center space-y-6">
                    <div className="space-y-4">
                      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        {slide.title}
                      </h1>
                      <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        {slide.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link href="#contact">
                          Get a Quote
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link href="#portfolio">View Our Work</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      alt="Hero"
                      className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                      height="600"
                      src={slide.image}
                      data-ai-hint={slide.hint}
                      width="600"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
