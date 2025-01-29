import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext()

export const StoreContextProvider = ({children})=>{
    const [adminToken, SetAdminToken] = useState("")
    const [token, setToken] = useState("")
    const url = "http://127.0.0.1:5000"
    useEffect(()=>{
        const storedToken = localStorage.getItem("token")
        const storedAdminToken = localStorage.getItem("admin_token")
        if( storedToken){
            setToken(storedToken)
        }
        if(storedAdminToken){
            SetAdminToken(storedAdminToken)
        }
    },[adminToken,token])
    const storeVal = {
        adminToken,
        SetAdminToken,
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