import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Innovative Digital Solutions
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Transforming your ideas into powerful web experiences, streamlined automations, and robust IT infrastructures. We build the future of your business, one line of code at a time.
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
              src="https://placehold.co/600x600.png"
              data-ai-hint="abstract digital art"
              width="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
