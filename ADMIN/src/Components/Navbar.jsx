import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { StoreContext } from '../Context'
import {useNavigate} from 'react-router-dom'

function Navbar() {
  const { setAdminToken } = useContext(StoreContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setAdminToken('')
    navigate("/")
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/add-book">Add Book</NavLink>
        </li>
        <li>
          <NavLink to="/create-user">Create User</NavLink>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
