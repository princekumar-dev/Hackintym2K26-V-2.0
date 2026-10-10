import { useState } from 'react'
import { blockText } from '../../data/mockApi.js'
import ConfidenceDot from '../ui/ConfidenceDot.jsx'
import Icon from '../ui/Icon.jsx'
import './LessonView.css'

const clean = (w) => w.replace(/[^\p{L}\p{N} -]/gu, '').trim()

function Word({ tok, bionic }) {
  if (!bionic) return tok
  const n = Math.max(1, Math.ceil(tok.length * 0.4))
  return (
    <>
      <b className="bionic">{tok.slice(0, n)}</b>
      {tok.slice(n)}
    </>
  )
}

export default function LessonView({
  lesson,
  level,
  language,
  active,
  compare,
  bionic,
  focusMode,
  onWordClick,
}) {
  const [focusIndex, setFocusIndex] = useState(0)
  const blocks = lesson.blocks
  const idx = Math.min(focusIndex, blocks.length - 1)
  const shown = focusMode ? [blocks[idx]] : blocks
  const clickable = level !== 'original'

  const renderBlock = (b) => {
    const text = blockText(b, level, language)
    const tokens = text.split(/(\s+)/)
    let counter = -1
    return (
      <div key={b.id} className={`block ${b.lowConfidence ? 'block-low' : ''}`}>
        <p className="block-text">
          {tokens.map((tok, i) => {
            if (/^\s+$/.test(tok) || tok === '') return tok
            counter += 1
            const wi = counter
            const isActive = active && active.blockId === b.id && active.wordIndex === wi
            return (
              <span
                key={i}
                className={`word ${isActive ? 'word-active' : ''} ${clickable ? 'word-click' : ''}`}
                role={clickable ? 'button' : undefined}
                tabIndex={clickable ? 0 : undefined}
                onClick={clickable ? (e) => onWordClick(clean(tok), e.currentTarget) : undefined}
                onKeyDown={
                  clickable
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          onWordClick(clean(tok), e.currentTarget)
                        }
                      }
                    : undefined
                }
              >
                <Word tok={tok} bionic={bionic} />
              </span>
            )
          })}
        </p>
        <div className="block-meta">
          <ConfidenceDot value={b.confidence} showLabel />
          {b.lowConfidence ? (
            <span className="low-flag">
              <Icon name="eye" size={14} /> Low confidence — check in Verify
            </span>
          ) : null}
        </div>
        {compare && level !== 'original' ? (
          <p className="block-original">
            <span className="orig-tag">Original</span> {b.original}
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <article className="lesson" aria-label={`${lesson.title}, ${level} reading level`}>
      <header className="lesson-head">
        <p className="lesson-kicker">{lesson.subject}</p>
        <h1 className="lesson-h1">{lesson.title}</h1>
      </header>

      {shown.map(renderBlock)}

      {focusMode ? (
        <div className="focus-nav">
          <button
            className="focus-btn"
            onClick={() => setFocusIndex(Math.max(0, idx - 1))}
            disabled={idx === 0}
            aria-label="Previous idea"
          >
            <Icon name="arrowRight" size={16} className="flip" />
          </button>
          <span className="focus-count">
            {idx + 1} / {blocks.length}
          </span>
          <button
            className="focus-btn"
            onClick={() => setFocusIndex(Math.min(blocks.length - 1, idx + 1))}
            disabled={idx === blocks.length - 1}
            aria-label="Next idea"
          >
            <Icon name="arrowRight" size={16} />
          </button>
        </div>
      ) : null}
    </article>
  )
}
