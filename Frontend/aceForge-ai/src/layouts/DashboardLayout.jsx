import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Navbar from '../pages/interviewPrep/components/Navbar'

const DashboardLayout = ({children}) => {
    const{user}=useContext(UserContext)
    
  return (
    <div className="min-h-screen bg-black text-white">
        <Navbar/>
        {user && (
          <div className="container mx-auto">{children}</div>
        )}
    </div>
  )
}

export default DashboardLayout
