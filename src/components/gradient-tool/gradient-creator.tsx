
"use client";

import { useState } from 'react';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelRightClose, Settings, Code, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import GradientPreview from './gradient-preview';
import PrimaryGradientDesigner from './primary-gradient-designer';
import OverlayGradientDesigner from './overlay-gradient-designer';
import CodeOutput from './code-output';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

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
  
  const [activeTab, setActiveTab] = useState<'settings' | 'code'>('settings');
  const [panelsVisible, setPanelsVisible] = useState(true);
  const isDesktop = useBreakpoint('lg');

  const gradientControls = (
    <div className="space-y-8">
      <PrimaryGradientDesigner gradient={primaryGradient} setGradient={setPrimaryGradient} />
      <OverlayGradientDesigner gradient={overlayGradient} setGradient={setOverlayGradient} />
    </div>
  );

  const codePanel = <CodeOutput primaryGradient={primaryGradient} overlayGradient={overlayGradient} />;

  return (
    <section id="gradient-creator" className="space-y-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-start">
        <div className="relative">
          <GradientPreview primaryGradient={primaryGradient} overlayGradient={overlayGradient} />
          
          <div className="absolute top-4 right-4 z-20 flex gap-2">
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
            {isDesktop && (
              <Button variant="ghost" size="icon" onClick={() => setPanelsVisible(!panelsVisible)} className="bg-black/20 hover:bg-black/40 text-white hover:text-white">
                {panelsVisible ? <PanelLeftClose className="h-5 w-5" /> : <PanelRightClose className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          {isDesktop ? (
            panelsVisible ? (
              <div className="space-y-4">
                 <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
                  <div className="flex p-1">
                    <Button
                      variant={activeTab === 'settings' ? "secondary" : "ghost"}
                      onClick={() => setActiveTab('settings')}
                      className="flex-1"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Controls
                    </Button>
                    <Button
                      variant={activeTab === 'code' ? "secondary" : "ghost"}
                      onClick={() => setActiveTab('code')}
                      className="flex-1"
                    >
                      <Code className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  </div>
                </Card>
                
                <ScrollArea className="h-[calc(100vh-22rem)]">
                  <div className="pr-4">
                    {activeTab === 'settings' ? gradientControls : codePanel}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-8 text-center">
                  <h3 className="font-headline text-2xl">Controls Hidden</h3>
                  <p className="text-muted-foreground mt-2">Click the <PanelRightClose className="inline h-4 w-4" /> icon to show controls.</p>
                </Card>
              </div>
            )
          ) : (
            <div className="space-y-8">
              {gradientControls}
              {codePanel}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
