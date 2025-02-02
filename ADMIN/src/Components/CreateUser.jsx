import { useState } from "react"
import axios from "axios"

function CreateUser() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "http://localhost:5000/api/users/create",
        { username, password, email },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      alert("User created successfully")
      setUsername("")
      setPassword("")
      setEmail("")
    } catch (error) {
      alert("Error creating user: " + error.response.data.message)
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
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Create User</button>
    </form>
  )
}

export default CreateUser
