export const metadata = {
  title: 'IST Legal',
  description: 'IST Legal provides professional legal services and consultation. Expert legal advice, document preparation, and comprehensive legal solutions for businesses and individuals.',
  keywords: 'legal services, legal consultation, law firm, legal advice, legal documents, business law, IST Legal',
};

import Hero from './sections/Hero';
import Solution from './sections/Solution';
import Rumpole from './sections/Rumpole';
import About from './sections/About';
import FAQ from './sections/FAQ';
import Pricing from './sections/Pricing';
import ContactForm from './sections/ContactForm';
import PageWrapper from './components/PageWrapper';
import Features from './sections/Features';
import Team from './sections/Team';

export default function HomePage() {
  return (
    <PageWrapper>
      <main className="relative w-full overflow-x-hidden sm:pb-32">
        <Hero />
        <Solution />
        <Rumpole />
        <Features />
        <About />
        <FAQ />
        <Pricing />
        <ContactForm />
      </main>
    </PageWrapper>
  );
}
