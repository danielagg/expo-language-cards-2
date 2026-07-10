import { cn } from "@/lib/utils"
import type { Direction } from "@/lib/types"

interface LanguageCardProps {
  prompt: string
  direction: Direction
  mode: "type" | "multi-select"
  status: "idle" | "correct" | "wrong"
  className?: string
}

export function LanguageCard({
  prompt,
  direction,
  mode,
  status,
  className,
}: LanguageCardProps) {
  const promptLang = direction === "dutch-to-english" ? "Dutch" : "English"
  const answerLang = direction === "dutch-to-english" ? "English" : "Dutch"

  return (
    <div
      className={cn(
        "relative aspect-[5/3] w-full max-w-2xl mx-auto rounded-3xl flex flex-col items-center justify-center gap-4 p-10 select-none transition-all duration-300",
        "border-2 glass",
        status === "idle" &&
          "border-primary/40 glow-primary",
        status === "correct" &&
          "border-success glow-success",
        status === "wrong" && "border-destructive glow-destructive animate-shake",
        className
      )}
    >
      {/* Top row: language + mode */}
      <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {promptLang}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {mode === "type" ? "type it" : "pick one"}
        </span>
      </div>

      {/* The word — the hero */}
      <div className="flex-1 flex items-center justify-center">
        <p
          className={cn(
            "text-7xl sm:text-8xl font-bold tracking-tight text-center break-words leading-none transition-all",
            status === "idle" && "gradient-text-warm text-glow-primary",
            status === "correct" && "text-success text-glow-success",
            status === "wrong" && "text-destructive"
          )}
        >
          {prompt}
        </p>
      </div>

      {/* Bottom hint */}
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        → answer in {answerLang.toLowerCase()}
      </p>

      {/* Corner accents */}
      <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary/50 rounded-tl-xl" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-primary/50 rounded-tr-xl" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-primary/50 rounded-bl-xl" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary/50 rounded-br-xl" />
    </div>
  )
}
