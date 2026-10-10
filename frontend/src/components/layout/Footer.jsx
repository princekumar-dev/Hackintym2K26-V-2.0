import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <div className="footer-brand">SahajPath</div>
          <p className="footer-tag">Reaching every learner, through every barrier.</p>
        </div>
        <div className="footer-col">
          <h3 className="footer-head">Product</h3>
          <Link className="footer-link" to="/upload">
            Transform a lesson
          </Link>
          <Link className="footer-link" to="/workspace">
            Workspace
          </Link>
          <Link className="footer-link" to="/teacher">
            For teachers
          </Link>
        </div>
        <div className="footer-col">
          <h3 className="footer-head">Mission</h3>
          <span className="footer-link">SDG 4 · Quality Education</span>
          <span className="footer-link">SDG 10 · Reduced Inequalities</span>
          <span className="footer-link">WCAG 2.2 AA accessible</span>
        </div>
      </div>
      <div className="container footer-legal">
        <span>© 2026 SahajPath · Team Grix</span>
        <span>Built for Smart India Hackathon</span>
      </div>
    </footer>
  )
}
