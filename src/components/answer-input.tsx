import { useState, type FormEvent } from "react"
import { Check, X, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnswerInputProps {
  status: "idle" | "correct" | "wrong"
  expected: string
  onResult: (isCorrect: boolean, typed: string) => void
  onNext: () => void
}

export function AnswerInput({
  status,
  expected,
  onResult,
  onNext,
}: AnswerInputProps) {
  const [value, setValue] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (status !== "idle") return
    if (!value.trim()) return
    const typed = value.trim()
    const isCorrect =
      typed.toLowerCase().replace(/\s+/g, " ").trim() ===
      expected.toLowerCase().replace(/\s+/g, " ").trim()
    onResult(isCorrect, typed)
  }

  function handleNext() {
    setValue("")
    onNext()
  }

  const locked = status !== "idle"

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto space-y-3"
    >
      <div className="relative flex items-center">
        <span
          className={cn(
            "absolute left-4 font-mono text-lg select-none pointer-events-none z-10",
            status === "idle" && "text-primary",
            status === "correct" && "text-success",
            status === "wrong" && "text-destructive",
          )}
        >
          $
        </span>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type translation..."
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          disabled={locked}
          autoFocus
          className={cn(
            "h-14 text-lg rounded-xl font-mono font-medium transition-all pl-8 pr-12",
            "bg-card border-2",
            status === "idle" &&
              "border-input focus-visible:border-primary focus-visible:glow-primary",
            status === "correct" &&
              "border-success bg-success/5 text-success glow-success",
            status === "wrong" &&
              "border-destructive bg-destructive/5 text-destructive glow-destructive",
          )}
        />
        {status === "correct" && (
          <Check className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-success" />
        )}
        {status === "wrong" && (
          <X className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-destructive" />
        )}
      </div>

      {status === "idle" && (
        <Button
          type="submit"
          size="lg"
          className="w-full text-base font-mono"
          disabled={!value.trim()}
        >
          [check]
        </Button>
      )}

      {status !== "idle" && (
        <div className="space-y-2">
          {status === "wrong" && (
            <p className="text-center font-mono text-sm text-muted-foreground">
              expected{" "}
              <span className="text-success font-bold text-glow-success">
                {expected}
              </span>
            </p>
          )}
          <Button
            type="button"
            onClick={handleNext}
            size="lg"
            variant={status === "correct" ? "success" : "default"}
            className="w-full text-base font-mono"
          >
            [next] <ArrowRight className="size-4" />
          </Button>
        </div>
      )}
    </form>
  )
}
