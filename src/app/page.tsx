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
        <div className="absolute top-[-10rem] -left-48 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-[-1rem] -right-48 w-96 h-96 bg-accent/15 rounded-full filter blur-3xl opacity-50 animate-blob [animation-delay:-2s]" />
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-blob [animation-delay:-4s]" />
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
