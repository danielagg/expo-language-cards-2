import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Direction } from "@/lib/types"
import { cn } from "@/lib/utils"

interface DirectionToggleProps {
  value: Direction
  onChange: (value: Direction) => void
  className?: string
}

export function DirectionToggle({
  value,
  onChange,
  className,
}: DirectionToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => {
        if (v) onChange(v as Direction)
      }}
      variant="outline"
      className={cn("w-fit font-mono text-xs", className)}
    >
      <ToggleGroupItem value="dutch-to-english" className="px-3 uppercase tracking-wider">
        NL → EN
      </ToggleGroupItem>
      <ToggleGroupItem value="english-to-dutch" className="px-3 uppercase tracking-wider">
        EN → NL
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
