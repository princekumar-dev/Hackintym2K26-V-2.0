import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import ConfidenceDot from '../ui/ConfidenceDot.jsx'
import { blockText } from '../../data/mockApi.js'
import './VerifyOverlay.css'

const confClass = (v) => (v >= 0.85 ? 'high' : v >= 0.7 ? 'med' : 'low')

export default function VerifyOverlay({ open, onClose, lesson, level, language }) {
  const first = lesson?.blocks[0]?.id
  const [sel, setSel] = useState(first)
  if (!lesson) return null
  const block = lesson.blocks.find((b) => b.id === sel) || lesson.blocks[0]
  const simpLevel = level === 'original' ? 'medium' : level

  return (
    <Modal open={open} onClose={onClose} title="Proof Lens — verify against the source" size="lg">
      <p className="verify-intro">
        Every simplified line is traced back to the original page. Tap a region to see its source
        text and how confident the AI was.
      </p>
      <div className="verify-grid">
        <div className="page" role="group" aria-label="Original scanned page with highlighted regions">
          <span className="page-tag">Original page</span>
          {lesson.blocks.map((b) => (
            <button
              key={b.id}
              className={`region region-${confClass(b.confidence)} ${sel === b.id ? 'region-sel' : ''}`}
              style={{
                left: `${b.bbox.x}%`,
                top: `${b.bbox.y}%`,
                width: `${b.bbox.w}%`,
                height: `${b.bbox.h}%`,
              }}
              onClick={() => setSel(b.id)}
              aria-label={`Region ${b.id}, ${Math.round(b.confidence * 100)} percent confidence`}
              aria-pressed={sel === b.id}
            />
          ))}
          {lesson.figures?.map((f) => (
            <span
              key={f.id}
              className="region region-fig"
              style={{
                left: `${f.bbox.x}%`,
                top: `${f.bbox.y}%`,
                width: `${f.bbox.w}%`,
                height: `${f.bbox.h}%`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="verify-detail">
          <div className="vd-row">
            <span className="vd-k">Confidence</span>
            <ConfidenceDot value={block.confidence} showLabel />
          </div>
          <div className="vd-sec">
            <span className="vd-tag">Original</span>
            <p className="vd-orig">{block.original}</p>
          </div>
          <div className="vd-sec">
            <span className="vd-tag vd-tag-brand">Simplified</span>
            <p className="vd-simp">{blockText(block, simpLevel, language)}</p>
          </div>
          {block.lowConfidence ? (
            <p className="vd-warn">
              ⚠ This region had low OCR confidence — SahajPath flags it for review instead of
              guessing.
            </p>
          ) : null}
        </div>
      </div>
    </Modal>
  )
}
