import './ConfidenceDot.css'

export default function ConfidenceDot({ value, showLabel = false }) {
  const level = value >= 0.85 ? 'high' : value >= 0.7 ? 'med' : 'low'
  const pct = Math.round(value * 100)
  const label = `${pct}% confidence`
  return (
    <span className={`conf conf-${level}`} title={label}>
      <span className="conf-dot" aria-hidden="true" />
      {showLabel ? (
        <span className="conf-text">{pct}%</span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </span>
  )
}
