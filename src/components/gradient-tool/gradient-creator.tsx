
"use client";

import { useState } from 'react';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import GradientPreview from './gradient-preview';
import PrimaryGradientDesigner from './primary-gradient-designer';
import OverlayGradientDesigner from './overlay-gradient-designer';
import CodeOutput from './code-output';

export default function GradientCreator() {
  const [primaryGradient, setPrimaryGradient] = useState<PrimaryGradient>({
    angle: 90,
    colorStops: [
      { id: 1, color: { h: 195, s: 91, l: 65 }, position: 0, tailwindName: 'sky-400' },
      { id: 2, color: { h: 217, s: 91, l: 65 }, position: 50, tailwindName: 'blue-500' },
      { id: 3, color: { h: 262, s: 91, l: 65 }, position: 100, tailwindName: 'violet-500' },
    ],
  });

  const [overlayGradient, setOverlayGradient] = useState<OverlayGradient>({
    angle: 90,
    blendMode: 'overlay',
    opacity: 0.5,
    colorStops: [
      { id: 1, color: { h: 35, s: 100, l: 63 }, position: 0, tailwindName: 'amber-400' },
      { id: 2, color: { h: 0, s: 0, l: 100 }, position: 100, tailwindName: 'white' },
    ],
  });

  return (
    <section id="gradient-creator">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b">
         <div className="relative container mx-auto px-4 py-4">
            <GradientPreview primaryGradient={primaryGradient} overlayGradient={overlayGradient} />
            
            <div className="absolute top-4 right-4 z-20 flex gap-2 p-2">
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <PrimaryGradientDesigner gradient={primaryGradient} setGradient={setPrimaryGradient} />
              <OverlayGradientDesigner gradient={overlayGradient} setGradient={setOverlayGradient} />
          </div>
          <div>
            <CodeOutput primaryGradient={primaryGradient} overlayGradient={overlayGradient} />
          </div>
        </div>
      </div>

    </section>
  );
}
