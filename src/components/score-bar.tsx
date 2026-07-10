import { Flame, Target } from "lucide-react"
import type { WordScore } from "@/lib/types"
import type { SessionStats } from "@/lib/scores"
import { cn } from "@/lib/utils"

interface ScoreBarProps {
  score: WordScore
  session: SessionStats
}

export function ScoreBar({ score, session }: ScoreBarProps) {
  const sessionAccuracy =
    session.attempted > 0
      ? Math.round((session.correct / session.attempted) * 100)
      : 0

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-border/40 bg-card/60">
        {/* Word stats */}
        <div className="min-w-0">
          {score.total > 0 ? (
            <>
              <p className="font-mono text-xs text-muted-foreground">
                <span className="text-foreground font-bold">{score.correct}</span>
                <span className="mx-1">/</span>
                <span>{score.total}</span>
                <span className="ml-1.5 text-[10px] uppercase tracking-wider">
                  correct
                </span>
              </p>
              <p className="font-mono text-[10px] text-muted-foreground/60 mt-0.5">
                {score.lastCorrect ? "last: ✓" : "last: ✗"}
              </p>
            </>
          ) : (
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-primary glow-primary">new</span> — first try
            </p>
          )}
        </div>

        {/* HUD stats */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Accuracy */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <Target className="size-3 text-accent" />
              <span className="font-mono font-bold text-base leading-none tabular-nums">
                {sessionAccuracy}
                <span className="text-[10px] text-muted-foreground">%</span>
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
              acc
            </span>
          </div>

          {/* Progress bar */}
          <div className="hidden sm:block w-20">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${sessionAccuracy}%` }}
              />
            </div>
          </div>

          {/* Streak */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <Flame
                className={cn(
                  "size-3.5",
                  session.currentStreak >= 3
                    ? "text-accent"
                    : "text-muted-foreground",
                )}
              />
              <span
                className={cn(
                  "font-mono font-bold text-base leading-none tabular-nums",
                  session.currentStreak >= 3 && "text-accent",
                )}
              >
                {session.currentStreak}
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
              streak
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
