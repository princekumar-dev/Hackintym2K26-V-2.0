import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Pill from '../components/ui/Pill.jsx'
import TextInput from '../components/ui/TextInput.jsx'
import Icon from '../components/ui/Icon.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { useLesson } from '../context/LessonContext.jsx'
import { transformLesson } from '../data/mockApi.js'
import { LEVELS, LANGUAGES, sampleLesson } from '../data/sampleLesson.js'
import './Upload.css'

const TABS = [
  { key: 'scan', label: 'Scan / Photo', icon: 'camera' },
  { key: 'pdf', label: 'PDF', icon: 'file' },
  { key: 'doc', label: 'Word', icon: 'file' },
  { key: 'ppt', label: 'PPT', icon: 'image', soon: true },
  { key: 'link', label: 'YouTube / Link', icon: 'globe', soon: true },
  { key: 'paste', label: 'Paste text', icon: 'type' },
]
const DROP = {
  scan: { title: 'Scan or upload a page', hint: 'Snap a photo or upload an image of the page.', types: 'JPG · PNG · HEIC' },
  pdf: { title: 'Drop a PDF here', hint: 'Upload a PDF — scanned or digital.', types: 'PDF' },
  doc: { title: 'Upload a Word document', hint: 'We read the text straight from your doc.', types: 'DOC · DOCX' },
  ppt: { title: 'Upload a presentation', hint: 'We pull the text from every slide.', types: 'PPT · PPTX' },
}
const SAMPLE_TEXT = sampleLesson.blocks.map((b) => b.original).join('\n\n')

export default function Upload() {
  const [tab, setTab] = useState('paste')
  const [text, setText] = useState(SAMPLE_TEXT)
  const [link, setLink] = useState('')
  const { settings, update } = useSettings()
  const { setLesson, loading, setLoading } = useLesson()
  const navigate = useNavigate()

  const transform = async () => {
    setLoading(true)
    const lesson = await transformLesson(text)
    setLesson(lesson)
    setLoading(false)
    navigate('/workspace')
  }

  const drop = DROP[tab]

  return (
    <div className="container upload">
      <header className="upload-head">
        <h1 className="upload-title">Transform a lesson</h1>
        <p className="upload-sub">
          Give SahajPath any lesson — a scan, PDF, document, slides, a link or just text — and it
          becomes simplified, spoken, multilingual and verifiable.
        </p>
      </header>

      <div className="upload-grid">
        <section className="upload-main" aria-label="Lesson input">
          <div className="tabs" role="tablist" aria-label="Input method">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                className={`tab ${tab === t.key ? 'tab-active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                <Icon name={t.icon} size={18} /> {t.label}
                {t.soon ? <span className="tab-soon">beta</span> : null}
              </button>
            ))}
          </div>

          {tab === 'paste' ? (
            <TextInput
              as="textarea"
              id="paste"
              label="Lesson text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : tab === 'link' ? (
            <div className="linkbox">
              <TextInput
                id="link"
                label="Paste a link"
                placeholder="https://youtube.com/watch?v=…  or any web page"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                hint="YouTube, an article or a web page — we pull the transcript or text. (Demo uses the sample lesson.)"
              />
              <div className="link-chips">
                <span className="link-chip"><Icon name="globe" size={14} /> YouTube</span>
                <span className="link-chip"><Icon name="file" size={14} /> Article</span>
                <span className="link-chip"><Icon name="layers" size={14} /> Web page</span>
              </div>
            </div>
          ) : (
            <div className="dropzone">
              <span className="dropzone-icon">
                <Icon name={tab === 'scan' ? 'camera' : tab === 'ppt' ? 'image' : 'file'} size={26} />
              </span>
              <p className="dropzone-title">{drop.title}</p>
              <p className="dropzone-hint">{drop.hint}</p>
              <span className="dropzone-btn"><Icon name="upload" size={16} /> Choose a file</span>
              <p className="dropzone-types">{drop.types}</p>
            </div>
          )}

          <p className="upload-demo-note">
            Demo uses a sample Science page — just press <strong>Transform</strong> with any option.
          </p>
        </section>

        <aside className="upload-side" aria-label="Options">
          <div className="opt">
            <h2 className="opt-title">Reading level</h2>
            <div className="opt-row">
              {LEVELS.map((l) => (
                <Pill key={l.key} active={settings.level === l.key} onClick={() => update({ level: l.key })}>
                  {l.label}
                </Pill>
              ))}
            </div>
          </div>
          <div className="opt">
            <h2 className="opt-title">Language</h2>
            <div className="opt-row">
              {LANGUAGES.map((l) => (
                <Pill key={l.key} active={settings.language === l.key} onClick={() => update({ language: l.key })}>
                  {l.label}
                </Pill>
              ))}
            </div>
          </div>
          <Button block size="lg" onClick={transform} disabled={loading}>
            {loading ? 'Transforming…' : (
              <>
                Transform <Icon name="arrowRight" size={18} />
              </>
            )}
          </Button>
          <p className="opt-note">Change level, language and accessibility any time in the workspace.</p>
        </aside>
      </div>
    </div>
  )
}
