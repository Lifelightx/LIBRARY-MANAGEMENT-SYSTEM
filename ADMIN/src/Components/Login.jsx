import { useState } from "react"
import axios from "axios"

function Login({ setToken }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { username, password })
      if (response.data.role === "admin") {
        localStorage.setItem("token", response.data.token)
        setToken(response.data.token)
      } else {
        alert("Access denied. Admin only.")
      }
    } catch (error) {
      alert("Login failed: " + error.response.data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login

