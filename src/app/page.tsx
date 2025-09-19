
"use client";

import GradientCreator from '@/components/gradient-tool/gradient-creator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex">
        <GradientCreator />
      </main>
    </div>
  );
}
