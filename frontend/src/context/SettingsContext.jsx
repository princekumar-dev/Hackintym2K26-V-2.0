import { createContext, useContext, useEffect, useState } from 'react'

const SettingsContext = createContext(null)
const STORAGE_KEY = 'sahajpath.settings'

const defaults = {
  level: 'medium', // simple | medium | original
  language: 'en', // en | hi | mr | hing
  persona: 'default', // default | dyslexia | lowvision | custom
  dyslexicFont: false,
  highContrast: false,
  textScale: 1,
  bionic: false,
  focusMode: false,
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch (e) {
    /* storage unavailable — fall back to defaults */
  }
  return defaults
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(load)

  const update = (patch) => setSettings((s) => ({ ...s, ...patch }))

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch (e) {
      /* ignore persistence errors */
    }
  }, [settings])

  // reflect accessibility settings onto <html>
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('font-dyslexic', settings.dyslexicFont)
    root.classList.toggle('contrast-high', settings.highContrast)
    root.style.setProperty('--text-scale', String(settings.textScale))
  }, [settings.dyslexicFont, settings.highContrast, settings.textScale])

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
