import { useMemo } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Trash2, Target, Flame, Layers, Trophy, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useScores } from "@/lib/scores"
import { TOTAL_WORDS } from "@/lib/words"
import { cn } from "@/lib/utils"
import type { ScoreMap, WordPair } from "@/lib/types"

export const Route = createFileRoute("/stats")({
  component: StatsPage,
})

interface RankedWord {
  word: WordPair
  key: string
  correct: number
  total: number
  accuracy: number
}

function rankWords(scores: ScoreMap): {
  worst: RankedWord[]
  best: RankedWord[]
  seen: number
} {
  const ranked: RankedWord[] = Object.entries(scores).map(([key, s]) => {
    const [dutch, english] = key.split("|")
    return {
      word: { dutch, english },
      key,
      correct: s.correct,
      total: s.total,
      accuracy: s.total > 0 ? s.correct / s.total : 0,
    }
  })

  ranked.sort((a, b) => a.accuracy - b.accuracy || b.total - a.total)
  const worst = ranked.slice(0, 8)
  const best = [...ranked].reverse().slice(0, 8)
  return { worst, best, seen: ranked.length }
}

function StatCard({
  icon,
  label,
  value,
  hint,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  hint?: string
  accent: "primary" | "accent" | "success"
}) {
  const accentColor = {
    primary: "text-primary border-primary/30",
    accent: "text-accent border-accent/30",
    success: "text-success border-success/30",
  }[accent]

  return (
    <Card className={cn("py-5 border-l-2", accentColor, "bg-card/80")}>
      <div className="px-5 flex items-center gap-4">
        <div
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-xl border shrink-0",
            accentColor,
            "bg-current/5",
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-mono font-bold text-3xl leading-none tracking-tight tabular-nums">
            {value}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1.5">
            {label}
          </p>
          {hint && (
            <p className="font-mono text-[9px] text-muted-foreground/60 mt-0.5">
              {hint}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

function WordRow({ r }: { r: RankedWord }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-border/30 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-sm truncate">
          {r.word.dutch}
          <span className="text-muted-foreground font-normal ml-1.5">
            — {r.word.english}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
          {r.correct}/{r.total}
        </span>
        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              r.accuracy >= 0.8
                ? "bg-success"
                : r.accuracy >= 0.5
                  ? "bg-accent"
                  : "bg-destructive",
            )}
            style={{ width: `${r.accuracy * 100}%` }}
          />
        </div>
        <span
          className={cn(
            "font-mono text-[11px] font-bold tabular-nums w-8 text-right",
            r.accuracy >= 0.8
              ? "text-success"
              : r.accuracy >= 0.5
                ? "text-accent"
                : "text-destructive",
          )}
        >
          {Math.round(r.accuracy * 100)}%
        </span>
      </div>
    </div>
  )
}

function StatsPage() {
  const { scores, session, resetAll } = useScores()

  const { worst, best, seen } = useMemo(() => rankWords(scores), [scores])
  const overallAccuracy =
    session.attempted > 0
      ? Math.round((session.correct / session.attempted) * 100)
      : 0
  const unseen = TOTAL_WORDS - seen

  if (session.attempted === 0 && seen === 0) {
    return (
      <div className="text-center space-y-6 py-16 animate-slide-up max-w-lg mx-auto">
        <div className="inline-flex size-20 items-center justify-center rounded-2xl border border-border/40 bg-card/60 text-muted-foreground">
          <Layers className="size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-mono">
            <span className="text-muted-foreground">// </span>NO DATA
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Play a few rounds first. Stats auto-generate.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link to="/game">
            <Button className="font-mono">
              [play] <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="font-mono text-xs">
              [home]
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-mono">
            <span className="text-muted-foreground">// </span>
            <span className="gradient-text">STATS</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mt-1">
            local session data
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetAll}
          className="font-mono text-xs"
        >
          <Trash2 className="size-3.5" />
          reset
        </Button>
      </div>

      {/* HUD row */}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          icon={<Target className="size-5" />}
          label="accuracy"
          value={`${overallAccuracy}%`}
          hint={`${session.correct}/${session.attempted} correct`}
          accent="accent"
        />
        <StatCard
          icon={<Flame className="size-5" />}
          label="best streak"
          value={session.bestStreak}
          accent="primary"
        />
        <StatCard
          icon={<Trophy className="size-5" />}
          label="seen"
          value={`${seen}/${TOTAL_WORDS}`}
          hint={unseen > 0 ? `${unseen} remaining` : "database complete"}
          accent="success"
        />
      </div>

      {/* Word rankings */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="py-5 border-l-2 border-destructive/30 bg-card/80">
          <div className="px-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="size-2 rounded-full bg-destructive" />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                needs work
              </h2>
            </div>
            <p className="font-mono text-[9px] text-muted-foreground/60 mb-3">
              lowest accuracy, worst first
            </p>
            {worst.length === 0 ? (
              <p className="font-mono text-xs text-muted-foreground py-4">
                nothing here yet.
              </p>
            ) : (
              worst.map((r) => <WordRow key={r.key} r={r} />)
            )}
          </div>
        </Card>

        <Card className="py-5 border-l-2 border-success/30 bg-card/80">
          <div className="px-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="size-2 rounded-full bg-success" />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                mastered
              </h2>
            </div>
            <p className="font-mono text-[9px] text-muted-foreground/60 mb-3">
              highest accuracy, best first
            </p>
            {best.length === 0 ? (
              <p className="font-mono text-xs text-muted-foreground py-4">
                nothing here yet.
              </p>
            ) : (
              best.map((r) => <WordRow key={r.key} r={r} />)
            )}
          </div>
        </Card>
      </div>

      <div className="flex justify-center pt-1">
        <Link to="/game">
          <Button variant="ghost" size="sm" className="font-mono text-xs">
            [play more]
          </Button>
        </Link>
      </div>
    </div>
  )
}
