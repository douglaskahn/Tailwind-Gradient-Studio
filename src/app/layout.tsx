
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Roboto_Flex } from 'next/font/google';
import { cn } from '@/lib/utils';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoFlex = Roboto_Flex({
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
    <html lang="en" className="dark">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6QF6W90VTR"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6QF6W90VTR');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className={cn("font-body antialiased", inter.variable, robotoFlex.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
