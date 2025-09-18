import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center py-8 text-sm text-muted-foreground border-t mt-16">
      <p>&copy; {new Date().getFullYear()} Tailwind Gradient Studio. All rights reserved.</p>
    </footer>
  );
}
