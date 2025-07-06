import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Partners from '@/components/landing/partners';
import Services from '@/components/landing/services';
import Portfolio from '@/components/landing/portfolio';
import About from '@/components/landing/about';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-clip">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        {/* Luces/Manchas Azules Detrás */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-accent/20 rounded-full blur-2xl animate-blob [animation-delay:-2s]" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-blob [animation-delay:-4s]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-dvh">
        <Header />
        <main className="flex-1">
          <Hero />
          <Partners />
          <Services />
          <Portfolio />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
