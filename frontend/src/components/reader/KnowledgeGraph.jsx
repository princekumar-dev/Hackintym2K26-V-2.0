import './KnowledgeGraph.css'

const POS = {
  basics: { x: 72, y: 66 },
  chlorophyll: { x: 248, y: 66 },
  reaction: { x: 72, y: 174 },
  oxygen: { x: 248, y: 174 },
}

export default function KnowledgeGraph({ concepts }) {
  const c = { x: 160, y: 120 }
  return (
    <svg viewBox="0 0 320 240" className="kg" role="img" aria-label="Your understanding map — green concepts are strong, red need review">
      {concepts.map((n) => {
        const p = POS[n.key]
        return <line key={`e-${n.key}`} x1={c.x} y1={c.y} x2={p.x} y2={p.y} className={`kg-edge kg-edge-${n.status}`} />
      })}
      <circle cx={c.x} cy={c.y} r="30" className="kg-center" />
      <text x={c.x} y={c.y + 1} textAnchor="middle" className="kg-center-t">You</text>
      <text x={c.x} y={c.y + 15} textAnchor="middle" className="kg-center-s">learner</text>
      {concepts.map((n) => {
        const p = POS[n.key]
        return (
          <g key={n.key} className={`kg-node kg-${n.status}`}>
            <circle cx={p.x} cy={p.y} r="24" />
            <text x={p.x} y={p.y + 6} textAnchor="middle" className="kg-emoji">{n.emoji}</text>
            <text x={p.x} y={p.y + 42} textAnchor="middle" className="kg-label">{n.label}</text>
          </g>
        )
      })}
    </svg>
  )
}
