import './Card.css'

export default function Card({
  as: Comp = 'div',
  hover = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <Comp className={`card ${hover ? 'card-hover' : ''} ${className}`} {...rest}>
      {children}
    </Comp>
  )
}
