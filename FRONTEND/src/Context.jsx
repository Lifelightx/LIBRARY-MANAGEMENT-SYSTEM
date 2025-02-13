import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const url = "https://library-management-system-backend-nac4.onrender.com";

  useEffect(() => {
    const storedToken = localStorage.getItem("user_token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  
  const storeVal = {
    token,
    setToken,
    url,
  };

  return (
    <StoreContext.Provider value={storeVal}>
      {children}
    </StoreContext.Provider>
  );
};