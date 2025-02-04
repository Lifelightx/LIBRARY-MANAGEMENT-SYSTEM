import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext()

export const StoreContextProvider = ({children})=>{
    
    const [token, setToken] = useState("")
    const url = "http://127.0.0.1:5000"
    useEffect(()=>{
        const storedToken = localStorage.getItem("user_token")
        
        if( storedToken){
            setToken(storedToken)
        }
        
    },[token])
    const storeVal = {
        token,
        setToken,
        url
    }
    return(
        <StoreContext.Provider value={storeVal}>
            {children}
        </StoreContext.Provider>
    )
}