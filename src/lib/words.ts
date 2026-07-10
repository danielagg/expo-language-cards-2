import csvRaw from "@/data/top_1000_words.csv?raw"
import type { WordPair } from "./types"

function parseCsv(csv: string): WordPair[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length === 0) return []

  // Detect header
  const first = lines[0]
  const hasHeader = /dutch|english/i.test(first)
  const dataLines = hasHeader ? lines.slice(1) : lines

  const pairs: WordPair[] = []
  for (const line of dataLines) {
    const comma = line.indexOf(",")
    if (comma === -1) continue
    const dutch = line.slice(0, comma).trim().replace(/^"|"$/g, "")
    const english = line.slice(comma + 1).trim().replace(/^"|"$/g, "")
    if (dutch && english) pairs.push({ dutch, english })
  }
  return pairs
}

export const WORDS: readonly WordPair[] = parseCsv(csvRaw)

export const TOTAL_WORDS = WORDS.length

export function wordKey(w: WordPair): string {
  return `${w.dutch}|${w.english}`
}

export function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ")
}

export function getRandomWord(exclude?: WordPair): WordPair {
  if (WORDS.length === 0) {
    throw new Error("No words available")
  }
  if (WORDS.length === 1) return WORDS[0]

  let next: WordPair
  let attempts = 0
  do {
    next = WORDS[Math.floor(Math.random() * WORDS.length)]
    attempts++
  } while (exclude && next === exclude && attempts < 10)
  return next
}

export function getDistractors(correct: WordPair, count = 3): WordPair[] {
  const pool = WORDS.filter((w) => w.dutch !== correct.dutch)
  const picked: WordPair[] = []
  const usedDutch = new Set<string>([correct.dutch])
  const usedAnswer = new Set<string>([correct.english])

  while (picked.length < count && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length)
    const candidate = pool[idx]
    // de-duplicate against correct and already-picked (both sides)
    if (!usedDutch.has(candidate.dutch) && !usedAnswer.has(candidate.english)) {
      picked.push(candidate)
      usedDutch.add(candidate.dutch)
      usedAnswer.add(candidate.english)
    }
    pool.splice(idx, 1)
  }
  return picked
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
