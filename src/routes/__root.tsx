import { useEffect, useState } from "react"
import { createRootRouteWithContext, Link, Outlet, useRouterState } from "@tanstack/react-router"
import { Languages, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

interface RouterContext {}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})

type Theme = "dark" | "light"

function getInitialTheme(): Theme {
  if (typeof localStorage === "undefined") return "dark"
  const stored = localStorage.getItem("nl-cards:theme")
  if (stored === "light" || stored === "dark") return stored
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

function RootLayout() {
  const { location } = useRouterState()
  const path = location.pathname
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("light", theme === "light")
    localStorage.setItem("nl-cards:theme", theme)
  }, [theme])

  const navItems = [
    { to: "/", label: "Home", active: path === "/" },
    { to: "/game", label: "Play", active: path === "/game" },
    { to: "/stats", label: "Stats", active: path === "/stats" },
  ]

  return (
    <div className="min-h-screen flex flex-col relative crt">
      {/* Ambient orbs */}
      <div
        className="orb animate-float"
        style={{
          width: 320,
          height: 320,
          top: -120,
          right: -100,
          background: "oklch(0.68 0.2 140)",
        }}
      />
      <div
        className="orb animate-float"
        style={{
          width: 280,
          height: 280,
          bottom: -80,
          left: -80,
          background: "oklch(0.75 0.18 75)",
          animationDelay: "3s",
        }}
      />

      {/* Header */}
      <header className="relative z-20 border-b border-border/50 glass">
        <div className="w-full px-6 sm:px-10 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground glow-primary transition-transform group-hover:scale-105">
              <Languages className="size-4" />
              <Terminal className="size-2.5 absolute -top-1 -right-1 text-accent" />
            </span>
            <span className="font-bold tracking-tight">
              NL<span className="text-primary">·</span>Cards
            </span>
          </Link>

          <div className="flex items-center gap-2">
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
            <ThemeToggle theme={theme} onChange={setTheme} />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 w-full px-6 sm:px-10 py-6 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-3 text-center text-xs text-muted-foreground">
        <span className="font-mono">bun + vibes · {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
