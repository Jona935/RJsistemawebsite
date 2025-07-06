import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section id="hero" className="w-full py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
              Innovative Digital Solutions
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Transforming your ideas into powerful web experiences, streamlined automations, and robust IT infrastructures.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="#contact">Get a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
