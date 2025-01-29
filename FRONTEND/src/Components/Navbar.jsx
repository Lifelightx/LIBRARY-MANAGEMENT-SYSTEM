import React from 'react'
import librayImg from "../assets/libraryLogo.png"
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const navigate = useNavigate()
  return (
    <div className="sticky w-full top-0 z-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-b  border-gray-200 shadow-sm">
      <div className="container mx-auto py-2 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <img src={librayImg} alt="Logo" className="h-14 w-auto" />
          <h1 className='text-3xl font-bold text-slate-600 font-[Montserrat]'>Lib Automation</h1>
        </div>
        <div className="flex items-center relative">
          <button
           onClick={()=>navigate('/login')}
          className="px-5 py-2 bg-indigo-500 text-white rounded-full cursor-pointer">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
