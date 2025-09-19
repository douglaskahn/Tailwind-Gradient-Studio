
"use client";

import type { Dispatch, SetStateAction } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHasMounted } from '@/hooks/use-has-mounted';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import GradientPreview from './gradient-preview';
import PrimaryGradientDesigner from './primary-gradient-designer';
import OverlayGradientDesigner from './overlay-gradient-designer';
import CodeOutput from './code-output';
import { ScrollArea } from '../ui/scroll-area';
import Header from '../layout/header';

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
    setOverlayGradient 
}: GradientCreatorLayoutProps) {
  const hasMounted = useHasMounted();
  const isMobile = useIsMobile();

  if (!hasMounted) {
    return null;
  }

  if (isMobile) {
    // Mobile layout: single column, everything scrolls
     return (
        <div className="flex-1 w-full">
            <Header />
            <div className="relative w-full h-[40vh]">
                <GradientPreview primaryGradient={primaryGradient} overlayGradient={overlayGradient} isModal={false} />
            </div>
            <div className="p-4 space-y-8">
                <PrimaryGradientDesigner gradient={primaryGradient} setGradient={setPrimaryGradient} />
                <OverlayGradientDesigner gradient={overlayGradient} setGradient={setOverlayGradient} />
                <CodeOutput primaryGradient={primaryGradient} overlayGradient={overlayGradient} />
            </div>
        </div>
     )
  }

  // Desktop layout: two columns, right sidebar scrolls
  return (
    <div className="flex-1 w-full grid grid-cols-[1fr_340px]">
      <div className="flex flex-col">
        <Header />
        <div className="relative py-4 px-4 flex-grow">
            <div className="sticky top-4 h-[500px]">
                <GradientPreview primaryGradient={primaryGradient} overlayGradient={overlayGradient} isModal={false} className="rounded-lg" />
                <div className="absolute top-4 right-8 z-20 flex gap-2">
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
                </div>
            </div>
        </div>
      </div>
      
      <ScrollArea className="h-screen sticky top-0 backdrop-blur-lg border-l border-white/20 shadow-lg">
        <div className="space-y-8">
            <PrimaryGradientDesigner gradient={primaryGradient} setGradient={setPrimaryGradient} />
            <OverlayGradientDesigner gradient={overlayGradient} setGradient={setOverlayGradient} />
            <CodeOutput primaryGradient={primaryGradient} overlayGradient={overlayGradient} />
        </div>
      </ScrollArea>
    </div>
  );
}
