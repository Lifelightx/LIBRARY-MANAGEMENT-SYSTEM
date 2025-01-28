import { useContext } from "react";

const StoreContext = useContext()

export const StoreContextProvider = ({children})=>{

    return(
        <StoreContext.Provider>

        </StoreContext.Provider>
    )
}