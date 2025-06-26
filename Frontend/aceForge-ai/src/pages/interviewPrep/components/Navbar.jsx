import React from 'react'
import ProfileInfoCard from './ProfileInfoCard'

const Navbar = () => {
  return (
    <nav className="w-full bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              AceForge <span className="text-amber-500">AI</span>
            </h1>
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <ProfileInfoCard />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
