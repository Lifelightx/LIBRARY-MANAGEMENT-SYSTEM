import { useEffect, useState } from "react";
import { createContext } from "react";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState("");
    const url = "https://library-management-system-backend-nac4.onrender.com/";

    useEffect(() => {
        const storedToken = localStorage.getItem("admin_token");
        if (storedToken) {
            setAdminToken(storedToken);
        }
    }, []);

    const storeVal = {
        adminToken,
        setAdminToken,
        url,
    };

    return (
        <StoreContext.Provider value={storeVal}>
            {children}
        </StoreContext.Provider>
    );
};