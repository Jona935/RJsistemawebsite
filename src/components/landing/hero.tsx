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
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroSlides = [
  {
    title: 'Soluciones Digitales Innovadoras',
    description: 'Transformamos tus ideas en potentes experiencias web, automatizaciones eficientes y robustas infraestructuras de TI. Construimos el futuro de tu negocio, una línea de código a la vez.',
    image: 'https://placehold.co/600x600.png',
    hint: 'abstract digital art',
  },
  {
    title: 'Servicios Expertos de Diseño Web',
    description: 'Creamos sitios web impresionantes y responsivos que no solo se ven geniales, sino que también funcionan excepcionalmente. Permítenos construir tu presencia en línea.',
    image: 'https://placehold.co/600x600.png',
    hint: 'modern website design',
  },
  {
    title: 'Automatización Inteligente',
    description: 'Aumenta la eficiencia y reduce la carga de trabajo manual con nuestras soluciones de automatización personalizadas. Optimizamos tus procesos para que puedas concentrarte en lo que importa.',
    image: 'https://placehold.co/600x600.png',
    hint: 'glowing circuit board',
  },
];


export default function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section id="hero" className="relative w-full overflow-hidden py-12 md:py-16">
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[28rem] h-[28rem] bg-accent/50 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-20 right-20 w-[24rem] h-[24rem] bg-primary/30 rounded-full blur-3xl animate-blob [animation-delay:-3s]" />
        <div className="absolute bottom-10 left-10 w-[26rem] h-[26rem] bg-accent/40 rounded-full blur-3xl animate-blob [animation-delay:-6s]" />
        <div className="absolute -bottom-20 right-10 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-3xl animate-blob [animation-delay:-9s]" />
      </div>

       <Carousel
          plugins={[plugin.current]}
          className="w-full relative z-10"
          opts={{
            align: "start",
            loop: true,
          }}
        >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.title}>
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center bg-card/15 backdrop-blur-lg border border-foreground/20 rounded-2xl p-8 md:p-12 shadow-2xl shadow-accent/10">
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
                      <Button asChild size="lg" variant="accent">
                        <Link href="/#contact">
                          Consultoría Gratis
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <Link href="/#portfolio">Ver Nuestro Trabajo</Link>
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
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden h-10 w-10 bg-background/50 hover:bg-accent sm:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden h-10 w-10 bg-background/50 hover:bg-accent sm:flex" />
      </Carousel>
    </section>
  );
}
