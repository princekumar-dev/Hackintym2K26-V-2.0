import Slider from '../ui/Slider.jsx'
import { LEVELS } from '../../data/sampleLesson.js'
import './DifficultyDial.css'

export default function DifficultyDial({ level, onChange }) {
  const idx = LEVELS.findIndex((l) => l.key === level)
  const value = idx < 0 ? 1 : idx
  return (
    <div className="dial">
      <Slider
        id="difficulty-dial"
        label="Difficulty"
        min={0}
        max={2}
        step={1}
        value={value}
        marks={LEVELS.map((l) => l.label)}
        valueText={LEVELS[value].label}
        onChange={(v) => onChange(LEVELS[v].key)}
      />
      <p className="dial-hint">{LEVELS[value].hint}</p>
    </div>
  )
}
