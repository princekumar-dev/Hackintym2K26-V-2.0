import Icon from '../ui/Icon.jsx'
import './FigureDescription.css'

export default function FigureDescription({ figures, onSpeak }) {
  if (!figures || figures.length === 0) return null
  return (
    <div className="figdesc">
      {figures.map((f) => (
        <div key={f.id} className="figdesc-item">
          <div className="figdesc-head">
            <Icon name="eye" size={16} /> <span>{f.caption}</span>
          </div>
          <p className="figdesc-alt">{f.altText}</p>
          <button className="figdesc-listen" onClick={() => onSpeak?.(f.altText)}>
            <Icon name="volume" size={14} /> Listen to description
          </button>
        </div>
      ))}
    </div>
  )
}
