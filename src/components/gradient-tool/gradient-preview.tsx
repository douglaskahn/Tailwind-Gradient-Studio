import React from 'react';
import { hslToHex } from '@/lib/utils';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import { cn } from '@/lib/utils';

type GradientPreviewProps = {
  primaryGradient: PrimaryGradient;
  overlayGradient: OverlayGradient;
  isModal?: boolean;
};

export default function GradientPreview({ primaryGradient, overlayGradient, isModal = false }: GradientPreviewProps) {
  const primaryStops = primaryGradient.colorStops
    .map(s => `${hslToHex(s.color.h, s.color.s, s.color.l)} ${s.position}%`)
    .join(', ');

  const overlayStops = overlayGradient.colorStops
    .map(s => `${hslToHex(s.color.h, s.color.s, s.color.l)} ${s.position}%`)
    .join(', ');

  const primaryCss = `linear-gradient(${primaryGradient.angle}deg, ${primaryStops})`;
  const overlayCss = `linear-gradient(${overlayGradient.angle}deg, ${overlayStops})`;

  return (
    <div className={cn(
        "relative",
        isModal ? "h-[80vh] rounded-lg" : "absolute inset-0"
    )}>
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
          mixBlendMode: overlayGradient.blendMode as React.CSSProperties['mixBlendMode'],
          opacity: overlayGradient.opacity,
        }}
      />
    </div>
  );
}
