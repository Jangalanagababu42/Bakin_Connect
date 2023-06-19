import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const localStorageAuth = localStorage.getItem("authToken");
  const localStorageUser = localStorage.getItem("authUser");
  const [authToken, setAuthToken] = useState(
    localStorageAuth ? localStorageAuth : ""
  );
  //console.log(authToken, "authtoken");
  const [authUser, setAuthUser] = useState(
    localStorageUser ? JSON.parse(localStorageUser) : null
  );
  //console.log(authUser, "authUser");

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, authUser, setAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
