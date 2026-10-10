import ClassPack from '../components/teacher/ClassPack.jsx'
import './Teacher.css'

export default function Teacher() {
  return (
    <div className="container teacher">
      <header className="teacher-head">
        <h1 className="teacher-title">One scan, a pack for the whole class</h1>
        <p className="teacher-sub">
          Turn a single lesson into every reading level and language your mixed-ability classroom
          needs — and see where students struggle most.
        </p>
      </header>
      <ClassPack />
    </div>
  )
}
