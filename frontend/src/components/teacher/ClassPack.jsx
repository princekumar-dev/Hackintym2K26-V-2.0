import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import Icon from '../ui/Icon.jsx'
import { sampleLesson } from '../../data/sampleLesson.js'
import './ClassPack.css'

const STUDENTS = [
  { name: 'Aarav', level: 'Simple', lang: 'हिन्दी', need: 'Below grade' },
  { name: 'Meera', level: 'Medium', lang: 'English', need: 'Dyslexia' },
  { name: 'Ravi', level: 'Simple', lang: 'मराठी', need: 'Low vision · audio' },
  { name: 'Sana', level: 'Original', lang: 'English', need: 'On level' },
]
const STRUGGLE = [
  { concept: 'The equation (6CO₂ + 6H₂O…)', pct: 72 },
  { concept: 'Chlorophyll & chloroplasts', pct: 45 },
  { concept: 'Why oxygen matters', pct: 28 },
  { concept: 'What photosynthesis is', pct: 15 },
]

export default function ClassPack() {
  return (
    <div className="classpack">
      <Card className="pack-source">
        <Badge tone="neutral">1 scan</Badge>
        <h2 className="pack-title">{sampleLesson.title}</h2>
        <p className="pack-sub">
          {sampleLesson.subject} · {sampleLesson.source}
        </p>
        <p className="pack-arrow">
          <Icon name="layers" size={18} /> becomes a differentiated pack for the whole class
        </p>
      </Card>

      <div className="pack-grid">
        {STUDENTS.map((s) => (
          <Card key={s.name} hover className="student-card">
            <div className="student-top">
              <span className="avatar">{s.name[0]}</span>
              <div>
                <div className="student-name">{s.name}</div>
                <div className="student-need">{s.need}</div>
              </div>
            </div>
            <div className="student-meta">
              <span>
                <Icon name="type" size={14} /> {s.level}
              </span>
              <span>
                <Icon name="globe" size={14} /> {s.lang}
              </span>
            </div>
            <button className="student-open">
              Open their version <Icon name="arrowRight" size={14} />
            </button>
          </Card>
        ))}
      </div>

      <Card className="struggle">
        <h2 className="struggle-title">Class struggle-map</h2>
        <p className="struggle-sub">
          From comprehension checks — where the class needs help most.
        </p>
        <ul className="bars">
          {STRUGGLE.map((b) => (
            <li key={b.concept} className="bar-row">
              <span className="bar-label">{b.concept}</span>
              <span className="bar-track">
                <span className="bar-fill" style={{ width: `${b.pct}%` }} />
              </span>
              <span className="bar-pct">{b.pct}% struggled</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
