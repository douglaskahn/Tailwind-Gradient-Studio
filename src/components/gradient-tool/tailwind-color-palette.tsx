
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
import { ScrollArea } from '../ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

type TailwindColorPaletteProps = {
  onColorSelect: (color: HSLColor, name: string) => void;
  selectedColorName?: string;
  selectedPaletteName?: string;
};

export default function TailwindColorPalette({ onColorSelect, selectedColorName, selectedPaletteName }: TailwindColorPaletteProps) {
  const isMobile = useIsMobile();
  return (
    <div className="p-1 space-y-2">
       {isMobile && selectedPaletteName && (
        <div className="text-center text-sm font-medium text-popover-foreground">
          Selected: <span className="font-mono p-1 bg-muted rounded-sm">{selectedPaletteName}</span>
        </div>
      )}
      <ScrollArea className="w-full">
        <TooltipProvider delayDuration={0}>
          <div className="grid grid-cols-22 gap-1 w-max p-1">
            {tailwindColors.map((color) => (
              <Tooltip key={color.name} >
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onColorSelect(color.hsl, color.name)}
                    className={cn(
                      "h-6 w-6 rounded-md border relative flex items-center justify-center",
                      selectedColorName === color.name && "ring-2 ring-ring ring-offset-background"
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
      </ScrollArea>
    </div>
  );
}
