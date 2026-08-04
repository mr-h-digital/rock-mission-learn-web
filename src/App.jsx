import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CourseDetail from './pages/CourseDetail'
import CoursePlayer from './pages/CoursePlayer'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Teach from './pages/Teach'
import CourseBuilder from './pages/CourseBuilder'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Catalog />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route
            path="/courses/:slug/learn"
            element={
              <ProtectedRoute>
                <CoursePlayer />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teach"
            element={
              <ProtectedRoute requireEducator>
                <Teach />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teach/:slug"
            element={
              <ProtectedRoute requireEducator>
                <CourseBuilder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
