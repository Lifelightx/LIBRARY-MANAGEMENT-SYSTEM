
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useContext } from "react"
import { StoreContext } from "./Context"
function App() {
  const {adminToken} = useContext(StoreContext)

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/home' element={adminToken?<Dashboard/>:<Login/>}/>
      </Routes>
    </BrowserRouter>

  ) 
    
}

export default App

