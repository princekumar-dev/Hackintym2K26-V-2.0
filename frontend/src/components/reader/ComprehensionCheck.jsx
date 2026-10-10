import { useState } from 'react'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import KnowledgeGraph from './KnowledgeGraph.jsx'
import './ComprehensionCheck.css'

const QUESTIONS = [
  { id: 'q1', concept: 'basics', q: 'What do plants use to make their food?', options: ['Sunlight, water and air', 'Only soil', 'Moonlight and rocks'], answer: 0 },
  { id: 'q2', concept: 'chlorophyll', q: 'What catches the sunlight inside the leaf?', options: ['Chlorophyll (the green colour)', 'The roots', 'The stem'], answer: 0 },
  { id: 'q3', concept: 'reaction', q: 'What does the leaf make from CO₂ + water + light?', options: ['Glucose and oxygen', 'Only water', 'Plastic'], answer: 0 },
  { id: 'q4', concept: 'oxygen', q: 'Which gas does the plant give out?', options: ['Oxygen', 'Carbon dioxide', 'Smoke'], answer: 0 },
]
const CONCEPTS = [
  { key: 'basics', label: 'Basics', emoji: '🌱' },
  { key: 'chlorophyll', label: 'Chlorophyll', emoji: '🍃' },
  { key: 'reaction', label: 'Reaction', emoji: '⚗️' },
  { key: 'oxygen', label: 'Oxygen', emoji: '🫁' },
]
const HELP = {
  basics: 'Re-read the first lines — plants use sunlight, water and air.',
  chlorophyll: 'Tap the word “chlorophyll” in the lesson to see what it means.',
  reaction: 'Listen to the equation line, then open the Visual Explainer.',
  oxygen: 'Check the last line — the plant gives out oxygen.',
}

export default function ComprehensionCheck({ onEasier }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = QUESTIONS.every((q) => answers[q.id] != null)
  const pick = (qid, i) => {
    if (!submitted) setAnswers((a) => ({ ...a, [qid]: i }))
  }
  const statusOf = (ckey) => {
    if (!submitted) return 'untested'
    const q = QUESTIONS.find((x) => x.concept === ckey)
    return answers[q.id] === q.answer ? 'strong' : 'weak'
  }
  const concepts = CONCEPTS.map((c) => ({ ...c, status: statusOf(c.key) }))
  const weak = concepts.filter((c) => c.status === 'weak')
  const score = QUESTIONS.filter((q) => answers[q.id] === q.answer).length
  const retry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="cc">
      <div className="cc-head">
        <h3 className="cc-title"><Icon name="check" size={18} /> Quick check — do you get it?</h3>
        {submitted ? <span className="cc-score">{score}/{QUESTIONS.length} correct</span> : null}
      </div>

      <div className="cc-qs">
        {QUESTIONS.map((q, qi) => (
          <div key={q.id} className="cc-q">
            <p className="cc-q-text"><span className="cc-q-n">{qi + 1}</span> {q.q}</p>
            <div className="cc-opts">
              {q.options.map((o, i) => {
                const picked = answers[q.id] === i
                let cls = ''
                if (submitted) cls = i === q.answer ? 'ok' : picked ? 'no' : ''
                else if (picked) cls = 'sel'
                return (
                  <button key={o} className={`cc-opt ${cls}`} onClick={() => pick(q.id, i)} disabled={submitted}>
                    {o}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <Button className="cc-submit" onClick={() => setSubmitted(true)} disabled={!allAnswered}>
          Check my understanding
        </Button>
      ) : (
        <div className="cc-result">
          <h4 className="cc-rtitle">Your understanding map</h4>
          <p className="cc-rsub">Green = you’ve got it · Red = let’s strengthen this.</p>
          <KnowledgeGraph concepts={concepts} />
          {weak.length > 0 ? (
            <div className="cc-weak">
              <p className="cc-weak-title">⚠ Let’s make these easier:</p>
              <ul className="cc-weak-list">
                {weak.map((c) => (
                  <li key={c.key}><strong>{c.emoji} {c.label}:</strong> {HELP[c.key]}</li>
                ))}
              </ul>
              <div className="cc-weak-actions">
                <Button size="sm" onClick={() => onEasier?.()}>
                  <Icon name="sparkle" size={16} /> Explain it simpler
                </Button>
                <Button size="sm" variant="secondary" onClick={retry}>Try again</Button>
              </div>
            </div>
          ) : (
            <div className="cc-allgood">
              🎉 You understood every part — brilliant!
              <Button size="sm" variant="secondary" onClick={retry}>Try again</Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
