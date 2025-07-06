import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const portfolioItems = [
  {
    title: 'E-commerce Platform',
    description: 'A fully-featured online store with a custom CMS and payment gateway integration.',
    image: 'https://placehold.co/600x400.png',
    hint: 'website wireframe',
    tags: ['Web Design', 'Automation'],
  },
  {
    title: 'Corporate Website Redesign',
    description: 'Modernized a legacy website to be mobile-responsive, improving user engagement by 40%.',
    image: 'https://placehold.co/600x400.png',
    hint: 'dashboard analytics',
    tags: ['Web Design'],
  },
  {
    title: 'IT Infrastructure Overhaul',
    description: 'Upgraded a client\'s complete IT setup, including servers, networking, and security protocols.',
    image: 'https://placehold.co/600x400.png',
    hint: 'server room',
    tags: ['IT Services'],
  },
  {
    title: 'Automated Reporting System',
    description: 'Developed a system to automate the generation and distribution of daily business reports.',
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Our Portfolio
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Check out some of our recent projects that showcase our commitment to quality and innovation.
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
