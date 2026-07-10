import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { GameMode } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Keyboard, ListChecks } from "lucide-react"

interface ModeToggleProps {
  value: GameMode
  onChange: (value: GameMode) => void
  className?: string
}

export function ModeToggle({ value, onChange, className }: ModeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => {
        if (v) onChange(v as GameMode)
      }}
      variant="outline"
      className={cn("w-fit", className)}
    >
      <ToggleGroupItem value="type" className="px-3 gap-1.5">
        <Keyboard className="size-4" />
        Type
      </ToggleGroupItem>
      <ToggleGroupItem value="multi-select" className="px-3 gap-1.5">
        <ListChecks className="size-4" />
        Pick
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
