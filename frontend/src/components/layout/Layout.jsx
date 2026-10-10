import { useState } from 'react'
import TopNav from './TopNav.jsx'
import Footer from './Footer.jsx'
import AccessibilityPanel from '../settings/AccessibilityPanel.jsx'
import './Layout.css'

export default function Layout({ children }) {
  const [a11yOpen, setA11yOpen] = useState(false)
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <TopNav onOpenA11y={() => setA11yOpen(true)} />
      <main id="main" className="app-main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <AccessibilityPanel open={a11yOpen} onClose={() => setA11yOpen(false)} />
    </div>
  )
}
