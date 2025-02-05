import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext } from "react"
import { StoreContext } from "./Context"
import Home from "./Pages/Home"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
function App() {
  const { adminToken } = useContext(StoreContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={adminToken ?
          <>
            <Navbar />
            <Routes>
              <Route path="/home" element={<Dashboard />} />
            </Routes>
            <Footer />
          </> : <>Sorry Please Login</>} />
      </Routes>

    </BrowserRouter>

  )

}

export default App
