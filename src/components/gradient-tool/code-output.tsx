
"use client";

import React, { useState, useEffect } from 'react';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import { hslToHex, hslToRgb } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type CodeOutputProps = {
  primaryGradient: PrimaryGradient;
  overlayGradient: OverlayGradient;
};

type GeneratedCode = {
  tailwindCss: string;
  css: string;
  rgb: string;
};

const generateTailwindCss = (primaryGradient: PrimaryGradient, overlayGradient: OverlayGradient): string => {
  const hasCustomColor = [...primaryGradient.colorStops, ...overlayGradient.colorStops].some(cs => !cs.tailwindName);
  
  if (hasCustomColor) {
    const primaryStops = primaryGradient.colorStops
      .map(s => `${hslToHex(s.color.h, s.color.s, s.color.l)} ${s.position}%`)
      .join(', ');

    const overlayStops = overlayGradient.colorStops
      .map(s => {
        const { r, g, b } = hslToRgb(s.color.h, s.color.s, s.color.l);
        return `rgba(${r},${g},${b},${overlayGradient.opacity}) ${s.position}%`;
      })
      .join(', ');
      
    const primaryGradientCss = `linear-gradient(${primaryGradient.angle}deg, ${primaryStops})`;
    const overlayGradientCss = `linear-gradient(${overlayGradient.angle}deg, ${overlayStops})`;

    return `bg-[${primaryGradientCss},${overlayGradientCss}] bg-blend-${overlayGradient.blendMode}`;
  }

  const primaryStops = primaryGradient.colorStops
    .map(s => `from-${s.tailwindName}`)
    .join(' ');
  const viaStops = primaryGradient.colorStops
    .slice(1, -1)
    .map(s => `via-${s.tailwindName}`)
    .join(' ');
  const toStops = primaryGradient.colorStops
    .slice(-1)
    .map(s => `to-${s.tailwindName}`)
    .join(' ');
  
  const primaryClasses = `${primaryStops} ${viaStops} ${toStops}`;

   const overlayStopsArbitrary = overlayGradient.colorStops
      .map(s => {
        const { r, g, b } = hslToRgb(s.color.h, s.color.s, s.color.l);
        return `rgba(${r},${g},${b},${overlayGradient.opacity}) ${s.position}%`;
      })
      .join(', ');

  const arbitraryOverlay = `[background-image:linear-gradient(${overlayGradient.angle}deg,${overlayStopsArbitrary})]`;

  return `bg-gradient-to-r ${primaryClasses} ${arbitraryOverlay} bg-blend-${overlayGradient.blendMode}`;
};

const generateStandardCss = (primaryGradient: PrimaryGradient, overlayGradient: OverlayGradient, useRgb: boolean): string => {
  const toColorString = (h: number, s: number, l: number, a: number) => {
    if (useRgb) {
      const { r, g, b } = hslToRgb(h, s, l);
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    const hex = hslToHex(h, s, l);
    const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
    return `${hex}${alphaHex}`;
  };
  
  const toColorStringNoAlpha = (h: number, s: number, l: number) => {
     if (useRgb) {
      const { r, g, b } = hslToRgb(h, s, l);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return hslToHex(h, s, l);
  }

  const primaryStops = primaryGradient.colorStops
    .map(s => `${toColorStringNoAlpha(s.color.h, s.color.s, s.color.l)} ${s.position}%`)
    .join(', ');

  const overlayStops = overlayGradient.colorStops
    .map(s => `${toColorString(s.color.h, s.color.s, s.color.l, overlayGradient.opacity)} ${s.position}%`)
    .join(', ');

  const primaryGradientCss = `linear-gradient(${primaryGradient.angle}deg, ${primaryStops})`;
  const overlayGradientCss = `linear-gradient(${overlayGradient.angle}deg, ${overlayStops})`;
  
  let css = `.gradient {\n`;
  css += `  background-image: ${primaryGradientCss}, ${overlayGradientCss};\n`;
  css += `  background-blend-mode: ${overlayGradient.blendMode};\n`;
  css += `}`;

  return css;
};


const CodeBlock = ({ code, onCopy }: { code: string | undefined; onCopy: (code: string | undefined) => void }) => {
    if (!code) {
        return (
             <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                <code>Generating code...</code>
            </pre>
        )
    }

    return (
        <div className="relative">
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                <code>{code}</code>
            </pre>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={() => onCopy(code)}
            >
                <Copy className="h-4 w-4" />
            </Button>
        </div>
    );
};


export default function CodeOutput({ primaryGradient, overlayGradient }: CodeOutputProps) {
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const { copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    const tailwindCss = generateTailwindCss(primaryGradient, overlayGradient);
    const css = generateStandardCss(primaryGradient, overlayGradient, false);
    const rgb = generateStandardCss(primaryGradient, overlayGradient, true);
    setGeneratedCode({ tailwindCss, css, rgb });
  }, [primaryGradient, overlayGradient]);

  return (
    <Card className="bg-black/5 backdrop-blur-lg border border-white/20 shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Generated Code</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="tailwind" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                <TabsTrigger value="css">CSS (Hex)</TabsTrigger>
                <TabsTrigger value="rgb">CSS (RGB)</TabsTrigger>
                </TabsList>
                <TabsContent value="tailwind">
                <CodeBlock code={generatedCode?.tailwindCss} onCopy={copyToClipboard} />
                </TabsContent>
                <TabsContent value="css">
                <CodeBlock code={generatedCode?.css} onCopy={copyToClipboard} />
                </TabsContent>
                <TabsContent value="rgb">
                <CodeBlock code={generatedCode?.rgb} onCopy={copyToClipboard} />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
}
