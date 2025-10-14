
"use client";

import { useState } from 'react';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import GradientCreatorLayout from './gradient-creator-layout';

export default function GradientCreator() {
  const [primaryGradient, setPrimaryGradient] = useState<PrimaryGradient>({
    angle: 61,
    colorStops: [
      { id: 1, color: { h: 224, s: 83, l: 5 }, position: 0, tailwindName: 'slate-950' },
      { id: 2, color: { h: 280, s: 84, l: 21 }, position: 50, tailwindName: 'purple-950' },
      { id: 3, color: { h: 301, s: 62, l: 28 }, position: 100, tailwindName: 'fuchsia-900' },
    ],
  });

  const [overlayGradient, setOverlayGradient] = useState<OverlayGradient>({
    angle: 188,
    blendMode: 'overlay',
    opacity: 1,
    colorStops: [
      { id: 1, color: { h: 297, s: 70, l: 49 }, position: 0, tailwindName: 'fuchsia-600' },
      { id: 2, color: { h: 204, s: 96, l: 32 }, position: 100, tailwindName: 'sky-700' },
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
