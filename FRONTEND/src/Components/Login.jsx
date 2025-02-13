import { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { StoreContext } from "../Context.jsx"

function Login() {
  const {setToken, url} = useContext(StoreContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post(`${url}/api/auth/login`, { username, password })
      localStorage.setItem("user_token", response.data.token)
      setToken(response.data.token)
      navigate('/')
    } catch (error) {
      alert("Login failed: " + error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100 font-[Montserrat]">
      <form onSubmit={handleSubmit}
            className="card bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-3/4 md:w-2/3 lg:w-1/3 xl:w-[450px]">
        <h2 className="text-2xl font-bold text-gray-600 mb-1 text-center">Welcome to BookByte!</h2>
        <p className="text-lg text-gray-600 mb-6 text-center">Please log in to dive into the knowledge world</p>
        <div className="mb-4">
          <label className="block text-[#006D77] text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border-2 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#006D77]"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#006D77] text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border-2 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#006D77]"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            className={`bg-[#006D77] hover:bg-[#008B9F] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          <p className="text-[#008B9F] hover:text-gray-700 cursor-pointer" onClick={() => !isLoading && navigate('/')}>
            Return to Home
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login