import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight, BookOpen, BarChart3, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TOTAL_WORDS } from "@/lib/words"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function BootLine({
  text,
  delay,
  dim,
}: {
  text: string
  delay: number
  dim?: boolean
}) {
  return (
    <p
      className="font-mono text-xs opacity-0 animate-slide-up"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: "forwards",
        color: dim ? "var(--muted-foreground)" : "var(--primary)",
      }}
    >
      <span className="text-muted-foreground/40">$ </span>
      {text}
    </p>
  )
}

function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center relative">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-[0.04] dark:opacity-[0.07]" />

      <div className="w-full max-w-3xl mx-auto py-8 space-y-10">
        {/* Boot sequence */}
        <div className="space-y-1 px-2 min-h-[88px]">
          <BootLine text="system booting..." delay={0} dim />
          <BootLine text={`${TOTAL_WORDS} words loaded`} delay={0.3} />
          <BootLine text="deck ready. awaiting input." delay={0.6} />
          <BootLine text="───" delay={0.8} dim />
        </div>

        {/* Hero */}
        <div className="text-center space-y-5 px-4">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="gradient-text animate-gradient inline-block pb-1">
              Learn Dutch
            </span>
          </h1>
          <p
            className="font-mono text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed opacity-0 animate-slide-up"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            <span className="text-primary glow-primary">$</span> Type or pick
            your way through the most common Dutch words. Track accuracy. Build
            your streak.
          </p>
        </div>

        {/* Deck selection */}
        <div
          className="space-y-4 opacity-0 animate-slide-up"
          style={{ animationDelay: "1.3s", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-2 px-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              // SELECT DECK
            </span>
            <div className="h-px flex-1 hacker-sep" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Active deck */}
            <Link to="/game" className="group">
              <Card className="relative overflow-hidden py-6 transition-all duration-300 hover:glow-primary hover:border-primary/50 hover:-translate-y-1 border-primary/30 glow-primary bg-card/80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                <div className="relative px-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/20">
                      <BookOpen className="size-6" />
                    </div>
                    <Badge variant="default" className="font-mono text-[10px]">
                      {TOTAL_WORDS} cards
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="text-xl font-bold tracking-tight">
                      Most Common Dutch Words
                    </h2>
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                      A word appears. You translate. Type or pick from four. Flip
                      direction anytime.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                      [play]
                    </span>
                    <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Card>
            </Link>

            {/* Locked deck */}
            <Card className="relative overflow-hidden py-6 opacity-50 border-dashed bg-card/40">
              <div className="px-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground border border-border/40">
                    <Lock className="size-6" />
                  </div>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    coming soon
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold tracking-tight">Phrases</h2>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    Dutch expressions & idioms with real context. Not quite ready
                    yet.
                  </p>
                </div>
                <Button
                  variant="secondary"
                  className="w-full font-mono text-xs"
                  disabled
                >
                  <Lock className="size-3.5" />
                  locked
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick nav */}
        <div
          className="flex justify-center gap-3 opacity-0 animate-slide-up"
          style={{ animationDelay: "1.6s", animationFillMode: "forwards" }}
        >
          <Link to="/stats">
            <Button variant="ghost" size="sm" className="font-mono text-xs">
              <BarChart3 className="size-3.5" />
              [stats]
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
