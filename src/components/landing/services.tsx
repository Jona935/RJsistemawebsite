import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Code2, Bot, Server, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    icon: <Code2 className="h-10 w-10 text-primary" />,
    title: 'Diseño Web',
    description: 'Creamos sitios web hermosos, responsivos y de alto rendimiento que cautivan a tu audiencia y hacen crecer tu negocio.',
    href: '/servicios/diseno-web',
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'Automatización',
    description: 'Optimiza tus procesos de negocio con nuestras soluciones de automatización inteligente para reducir tareas manuales y mejorar la eficiencia.',
    href: '/servicios/automatizacion',
  },
  {
    icon: <Server className="h-10 w-10 text-primary" />,
    title: 'Servicios de TI',
    description: 'Nuestros servicios integrales de TI aseguran que tu infraestructura digital sea confiable, segura y escalable.',
    href: '/servicios/servicios-ti',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Nuestros Servicios
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Ofrecemos una gama de servicios digitales diseñados para elevar tu negocio e impulsar el éxito.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                {service.icon}
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant="secondary">
                  <Link href={service.href}>
                    Más detalles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
