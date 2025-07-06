import { Briefcase, Zap, CloudCog, ShieldCheck, Layers, Globe } from 'lucide-react';

const partners = [
  { name: 'Innovate Inc.', icon: <Briefcase className="h-10 w-10" /> },
  { name: 'Quantum Solutions', icon: <Zap className="h-10 w-10" /> },
  { name: 'Apex Digital', icon: <CloudCog className="h-10 w-10" /> },
  { name: 'Stellar Systems', icon: <ShieldCheck className="h-10 w-10" /> },
  { name: 'Nexus Group', icon: <Layers className="h-10 w-10" /> },
  { name: 'Visionary Labs', icon: <Globe className="h-10 w-10" /> },
];

export default function Partners() {
  return (
    <section id="partners" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Trusted by Industry Leaders
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We partner with innovative companies to deliver exceptional results and drive digital transformation.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center text-muted-foreground">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center justify-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              {partner.icon}
              <span className="text-sm font-medium text-center">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
