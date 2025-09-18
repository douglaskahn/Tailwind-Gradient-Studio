
"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { hslToHex, hslToRgb } from '@/lib/utils';
import type { ColorStop, HSLColor } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import TailwindColorPalette from './tailwind-color-palette';
import { Palette } from 'lucide-react';
import { Button } from '../ui/button';


type ColorStopControlProps = {
  label: string;
  colorStop: ColorStop;
  onChange: (newColorStop: Partial<ColorStop>) => void;
};

export default function ColorStopControl({ label, colorStop, onChange }: ColorStopControlProps) {
  const handleColorChange = (newColor: Partial<HSLColor>) => {
    onChange({ color: { ...colorStop.color, ...newColor }, tailwindName: undefined });
  };
  
  const handlePositionChange = (value: number[]) => {
    onChange({ position: value[0] });
  };

  const handlePaletteSelect = (color: HSLColor, name: string) => {
    onChange({ color, tailwindName: name });
  };

  const hexValue = hslToHex(colorStop.color.h, colorStop.color.s, colorStop.color.l);
  const rgbValue = hslToRgb(colorStop.color.h, colorStop.color.s, colorStop.color.l);

  return (
    <div className="space-y-4 p-4 rounded-lg border bg-background/50">
        <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <div
                className="w-10 h-10 rounded-md border-2 border-white/50 shadow-inner"
                style={{ backgroundColor: hexValue }}
              />
              <div className='flex flex-col'>
                <h4 className="font-medium">{label}</h4>
                <div className='text-xs text-muted-foreground space-x-2 font-mono'>
                    <span>{hexValue.toUpperCase()}</span>
                    <span>{`rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`}</span>
                </div>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Palette className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <TailwindColorPalette onColorSelect={handlePaletteSelect} />
              </PopoverContent>
            </Popover>
        </div>

      {colorStop.tailwindName && <div className='text-sm text-muted-foreground font-medium pt-2'>Tailwind Color: <span className='font-mono p-1 bg-muted rounded-sm'>{colorStop.tailwindName}</span></div>}

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <Label>Hue</Label>
          <span className="text-muted-foreground">{colorStop.color.h}</span>
        </div>
        <Slider
          min={0}
          max={360}
          step={1}
          value={[colorStop.color.h]}
          onValueChange={value => handleColorChange({ h: value[0] })}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <Label>Saturation</Label>
          <span className="text-muted-foreground">{colorStop.color.s}%</span>
        </div>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[colorStop.color.s]}
          onValueChange={value => handleColorChange({ s: value[0] })}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <Label>Lightness</Label>
          <span className="text-muted-foreground">{colorStop.color.l}%</span>
        </div>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[colorStop.color.l]}
          onValueChange={value => handleColorChange({ l: value[0] })}
        />
      </div>
       <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <Label>Position</Label>
          <span className="text-muted-foreground">{colorStop.position}%</span>
        </div>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[colorStop.position]}
          onValueChange={handlePositionChange}
        />
      </div>
    </div>
  );
}
