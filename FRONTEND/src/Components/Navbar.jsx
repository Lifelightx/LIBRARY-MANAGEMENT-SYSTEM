import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context';
import { Menu, X } from 'lucide-react';
import LibraryLogo from "../assets/libraryLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    setToken('');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 text-slate-600 rounded-full cursor-pointer font-[Montserrat] 
        
        transition-colors duration-200`
      }
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <div className="sticky w-full top-0 z-50 bg-slate-100">
      <div className="container mx-auto py-2 px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center py-3">
            <img src={LibraryLogo} alt="Logo" className="h-14 w-auto" />
            <h1 className="text-2xl md:text-3xl font-bold text-slate-600 font-[Montserrat]">
              BookByte
            </h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-slate-200"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center space-x-4">
              <NavItem to="/">Home</NavItem>
              {token ? (
                <>
                  <NavItem to="/borrowed-books">Borrowed Books</NavItem>
                  <NavItem to="/reserved-books">Reserved Books</NavItem>
                  <NavItem to="/profile">My Profile</NavItem>
                </>
              ) : (
                <>
                  <NavItem to="/about">About</NavItem>
                  <NavItem to="/services">Services</NavItem>
                  <NavItem to="/contacts">Contacts</NavItem>
                </>
              )}
              {token ? (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              ) : (
                <button
                  className="px-5 py-2 bg-[#006D77] text-slate-100 font-semibold rounded-full hover:bg-[#005a63] transition-colors duration-200 cursor-pointer font-[Montserrat]"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <NavItem to="/">Home</NavItem>
              {token ? (
                <>
                  <NavItem to="/borrowed-books">Borrowed Books</NavItem>
                  <NavItem to="/reserved-books">Reserved Books</NavItem>
                  <NavItem to="/profile">My Profile</NavItem>
                </>
              ) : (
                <>
                  <NavItem to="/about">About</NavItem>
                  <NavItem to="/services">Services</NavItem>
                  <NavItem to="/contacts">Contacts</NavItem>
                </>
              )}
              {token ? (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 w-full text-center"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              ) : (
                <button
                  className="px-5 py-2 bg-[#006D77] text-slate-100 font-semibold rounded-full hover:bg-[#005a63] transition-colors duration-200 cursor-pointer font-[Montserrat] w-full"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;