import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import CVManager from './pages/CVManager'
import JobTracker from './pages/JobTracker'
import AccountVault from './pages/AccountVault'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page — no sidebar */}
        <Route path="/" element={<Landing />} />

        {/* App pages — with sidebar layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cv" element={<CVManager />} />
          <Route path="/jobs" element={<JobTracker />} />
          <Route path="/vault" element={<AccountVault />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
