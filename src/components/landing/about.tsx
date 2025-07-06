import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Sobre JR Servicios Digitales
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Somos un equipo apasionado de desarrolladores y profesionales de TI dedicados a ayudar a las empresas a prosperar en el mundo digital. Nuestra misión es ofrecer soluciones digitales de alta calidad, innovadoras y confiables que impulsen el crecimiento y la eficiencia.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Con un enfoque en tecnología de vanguardia y estrategias centradas en el cliente, adaptamos nuestros servicios para satisfacer las necesidades únicas de cada cliente. Desde diseños web impresionantes hasta automatización inteligente y soporte de TI robusto, somos tu socio de confianza en la transformación digital.
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
