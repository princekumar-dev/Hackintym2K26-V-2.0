import { useRef, useState } from 'react'
import Icon from '../ui/Icon.jsx'
import Button from '../ui/Button.jsx'
import { askLesson } from '../../data/mockApi.js'
import './VoiceQA.css'

const LANG = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', ta: 'ta-IN', hing: 'en-IN', tang: 'en-IN' }

export default function VoiceQA({ lesson, lang = 'en', onSpeak }) {
  const [listening, setListening] = useState(false)
  const [q, setQ] = useState('')
  const [ans, setAns] = useState(null)
  const [busy, setBusy] = useState(false)
  const recRef = useRef(null)
  const SR =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null

  const ask = async (question) => {
    if (!question || !question.trim()) return
    setBusy(true)
    setAns(null)
    const r = await askLesson(question, lesson)
    setAns(r)
    setBusy(false)
    onSpeak?.(r.answer)
  }

  const startVoice = () => {
    if (!SR) return
    const rec = new SR()
    recRef.current = rec
    rec.lang = LANG[lang] || 'en-US'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript
      setQ(t)
      ask(t)
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    setListening(true)
    rec.start()
  }

  return (
    <div className="voiceqa">
      <form
        className="vq-box"
        onSubmit={(e) => {
          e.preventDefault()
          ask(q)
        }}
      >
        <button
          type="button"
          className={`vq-mic-btn ${listening ? 'is-listening' : ''}`}
          onClick={startVoice}
          title={SR ? 'Tap to speak your question' : 'Voice not supported in this browser'}
          aria-label="Ask a question by voice"
          disabled={!SR}
        >
          <Icon name="mic" size={18} />
        </button>
        <input
          className="vq-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask about this lesson…"
          aria-label="Your question about the lesson"
        />
        <button
          type="submit"
          className="vq-send-btn"
          disabled={busy || !q.trim()}
          title="Send question"
          aria-label="Submit question"
        >
          <Icon name="arrowRight" size={16} />
        </button>
      </form>
      {listening ? <p className="vq-status">Listening…</p> : null}
      {busy ? <p className="vq-status">Thinking…</p> : null}
      {ans ? (
        <div className={`vq-answer ${ans.grounded ? '' : 'vq-answer-ungrounded'}`}>
          <p>{ans.answer}</p>
          <div className="vq-answer-foot">
            <span className="vq-badge">
              {ans.grounded ? 'Grounded to this lesson' : 'Not found in this lesson'}
            </span>
            <button className="vq-listen" onClick={() => onSpeak?.(ans.answer)}>
              <Icon name="volume" size={14} /> Listen
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
