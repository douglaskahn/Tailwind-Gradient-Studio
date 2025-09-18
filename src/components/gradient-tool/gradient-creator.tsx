
"use client";

import { useState } from 'react';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelRightClose, Settings, Code, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import GradientPreview from './gradient-preview';
import PrimaryGradientDesigner from './primary-gradient-designer';
import OverlayGradientDesigner from './overlay-gradient-designer';
import CodeOutput from './code-output';
import { Card } from '../ui/card';

export default function GradientCreator() {
  const [primaryGradient, setPrimaryGradient] = useState<PrimaryGradient>({
    angle: 90,
    colorStops: [
      { id: 1, color: { h: 195, s: 91, l: 65 }, position: 0 },
      { id: 2, color: { h: 217, s: 91, l: 65 }, position: 50 },
      { id: 3, color: { h: 262, s: 91, l: 65 }, position: 100 },
    ],
  });

  const [overlayGradient, setOverlayGradient] = useState<OverlayGradient>({
    angle: 90,
    blendMode: 'overlay',
    opacity: 0.5,
    colorStops: [
      { id: 1, color: { h: 35, s: 100, l: 63 }, position: 0 },
      { id: 2, color: { h: 0, s: 0, l: 100 }, position: 100 },
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
      <div className="relative">
        <GradientPreview primaryGradient={primaryGradient} overlayGradient={overlayGradient} />
        
        {isDesktop && (
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40 text-white hover:text-white">
                  <Eye className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 border-0 max-w-7xl">
                <GradientPreview primaryGradient={primaryGradient} overlayGradient={overlayGradient} isModal />
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" onClick={() => setPanelsVisible(!panelsVisible)} className="bg-black/20 hover:bg-black/40 text-white hover:text-white">
              {panelsVisible ? <PanelLeftClose className="h-5 w-5" /> : <PanelRightClose className="h-5 w-5" />}
            </Button>
          </div>
        )}

        {isDesktop && panelsVisible && (
          <div className="absolute z-10 top-0 left-0 h-full w-full p-6 lg:p-12 overflow-y-auto pointer-events-none">
            <div className="flex justify-between gap-8 items-start">
              <div className="w-full max-w-sm pointer-events-auto">
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

                <div className="mt-4">
                  {activeTab === 'settings' ? gradientControls : codePanel}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isDesktop && (
        <div className="space-y-8">
          {gradientControls}
          {codePanel}
        </div>
      )}
    </section>
  );
}
