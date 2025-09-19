import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import GradientCreator from '@/components/gradient-tool/gradient-creator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <GradientCreator />
      </main>
      <Footer />
    </div>
  );
}
