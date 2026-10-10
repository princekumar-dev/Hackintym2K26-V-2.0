import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Landing from './pages/Landing.jsx'
import Upload from './pages/Upload.jsx'
import Workspace from './pages/Workspace.jsx'
import Teacher from './pages/Teacher.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
