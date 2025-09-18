import React from 'react';

export default function Header() {
  return (
    <header className="py-16 text-center">
      <h1 className="font-headline text-5xl font-bold tracking-tight text-primary md:text-6xl">
        Tailwind Gradient Studio
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
        Craft and export beautiful, production-ready gradients for your Tailwind CSS projects.
      </p>
    </header>
  );
}
