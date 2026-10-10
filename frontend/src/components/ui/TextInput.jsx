import './TextInput.css'

export default function TextInput({
  label,
  id,
  as: Comp = 'input',
  hint,
  className = '',
  ...rest
}) {
  return (
    <label className="field" htmlFor={id}>
      {label ? <span className="field-label">{label}</span> : null}
      <Comp id={id} className={`field-input ${className}`} {...rest} />
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  )
}
