import './Button.css'

export default function Button({
  variant = 'primary', // primary | secondary | pill | tertiary
  size = 'md', // sm | md | lg
  block = false,
  as: Comp = 'button',
  className = '',
  children,
  ...rest
}) {
  return (
    <Comp
      className={`btn btn-${variant} btn-${size} ${block ? 'btn-block' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  )
}
