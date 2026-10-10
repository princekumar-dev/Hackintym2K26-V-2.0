import { sampleLesson } from './sampleLesson.js'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

// Simulate extract -> prepare pipeline. Returns the full lesson object.
export async function transformLesson() {
  await delay(900)
  return sampleLesson
}

// Resolve a block's text for the chosen level + language.
export function blockText(block, levelKey, langKey) {
  if (levelKey === 'original') return block.original
  if (
    (langKey === 'hing' || langKey === 'tang') &&
    block[langKey] &&
    block[langKey][levelKey]
  ) {
    return block[langKey][levelKey]
  }
  const lvl = block[levelKey] || block.simple
  return lvl[langKey] || lvl.en
}

// Grounded Q&A — answers only from this lesson, otherwise refuses.
export async function askLesson(question, lesson = sampleLesson) {
  await delay(650)
  const q = (question || '').toLowerCase()
  const hit = lesson.qaPairs.find((p) => p.keywords.some((k) => q.includes(k)))
  if (hit) return { answer: hit.answer, grounded: true }
  return {
    answer:
      "Let's finish this leaf chapter first, then we can talk about that! 😊 Try asking about photosynthesis, chlorophyll, oxygen, or glucose.",
    grounded: false,
  }
}

const STOP = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'of', 'to', 'and', 'in', 'it', 'that', 'this', 'for', 'on',
  'with', 'as', 'by', 'or', 'its', 'they', 'use', 'used', 'make', 'makes', 'from', 'into',
  'ek', 'wo', 'hai', 'hain', 'me', 'ki', 'ka', 'ko', 'se', 'aur', 'naam', 'jo', 'panni', 'oda', 'dhaan', 'naama',
])
const capWords = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase())

// Tap-to-understand — understands ANY tapped word (any language or level):
// matches key terms fuzzily and always returns something helpful.
export async function explainTerm(term, lesson = sampleLesson) {
  await delay(300)
  const raw = (term || '').trim()
  let key = raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/-(la|nu|oda|ku|il|le|ko|se|a)$/g, '')
    .replace(/-/g, ' ')
    .trim()

  const entries = Object.entries(lesson.glossary)
  let hitKey = null
  let hit = lesson.glossary[key]
  if (hit) hitKey = key
  if (!hit) {
    const f = entries.find(
      ([k]) => (key.length > 2 && key.includes(k)) || (k.length > 3 && k.includes(key)),
    )
    if (f) {
      hitKey = f[0]
      hit = f[1]
    }
  }
  if (!hit) {
    const words = key.split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w))
    for (const w of words) {
      const f = entries.find(([k]) => k === w || k.includes(w) || w.includes(k))
      if (f) {
        hitKey = f[0]
        hit = f[1]
        break
      }
    }
  }

  if (hit) {
    return { term: capWords(hitKey), meaning: hit.meaning, analogy: hit.analogy, grounded: true }
  }
  return {
    term: raw,
    meaning: `“${raw}” is part of today's lesson on photosynthesis — how a leaf makes food from sunlight, water and air.`,
    analogy: 'Tip: tap the green highlighted words for an exact meaning, or ask Didi / Bhaiya to explain it in your language.',
    grounded: false,
  }
}
