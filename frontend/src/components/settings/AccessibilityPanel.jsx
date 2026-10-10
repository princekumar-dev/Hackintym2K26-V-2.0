import Icon from '../ui/Icon.jsx'
import Toggle from '../ui/Toggle.jsx'
import Slider from '../ui/Slider.jsx'
import Pill from '../ui/Pill.jsx'
import { useSettings } from '../../context/SettingsContext.jsx'
import { LANGUAGES } from '../../data/sampleLesson.js'
import './AccessibilityPanel.css'

const PERSONAS = [
  { key: 'default', label: 'Default' },
  { key: 'dyslexia', label: 'Dyslexia-friendly' },
  { key: 'lowvision', label: 'Low vision' },
]

export default function AccessibilityPanel({ open, onClose }) {
  const { settings, update } = useSettings()
  if (!open) return null

  const choosePersona = (key) => {
    if (key === 'dyslexia')
      update({ persona: key, dyslexicFont: true, highContrast: false, textScale: 1.15 })
    else if (key === 'lowvision')
      update({ persona: key, dyslexicFont: false, highContrast: true, textScale: 1.4 })
    else update({ persona: key, dyslexicFont: false, highContrast: false, textScale: 1 })
  }

  return (
    <div className="drawer-scrim" onMouseDown={onClose}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility settings"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="drawer-head">
          <h2 className="drawer-title">
            <Icon name="access" size={20} /> Accessibility
          </h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close accessibility settings">
            <Icon name="x" size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <section>
            <h3 className="drawer-section">Quick profile</h3>
            <div className="persona-row">
              {PERSONAS.map((p) => (
                <Pill
                  key={p.key}
                  active={settings.persona === p.key}
                  onClick={() => choosePersona(p.key)}
                >
                  {p.label}
                </Pill>
              ))}
            </div>
          </section>

          <section className="drawer-stack">
            <Toggle
              id="a11y-dys"
              label="Dyslexia-friendly font"
              hint="Rounded font + extra spacing"
              checked={settings.dyslexicFont}
              onChange={(v) => update({ dyslexicFont: v, persona: 'custom' })}
            />
            <Toggle
              id="a11y-contrast"
              label="High contrast"
              hint="Stronger text & borders"
              checked={settings.highContrast}
              onChange={(v) => update({ highContrast: v, persona: 'custom' })}
            />
            <Toggle
              id="a11y-bionic"
              label="Bionic reading"
              hint="Bold the start of each word to guide the eye"
              checked={settings.bionic}
              onChange={(v) => update({ bionic: v })}
            />
            <Toggle
              id="a11y-focus"
              label="Focus mode"
              hint="One idea at a time, swipe through"
              checked={settings.focusMode}
              onChange={(v) => update({ focusMode: v })}
            />
          </section>

          <section>
            <Slider
              id="a11y-size"
              label={`Text size — ${Math.round(settings.textScale * 100)}%`}
              min={1}
              max={1.6}
              step={0.1}
              value={settings.textScale}
              valueText={`${Math.round(settings.textScale * 100)} percent`}
              onChange={(v) => update({ textScale: v, persona: 'custom' })}
            />
          </section>

          <section>
            <h3 className="drawer-section">Language</h3>
            <div className="persona-row">
              {LANGUAGES.map((l) => (
                <Pill
                  key={l.key}
                  active={settings.language === l.key}
                  onClick={() => update({ language: l.key })}
                >
                  {l.label}
                </Pill>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  )
}
