import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { LanguageCard } from "@/components/language-card";
import { DirectionToggle } from "@/components/direction-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { AnswerInput } from "@/components/answer-input";
import { AnswerMultiSelect } from "@/components/answer-multi-select";
import { ScoreBar } from "@/components/score-bar";
import { Button } from "@/components/ui/button";
import {
  getDistractors,
  getRandomWord,
  shuffle,
} from "@/lib/words";
import type { Direction, GameMode, WordPair } from "@/lib/types";
import { useScores } from "@/lib/scores";

export const Route = createFileRoute("/game")({
  component: GamePage,
});

type Status = "idle" | "correct" | "wrong";

interface Round {
  word: WordPair;
  options: WordPair[] | null;
  selectedIndex: number | null;
}

const DIR_KEY = "nl-cards:direction";
const MODE_KEY = "nl-cards:mode";

function loadDirection(): Direction {
  if (typeof localStorage === "undefined") return "dutch-to-english";
  const v = localStorage.getItem(DIR_KEY);
  return v === "english-to-dutch" ? "english-to-dutch" : "dutch-to-english";
}

function loadMode(): GameMode {
  if (typeof localStorage === "undefined") return "type";
  const v = localStorage.getItem(MODE_KEY);
  return v === "multi-select" ? "multi-select" : "type";
}

function buildRound(word: WordPair, mode: GameMode): Round {
  let options: WordPair[] | null = null;
  if (mode === "multi-select") {
    const distractors = getDistractors(word, 3);
    options = shuffle([word, ...distractors]);
  }
  return { word, options, selectedIndex: null };
}

function GamePage() {
  const { getScore, recordResult, session } = useScores();
  const [direction, setDirection] = useState<Direction>(loadDirection);
  const [mode, setMode] = useState<GameMode>(loadMode);
  const [status, setStatus] = useState<Status>("idle");
  const [round, setRound] = useState<Round>(() =>
    buildRound(getRandomWord(), loadMode()),
  );

  useEffect(() => {
    localStorage.setItem(DIR_KEY, direction);
  }, [direction]);
  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  const startRound = useCallback((nextMode: GameMode, exclude?: WordPair) => {
    setStatus("idle");
    setRound(buildRound(getRandomWord(exclude), nextMode));
  }, []);

  const handleDirectionChange = useCallback(
    (next: Direction) => {
      setDirection(next);
      startRound(mode);
    },
    [mode, startRound],
  );

  const handleModeChange = useCallback(
    (next: GameMode) => {
      setMode(next);
      startRound(next);
    },
    [startRound],
  );

  const handleTypeResult = useCallback(
    (isCorrect: boolean) => {
      recordResult(round.word, isCorrect);
      setStatus(isCorrect ? "correct" : "wrong");
    },
    [recordResult, round.word],
  );

  const handleMultiSelect = useCallback(
    (index: number) => {
      if (status !== "idle" || !round.options) return;
      const selected = round.options[index];
      const isCorrect =
        selected.dutch === round.word.dutch &&
        selected.english === round.word.english;
      setRound((r) => ({ ...r, selectedIndex: index }));
      recordResult(round.word, isCorrect);
      setStatus(isCorrect ? "correct" : "wrong");
    },
    [recordResult, round, status],
  );

  const handleNext = useCallback(() => {
    startRound(mode, round.word);
  }, [mode, round.word, startRound]);

  const handleSkip = useCallback(() => {
    startRound(mode, round.word);
  }, [mode, round.word, startRound]);

  const { prompt, expected, answerSide } = useMemo(() => {
    if (direction === "dutch-to-english") {
      return {
        prompt: round.word.dutch,
        expected: round.word.english,
        answerSide: "english" as const,
      };
    }
    return {
      prompt: round.word.english,
      expected: round.word.dutch,
      answerSide: "dutch" as const,
    };
  }, [direction, round.word]);

  const score = getScore(round.word);

  return (
    <div className="flex-1 flex flex-col gap-4 animate-slide-up min-h-0">
      {/* Top bar — controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
        <div className="flex flex-wrap items-center gap-2">
          <DirectionToggle value={direction} onChange={handleDirectionChange} />
          <ModeToggle value={mode} onChange={handleModeChange} />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="font-mono text-xs uppercase tracking-wider"
        >
          <RotateCcw className="size-4" />
          Skip
        </Button>
      </div>

      {/* Center stage — card + answer fills available space */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-0">
        <LanguageCard
          prompt={prompt}
          direction={direction}
          mode={mode}
          status={status}
        />

        {mode === "type" ? (
          <AnswerInput
            key={`${round.word.dutch}-${round.word.english}-${mode}-${direction}`}
            status={status}
            expected={expected}
            onResult={handleTypeResult}
            onNext={handleNext}
          />
        ) : round.options ? (
          <AnswerMultiSelect
            key={`${round.word.dutch}-${round.word.english}-${mode}-${direction}`}
            options={round.options}
            correctOption={round.word}
            answerSide={answerSide}
            status={status}
            selectedIndex={round.selectedIndex}
            onSelect={handleMultiSelect}
            onNext={handleNext}
          />
        ) : null}
      </div>

      {/* Bottom — score */}
      <div className="shrink-0 space-y-2">
        <ScoreBar score={score} session={session} />
      </div>
    </div>
  );
}
