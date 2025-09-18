import { tailwindColors } from '@/lib/colors';
import type { HSLColor } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type TailwindColorPaletteProps = {
  onColorSelect: (color: HSLColor) => void;
};

export default function TailwindColorPalette({ onColorSelect }: TailwindColorPaletteProps) {
  const groupedColors = tailwindColors.reduce((acc, color) => {
    const groupName = color.name.split('-')[0];
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(color);
    return acc;
  }, {} as Record<string, typeof tailwindColors>);

  return (
    <ScrollArea className="h-72 w-full">
      <div className="p-1">
        <TooltipProvider>
          {Object.entries(groupedColors).map(([groupName, colors]) => (
            <div key={groupName} className="mb-4">
              <h4 className="capitalize text-sm font-medium mb-2 text-muted-foreground">{groupName}</h4>
              <div className="grid grid-cols-10 gap-1">
                {colors.map((color) => (
                  <Tooltip key={color.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onColorSelect(color.hsl)}
                        className="h-6 w-6 rounded-full border focus:outline-none focus:ring-2 focus:ring-ring"
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{color.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
}
