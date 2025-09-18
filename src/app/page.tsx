import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import GradientCreator from '@/components/gradient-tool/gradient-creator';
import ProjectsSection from '@/components/sections/projects-section';
import ContactSection from '@/components/sections/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <GradientCreator />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
