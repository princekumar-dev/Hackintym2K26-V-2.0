import './Slider.css'

export default function Slider({
  id,
  label,
  min = 0,
  max = 2,
  step = 1,
  value,
  onChange,
  marks = [],
  valueText,
}) {
  return (
    <div className="slider">
      {label ? (
        <label htmlFor={id} className="slider-label">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className="slider-input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {marks.length > 0 ? (
        <div className="slider-marks" aria-hidden="true">
          {marks.map((m, i) => (
            <span key={m} className={i === value ? 'on' : ''}>
              {m}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
