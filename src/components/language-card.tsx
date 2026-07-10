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
        "relative w-full max-w-xl mx-auto rounded-2xl flex flex-col items-center justify-center gap-4 p-10 select-none transition-all duration-300",
        "border terminal-border bg-card/80",
        status === "idle" && "border-primary/40 glow-primary",
        status === "correct" && "border-success/60 glow-success",
        status === "wrong" && "border-destructive/60 glow-destructive animate-shake",
        className,
      )}
    >
      {/* Top bar — language + mode */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-2 border-b border-border/40">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {">"} {promptLang}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {mode === "type" ? "[type]" : "[pick]"}
        </span>
      </div>

      {/* Power LED */}
      <span
        className={cn(
          "absolute top-2 right-3 size-1.5 rounded-full transition-colors",
          status === "correct" && "bg-success shadow-[0_0_6px] shadow-success",
          status === "wrong" && "bg-destructive shadow-[0_0_6px] shadow-destructive",
          status === "idle" && "bg-primary shadow-[0_0_6px] shadow-primary",
        )}
      />

      {/* The word */}
      <div className="flex-1 flex items-center justify-center pt-6 pb-2">
        <p
          className={cn(
            "font-mono text-5xl sm:text-7xl font-bold tracking-tight text-center break-words leading-none transition-all",
            status === "idle" && "text-foreground text-glow-primary",
            status === "correct" && "text-success text-glow-success",
            status === "wrong" && "text-destructive",
          )}
        >
          <span className="text-muted-foreground/40 select-none">$ </span>
          {prompt}
          <span
            className={cn(
              "inline-block w-[3px] h-[1em] ml-0.5 align-middle animate-blink",
              status === "idle" ? "bg-primary" : "bg-transparent",
            )}
          />
        </p>
      </div>

      {/* Bottom hint */}
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground pt-2 border-t border-border/40 w-full text-center">
        → {answerLang.toLowerCase()}
      </p>
    </div>
  )
}
