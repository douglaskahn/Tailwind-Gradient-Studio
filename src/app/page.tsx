
"use client";

import GradientCreator from '@/components/gradient-tool/gradient-creator';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex">
        <GradientCreator />
      </main>
      <Footer />
    </div>
  );
}
