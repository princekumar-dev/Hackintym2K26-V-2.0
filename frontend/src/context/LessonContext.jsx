import { createContext, useContext, useState } from 'react'

const LessonContext = createContext(null)

export function LessonProvider({ children }) {
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <LessonContext.Provider value={{ lesson, setLesson, loading, setLoading }}>
      {children}
    </LessonContext.Provider>
  )
}

export function useLesson() {
  const ctx = useContext(LessonContext)
  if (!ctx) throw new Error('useLesson must be used within LessonProvider')
  return ctx
}
