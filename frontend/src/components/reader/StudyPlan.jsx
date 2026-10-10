import { useState } from 'react'
import Icon from '../ui/Icon.jsx'
import './StudyPlan.css'

export default function StudyPlan({ steps = [] }) {
  const [done, setDone] = useState(() => steps.map((s) => !!s.done))
  const toggle = (i) => setDone((d) => d.map((v, j) => (j === i ? !v : v)))
  const completed = done.filter(Boolean).length
  const pct = steps.length ? Math.round((completed / steps.length) * 100) : 0

  return (
    <div className="plan">
      <div className="plan-head">
        <span className="plan-count">
          {completed}/{steps.length} done
        </span>
        <span className="plan-bar" aria-hidden="true">
          <span className="plan-fill" style={{ width: `${pct}%` }} />
        </span>
      </div>
      <ul className="plan-list">
        {steps.map((s, i) => (
          <li key={s.step}>
            <button
              className={`plan-item ${done[i] ? 'plan-done' : ''}`}
              onClick={() => toggle(i)}
              aria-pressed={done[i]}
            >
              <span className="plan-check">{done[i] ? <Icon name="check" size={14} /> : null}</span>
              <span className="plan-text">{s.step}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
