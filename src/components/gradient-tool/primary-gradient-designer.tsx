
"use client";

import React from 'react';
import type { PrimaryGradient, ColorStop } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import ColorStopControl from './color-stop-control';

type PrimaryGradientDesignerProps = {
  gradient: PrimaryGradient;
  setGradient: React.Dispatch<React.SetStateAction<PrimaryGradient>>;
};

export default function PrimaryGradientDesigner({ gradient, setGradient }: PrimaryGradientDesignerProps) {
  const handleAngleChange = (value: number[]) => {
    setGradient(prev => ({ ...prev, angle: value[0] }));
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
    <Card className="dark-theme-glass-inner">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Primary Gradient</CardTitle>
      </CardHeader>
      <CardContent className="p-[0.875rem] space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="angle">Angle</Label>
            <span className="text-sm text-muted-foreground">{gradient.angle}°</span>
          </div>
          <Slider
            id="angle"
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
