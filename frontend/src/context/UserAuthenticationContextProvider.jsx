import { useEffect, useState } from "react";
import UserContext from "./UserContext.js";

const UserAuthenticationContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = document.cookie.split("; ");

    const token = cookies.find(cookies => cookies.startsWith("accessToken="));
    const roleCookie = cookies.find(cookies => cookies.startsWith("role="));
    
   if (token) {
    setIsAuthenticated(true);
    if (roleCookie) setRole(roleCookie.split("=")[1]);
  } else {
    setIsAuthenticated(false);
  }
  setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserAuthenticationContextProvider;
