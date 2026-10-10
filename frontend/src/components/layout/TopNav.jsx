import { Link, NavLink } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import Button from '../ui/Button.jsx'
import { useSettings } from '../../context/SettingsContext.jsx'
import { LANGUAGES } from '../../data/sampleLesson.js'
import './TopNav.css'

export default function TopNav({ onOpenA11y }) {
  const { settings, update } = useSettings()
  const navClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`
  return (
    <header className="topnav">
      <div className="topnav-inner container">
        <Link to="/" className="brand" aria-label="SahajPath — home">
          <span className="brand-orb">
            <Icon name="book" size={20} />
          </span>
          <span className="brand-word">SahajPath</span>
        </Link>

        <nav className="topnav-links" aria-label="Primary">
          <NavLink to="/upload" className={navClass}>
            Transform
          </NavLink>
          <NavLink to="/workspace" className={navClass}>
            Workspace
          </NavLink>
          <NavLink to="/teacher" className={navClass}>
            For Teachers
          </NavLink>
        </nav>

        <div className="topnav-actions">
          <label className="lang-select">
            <span className="sr-only">Language</span>
            <Icon name="globe" size={18} />
            <select
              value={settings.language}
              onChange={(e) => update({ language: e.target.value })}
            >
              {LANGUAGES.map((l) => (
                <option key={l.key} value={l.key}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <button className="icon-btn" onClick={onOpenA11y} aria-label="Accessibility settings">
            <Icon name="access" size={20} />
          </button>
          <Button as={Link} to="/upload" variant="primary" size="sm" className="topnav-cta">
            Upload a lesson
          </Button>
        </div>
      </div>
    </header>
  )
}
