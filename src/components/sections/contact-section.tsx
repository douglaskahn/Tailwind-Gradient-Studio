import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-32 border-t">
      <div className="text-center">
        <h2 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">Get In Touch</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          I'm currently available for freelance work and open to new opportunities. Let's build something amazing together.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <a href="mailto:your-email@example.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
