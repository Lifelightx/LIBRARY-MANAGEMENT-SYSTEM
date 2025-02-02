import { useState } from "react"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  console.log(token)

  if (!token) {
    return <Login setToken={setToken} />
  }

  return <Dashboard />
}

export default App

