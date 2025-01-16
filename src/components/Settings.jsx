import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Settings() {
  const navigate = useNavigate()

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
        >
          Back
        </button>
        <h2 className="text-2xl font-semibold">Settings</h2>
      </div>

      <div className="space-y-4">
        <Link
          to="/tracked-event-setup"
          className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-[#2196F3]">Create Tracked Event</h3>
          <p className="text-gray-600">Set up new events to track with custom outcomes</p>
        </Link>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800">Account Settings</h3>
          <p className="text-gray-600">Manage your account preferences</p>
        </div>
      </div>
    </div>
  )
}

export default Settings
