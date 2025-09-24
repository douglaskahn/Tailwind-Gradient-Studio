
"use client";

import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHasMounted } from '@/hooks/use-has-mounted';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import GradientPreview from './gradient-preview';
import PrimaryGradientDesigner from './primary-gradient-designer';
import OverlayGradientDesigner from './overlay-gradient-designer';
import CodeOutput from './code-output';
import { ScrollArea } from '../ui/scroll-area';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';


type GradientCreatorLayoutProps = {
    primaryGradient: PrimaryGradient;
    setPrimaryGradient: Dispatch<SetStateAction<PrimaryGradient>>;
    overlayGradient: OverlayGradient;
    setOverlayGradient: Dispatch<SetStateAction<OverlayGradient>>;
};

export default function GradientCreatorLayout({ 
    primaryGradient, 
    setPrimaryGradient, 
    overlayGradient, 
    setOverlayGradient,
}: GradientCreatorLayoutProps) {
  const hasMounted = useHasMounted();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (previewRef.current) {
      html2canvas(previewRef.current, {
        useCORS: true,
        backgroundColor: null, 
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'gradient.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  if (!hasMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow"/>
        <Footer />
      </div>
    );
  }

  if (isMobile) {
    // Mobile layout: single column, everything scrolls
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4 space-y-8">
            <div className={cn(
              "relative w-full transition-all duration-300",
              isScrolled ? "h-[175px] sticky top-0 z-20" : "h-[40vh]"
            )}>
                <GradientPreview ref={previewRef} primaryGradient={primaryGradient} overlayGradient={overlayGradient} isModal={false} className="rounded-lg shadow-lg"/>
            </div>
            <PrimaryGradientDesigner gradient={primaryGradient} setGradient={setPrimaryGradient} />
            <OverlayGradientDesigner gradient={overlayGradient} setGradient={setOverlayGradient} />
            <CodeOutput primaryGradient={primaryGradient} overlayGradient={overlayGradient} />
        </main>
        <Footer />
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="grid grid-cols-[1fr_340px]">
      <div className="relative">
        <div className="px-8">
          <Header />
          <div className="sticky top-0 z-10 h-[500px] pt-6">
              <GradientPreview ref={previewRef} primaryGradient={primaryGradient} overlayGradient={overlayGradient} isModal={false} className="rounded-lg" />
              <div className="absolute top-10 right-4 z-20 flex gap-2">
                  <Dialog>
                  <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40 text-white hover:text-white">
                      <Eye className="h-5 w-5" />
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 border-0 max-w-7xl">
                      <DialogHeader>
                      <DialogTitle className="sr-only">Gradient Full-Screen Preview</DialogTitle>
                      <DialogDescription className="sr-only">
                          A full-screen preview of the generated gradient.
                      </DialogDescription>
                      </DialogHeader>
                      <GradientPreview primaryGradient={primaryGradient} overlayGradient={overlayGradient} isModal />
                  </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40 text-white hover:text-white" onClick={handleDownload}>
                      <Download className="h-5 w-5" />
                  </Button>
              </div>
          </div>
          <div className="h-[1000px]">{/* This is just for testing scroll on desktop */}</div>
          <Footer />
        </div>
      </div>
      
      <div className="sticky top-0 h-screen">
        <div className='h-full p-2'>
            <ScrollArea className="dark-theme-glass h-full rounded-lg">
                <div className="space-y-8 p-3.5">
                    <PrimaryGradientDesigner gradient={primaryGradient} setGradient={setPrimaryGradient} />
                    <OverlayGradientDesigner gradient={overlayGradient} setGradient={setOverlayGradient} />
                    <CodeOutput primaryGradient={primaryGradient} overlayGradient={overlayGradient} />
                </div>
            </ScrollArea>
        </div>
      </div>
    </div>
  );
}
