"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { generateCodeSnippets, type GenerateCodeSnippetsOutput } from '@/ai/flows/generate-code-snippets';
import type { PrimaryGradient, OverlayGradient } from '@/lib/types';
import { hslToHex } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type CodeOutputProps = {
  primaryGradient: PrimaryGradient;
  overlayGradient: OverlayGradient;
};

const CodeBlock = ({ code, onCopy }: { code: string | undefined; onCopy: (code: string | undefined) => void }) => {
    return (
        <div className="relative">
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                <code>{code || ''}</code>
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
  const [generatedCode, setGeneratedCode] = useState<GenerateCodeSnippetsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { copyToClipboard } = useCopyToClipboard();

  const fetchCode = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const input = {
        primaryGradient: {
          angle: primaryGradient.angle,
          colorStops: primaryGradient.colorStops.map(cs => ({
            color: hslToHex(cs.color.h, cs.color.s, cs.color.l),
            position: cs.position,
          })),
        },
        overlayGradient: {
          blendMode: overlayGradient.blendMode,
          opacity: overlayGradient.opacity,
          colorStops: overlayGradient.colorStops.map(cs => ({
            color: hslToHex(cs.color.h, cs.color.s, cs.color.l),
            position: cs.position,
          })),
        },
      };
      const result = await generateCodeSnippets(input);
      setGeneratedCode(result);
    } catch (e) {
      setError("Failed to generate code. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [primaryGradient, overlayGradient]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCode();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [fetchCode]);

  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
        <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-headline text-2xl">Generated Code</CardTitle>
            <Button variant="ghost" size="icon" onClick={fetchCode} disabled={isLoading}>
                <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
        </CardHeader>
        <CardContent>
             {error && <p className="text-destructive text-center p-4">{error}</p>}
            <Tabs defaultValue="tailwind" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tailwind">Tailwind CSS</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="rgb">RGB</TabsTrigger>
                </TabsList>
                <TabsContent value="tailwind">
                    {isLoading ? <Skeleton className="h-24 w-full" /> : <CodeBlock code={generatedCode?.tailwindCss} onCopy={copyToClipboard} />}
                </TabsContent>
                <TabsContent value="css">
                    {isLoading ? <Skeleton className="h-24 w-full" /> : <CodeBlock code={generatedCode?.css} onCopy={copyToClipboard} />}
                </TabsContent>
                <TabsContent value="rgb">
                    {isLoading ? <Skeleton className="h-24 w-full" /> : <CodeBlock code={generatedCode?.rgb} onCopy={copyToClipboard} />}
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
}
