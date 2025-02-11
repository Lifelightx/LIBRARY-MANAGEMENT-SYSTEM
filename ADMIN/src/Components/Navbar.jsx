import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context';

const Navbar = () => {
  const { setAdminToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAdminToken('');
    navigate("/");
  };

  return (
    <nav className="bg-slate-100 sticky top-0 shadow-lg">
      <div className="max-w-full mx-auto px-12">
        <div className="flex justify-between items-center h-16">
          <div className="text-[#006D77] text-xl font-bold">
            BOOKBYTE
          </div>
          <div className="flex items-center space-x-8">
            <NavLink 
              to="/home" 
              className={({ isActive }) =>
                `text-[#006D77] hover:text-teal-700 transition-colors duration-200 ${
                  isActive ? 'font-bold' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/add-book" 
              className={({ isActive }) =>
                `text-[#006D77] hover:text-teal-700 transition-colors duration-200 ${
                  isActive ? 'font-bold' : ''
                }`
              }
            >
              Add Book
            </NavLink>
            <NavLink 
              to="/create-user" 
              className={({ isActive }) =>
                `text-[#006D77] hover:text-teal-700 transition-colors duration-200 ${
                  isActive ? 'font-bold' : ''
                }`
              }
            >
              Create User
            </NavLink>
            <NavLink 
              to="/all-users" 
              className={({ isActive }) =>
                `text-[#006D77] hover:text-teal-700 transition-colors duration-200 ${
                  isActive ? 'font-bold' : ''
                }`
              }
            >
              Users
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-[#006D77] text-white px-4 py-2 cursor-pointer rounded hover:bg-teal-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;