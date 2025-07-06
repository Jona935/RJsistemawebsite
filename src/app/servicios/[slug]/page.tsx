import { notFound } from 'next/navigation';
import { Code2, Bot, Server, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const serviceData = {
  'diseno-web': {
    title: 'Diseño Web',
    icon: Code2,
    image: 'https://placehold.co/1200x600.png',
    imageHint: 'modern website interface',
    description: 'En JRsistemas, no solo construimos sitios web; creamos experiencias digitales inmersivas y de alto rendimiento que impulsan el crecimiento. Nuestro enfoque se centra en la combinación de diseño estético, funcionalidad intuitiva y tecnología de vanguardia para entregar un producto final que supere tus expectativas.',
    features: [
      {
        title: 'Desarrollo a Medida',
        description: 'Soluciones únicas que se adaptan perfectamente a las necesidades de tu negocio, construidas con las últimas tecnologías como React y Next.js.',
      },
      {
        title: 'Diseño Responsivo (Mobile-First)',
        description: 'Garantizamos que tu sitio web se vea y funcione perfectamente en todos los dispositivos, priorizando la experiencia móvil.',
      },
      {
        title: 'Optimización para Motores de Búsqueda (SEO)',
        description: 'Implementamos las mejores prácticas de SEO desde la base para mejorar tu visibilidad en Google y atraer más tráfico orgánico cualificado.',
      },
      {
        title: 'Integración con CMS',
        description: 'Te damos el control total sobre tu contenido con sistemas de gestión de contenido (CMS) fáciles de usar como Sanity, Strapi o WordPress.',
      },
      {
        title: 'Rendimiento Optimizado',
        description: 'Nos obsesionamos con la velocidad de carga. Un sitio web rápido no solo mejora la experiencia del usuario, sino que también es un factor clave para el SEO.'
      }
    ],
  },
  'automatizacion': {
    title: 'Automatización de Procesos',
    icon: Bot,
    image: 'https://placehold.co/1200x600.png',
    imageHint: 'robot arms assembly line',
    description: 'Libera el potencial de tu equipo eliminando tareas repetitivas y manuales. Nuestras soluciones de automatización inteligente están diseñadas para optimizar tus flujos de trabajo, reducir errores humanos e incrementar la eficiencia operativa en toda tu organización.',
    features: [
      {
        title: 'Análisis de Flujos de Trabajo',
        description: 'Estudiamos tus procesos actuales para identificar cuellos de botella y oportunidades clave de automatización.',
      },
      {
        title: 'Integración de Sistemas y APIs',
        description: 'Conectamos tus herramientas y plataformas existentes (CRM, ERP, software de contabilidad, etc.) para crear un ecosistema de trabajo unificado y sin fisuras.',
      },
      {
        title: 'Automatización Robótica de Procesos (RPA)',
        description: 'Implementamos "bots" de software para realizar tareas basadas en reglas, como la entrada de datos, la generación de informes y la gestión de correos electrónicos.',
      },
      {
        title: 'Desarrollo de Scripts Personalizados',
        description: 'Creamos soluciones de scripting a medida para automatizar tareas específicas que son únicas para tu negocio.',
      },
      {
        title: 'Monitoreo y Soporte Continuo',
        description: 'No solo implementamos la solución, sino que también la monitoreamos para asegurar su correcto funcionamiento y la adaptamos a medida que tu negocio evoluciona.'
      }
    ],
  },
  'servicios-ti': {
    title: 'Servicios de TI Gestionados',
    icon: Server,
    image: 'https://placehold.co/1200x600.png',
    imageHint: 'network server rack',
    description: 'Considera a JRsistemas como tu departamento de TI externo. Ofrecemos servicios integrales para asegurar que tu infraestructura tecnológica sea robusta, segura y escalable. Nos encargamos de la tecnología para que tú puedas encargarte de tu negocio.',
    features: [
      {
        title: 'Soporte Técnico Proactivo',
        description: 'Monitoreo 24/7 de tus sistemas para prevenir problemas antes de que ocurran. Ofrecemos soporte remoto y en sitio para resolver cualquier incidencia rápidamente.',
      },
      {
        title: 'Ciberseguridad y Protección de Datos',
        description: 'Implementamos soluciones de seguridad de varias capas, incluyendo firewalls, antivirus, detección de intrusiones y planes de recuperación ante desastres.',
      },
      {
        title: 'Gestión de Redes e Infraestructura',
        description: 'Diseño, implementación y mantenimiento de redes cableadas e inalámbricas. Gestión de servidores, almacenamiento y virtualización.',
      },
      {
        title: 'Cloud Computing y Migración a la Nube',
        description: 'Te ayudamos a aprovechar el poder de la nube (AWS, Azure, Google Cloud) para mejorar la escalabilidad, flexibilidad y reducir costos.',
      },
      {
        title: 'Consultoría Estratégica de TI',
        description: 'Te asesoramos en la planificación y adquisición de tecnología para alinear tu infraestructura con tus objetivos de negocio a largo plazo.'
      }
    ],
  },
};

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export default function ServicePage({ params }: ServicePageProps) {
  const service = serviceData[params.slug as keyof typeof serviceData];

  if (!service) {
    notFound();
  }

  const ServiceIcon = service.icon;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Button asChild variant="outline">
                  <Link href="/#services" className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a Servicios
                  </Link>
              </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-5">
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center gap-4">
                        <ServiceIcon className="h-12 w-12 text-primary" />
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                            {service.title}
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground">{service.description}</p>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg mt-6 shadow-lg">
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            data-ai-hint={service.imageHint}
                        />
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <Card className="sticky top-24 flex flex-col">
                        <CardHeader>
                            <CardTitle>Características Clave</CardTitle>
                            <CardDescription>Lo que incluye nuestro servicio de {service.title}.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow">
                            {service.features.map((feature) => (
                                <div key={feature.title} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 mt-1 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">{feature.title}</h4>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="accent" className="w-full">
                                <Link href="/#contact">
                                    Solicitar Consultoría
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
