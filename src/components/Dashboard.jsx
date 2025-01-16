import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { format } from 'date-fns'

function Dashboard() {
  const [stats, setStats] = useState({
    incidents30Days: 0,
    trackedEvents30Days: 0,
    journalEntries30Days: 0
  })
  const [recentIncidents, setRecentIncidents] = useState([])
  const [recentTrackedEvents, setRecentTrackedEvents] = useState([])
  const [recentJournalEntries, setRecentJournalEntries] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // ... (keep existing useEffect and fetchDashboardData)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-[#1E293B]">Dashboard</h2>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            +
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-32 bg-white rounded-lg shadow-xl py-2 z-50">
              <Link
                to="/journal-entry"
                className="block px-4 py-2 text-gray-800 hover:bg-[#4CAF50] hover:text-white transition-colors"
              >
                + Journal Entry
              </Link>
              <Link
                to="/tracked-event-update"
                className="block px-4 py-2 text-gray-800 hover:bg-[#2196F3] hover:text-white transition-colors"
              >
                + Tracked Event
              </Link>
              <Link
                to="/incident"
                className="block px-4 py-2 text-gray-800 hover:bg-[#FF5722] hover:text-white transition-colors"
              >
                + Incident
              </Link>
            </div>
          )}
        </div>
        <Link to="/settings" className="text-gray-600 hover:text-gray-800 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Link 
          to="/journal-entry"
          className="bg-[#4CAF50] hover:bg-[#45a049] text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <span className="text-xl font-bold">+ Journal Entry</span>
        </Link>
        <Link 
          to="/tracked-event-update"
          className="bg-[#2196F3] hover:bg-[#1e87db] text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <span className="text-xl font-bold">+ Tracked Event</span>
        </Link>
        <Link 
          to="/incident"
          className="bg-[#FF5722] hover:bg-[#f4511e] text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <span className="text-xl font-bold">+ Incident</span>
        </Link>
        <Link 
          to="/reports"
          className="bg-[#FF9800] hover:bg-[#e68a00] text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <span className="text-xl font-bold">REPORTS</span>
        </Link>
      </div>

      {/* Recent Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ... (keep existing recent items sections) ... */}
      </div>
    </div>
  )
}

export default Dashboard
