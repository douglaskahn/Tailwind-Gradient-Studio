"use client";

import React from 'react';
import type { OverlayGradient, ColorStop } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ColorStopControl from './color-stop-control';

type OverlayGradientDesignerProps = {
  gradient: OverlayGradient;
  setGradient: React.Dispatch<React.SetStateAction<OverlayGradient>>;
};

const blendModes = [
  'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 
  'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 
  'hue', 'saturation', 'color', 'luminosity'
];

export default function OverlayGradientDesigner({ gradient, setGradient }: OverlayGradientDesignerProps) {
  const handleOpacityChange = (value: number[]) => {
    setGradient(prev => ({ ...prev, opacity: value[0] }));
  };
  
  const handleAngleChange = (value: number[]) => {
    setGradient(prev => ({ ...prev, angle: value[0] }));
  };

  const handleBlendModeChange = (value: string) => {
    setGradient(prev => ({ ...prev, blendMode: value }));
  };

  const handleColorStopChange = (id: number, newColorStop: Partial<ColorStop>) => {
    setGradient(prev => ({
      ...prev,
      colorStops: prev.colorStops.map(cs =>
        cs.id === id ? { ...cs, ...newColorStop } : cs
      ),
    }));
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Overlay Gradient</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="blend-mode">Blend Mode</Label>
                <Select value={gradient.blendMode} onValueChange={handleBlendModeChange}>
                    <SelectTrigger id="blend-mode">
                        <SelectValue placeholder="Select blend mode" />
                    </SelectTrigger>
                    <SelectContent>
                        {blendModes.map(mode => (
                            <SelectItem key={mode} value={mode} className="capitalize">{mode}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="opacity">Opacity</Label>
                    <span className="text-sm text-muted-foreground">{gradient.opacity.toFixed(2)}</span>
                </div>
                <Slider
                    id="opacity"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[gradient.opacity]}
                    onValueChange={handleOpacityChange}
                />
            </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="angle-overlay">Angle</Label>
            <span className="text-sm text-muted-foreground">{gradient.angle}°</span>
          </div>
          <Slider
            id="angle-overlay"
            min={0}
            max={360}
            step={1}
            value={[gradient.angle]}
            onValueChange={handleAngleChange}
          />
        </div>

        <div className="space-y-4">
          {gradient.colorStops.map((cs, index) => (
            <ColorStopControl
              key={cs.id}
              label={`Color ${index + 1}`}
              colorStop={cs}
              onChange={(newColor) => handleColorStopChange(cs.id, newColor)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
