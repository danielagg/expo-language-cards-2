import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight, Lock, BookOpen, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TOTAL_WORDS } from "@/lib/words"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="w-full space-y-10 animate-slide-up">
      {/* Compact intro — cards are the real CTA */}
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/30 px-3 py-1 text-[11px] font-mono text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
          {TOTAL_WORDS} words loaded
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
          Learn Dutch, <span className="gradient-text">one card at a time.</span>
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Pick a deck and start glowing. Type or pick — your call.
        </p>
      </div>

      {/* The focal point — two cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Link to="/game" className="group">
          <Card className="relative overflow-hidden py-7 transition-all hover:glow-primary hover:border-primary/50 hover:-translate-y-0.5 glow-primary border-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <div className="relative px-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <BookOpen className="size-7" />
                </div>
                <span className="font-mono text-[11px] text-muted-foreground rounded-full border border-border/60 px-2.5 py-1">
                  {TOTAL_WORDS} words
                </span>
              </div>
              <div className="space-y-1.5">
                <h2 className="text-2xl font-bold">Most Common Dutch Words</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A Dutch word glows on a card. Type the English — or pick from
                  four. Flip the direction whenever.
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  Start playing
                </span>
                <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Card>
        </Link>

        <Card className="relative overflow-hidden py-7 opacity-55 border-dashed">
          <div className="px-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Lock className="size-7" />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground rounded-full border border-border/60 px-2.5 py-1">
                coming soon
              </span>
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold">Phrases</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dutch expressions & idioms with real context. Not quite ready
                yet.
              </p>
            </div>
            <Button variant="secondary" className="w-full" disabled>
              <Lock className="size-4" />
              Not yet, friend
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex justify-center pt-1">
        <Link to="/stats">
          <Button variant="ghost" size="sm" className="font-mono text-xs uppercase tracking-wider">
            <BarChart3 className="size-4" />
            View stats
          </Button>
        </Link>
      </div>
    </div>
  )
}
