import React, { useContext } from 'react'
import librayImg from "../assets/libraryLogo.png"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../Context'
function Navbar() {
  const navigate = useNavigate()
  const { token, setToken } = useContext(StoreContext)
  const handleLogout = () => {
    localStorage.removeItem('user_token')
    setToken('')
    navigate('/')
  }
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
              {
                token ? <NavLink to="/borrowed-books" className="px-3 font-medium   py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat]">Borrowed Books</NavLink> : <NavLink to="/about" className="px-3 font-medium   py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat]">About</NavLink>
              }
              {
                token ? <NavLink to="/reserved-books" className="px-3 font-medium   py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat]">Reserved Books</NavLink> : <NavLink to="/services" className="px-3 font-medium  py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat]">Services</NavLink>
              }
              {
                token ? <NavLink to="/profile" className="px-3 font-medium py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat]">My Profile</NavLink> : <NavLink to="/contacts" className="px-3 font-medium py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat]">Contacts</NavLink>
              }
            </div>
            <div>
              {token ? <button className='px-4 py-2 bg-red-500 text-white rounded-4xl' onClick={handleLogout}>Log out</button> : <button
                className="px-5 py-2 bg-[#006D77] text-slate-100 font-semibold border-1 border-slate-200 rounded-full cursor-pointer font-[Montserrat]" onClick={() => navigate('/login')}>Login</button>}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
