import { useCallback, useEffect, useState } from "react"
import type { ScoreMap, WordPair, WordScore } from "./types"
import { wordKey } from "./words"

const STORAGE_KEY = "nl-cards:scores:v1"
const SESSION_KEY = "nl-cards:session:v1"

export interface SessionStats {
  attempted: number
  correct: number
  bestStreak: number
  currentStreak: number
}

const emptySession: SessionStats = {
  attempted: 0,
  correct: 0,
  bestStreak: 0,
  currentStreak: 0,
}

function readScores(): ScoreMap {
  if (typeof localStorage === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === "object" && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

function writeScores(map: ScoreMap): void {
  if (typeof localStorage === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    // quota / privacy mode — ignore
  }
}

function readSession(): SessionStats {
  if (typeof localStorage === "undefined") return { ...emptySession }
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return { ...emptySession }
    const parsed = JSON.parse(raw)
    return { ...emptySession, ...parsed }
  } catch {
    return { ...emptySession }
  }
}

function writeSession(s: SessionStats): void {
  if (typeof localStorage === "undefined") return
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(s))
  } catch {
    // ignore
  }
}

export function useScores() {
  const [scores, setScores] = useState<ScoreMap>(() => readScores())
  const [session, setSession] = useState<SessionStats>(() => readSession())

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setScores(readScores())
      if (e.key === SESSION_KEY) setSession(readSession())
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const recordResult = useCallback((word: WordPair, isCorrect: boolean) => {
    const key = wordKey(word)
    setScores((prev) => {
      const existing: WordScore = prev[key] ?? {
        correct: 0,
        total: 0,
        lastCorrect: null,
        lastSeen: 0,
      }
      const next: ScoreMap = {
        ...prev,
        [key]: {
          correct: existing.correct + (isCorrect ? 1 : 0),
          total: existing.total + 1,
          lastCorrect: isCorrect,
          lastSeen: Date.now(),
        },
      }
      writeScores(next)
      return next
    })

    setSession((prev) => {
      const currentStreak = isCorrect ? prev.currentStreak + 1 : 0
      const next: SessionStats = {
        attempted: prev.attempted + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        currentStreak,
        bestStreak: Math.max(prev.bestStreak, currentStreak),
      }
      writeSession(next)
      return next
    })
  }, [])

  const getScore = useCallback(
    (word: WordPair): WordScore => {
      return scores[wordKey(word)] ?? {
        correct: 0,
        total: 0,
        lastCorrect: null,
        lastSeen: 0,
      }
    },
    [scores]
  )

  const resetAll = useCallback(() => {
    setScores({})
    setSession({ ...emptySession })
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(SESSION_KEY)
      } catch {
        // ignore
      }
    }
  }, [])

  return {
    scores,
    session,
    getScore,
    recordResult,
    resetAll,
  }
}

export type ScoresApi = ReturnType<typeof useScores>
