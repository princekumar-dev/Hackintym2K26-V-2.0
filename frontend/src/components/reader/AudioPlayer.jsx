import { useEffect, useRef, useState } from 'react'
import Icon from '../ui/Icon.jsx'
import './AudioPlayer.css'

const LANG = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', ta: 'ta-IN', hing: 'en-IN', tang: 'en-IN' }

// Reads the lesson aloud with the browser Web Speech API and reports the
// active word (via onActive) so the LessonView can highlight along.
export default function AudioPlayer({ segments, lang = 'en', onActive }) {
  const [playing, setPlaying] = useState(false)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const idxRef = useRef(0)

  const stop = () => {
    if (supported) window.speechSynthesis.cancel()
    setPlaying(false)
    onActive?.(null)
  }

  const speakFrom = (start) => {
    if (!supported) return
    const synth = window.speechSynthesis
    synth.cancel()
    let i = start
    const speakOne = () => {
      if (i >= segments.length) {
        setPlaying(false)
        onActive?.(null)
        return
      }
      const seg = segments[i]
      const u = new SpeechSynthesisUtterance(seg.text)
      u.lang = LANG[lang] || 'en-US'
      u.rate = 0.95
      const words = seg.text.trim().split(/\s+/)
      u.onstart = () => onActive?.({ blockId: seg.blockId, wordIndex: 0 })
      u.onboundary = (e) => {
        if (e.name && e.name !== 'word') return
        const upto = seg.text.slice(0, e.charIndex).trim()
        const wi = upto === '' ? 0 : upto.split(/\s+/).length
        onActive?.({ blockId: seg.blockId, wordIndex: Math.min(wi, words.length - 1) })
      }
      u.onend = () => {
        i += 1
        idxRef.current = i
        speakOne()
      }
      synth.speak(u)
    }
    speakOne()
  }

  const toggle = () => {
    if (!supported) return
    if (playing) {
      stop()
      return
    }
    setPlaying(true)
    speakFrom(0)
  }

  // stop audio whenever the content or language changes, and on unmount
  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, segments])

  return (
    <div className="audio">
      <button
        className="audio-btn"
        onClick={toggle}
        aria-label={playing ? 'Pause reading aloud' : 'Read the lesson aloud'}
        disabled={!supported}
      >
        <Icon name={playing ? 'pause' : 'play'} size={20} />
        <span>{playing ? 'Pause' : 'Read aloud'}</span>
      </button>
      <span className="audio-wave" data-on={playing} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      {!supported ? <span className="audio-note">Audio isn’t supported in this browser.</span> : null}
    </div>
  )
}
