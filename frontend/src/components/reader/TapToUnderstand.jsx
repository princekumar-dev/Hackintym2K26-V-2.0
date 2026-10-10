import { useEffect } from 'react'
import Icon from '../ui/Icon.jsx'
import './TapToUnderstand.css'

export default function TapToUnderstand({ pop, onClose, onListen }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!pop || !pop.rect) return null
  const width = 300
  const left = Math.max(12, Math.min(pop.rect.left + window.scrollX, window.innerWidth - width - 12))
  const top = pop.rect.bottom + window.scrollY + 8
  const style = { top, left, width }

  return (
    <>
      <div className="pop-backdrop" onClick={onClose} />
      <div className="pop" role="dialog" aria-label="Explanation" style={style}>
        <button className="pop-close" onClick={onClose} aria-label="Close explanation">
          <Icon name="x" size={16} />
        </button>
        {pop.loading ? (
          <p className="pop-loading">Explaining…</p>
        ) : (
          <>
            <h3 className="pop-term">{pop.data.term}</h3>
            <p className="pop-mean">{pop.data.meaning}</p>
            {pop.data.analogy ? (
              <p className="pop-analogy">
                <Icon name="sparkle" size={14} /> {pop.data.analogy}
              </p>
            ) : null}
            <button
              className="pop-listen"
              onClick={() => onListen(`${pop.data.meaning} ${pop.data.analogy || ''}`)}
            >
              <Icon name="volume" size={14} /> Listen
            </button>
          </>
        )}
      </div>
    </>
  )
}
