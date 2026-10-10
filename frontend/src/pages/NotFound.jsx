import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '96px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 48, fontWeight: 700 }}>404</h1>
      <p style={{ color: 'var(--color-muted)', margin: '12px 0 24px' }}>That page isn’t here.</p>
      <Button as={Link} to="/">
        Back to home
      </Button>
    </div>
  )
}
