import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Icon from '../components/ui/Icon.jsx'
import './Landing.css'

const STEPS = [
  { icon: 'camera', title: 'Capture', text: 'Scan, photo, PDF or paste any lesson.' },
  { icon: 'sparkle', title: 'Simplify', text: 'Rewritten to the reading level — meaning kept.' },
  { icon: 'globe', title: 'Translate', text: 'Into the learner’s own language.' },
  { icon: 'volume', title: 'Narrate', text: 'Read aloud with word highlighting.' },
  { icon: 'layers', title: 'Verify', text: 'See the source + confidence for every line.' },
]

const FEATURES = [
  { icon: 'layers', title: 'Proof Lens', text: 'Tap any line to see where it came from on the original, with a confidence score. Verify, don’t trust.' },
  { icon: 'sparkle', title: 'Tap-to-Understand', text: 'Tap any word or diagram for an instant explanation and a real-world analogy.' },
  { icon: 'type', title: 'Difficulty Dial', text: 'Slide from Simple to Original and the lesson re-levels live.' },
  { icon: 'mic', title: 'Voice Q&A', text: 'Ask a question out loud and hear the answer — grounded to the page.' },
  { icon: 'access', title: 'Built for everyone', text: 'WCAG 2.2 AA: screen-reader, keyboard, high-contrast, dyslexia-friendly.' },
  { icon: 'book', title: 'Any lesson', text: 'Printed pages, PDFs, diagrams and typed text — one pipeline.' },
  { icon: 'sparkle', title: 'Visual Explainer', text: 'An AI whiteboard that draws the concept — see how it works, not just read it.' },
  { icon: 'check', title: 'Smart Study Plan', text: 'Turns a lesson into a personalized revision path with spaced practice.' },
]

export default function Landing() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <Badge tone="new">Smart India Hackathon · Team Grix</Badge>
            <h1 className="hero-title">Reaching every learner, through every barrier.</h1>
            <p className="hero-sub">
              SahajPath turns any lesson into simplified, spoken, multilingual,{' '}
              <strong>verifiable</strong> content — understandable by every learner.
            </p>
            <div className="hero-cta">
              <Button as={Link} to="/upload" size="lg">
                Upload a lesson <Icon name="arrowRight" size={18} />
              </Button>
              <Button as={Link} to="/workspace" variant="secondary" size="lg">
                See the demo
              </Button>
            </div>
            <p className="hero-note">No sign-up · runs in your browser · 3 languages in the demo</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-card art-original">
              <span className="art-tag">Original</span>
              <p>Photosynthesis is the biochemical process by which green plants synthesise organic compounds from carbon dioxide and water…</p>
            </div>
            <div className="art-arrow"><Icon name="arrowRight" /></div>
            <div className="art-card art-simple">
              <span className="art-tag art-tag-brand">Simplified · हिन्दी</span>
              <p>पौधे धूप, पानी और हवा से अपना भोजन खुद बनाते हैं।</p>
              <div className="art-audio"><Icon name="volume" size={16} /> <span className="art-wave" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container band">
        <h2 className="band-title">How it works</h2>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-icon"><Icon name={s.icon} /></span>
              <span className="step-n">{i + 1}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-text">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container band">
        <h2 className="band-title">What makes it different</h2>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <Card key={f.title} hover className="feature-card">
              <span className="feature-icon"><Icon name={f.icon} /></span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-text">{f.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="impact">
        <div className="container impact-inner">
          <div>
            <h2 className="band-title">Built for real impact</h2>
            <p className="impact-sub">
              Advancing <strong>SDG 4</strong> (Quality Education) &amp; <strong>SDG 10</strong>{' '}
              (Reduced Inequalities), aligned with NEP 2020 / NIPUN Bharat and the RPwD Act 2016.
            </p>
          </div>
          <ul className="impact-stats">
            <li><strong>1 in 3</strong><span>rural Grade-3 kids read at grade level</span></li>
            <li><strong>3+</strong><span>languages, spoken aloud</span></li>
            <li><strong>WCAG 2.2 AA</strong><span>accessible by design</span></li>
          </ul>
        </div>
      </section>

      <section className="container">
        <div className="cta-inner">
          <h2 className="cta-title">Make any lesson understandable — right now.</h2>
          <Button as={Link} to="/upload" size="lg">
            Try SahajPath <Icon name="arrowRight" size={18} />
          </Button>
        </div>
      </section>
    </>
  )
}
