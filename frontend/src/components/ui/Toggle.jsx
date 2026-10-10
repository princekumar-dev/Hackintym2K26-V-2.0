import './Toggle.css'

export default function Toggle({ checked, onChange, label, id, hint }) {
  return (
    <label className="toggle" htmlFor={id}>
      <span className="toggle-text">
        <span className="toggle-label">{label}</span>
        {hint ? <span className="toggle-hint">{hint}</span> : null}
      </span>
      <span className="toggle-switch">
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-track" aria-hidden="true">
          <span className="toggle-thumb" />
        </span>
      </span>
    </label>
  )
}
