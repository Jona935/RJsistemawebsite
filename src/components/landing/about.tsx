import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              About JR Servicios Digitales
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We are a passionate team of developers and IT professionals dedicated to helping businesses thrive in the digital world. Our mission is to deliver high-quality, innovative, and reliable digital solutions that drive growth and efficiency.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              With a focus on cutting-edge technology and customer-centric strategies, we tailor our services to meet the unique needs of each client. From stunning web designs to intelligent automation and robust IT support, we are your trusted partner in digital transformation.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  alt="About us"
                  className="mx-auto aspect-video overflow-hidden rounded-lg object-cover object-center sm:w-full"
                  height="310"
                  src="https://placehold.co/550x310.png"
                  data-ai-hint="team collaboration"
                  width="550"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
