import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Source_Sans_3 } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Tailwind Gradient Studio',
  description: 'Create and export beautiful, production-ready gradients for your Tailwind CSS projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={cn("font-body antialiased", inter.variable, sourceSans3.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
