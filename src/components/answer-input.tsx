import { useState, type FormEvent } from "react";
import { Check, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnswerInputProps {
  status: "idle" | "correct" | "wrong";
  expected: string;
  onResult: (isCorrect: boolean, typed: string) => void;
  onNext: () => void;
}

export function AnswerInput({
  status,
  expected,
  onResult,
  onNext,
}: AnswerInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "idle") {
      if (!value.trim()) return;
      const typed = value.trim();
      const isCorrect =
        typed.toLowerCase().replace(/\s+/g, " ").trim() ===
        expected.toLowerCase().replace(/\s+/g, " ").trim();
      onResult(isCorrect, typed);
    } else {
      handleNext();
    }
  }

  function handleNext() {
    setValue("");
    onNext();
  }

  const locked = status !== "idle";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-3"
    >
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type the translation…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          disabled={locked}
          autoFocus
          className={cn(
            "h-14 text-lg rounded-xl font-medium transition-all pr-10",
            status === "idle" &&
              "focus-visible:border-primary focus-visible:glow-primary",
            status === "correct" &&
              "border-success bg-success/10 text-success glow-success",
            status === "wrong" &&
              "border-destructive bg-destructive/10 text-destructive glow-destructive",
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
          className="w-full text-base"
          disabled={!value.trim()}
        >
          Check it
          <CornerDownLeft className="size-4" />
        </Button>
      )}

      {status !== "idle" && (
        <div className="space-y-2">
          {status === "wrong" && (
            <p className="text-center text-sm text-muted-foreground">
              the answer was{" "}
              <span className="font-bold text-success text-glow-success">
                {expected}
              </span>
            </p>
          )}

          <Button
            type="submit"
            onClick={handleNext}
            size="lg"
            variant={status === "correct" ? "success" : "default"}
            className="w-full text-base"
          >
            Next word
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}
    </form>
  );
}
