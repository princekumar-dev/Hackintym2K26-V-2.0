import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import './Modal.css'

export default function Modal({ open, onClose, title, size = 'md', children }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const t = setTimeout(() => panelRef.current?.focus(), 0)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-scrim" onMouseDown={onClose}>
      <div
        className={`modal modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close dialog">
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
