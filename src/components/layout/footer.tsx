import React from 'react';
import { Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-center py-8 text-sm text-muted-foreground border-t mt-16">
      <div className="flex items-center justify-center gap-4">
        <span>&copy; {new Date().getFullYear()} Douglas Kahn. All rights reserved.</span>
        <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/dougkahn/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://www.youtube.com/@dkVersed" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
            </a>
        </div>
      </div>
    </footer>
  );
}
