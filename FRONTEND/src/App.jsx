import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Components/Login'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
