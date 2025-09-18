import { tailwindColors } from '@/lib/colors';
import type { HSLColor } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type TailwindColorPaletteProps = {
  onColorSelect: (color: HSLColor, name: string) => void;
  selectedColorName?: string;
};

export default function TailwindColorPalette({ onColorSelect, selectedColorName }: TailwindColorPaletteProps) {
  return (
    <div className="p-1">
      <TooltipProvider delayDuration={0}>
        <div className="grid grid-cols-[repeat(22,1fr)] gap-1">
          {tailwindColors.map((color) => (
            <Tooltip key={color.name} >
              <TooltipTrigger asChild>
                <button
                  onClick={() => onColorSelect(color.hsl, color.name)}
                  className={cn(
                    "h-6 w-6 rounded-md border focus:outline-none focus:ring-2 focus:ring-ring relative flex items-center justify-center",
                    selectedColorName === color.name && "ring-2 ring-ring ring-offset-2"
                  )}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                >
                  {selectedColorName === color.name && (
                    <Check className="h-4 w-4 text-white" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }}/>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
