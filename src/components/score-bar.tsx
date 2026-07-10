import { Flame, Target } from "lucide-react";
import type { WordScore } from "@/lib/types";
import type { SessionStats } from "@/lib/scores";
import { cn } from "@/lib/utils";

interface ScoreBarProps {
  score: WordScore;
  session: SessionStats;
}

export function ScoreBar({ score, session }: ScoreBarProps) {
  const sessionAccuracy =
    session.attempted > 0
      ? Math.round((session.correct / session.attempted) * 100)
      : 0;

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center justify-between gap-4 p-3">
      <div className="min-w-0">
        {score.total > 0 ? (
          <>
            <p className="text-sm truncate">
              <span className="font-mono text-muted-foreground">
                this word:
              </span>{" "}
              <span className="font-bold">
                {score.correct}
                <span className="text-muted-foreground mx-0.5">/</span>
                {score.total}
              </span>{" "}
              <span className="text-muted-foreground text-xs">correct</span>
            </p>
            {score.lastCorrect !== null && (
              <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                last: {score.lastCorrect ? "✓ win" : "✗ miss"}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            <span className="font-mono">new word</span> — first time seeing this
            one
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5">
            <Target className="size-3.5 text-accent" />
            <span className="font-mono font-bold text-lg leading-none">
              {sessionAccuracy}
              <span className="text-xs text-muted-foreground">%</span>
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            session
          </span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5">
            <Flame
              className={cn(
                "size-3.5",
                session.currentStreak >= 3
                  ? "text-chart-3"
                  : "text-muted-foreground",
              )}
            />
            <span
              className={cn(
                "font-mono font-bold text-lg leading-none",
                session.currentStreak >= 3 && "text-chart-3 text-glow-primary",
              )}
            >
              {session.currentStreak}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            streak
          </span>
        </div>
      </div>
    </div>
  );
}
