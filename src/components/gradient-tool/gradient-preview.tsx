import React from 'react';
import { hslToHex } from '@/lib/utils';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';

type GradientPreviewProps = {
  primaryGradient: PrimaryGradient;
  overlayGradient: OverlayGradient;
};

export default function GradientPreview({ primaryGradient, overlayGradient }: GradientPreviewProps) {
  const primaryStops = primaryGradient.colorStops
    .map(s => `${hslToHex(s.color.h, s.color.s, s.color.l)} ${s.position}%`)
    .join(', ');

  const overlayStops = overlayGradient.colorStops
    .map(s => `${hslToHex(s.color.h, s.color.s, s.color.l)} ${s.position}%`)
    .join(', ');

  const primaryCss = `linear-gradient(${primaryGradient.angle}deg, ${primaryStops})`;
  const overlayCss = `linear-gradient(${overlayGradient.angle}deg, ${overlayStops})`;

  return (
    <div className="w-full h-80 rounded-xl shadow-2xl overflow-hidden relative border-4 border-white/20">
       <div
        className="absolute inset-0"
        style={{
          backgroundImage: primaryCss,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: overlayCss,
          mixBlendMode: overlayGradient.blendMode,
          opacity: overlayGradient.opacity,
        }}
      />
    </div>
  );
}
