export interface WordPair {
  dutch: string
  english: string
}

export type Direction = "dutch-to-english" | "english-to-dutch"
export type GameMode = "type" | "multi-select"

export interface WordScore {
  correct: number
  total: number
  lastCorrect: boolean | null
  lastSeen: number
}

export type ScoreMap = Record<string, WordScore>
