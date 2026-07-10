import { Check, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { WordPair } from "@/lib/types"

interface AnswerMultiSelectProps {
  options: WordPair[]
  correctOption: WordPair
  answerSide: "dutch" | "english"
  status: "idle" | "correct" | "wrong"
  selectedIndex: number | null
  onSelect: (index: number) => void
  onNext: () => void
}

export function AnswerMultiSelect({
  options,
  correctOption,
  answerSide,
  status,
  selectedIndex,
  onSelect,
  onNext,
}: AnswerMultiSelectProps) {
  const locked = status !== "idle"
  const correctIndex = options.findIndex(
    (o) =>
      o.dutch === correctOption.dutch && o.english === correctOption.english,
  )

  return (
    <div className="w-full max-w-xl mx-auto space-y-2.5">
      <div className="grid gap-2">
        {options.map((opt, i) => {
          const text = answerSide === "dutch" ? opt.dutch : opt.english
          const isCorrect = i === correctIndex
          const isPicked = i === selectedIndex
          const label = String.fromCharCode(97 + i)

          return (
            <button
              key={`${opt.dutch}-${opt.english}-${i}`}
              type="button"
              disabled={locked}
              onClick={() => onSelect(i)}
              className={cn(
                "group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left font-mono text-base font-medium transition-all",
                "bg-card/80 terminal-border",
                status === "idle" &&
                  "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
                status === "idle" &&
                  isPicked &&
                  "border-primary bg-primary/10 glow-primary",
                status !== "idle" &&
                  isCorrect &&
                  "border-success bg-success/10 text-success glow-success",
                status !== "idle" &&
                  isPicked &&
                  !isCorrect &&
                  "border-destructive bg-destructive/10 text-destructive glow-destructive",
                status !== "idle" && !isCorrect && !isPicked && "opacity-30",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-lg text-xs font-bold shrink-0",
                  "border border-current/20 bg-current/10",
                  status === "idle" && "text-muted-foreground",
                  status !== "idle" && isCorrect && "text-success",
                  status !== "idle" && isPicked && !isCorrect && "text-destructive",
                )}
              >
                {label}
              </span>
              <span className="flex-1">{text}</span>
              {status !== "idle" && isCorrect && (
                <Check className="size-5 shrink-0 text-success" />
              )}
              {status !== "idle" && isPicked && !isCorrect && (
                <X className="size-5 shrink-0 text-destructive" />
              )}
            </button>
          )
        })}
      </div>

      {locked && (
        <Button
          type="button"
          onClick={onNext}
          size="lg"
          variant={status === "correct" ? "success" : "default"}
          className="mt-4 w-full text-base font-mono"
        >
          [next] <ArrowRight className="size-4" />
        </Button>
      )}
    </div>
  )
}
