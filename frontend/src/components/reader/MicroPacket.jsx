import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import { blockText } from '../../data/mockApi.js'
import './MicroPacket.css'

const N = 21
const inFinder = (r, c) => (r < 7 && c < 7) || (r < 7 && c > N - 8) || (r > N - 8 && c < 7)
const CELLS = []
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (!inFinder(r, c) && (r * 7 + c * 13 + ((r * c) % 5)) % 3 === 0) CELLS.push([r, c])
  }
}
const FINDERS = [
  [0, 0],
  [0, N - 7],
  [N - 7, 0],
]

export default function MicroPacket({ open, onClose, lesson, language }) {
  const b = lesson?.blocks[0]
  return (
    <Modal open={open} onClose={onClose} title="Micro-Packet — print & go, zero bandwidth" size="lg">
      <p className="mp-intro">
        One scan becomes a <strong>printable worksheet</strong> with three reading tiers and an audio
        code — works on a feature phone, with no streaming.
      </p>
      <div className="mp-grid">
        <div className="mp-sheet">
          <div className="mp-tier">
            <span className="mp-tag">Simple</span>
            <p>{b && blockText(b, 'simple', language)}</p>
          </div>
          <div className="mp-tier">
            <span className="mp-tag">Medium</span>
            <p>{b && blockText(b, 'medium', language)}</p>
          </div>
          <div className="mp-tier">
            <span className="mp-tag">Original</span>
            <p className="mp-orig">{b && b.original}</p>
          </div>
        </div>
        <div className="mp-qr">
          <svg viewBox={`0 0 ${N} ${N}`} className="mp-qr-svg" role="img" aria-label="Audio code for offline playback">
            {CELLS.map(([r, c], i) => (
              <rect key={i} x={c} y={r} width="1" height="1" />
            ))}
            {FINDERS.map(([fr, fc], k) => (
              <g key={`f${k}`}>
                <rect x={fc} y={fr} width="7" height="7" className="mp-f-dark" />
                <rect x={fc + 1} y={fr + 1} width="5" height="5" className="mp-f-light" />
                <rect x={fc + 2} y={fr + 2} width="3" height="3" className="mp-f-dark" />
              </g>
            ))}
          </svg>
          <span className="mp-qr-note">Scan to hear · ~2 KB</span>
        </div>
      </div>
      <div className="mp-foot">
        <span className="mp-hint">Accessibility isn’t accessible if it needs 5G.</span>
        <Button variant="secondary" size="sm" onClick={() => window.print()}>
          <Icon name="file" size={16} /> Print worksheet
        </Button>
      </div>
    </Modal>
  )
}
