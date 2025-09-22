
"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { hslToHex, hslToRgb } from '@/lib/utils';
import type { ColorStop, HSLColor } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import TailwindColorPalette from './tailwind-color-palette';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from '@/lib/utils';


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

  const isBlack = colorStop.tailwindName === 'black';
  const isWhite = colorStop.tailwindName === 'white';
  const isPaletteColor = !isBlack && !isWhite;

  return (
    <div className="dark-theme-glass-inner p-3">
      <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <div className="flex items-center gap-2">
              <Popover>
                  <PopoverTrigger asChild>
                    <button
                        className={cn(
                          "w-10 h-10 rounded-md border-2 border-white/50 shadow-inner focus:outline-none",
                          isPaletteColor && "ring-2 ring-ring"
                        )}
                        style={{ backgroundColor: hexValue }}
                        aria-label="Open Tailwind Palette"
                      />
                  </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <TailwindColorPalette onColorSelect={handlePaletteSelect} selectedColorName={colorStop.tailwindName} />
                </PopoverContent>
              </Popover>

              <button
                className={cn(
                  "w-6 h-6 rounded-sm border-2 bg-white shadow-inner",
                  isWhite && "ring-2 ring-ring"
                )}
                onClick={() => handlePaletteSelect({ h: 0, s: 0, l: 100 }, 'white')}
                aria-label="Select white"
              />
              <button
                className={cn(
                  "w-6 h-6 rounded-sm border-2 bg-black shadow-inner",
                  isBlack && "ring-2 ring-ring"
                )}
                onClick={() => handlePaletteSelect({ h: 0, s: 0, l: 0 }, 'black')}
                aria-label="Select black"
              />
            </div>

            <div className='flex flex-col'>
              <h4 className="font-medium">{label}</h4>
              <div className='flex flex-col text-xs text-muted-foreground font-mono'>
                  <span>{hexValue.toUpperCase()}</span>
                  <span>{`rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`}</span>
              </div>
            </div>
          </div>
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
          disabled={isBlack || isWhite}
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
          disabled={isBlack || isWhite}
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
          disabled={isBlack || isWhite}
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
