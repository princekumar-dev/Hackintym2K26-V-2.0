import './Pill.css'

export default function Pill({ active = false, children, className = '', ...rest }) {
  return (
    <button
      type="button"
      className={`pill ${active ? 'pill-active' : ''} ${className}`}
      aria-pressed={active}
      {...rest}
    >
      {children}
    </button>
  )
}
