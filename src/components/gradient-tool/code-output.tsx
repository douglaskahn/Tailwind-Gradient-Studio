
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
  hsl: string;
};

const generateTailwindCss = (primaryGradient: PrimaryGradient, overlayGradient: OverlayGradient): string => {
  const primaryStops = primaryGradient.colorStops
    .map(s => {
      const color = s.tailwindName ? `theme(colors.${s.tailwindName.replace('-', '.')})` : hslToHex(s.color.h, s.color.s, s.color.l);
      return `${color} ${s.position}%`;
    })
    .join(', ');

  const overlayStops = overlayGradient.colorStops
    .map(s => {
      const color = s.tailwindName
        ? `theme(colors.${s.tailwindName.replace('-', '.')} / ${overlayGradient.opacity})`
        : `rgba(${hslToRgb(s.color.h, s.color.s, s.color.l).r}, ${hslToRgb(s.color.h, s.color.s, s.color.l).g}, ${hslToRgb(s.color.h, s.color.s, s.color.l).b}, ${overlayGradient.opacity})`;
      return `${color} ${s.position}%`;
    })
    .join(', ');
    
  const primaryGradientCss = `linear-gradient(${primaryGradient.angle}deg, ${primaryStops})`;
  const overlayGradientCss = `linear-gradient(${overlayGradient.angle}deg, ${overlayStops})`;

  return `bg-[${primaryGradientCss},${overlayGradientCss}] bg-blend-${overlayGradient.blendMode}`;
};


const generateStandardCss = (primaryGradient: PrimaryGradient, overlayGradient: OverlayGradient, format: 'hex' | 'rgb' | 'hsl'): string => {
  const toColorString = (h: number, s: number, l: number, a: number) => {
    if (format === 'rgb') {
      const { r, g, b } = hslToRgb(h, s, l);
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    if (format === 'hsl') {
      return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }
    // hex
    const hex = hslToHex(h, s, l);
    const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
    return `${hex}${alphaHex}`;
  };
  
  const toColorStringNoAlpha = (h: number, s: number, l: number) => {
     if (format === 'rgb') {
      const { r, g, b } = hslToRgb(h, s, l);
      return `rgb(${r}, ${g}, ${b})`;
    }
    if (format === 'hsl') {
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
    // hex
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
    const css = generateStandardCss(primaryGradient, overlayGradient, 'hex');
    const rgb = generateStandardCss(primaryGradient, overlayGradient, 'rgb');
    const hsl = generateStandardCss(primaryGradient, overlayGradient, 'hsl');
    setGeneratedCode({ tailwindCss, css, rgb, hsl });
  }, [primaryGradient, overlayGradient]);

  return (
    <Card className="rounded-lg bg-white/10 border-white/20">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Generated CSS</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="tailwind" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                <TabsTrigger value="css">Hex</TabsTrigger>
                <TabsTrigger value="rgb">RGB</TabsTrigger>
                <TabsTrigger value="hsl">HSL</TabsTrigger>
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
                <TabsContent value="hsl">
                <CodeBlock code={generatedCode?.hsl} onCopy={copyToClipboard} />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
}
