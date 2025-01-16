import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import JournalEntry from './components/JournalEntry'
import Incident from './components/Incident'
import TrackedEventUpdate from './components/TrackedEventUpdate'
import TrackedEventSetup from './components/TrackedEventSetup'
import Reports from './components/Reports'
import Settings from './components/Settings'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <Header />
      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/journal-entry" element={<PrivateRoute><JournalEntry /></PrivateRoute>} />
          <Route path="/incident" element={<PrivateRoute><Incident /></PrivateRoute>} />
          <Route path="/tracked-event-update" element={<PrivateRoute><TrackedEventUpdate /></PrivateRoute>} />
          <Route path="/tracked-event-setup" element={<PrivateRoute><TrackedEventSetup /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
