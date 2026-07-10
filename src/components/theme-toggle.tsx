import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

type Theme = "dark" | "light"

interface ThemeToggleProps {
  theme: Theme
  onChange: (theme: Theme) => void
  className?: string
}

export function ThemeToggle({ theme, onChange, className }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative inline-flex size-8 items-center justify-center rounded-lg",
        "border border-border/60 bg-secondary/40",
        "text-muted-foreground hover:text-foreground",
        "transition-all hover:border-primary/40 hover:glow-primary",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun
        className={cn(
          "size-4 absolute transition-all",
          theme === "light" ? "opacity-100 scale-100" : "opacity-0 scale-50 rotate-90",
        )}
      />
      <Moon
        className={cn(
          "size-4 absolute transition-all",
          theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-50 rotate-90",
        )}
      />
    </button>
  )
}
