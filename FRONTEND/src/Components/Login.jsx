import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Login({ setToken }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { username, password })
      localStorage.setItem("user_token", response.data.token)
      setToken(response.data.token)
      navigate('/')
    } catch (error) {
      alert("Login failed: " + error.response.data.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <form onSubmit={handleSubmit}
      
      className="card bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/3">
        <h2 className="text-2xl font-bold text-gray-600 mb-1 text-center">Welcome to BookByte!</h2>
        <p className="text-lg text-gray-600 mb-6 text-center">Please log in to dive into the knowledge world</p>
        <div className="mb-4">
          <label className="block text-indigo-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-indigo-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-indigo-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
          <p className="text-blue-800 hover:text-gray-700 cursor-pointer" onClick={() => navigate('/')}>
            Return to Home
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
