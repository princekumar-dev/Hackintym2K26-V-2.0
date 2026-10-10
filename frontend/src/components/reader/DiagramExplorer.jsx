import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import './DiagramExplorer.css'

const PARTS = [
  { id: 'blade', num: 1, label: 'Leaf blade', say: 'The wide, flat green blade — it catches the most sunlight.' },
  { id: 'vein', num: 2, label: 'Veins & midrib', say: 'Veins carry water into the leaf and food back out, like little pipes.' },
  { id: 'chloro', num: 3, label: 'Chlorophyll cells', say: 'Zoom in and you find green chlorophyll cells — they catch sunlight to make food.' },
  { id: 'stoma', num: 4, label: 'Stomata', say: 'Tiny pores called stomata let gases move in and out of the leaf.' },
]

export default function DiagramExplorer({ open, onClose, onSpeak }) {
  const [active, setActive] = useState(null)
  const trigger = (p) => {
    setActive(p)
    onSpeak?.(p.say)
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(28)
  }
  const hot = (p) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': p.label,
    className: `de-hot ${active && active.id === p.id ? 'is-active' : ''}`,
    onMouseEnter: () => trigger(p),
    onFocus: () => trigger(p),
    onClick: () => trigger(p),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        trigger(p)
      }
    },
  })

  return (
    <Modal open={open} onClose={onClose} title="Touch-to-Hear — explore the leaf" size="lg">
      <p className="de-intro">
        <strong>Chhuo-Suno:</strong> hover or press <kbd>Tab</kbd> over each glowing dot — the leaf
        part names itself aloud and buzzes. Made for low-vision learners, no Braille machine needed.
      </p>

      <div className="de-stage">
        <svg viewBox="0 0 480 360" className="de-svg" role="group" aria-label="A leaf with four labelled parts you can explore by touch">
          <defs>
            <linearGradient id="leafFill" x1="0" y1="0" x2="0.35" y2="1">
              <stop offset="0%" stopColor="#bbf7d0" />
              <stop offset="55%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <filter id="leafShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#065f46" floodOpacity="0.22" />
            </filter>
          </defs>

          <path d="M240 326 C 236 304 236 304 240 288" stroke="#15803d" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path className="de-blade" filter="url(#leafShadow)" d="M240 292 C 120 262 92 150 240 44 C 388 150 360 262 240 292 Z" />

          <g className="de-veins">
            <path d="M240 288 L240 64" />
            <path d="M240 112 C 290 120 316 150 338 150" />
            <path d="M240 112 C 190 120 164 150 142 150" />
            <path d="M240 162 C 300 172 326 196 350 198" />
            <path d="M240 162 C 180 172 154 196 130 198" />
            <path d="M240 216 C 286 226 306 244 326 250" />
            <path d="M240 216 C 194 226 174 244 154 250" />
          </g>

          <line className="de-conn" x1="298" y1="128" x2="392" y2="98" />
          <line className="de-conn" x1="300" y1="236" x2="392" y2="262" />

          <g {...hot(PARTS[2])}>
            <circle className="de-bubble" cx="416" cy="98" r="42" />
            <g className="de-cells">
              <circle cx="401" cy="88" r="7" /><circle cx="420" cy="84" r="7" />
              <circle cx="434" cy="98" r="7" /><circle cx="404" cy="106" r="7" /><circle cx="423" cy="106" r="7" />
            </g>
            <circle className="de-badge" cx="384" cy="68" r="13" />
            <text className="de-num light" x="384" y="73" textAnchor="middle">3</text>
          </g>

          <g {...hot(PARTS[3])}>
            <circle className="de-bubble" cx="416" cy="262" r="42" />
            <path className="de-stoma-lip" d="M394 262 C 406 246 426 246 438 262 C 426 278 406 278 394 262 Z" />
            <ellipse className="de-stoma-gap" cx="416" cy="262" rx="6" ry="13" />
            <circle className="de-badge" cx="384" cy="292" r="13" />
            <text className="de-num light" x="384" y="297" textAnchor="middle">4</text>
          </g>

          <g {...hot(PARTS[0])}>
            <circle className="de-pin" cx="184" cy="118" r="15" />
            <text className="de-num light" x="184" y="123" textAnchor="middle">1</text>
          </g>
          <g {...hot(PARTS[1])}>
            <circle className="de-pin" cx="240" cy="210" r="15" />
            <text className="de-num light" x="240" y="215" textAnchor="middle">2</text>
          </g>
        </svg>
      </div>

      <div className="de-caption" aria-live="polite">
        {active ? (
          <>
            <span className="de-cap-num">{active.num}</span>
            <span><strong>{active.label}:</strong> {active.say}</span>
          </>
        ) : (
          <span>Hover or <kbd>Tab</kbd> to the glowing dots to hear each part. 🔊</span>
        )}
      </div>
    </Modal>
  )
}
