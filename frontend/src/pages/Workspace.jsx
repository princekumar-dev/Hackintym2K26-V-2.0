import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext.jsx'
import { useLesson } from '../context/LessonContext.jsx'
import { sampleLesson, LANGUAGES, LEVELS } from '../data/sampleLesson.js'
import { blockText, explainTerm } from '../data/mockApi.js'
import LessonView from '../components/reader/LessonView.jsx'
import AudioPlayer from '../components/reader/AudioPlayer.jsx'
import DifficultyDial from '../components/reader/DifficultyDial.jsx'
import VoiceQA from '../components/reader/VoiceQA.jsx'
import VerifyOverlay from '../components/reader/VerifyOverlay.jsx'
import TapToUnderstand from '../components/reader/TapToUnderstand.jsx'
import FigureDescription from '../components/reader/FigureDescription.jsx'
import VisualExplainer from '../components/reader/VisualExplainer.jsx'
import DiagramExplorer from '../components/reader/DiagramExplorer.jsx'
import MicroPacket from '../components/reader/MicroPacket.jsx'
import StudyPlan from '../components/reader/StudyPlan.jsx'
import ComprehensionCheck from '../components/reader/ComprehensionCheck.jsx'
import Toggle from '../components/ui/Toggle.jsx'
import Button from '../components/ui/Button.jsx'
import Pill from '../components/ui/Pill.jsx'
import Icon from '../components/ui/Icon.jsx'
import './Workspace.css'

const QUIZ = {
  q: 'What do plants use to make their food?',
  options: ['Sunlight, water and air', 'Only soil', 'Moonlight and rocks'],
  answer: 0,
}
const SPEECH_LANG = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', ta: 'ta-IN', hing: 'en-IN', tang: 'en-IN' }

export default function Workspace() {
  const { settings, update } = useSettings()
  const { lesson, setLesson } = useLesson()
  const [active, setActive] = useState(null)
  const [verifyOpen, setVerifyOpen] = useState(false)
  const [compare, setCompare] = useState(false)
  const [pop, setPop] = useState(null)
  const [quizPick, setQuizPick] = useState(null)
  const [visualOpen, setVisualOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [packOpen, setPackOpen] = useState(false)

  useEffect(() => {
    if (!lesson) setLesson(sampleLesson)
  }, [lesson, setLesson])

  const data = lesson || sampleLesson
  const level = settings.level
  const language = settings.language

  const segments = useMemo(
    () => data.blocks.map((b) => ({ blockId: b.id, text: blockText(b, level, language) })),
    [data, level, language],
  )

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = SPEECH_LANG[language] || 'en-US'
    window.speechSynthesis.speak(u)
  }

  const onWordClick = async (term, el) => {
    const rect = el.getBoundingClientRect()
    setPop({ term, rect, data: null, loading: true })
    const result = await explainTerm(term, data)
    setPop((p) => (p && p.term === term ? { ...p, data: result, loading: false } : p))
  }

  return (
    <div className="container ws">
      {/* Top Breadcrumb & Actions Header */}
      <div className="ws-topbar">
        <div className="ws-topbar-left">
          <Link to="/upload" className="ws-back">
            <Icon name="arrowRight" size={15} className="flip" />
            <span>All lessons</span>
          </Link>
          <span className="ws-topbar-sep">•</span>
          <span className="ws-topbar-pill">{data.subject}</span>
          <span className="ws-topbar-sep">•</span>
          <span className="ws-topbar-title">{data.title}</span>
        </div>
        <div className="ws-topbar-actions">
          <button className="ws-action-pill" onClick={() => setPackOpen(true)}>
            <Icon name="file" size={14} /> Micro-Packet
          </button>
          <button className="ws-action-pill ws-action-highlight" onClick={() => setVerifyOpen(true)}>
            <Icon name="layers" size={14} /> Proof Lens
          </button>
        </div>
      </div>

      {/* Unified Studio Reading Toolbar */}
      <div className="ws-toolbar" role="region" aria-label="Reading controls">
        <div className="wst-group wst-audio">
          <AudioPlayer segments={segments} lang={language} onActive={setActive} />
        </div>

        <span className="wst-sep" aria-hidden="true" />

        <div className="wst-group wst-level">
          <span className="wst-label">Level</span>
          <div className="wst-segmented" role="radiogroup" aria-label="Reading difficulty">
            {LEVELS.map((lvl) => (
              <button
                key={lvl.key}
                type="button"
                className={`wst-segment-btn ${level === lvl.key ? 'is-active' : ''}`}
                onClick={() => update({ level: lvl.key })}
                title={lvl.hint}
                role="radio"
                aria-checked={level === lvl.key}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        <span className="wst-sep" aria-hidden="true" />

        <div className="wst-group wst-lang">
          <span className="wst-label">Language</span>
          <div className="wst-select-box">
            <Icon name="globe" size={14} className="wst-select-icon" />
            <select
              className="wst-select"
              value={language}
              onChange={(e) => update({ language: e.target.value })}
              aria-label="Select language"
            >
              {LANGUAGES.map((l) => (
                <option key={l.key} value={l.key}>
                  {l.label}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" size={12} className="wst-select-arrow" />
          </div>
        </div>

        <span className="wst-sep" aria-hidden="true" />

        <div className="wst-group wst-compare">
          <label className="wst-toggle" htmlFor="compare-toggle">
            <span className="wst-label">Compare</span>
            <span className="wst-switch">
              <input
                id="compare-toggle"
                type="checkbox"
                checked={compare}
                onChange={(e) => setCompare(e.target.checked)}
              />
              <span className="wst-slider" />
            </span>
          </label>
        </div>

        <div className="wst-status-badge">
          <span className="wst-status-dot" />
          <span>Grounded to Page · 98%</span>
        </div>
      </div>

      <div className="ws-grid">
        <section className="ws-main" aria-label="Lesson">
          <div className="reading">
            <LessonView
              lesson={data}
              level={level}
              language={language}
              active={active}
              compare={compare}
              bionic={settings.bionic}
              focusMode={settings.focusMode}
              onWordClick={onWordClick}
            />

            <ComprehensionCheck onEasier={() => update({ level: 'simple' })} />
          </div>
        </section>

        <aside className="ws-rail" aria-label="Lesson tools">
          <div className="rail-card">
            <h3 className="rail-title">
              <Icon name="mic" size={16} /> Didi / Bhaiya — ask me
            </h3>
            <VoiceQA lesson={data} lang={language} onSpeak={speak} />
          </div>

          <div className="rail-card">
            <h3 className="rail-title">
              <Icon name="sparkle" size={16} /> Visual Explainer
            </h3>
            <p className="rail-note">See the concept drawn live or touch-explore.</p>
            <div className="rail-btn-grid">
              <Button variant="secondary" size="sm" onClick={() => setVisualOpen(true)}>
                <Icon name="eye" size={15} /> Whiteboard
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setExploreOpen(true)}>
                <Icon name="volume" size={15} /> Touch explore
              </Button>
            </div>
          </div>

          <div className="rail-card">
            <h3 className="rail-title">
              <Icon name="check" size={16} /> Study plan
            </h3>
            <StudyPlan steps={data.studyPlan} />
          </div>

          <div className="rail-card">
            <h3 className="rail-title">
              <Icon name="eye" size={16} /> Figures
            </h3>
            <FigureDescription figures={data.figures} onSpeak={speak} />
          </div>
        </aside>
      </div>

      <VerifyOverlay
        open={verifyOpen}
        onClose={() => setVerifyOpen(false)}
        lesson={data}
        level={level}
        language={language}
      />
      <TapToUnderstand pop={pop} onClose={() => setPop(null)} onListen={speak} />
      <VisualExplainer
        open={visualOpen}
        onClose={() => setVisualOpen(false)}
        lesson={data}
        onSpeak={speak}
      />
      <DiagramExplorer open={exploreOpen} onClose={() => setExploreOpen(false)} onSpeak={speak} />
      <MicroPacket
        open={packOpen}
        onClose={() => setPackOpen(false)}
        lesson={data}
        language={language}
      />
    </div>
  )
}
