
"use client";

import { useState } from 'react';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import GradientCreatorLayout from './gradient-creator-layout';

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
    <GradientCreatorLayout
        primaryGradient={primaryGradient}
        setPrimaryGradient={setPrimaryGradient}
        overlayGradient={overlayGradient}
        setOverlayGradient={setOverlayGradient}
    />
  );
}
