import { createRootRouteWithContext, Link, Outlet, useRouterState } from "@tanstack/react-router"
import { Languages, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface RouterContext {}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})

function RootLayout() {
  const { location } = useRouterState()
  const path = location.pathname

  const navItems = [
    { to: "/", label: "Home", active: path === "/" },
    { to: "/game", label: "Play", active: path === "/game" },
    { to: "/stats", label: "Stats", active: path === "/stats" },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Ambient orbs — subtle atmosphere */}
      <div
        className="orb animate-float"
        style={{
          width: 360,
          height: 360,
          top: -100,
          right: -80,
          background: "oklch(0.72 0.28 350)",
          opacity: 0.14,
        }}
      />
      <div
        className="orb animate-float"
        style={{
          width: 320,
          height: 320,
          bottom: -80,
          left: -80,
          background: "oklch(0.78 0.18 200)",
          animationDelay: "2s",
          opacity: 0.12,
        }}
      />

      {/* Full-width slim header */}
      <header className="relative z-20 border-b border-border/50 glass">
        <div className="w-full px-6 sm:px-10 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground glow-primary transition-transform group-hover:scale-105">
              <Languages className="size-4" />
              <Sparkles className="size-2.5 absolute -top-1 -right-1 text-accent" />
            </span>
            <span className="font-bold tracking-tight">
              NL<span className="text-primary">·</span>Cards
            </span>
          </Link>
          <nav className="flex items-center gap-1 p-1 rounded-xl bg-muted/40 border border-border/50">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all",
                  item.active
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Full-width main — no max-width, fills the screen */}
      <main className="relative z-10 flex-1 w-full px-6 sm:px-10 py-6 flex flex-col">
        <Outlet />
      </main>

      {/* Minimal footer */}
      <footer className="relative z-10 border-t border-border/50 py-3 text-center text-xs text-muted-foreground">
        <span className="font-mono">
          bun + vibes · {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  )
}
