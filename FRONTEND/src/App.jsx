import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Components/Login'

function App() {
  const [token, setToken] = useState(localStorage.getItem("user_token"))
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={
          <>
            <Navbar />
            <Routes>
              <Route path='/' element={token ? <UserHome /> : <Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/submitComplaint' element={token ? <ComplaintForm /> : <Home />} />
              <Route path='/complaints' element={token ? <MyComplaint /> : <Home />} />
              <Route path='/userPage' element={<UserHome />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
