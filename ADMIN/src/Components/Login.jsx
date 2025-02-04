import { useState } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import { useContext } from "react"
import { StoreContext } from "../Context"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const {setAdminToken} = useContext(StoreContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/api/auth/login", { username, password })
      .then(response => {
        if (response.data.role === "admin") {
          
          localStorage.setItem("admin_token", response.data.token)
          setAdminToken(response.data.token)
          navigate("/home")
        } else {
          alert("Access denied. Admin only.")
        }
      })
      .catch(error => {
        alert("Login failed: " + error.response.data.message)
      })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Login</button>
    </form>
  )
}

export default Login

