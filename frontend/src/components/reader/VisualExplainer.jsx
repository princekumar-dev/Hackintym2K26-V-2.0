import { useEffect, useRef, useState, useCallback } from 'react'
import Modal from '../ui/Modal.jsx'
import Icon from '../ui/Icon.jsx'
import './VisualExplainer.css'

const STEPS = [
  { cap: 'Photosynthesis — how a leaf makes food', line: "Let's learn how a leaf makes its own food. This is called photosynthesis." },
  { cap: '☀️ Sunlight — the energy', line: 'First, the plant needs sunlight. That is its energy source.' },
  { cap: '💧 Water — from the roots', line: 'Next, it drinks water drawn up through its roots.' },
  { cap: '🫧 Carbon dioxide — from the air', line: 'It also takes in carbon dioxide gas from the air.' },
  { cap: '🌿 Inside the leaf: chlorophyll', line: 'All of this enters the leaf, where green chlorophyll catches the light.' },
  { cap: "🍚 Glucose — the plant's food", line: "The leaf uses that energy to make glucose sugar — food for the plant." },
  { cap: '🌬️ Oxygen — we breathe it', line: 'And it releases fresh oxygen, the air we all breathe.' },
  { cap: '✅ That is photosynthesis!', line: 'Sunlight, water, and air transformed into food and oxygen. That is photosynthesis!' },
]

const INPUTS = [
  { tone: 'yellow', emoji: '☀️', title: 'Sunlight', sub: 'the energy source', rot: -2, at: 1, color: '#f59e0b' },
  { tone: 'blue', emoji: '💧', title: 'Water', sub: 'from the roots', rot: 2, at: 2, color: '#2563eb' },
  { tone: 'pink', emoji: '🫧', title: 'Carbon dioxide', sub: 'from the air', rot: -2, at: 3, color: '#db2777' },
]

const OUTPUTS = [
  { tone: 'orange', emoji: '🍚', title: 'Glucose', sub: 'the plant’s food', rot: 2, at: 5, color: '#ea580c' },
  { tone: 'teal', emoji: '🌬️', title: 'Oxygen', sub: 'we breathe it in', rot: -3, at: 6, color: '#059669' },
]

const PALETTE = [
  { name: 'Indigo', color: '#2563eb' },
  { name: 'Emerald', color: '#059669' },
  { name: 'Amber', color: '#d97706' },
  { name: 'Ink', color: '#0f172a' },
]

// Cubic bezier point generator
function getCubicBezierPoints(p0, p1, p2, p3, steps = 36) {
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const mt = 1 - t
    const x = mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x
    const y = mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y
    pts.push({ x, y })
  }
  return pts
}

// Organic wavy underline generator
function getWavyLinePoints(x1, y1, x2, y2, steps = 30) {
  const pts = []
  const dx = x2 - x1
  const dy = y2 - y1
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const wave = Math.sin(t * Math.PI * 4) * 2.2
    pts.push({
      x: x1 + dx * t,
      y: y1 + dy * t + wave,
    })
  }
  return pts
}

// Leaf perimeter and veins generator
function getLeafDrawingPoints(center, rx, ry) {
  const pts = []
  // Outer perimeter loop
  const steps = 44
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2 - Math.PI
    const x = center.x + Math.cos(angle) * rx
    const y = center.y + Math.sin(angle) * ry * (1 - 0.2 * Math.cos(angle))
    pts.push({ x, y, lift: false })
  }
  // Central stem vein
  const stemSteps = 24
  for (let i = 0; i <= stemSteps; i++) {
    const t = i / stemSteps
    const x = center.x - rx * 0.85 + rx * 1.7 * t
    const y = center.y + Math.sin(t * Math.PI) * 2
    pts.push({ x, y, lift: i === 0 })
  }
  // Side branches
  pts.push({ x: center.x - rx * 0.4, y: center.y, lift: true })
  pts.push({ x: center.x - rx * 0.1, y: center.y - ry * 0.55, lift: false })
  pts.push({ x: center.x - rx * 0.4, y: center.y, lift: true })
  pts.push({ x: center.x - rx * 0.1, y: center.y + ry * 0.55, lift: false })
  pts.push({ x: center.x + rx * 0.1, y: center.y, lift: true })
  pts.push({ x: center.x + rx * 0.45, y: center.y - ry * 0.5, lift: false })
  pts.push({ x: center.x + rx * 0.1, y: center.y, lift: true })
  pts.push({ x: center.x + rx * 0.45, y: center.y + ry * 0.5, lift: false })

  return pts
}

// Realistic Stylus Component with sharp nib pointing precisely at (0, 0)
function Stylus({ x, y, isDrawing, color = '#2563eb', visible = true }) {
  if (!visible) return null
  return (
    <div
      className="wb-stylus"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div className={`wb-stylus-graphic ${isDrawing ? 'is-drawing' : ''}`}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <defs>
            <linearGradient id="stylusBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="40%" stopColor="#cbd5e1" />
              <stop offset="85%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <filter id="stylusShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.28" />
            </filter>
          </defs>

          {/* Group angled at 32 deg, pivot at nib tip (x=6, y=38) */}
          <g transform="rotate(32, 6, 38)" filter="url(#stylusShadow)">
            {/* Contact nib */}
            <polygon points="6,38 2.5,28 9.5,28" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.8" />
            {/* Ink tip */}
            <polygon points="6,38 4,32 8,32" fill={color} />
            {/* Metallic collar ring */}
            <rect x="2.5" y="25.5" width="7" height="2.5" fill="#475569" rx="0.5" />
            {/* Stylus barrel */}
            <path
              d="M2.5 25.5 L2 4 C2 1.5 5.5 0.5 6 0.5 C6.5 0.5 10 1.5 10 4 L9.5 25.5 Z"
              fill="url(#stylusBody)"
              stroke="#1e293b"
              strokeWidth="0.8"
            />
            {/* Grip rings */}
            <line x1="2.6" y1="20" x2="9.4" y2="20" stroke="#94a3b8" strokeWidth="0.6" />
            <line x1="2.6" y1="22" x2="9.4" y2="22" stroke="#94a3b8" strokeWidth="0.6" />
          </g>
        </svg>
      </div>

      {/* Luminous ink contact point */}
      {isDrawing && (
        <span
          className="wb-ink-spark"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px 3px ${color}`,
          }}
        />
      )}
    </div>
  )
}

function Note({ n, show, innerRef }) {
  return (
    <div
      ref={innerRef}
      className={`note note-${n.tone} ${show ? 'show' : 'blueprint'}`}
      style={{ '--rot': `${n.rot}deg`, '--card-accent': n.color }}
    >
      <span className="note-emoji" aria-hidden="true">{n.emoji}</span>
      <strong className="note-title">{n.title}</strong>
      <span className="note-sub">{n.sub}</span>
    </div>
  )
}

export default function VisualExplainer({ open, onClose }) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [activeTool, setActiveTool] = useState('pen') // 'pen' | 'brush' | 'eraser'
  const [drawColor, setDrawColor] = useState('#2563eb')
  const [stylus, setStylus] = useState({ x: 0, y: 0, isDrawing: false, color: '#2563eb', visible: false })

  const tokenRef = useRef(0)
  const animFrameRef = useRef(null)
  const canvasRef = useRef(null)       // container
  const boardCanvasRef = useRef(null)  // background canvas for AI animated drawing
  const userCanvasRef = useRef(null)   // foreground canvas for interactive freehand drawing
  const userStrokesRef = useRef([])    // user stroke history
  const isPointerDownRef = useRef(false)
  const currentPointerStrokeRef = useRef([])

  const titleRef = useRef(null)
  const inRefs = [useRef(null), useRef(null), useRef(null)]
  const leafRef = useRef(null)
  const outRefs = [useRef(null), useRef(null)]

  // Setup HiDPI Canvas
  const setupCanvas = useCallback(() => {
    const container = canvasRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    ;[boardCanvasRef.current, userCanvasRef.current].forEach((c) => {
      if (!c) return
      c.width = rect.width * dpr
      c.height = rect.height * dpr
      c.style.width = `${rect.width}px`
      c.style.height = `${rect.height}px`
      const ctx = c.getContext('2d')
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    })
  }, [])

  useEffect(() => {
    if (!open) return
    setupCanvas()
    const onResize = () => setupCanvas()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open, setupCanvas])

  const wait = (ms) => new Promise((r) => setTimeout(r, ms))

  const speakLine = (text) =>
    new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        setTimeout(resolve, 2600)
        return
      }
      const u = new SpeechSynthesisUtterance(text)
      const vs = window.speechSynthesis.getVoices() || []
      const v = vs.find((x) => /en-IN/i.test(x.lang)) || vs.find((x) => /^en/i.test(x.lang))
      if (v) u.voice = v
      u.lang = 'en-IN'
      u.rate = 0.92
      u.pitch = 1.05
      u.onend = resolve
      u.onerror = resolve
      window.speechSynthesis.speak(u)
    })

  // Animate drawing smooth curve with quadratic interpolation
  const animateStroke = useCallback((points, color, lineWidth, duration) => {
    return new Promise((resolve) => {
      const canvas = boardCanvasRef.current
      if (!canvas || !points || points.length < 2) {
        resolve()
        return
      }
      const ctx = canvas.getContext('2d')
      const startTime = performance.now()
      let prevIdx = 0

      // Initial pen positioning
      setStylus({
        x: points[0].x,
        y: points[0].y,
        isDrawing: true,
        color,
        visible: true,
      })

      const frame = (now) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // smooth quad ease
        const t = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
        const targetIdx = Math.floor(t * (points.length - 1))

        if (targetIdx > prevIdx) {
          ctx.save()
          ctx.strokeStyle = color
          ctx.lineWidth = lineWidth
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'

          for (let i = prevIdx + 1; i <= targetIdx; i++) {
            const p0 = points[i - 1]
            const p1 = points[i]
            if (p1.lift) continue

            ctx.beginPath()
            ctx.moveTo(p0.x, p0.y)
            const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 }
            ctx.quadraticCurveTo(p0.x, p0.y, mid.x, mid.y)
            ctx.stroke()
          }
          ctx.restore()
          prevIdx = targetIdx
        }

        const currPt = points[Math.min(targetIdx, points.length - 1)]
        setStylus((s) => ({
          ...s,
          x: currPt.x,
          y: currPt.y,
          isDrawing: true,
          color,
          visible: true,
        }))

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(frame)
        } else {
          setStylus((s) => ({ ...s, isDrawing: false }))
          resolve()
        }
      }

      animFrameRef.current = requestAnimationFrame(frame)
    })
  }, [])

  // Calculate coordinates and trigger animated teacher stroke for step
  const drawStep = useCallback(
    async (s) => {
      const container = canvasRef.current
      if (!container) return
      const cr = container.getBoundingClientRect()

      if (s === 0) {
        // Step 0: Underline title
        const tr = titleRef.current?.getBoundingClientRect()
        if (tr) {
          const x1 = tr.left - cr.left + 16
          const x2 = tr.right - cr.left - 16
          const y = tr.bottom - cr.top - 2
          const pts = getWavyLinePoints(x1, y, x2, y, 32)
          await animateStroke(pts, '#2563eb', 3.5, 1400)
        }
      } else if (s === 1) {
        // Step 1: Sunlight ray arc
        const sr = inRefs[0].current?.getBoundingClientRect()
        const lr = leafRef.current?.getBoundingClientRect()
        if (sr && lr) {
          const p0 = { x: sr.right - cr.left - 10, y: sr.top - cr.top + sr.height / 2 }
          const p3 = { x: lr.left - cr.left + lr.width * 0.25, y: lr.top - cr.top + lr.height * 0.3 }
          const p1 = { x: p0.x + 40, y: p0.y - 10 }
          const p2 = { x: p3.x - 30, y: p3.y - 30 }
          const pts = getCubicBezierPoints(p0, p1, p2, p3, 36)
          await animateStroke(pts, '#f59e0b', 3, 1500)
        }
      } else if (s === 2) {
        // Step 2: Water stream curve
        const wr = inRefs[1].current?.getBoundingClientRect()
        const lr = leafRef.current?.getBoundingClientRect()
        if (wr && lr) {
          const p0 = { x: wr.right - cr.left - 10, y: wr.top - cr.top + wr.height / 2 }
          const p3 = { x: lr.left - cr.left + lr.width * 0.2, y: lr.top - cr.top + lr.height * 0.55 }
          const p1 = { x: p0.x + 35, y: p0.y }
          const p2 = { x: p3.x - 25, y: p3.y }
          const pts = getCubicBezierPoints(p0, p1, p2, p3, 34)
          await animateStroke(pts, '#2563eb', 3.2, 1400)
        }
      } else if (s === 3) {
        // Step 3: Carbon Dioxide curve
        const crNote = inRefs[2].current?.getBoundingClientRect()
        const lr = leafRef.current?.getBoundingClientRect()
        if (crNote && lr) {
          const p0 = { x: crNote.right - cr.left - 10, y: crNote.top - cr.top + crNote.height / 2 }
          const p3 = { x: lr.left - cr.left + lr.width * 0.28, y: lr.top - cr.top + lr.height * 0.72 }
          const p1 = { x: p0.x + 35, y: p0.y + 10 }
          const p2 = { x: p3.x - 30, y: p3.y + 25 }
          const pts = getCubicBezierPoints(p0, p1, p2, p3, 34)
          await animateStroke(pts, '#db2777', 3, 1400)
        }
      } else if (s === 4) {
        // Step 4: Leaf perimeter + chlorophyll veins
        const lr = leafRef.current?.getBoundingClientRect()
        if (lr) {
          const center = {
            x: lr.left - cr.left + lr.width / 2,
            y: lr.top - cr.top + lr.height / 2,
          }
          const rx = lr.width * 0.36
          const ry = lr.height * 0.28
          const pts = getLeafDrawingPoints(center, rx, ry)
          await animateStroke(pts, '#059669', 3, 2200)
        }
      } else if (s === 5) {
        // Step 5: Glucose arrow
        const lr = leafRef.current?.getBoundingClientRect()
        const gr = outRefs[0].current?.getBoundingClientRect()
        if (lr && gr) {
          const p0 = { x: lr.left - cr.left + lr.width * 0.72, y: lr.top - cr.top + lr.height * 0.38 }
          const p3 = { x: gr.left - cr.left + 10, y: gr.top - cr.top + gr.height / 2 }
          const p1 = { x: p0.x + 30, y: p0.y - 20 }
          const p2 = { x: p3.x - 30, y: p3.y }
          const pts = getCubicBezierPoints(p0, p1, p2, p3, 34)
          await animateStroke(pts, '#ea580c', 3.2, 1400)
        }
      } else if (s === 6) {
        // Step 6: Oxygen breeze arrow
        const lr = leafRef.current?.getBoundingClientRect()
        const or = outRefs[1].current?.getBoundingClientRect()
        if (lr && or) {
          const p0 = { x: lr.left - cr.left + lr.width * 0.7, y: lr.top - cr.top + lr.height * 0.65 }
          const p3 = { x: or.left - cr.left + 10, y: or.top - cr.top + or.height / 2 }
          const p1 = { x: p0.x + 30, y: p0.y + 20 }
          const p2 = { x: p3.x - 30, y: p3.y }
          const pts = getCubicBezierPoints(p0, p1, p2, p3, 34)
          await animateStroke(pts, '#059669', 3.2, 1400)
        }
      } else if (s === 7) {
        // Step 7: Completed flourish checkmark
        const lr = leafRef.current?.getBoundingClientRect()
        if (lr) {
          const cx = lr.left - cr.left + lr.width / 2
          const cy = lr.bottom - cr.top + 8
          const pts = [
            { x: cx - 22, y: cy + 2 },
            { x: cx - 6, y: cy + 14 },
            { x: cx + 24, y: cy - 14 },
          ]
          await animateStroke(pts, '#059669', 4, 900)
        }
      }
    },
    [animateStroke],
  )

  const clearCanvases = () => {
    [boardCanvasRef.current, userCanvasRef.current].forEach((c) => {
      if (!c) return
      const ctx = c.getContext('2d')
      ctx.clearRect(0, 0, c.width, c.height)
    })
    userStrokesRef.current = []
  }

  const play = async () => {
    const my = ++tokenRef.current
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)

    clearCanvases()
    setStep(0)
    setPlaying(true)
    await wait(400)

    for (let i = 0; i < STEPS.length; i++) {
      if (tokenRef.current !== my) return
      setStep(i)

      // Start live voice narration and synchronized smooth pen drawing in parallel
      const speakPromise = speakLine(STEPS[i].line)
      const drawPromise = drawStep(i)

      await Promise.all([speakPromise, drawPromise])
      if (tokenRef.current !== my) return
      await wait(350)
    }

    if (tokenRef.current === my) {
      setPlaying(false)
      setStylus((s) => ({ ...s, visible: false }))
    }
  }

  useEffect(() => {
    if (open) {
      if ('speechSynthesis' in window) window.speechSynthesis.getVoices()
      // slight delay for DOM mount and bounding rect stabilization
      const t = setTimeout(() => play(), 350)
      return () => clearTimeout(t)
    }
    return () => {
      tokenRef.current += 1
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // ==========================================
  // Interactive User Freehand Drawing Engine
  // ==========================================
  const handlePointerDown = (e) => {
    if (playing) return
    const canvas = userCanvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    isPointerDownRef.current = true
    currentPointerStrokeRef.current = [{ x, y }]

    setStylus({
      x,
      y,
      isDrawing: true,
      color: activeTool === 'eraser' ? '#94a3b8' : drawColor,
      visible: true,
    })
  }

  const handlePointerMove = (e) => {
    if (playing) return
    const canvas = userCanvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Update stylus position
    setStylus((s) => ({ ...s, x, y }))

    if (!isPointerDownRef.current) return
    const pts = currentPointerStrokeRef.current
    pts.push({ x, y })

    const ctx = canvas.getContext('2d')
    ctx.save()

    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = 26
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    } else if (activeTool === 'brush') {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = drawColor
      ctx.lineWidth = 14
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.globalAlpha = 0.35
    } else {
      // Pen: crisp smooth ink
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = drawColor
      ctx.lineWidth = 3.5
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.globalAlpha = 1
    }

    if (pts.length >= 3) {
      const i = pts.length - 2
      const p0 = pts[i - 1]
      const p1 = pts[i]
      const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 }
      const mid2 = { x: (p1.x + x) / 2, y: (p1.y + y) / 2 }

      ctx.beginPath()
      ctx.moveTo(mid1.x, mid1.y)
      ctx.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y)
      ctx.stroke()
    }

    ctx.restore()
  }

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return
    isPointerDownRef.current = false
    setStylus((s) => ({ ...s, isDrawing: false }))
    if (currentPointerStrokeRef.current.length > 0) {
      userStrokesRef.current.push([...currentPointerStrokeRef.current])
      currentPointerStrokeRef.current = []
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Visual Explainer — AI Whiteboard" size="lg">
      <div className="ve-header-row">
        <p className="ve-intro">
          A teacher-style AI whiteboard — watch the concept <strong>draw live with smooth inking</strong> and explain aloud, or sketch notes directly on the board.
        </p>
      </div>

      <div className="wb">
        <div
          className={`wb-canvas ${step >= 4 ? 'wb-draw' : ''} tool-${activeTool}`}
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Layer 1: AI animated teacher drawing */}
          <canvas ref={boardCanvasRef} className="wb-draw-layer wb-ai-layer" />

          {/* Layer 2: Interactive freehand student layer */}
          <canvas ref={userCanvasRef} className="wb-draw-layer wb-user-layer" />

          {/* Layer 3: High-fidelity angled stylus */}
          <Stylus
            x={stylus.x}
            y={stylus.y}
            isDrawing={stylus.isDrawing}
            color={stylus.color}
            visible={stylus.visible}
          />

          {/* Badges */}
          <div className="wb-collab">
            <span className="wb-liveDot" />
            <span>{playing ? 'SahajPath AI is drawing…' : 'AI Whiteboard · Ready'}</span>
          </div>
          <span className="wb-zoom">100%</span>

          {/* Whiteboard Elements */}
          <div className="wb-title" ref={titleRef} style={{ '--rot': '-1deg' }}>
            <span className="wb-k">Topic</span>
            Photosynthesis — how a leaf makes food
          </div>

          <div className="wb-cols">
            <div className="wb-col">
              {INPUTS.map((n, i) => (
                <Note key={n.title} n={n} show={step >= n.at} innerRef={inRefs[i]} />
              ))}
            </div>

            <div className="wb-center">
              <svg
                viewBox="0 0 240 240"
                className="wb-sketch"
                ref={leafRef}
                role="img"
                aria-label="A leaf using chlorophyll to turn sunlight, water and carbon dioxide into glucose and oxygen"
              >
                <defs>
                  <filter id="rough" x="-6%" y="-6%" width="112%" height="112%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="n" />
                    <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
                  </filter>
                  <marker id="wa" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M1 1 L6 4 L1 7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </marker>
                </defs>
                <g filter="url(#rough)">
                  <ellipse cx="120" cy="120" rx="72" ry="52" className="sk-leaf" />
                </g>
                <text x="120" y="115" textAnchor="middle" className="sk-leaf-t">Leaf</text>
                <text x="120" y="137" textAnchor="middle" className="sk-leaf-s">chlorophyll</text>
              </svg>
            </div>

            <div className="wb-col">
              {OUTPUTS.map((n, i) => (
                <Note key={n.title} n={n} show={step >= n.at} innerRef={outRefs[i]} />
              ))}
            </div>
          </div>

          <div className="wb-caption" aria-live="polite">
            <span className="wb-caption-icon">🎙️</span> {STEPS[step].cap}
          </div>
        </div>

        {/* Studio Whiteboard Toolbar */}
        <div className="wb-toolbar" role="toolbar" aria-label="Whiteboard drawing tools">
          <button
            className={`wb-tool ${activeTool === 'pen' ? 'wb-tool-active' : ''}`}
            onClick={() => setActiveTool('pen')}
            aria-label="Smooth Pen"
            title="Smooth Pen"
          >
            <Icon name="pen" size={18} />
          </button>
          <button
            className={`wb-tool ${activeTool === 'brush' ? 'wb-tool-active' : ''}`}
            onClick={() => setActiveTool('brush')}
            aria-label="Highlighter / Brush"
            title="Highlighter / Brush"
          >
            <Icon name="brush" size={18} />
          </button>
          <button
            className={`wb-tool ${activeTool === 'eraser' ? 'wb-tool-active' : ''}`}
            onClick={() => setActiveTool('eraser')}
            aria-label="Eraser"
            title="Eraser"
          >
            <Icon name="eraser" size={18} />
          </button>

          <span className="wb-tool-sep" aria-hidden="true" />

          {/* Color Swatches */}
          <div className="wb-colors" aria-label="Pen Colors">
            {PALETTE.map((c) => (
              <button
                key={c.name}
                className={`wb-color-dot ${drawColor === c.color ? 'active' : ''}`}
                style={{ backgroundColor: c.color }}
                onClick={() => setDrawColor(c.color)}
                aria-label={`Color ${c.name}`}
                title={c.name}
              />
            ))}
          </div>

          <span className="wb-tool-sep" aria-hidden="true" />

          <button className="wb-tool" onClick={clearCanvases} aria-label="Clear user drawings" title="Clear board annotations">
            <Icon name="trash" size={18} />
          </button>

          <button className="wb-tool wb-tool-primary" onClick={play} disabled={playing}>
            <Icon name={playing ? 'volume' : 'refresh'} size={18} />
            <span>{playing ? 'Drawing & Explaining…' : 'Replay Lesson'}</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}
