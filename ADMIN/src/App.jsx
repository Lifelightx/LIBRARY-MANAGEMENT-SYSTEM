import Login from "./Components/Login"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext } from "react"
import { StoreContext } from "./Context"
import Home from "./Pages/Home"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import AddBook from "./Components/AddBook"
import CreateUser from "./Components/CreateUser"
import UserPage from "./Pages/userPage"
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
              <Route path="/home" element={<Home />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/all-users" element={<UserPage />} />
            </Routes>
            <Footer />
          </> : <>Sorry Please Login</>} />
      </Routes>

    </BrowserRouter>

  )

}

export default App
