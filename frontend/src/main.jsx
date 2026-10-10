import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'
import { LessonProvider } from './context/LessonContext.jsx'
import './styles/tokens.css'
import './styles/base.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <LessonProvider>
          <App />
        </LessonProvider>
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
