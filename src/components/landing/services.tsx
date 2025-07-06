import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Code2, Bot, Server } from 'lucide-react';

const services = [
  {
    icon: <Code2 className="h-10 w-10 text-primary" />,
    title: 'Web Design',
    description: 'We create beautiful, responsive, and high-performing websites that captivate your audience and grow your business. From single-page applications to complex e-commerce platforms.',
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'Automation',
    description: 'Streamline your business processes with our intelligent automation solutions. We help you reduce manual tasks, improve efficiency, and free up valuable time for your team.',
  },
  {
    icon: <Server className="h-10 w-10 text-primary" />,
    title: 'IT Services',
    description: 'Our comprehensive IT services ensure your digital infrastructure is reliable, secure, and scalable. We offer support, maintenance, and consulting to keep your systems running smoothly.',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We offer a range of digital services designed to elevate your business and drive success.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                {service.icon}
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
