"use client";

import { useState } from 'react';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import GradientPreview from './gradient-preview';
import PrimaryGradientDesigner from './primary-gradient-designer';
import OverlayGradientDesigner from './overlay-gradient-designer';
import CodeOutput from './code-output';

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

  return (
    <section id="gradient-creator" className="space-y-12 py-16">
      <GradientPreview primaryGradient={primaryGradient} overlayGradient={overlayGradient} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <PrimaryGradientDesigner gradient={primaryGradient} setGradient={setPrimaryGradient} />
        <OverlayGradientDesigner gradient={overlayGradient} setGradient={setOverlayGradient} />
      </div>
      <CodeOutput primaryGradient={primaryGradient} overlayGradient={overlayGradient} />
    </section>
  );
}
