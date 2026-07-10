import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WordPair } from "@/lib/types";

interface AnswerMultiSelectProps {
  options: WordPair[];
  correctOption: WordPair;
  answerSide: "dutch" | "english";
  status: "idle" | "correct" | "wrong";
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onNext: () => void;
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
  const locked = status !== "idle";
  const correctIndex = options.findIndex(
    (o) =>
      o.dutch === correctOption.dutch && o.english === correctOption.english,
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2.5">
      <div className="grid gap-2.5">
        {options.map((opt, i) => {
          const text = answerSide === "dutch" ? opt.dutch : opt.english;
          const isCorrect = i === correctIndex;
          const isPicked = i === selectedIndex;

          return (
            <button
              key={`${opt.dutch}-${opt.english}-${i}`}
              type="button"
              disabled={locked}
              onClick={() => onSelect(i)}
              className={cn(
                "group flex items-center justify-between rounded-xl border-2 px-5 py-3.5 text-left text-base font-semibold transition-all",
                status === "idle" &&
                  "border-border hover:border-primary/60 hover:bg-primary/5 hover:glow-primary cursor-pointer",
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
                status !== "idle" && !isCorrect && !isPicked && "opacity-40",
              )}
            >
              <span>{text}</span>
              {status !== "idle" && isCorrect && (
                <Check className="size-5 text-success" />
              )}
              {status !== "idle" && isPicked && !isCorrect && (
                <X className="size-5 text-destructive" />
              )}
            </button>
          );
        })}
      </div>

      {locked && (
        <Button
          type="button"
          onClick={onNext}
          size="lg"
          variant={status === "correct" ? "success" : "default"}
          className="mt-6 w-full text-base"
        >
          Next word
          <ArrowRight className="size-4" />
        </Button>
      )}
    </div>
  );
}
