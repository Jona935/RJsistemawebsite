import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const portfolioItems = [
  {
    title: 'E-commerce Platform',
    description: 'Una tienda en línea con todas las funciones, con un CMS personalizado e integración de pasarela de pago.',
    image: 'https://placehold.co/600x400.png',
    hint: 'website wireframe',
    tags: ['Web Design', 'Automation'],
  },
  {
    title: 'Corporate Website Redesign',
    description: 'Modernizamos un sitio web antiguo para que sea adaptable a dispositivos móviles, mejorando la participación del usuario en un 40%.',
    image: 'https://placehold.co/600x400.png',
    hint: 'dashboard analytics',
    tags: ['Web Design'],
  },
  {
    title: 'IT Infrastructure Overhaul',
    description: 'Actualizamos la configuración de TI completa de un cliente, incluyendo servidores, redes y protocolos de seguridad.',
    image: 'https://placehold.co/600x400.png',
    hint: 'server room',
    tags: ['IT Services'],
  },
  {
    title: 'Automated Reporting System',
    description: 'Desarrollamos un sistema para automatizar la generación y distribución de informes comerciales diarios.',
    image: 'https://placehold.co/600x400.png',
    hint: 'mobile app',
    tags: ['Automation', 'IT Services'],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Nuestro Portafolio
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Echa un vistazo a algunos de nuestros proyectos recientes que demuestran nuestro compromiso con la calidad y la innovación.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {portfolioItems.map((item) => (
            <Card key={item.title} className="overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
               <CardContent className="p-0">
                <Image
                  alt={item.title}
                  className="aspect-video w-full object-cover"
                  height="310"
                  src={item.image}
                  data-ai-hint={item.hint}
                  width="550"
                />
              </CardContent>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                 <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
