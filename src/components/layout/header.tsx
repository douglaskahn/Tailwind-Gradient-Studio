import React from 'react';

export default function Header() {
  return (
    <header className="py-12 text-center">
      <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
        Tailwind Gradient Studio
      </h1>
      <p className="mt-3 max-w-xl mx-auto text-base text-foreground/80">
        Craft and export beautiful, production-ready gradients for your Tailwind CSS projects.
      </p>
    </header>
  );
}
