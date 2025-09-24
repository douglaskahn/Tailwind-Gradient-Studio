
import React from 'react';
import { hslToHex } from '@/lib/utils';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import { cn } from '@/lib/utils';

type GradientPreviewProps = {
  primaryGradient: PrimaryGradient;
  overlayGradient: OverlayGradient;
  isModal?: boolean;
  className?: string;
};

const GradientPreview = React.forwardRef<HTMLDivElement, GradientPreviewProps>(({ primaryGradient, overlayGradient, isModal = false, className }, ref) => {
  const primaryStops = primaryGradient.colorStops
    .map(s => `${hslToHex(s.color.h, s.color.s, s.color.l)} ${s.position}%`)
    .join(', ');

  const overlayStops = overlayGradient.colorStops
    .map(s => {
        const hex = hslToHex(s.color.h, s.color.s, s.color.l);
        const alphaHex = Math.round(overlayGradient.opacity * 255).toString(16).padStart(2, '0');
        return `${hex}${alphaHex} ${s.position}%`;
    })
    .join(', ');

  const primaryCss = `linear-gradient(${primaryGradient.angle}deg, ${primaryStops})`;
  const overlayCss = `linear-gradient(${overlayGradient.angle}deg, ${overlayStops})`;

  return (
    <div 
      ref={ref}
      className={cn(
        "relative w-full h-full overflow-hidden",
        isModal ? "h-[80vh] rounded-lg" : "absolute inset-0",
        className
      )}
    >
      <div
        data-layer="primary"
        className="absolute inset-0"
        style={{ backgroundImage: primaryCss }}
      />
      <div
        data-layer="overlay"
        className="absolute inset-0"
        style={{
          backgroundImage: overlayCss,
          mixBlendMode: overlayGradient.blendMode,
        }}
      />
    </div>
  );
});

GradientPreview.displayName = 'GradientPreview';

export default GradientPreview;
