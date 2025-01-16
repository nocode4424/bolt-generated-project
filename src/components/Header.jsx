import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isMainPage = location.pathname === '/'

  return (
    <header className="bg-white shadow-sm px-4 py-3 mb-6">
      <div className="container mx-auto">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-lg flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E293B]">Aurora</h1>
            <p className="text-xs text-gray-500">Moving Forward</p>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header
