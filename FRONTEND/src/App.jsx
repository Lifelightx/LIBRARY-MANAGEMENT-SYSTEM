import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Components/Login'
import Footer from './Components/Footer'
import { StoreContext } from './Context'
import UserPage from './Pages/UserPage'
import BookDetails from './Components/BookDetails'

function App() {
  const {token} = useContext(StoreContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={
          <>
            <Navbar />
            <Routes>
              <Route path='/' element={token? <UserPage/> :<Home />} />
              <Route path="/book/:id" element={<BookDetails />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
