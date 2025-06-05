import { useState } from "react";
import UserContext from "./UserContext.js";

const UserAuthenticationContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("user");
  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserAuthenticationContextProvider;
