import React from 'react'
import librayImg from "../assets/libraryLogo.png"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate()
  return (
    <div className="sticky w-full top-0 z-50 bg-slate-100">
      <div className="container mx-auto py-2 px-8 flex justify-between items-center">
        <div className="flex py-3 items-center">
          <img src={librayImg} alt="Logo" className="h-14 w-auto" />
          <h1 className='text-3xl font-bold text-slate-600 font-[Montserrat]'>BookByte</h1>
        </div>
        <div className="flex items-center relative">
          <nav className="flex items-center space-x-15">
            <div className='px-10'>
              <NavLink to="/" className="px-3 font-medium   py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat]">Home</NavLink>
              <NavLink to="/about" className="px-3 font-medium   py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat]">About</NavLink>
              <NavLink to="/services" className="px-3 font-medium  py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat]">Services</NavLink>
              <NavLink to="/contacts" className="px-3  font-medium py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat]">Contacts</NavLink>
            </div>
            <div>
              <button
                className="px-5 py-2 bg-indigo-200 text-slate-600 font-semibold border-1 border-slate-200 rounded-full cursor-pointer font-[Montserrat]" onClick={() => navigate('/login')}>Login</button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
