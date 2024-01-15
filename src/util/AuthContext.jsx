/* eslint-disable react/prop-types */
// @refresh reset
import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(() => {
    const userId = localStorage.getItem("userId");
    return !!userId;
  });

  const setIsLoggedinWithLocalStorage = (value) => {
    if (value) {
      localStorage.setItem("userId", "admin");
    } else {
      localStorage.removeItem("userId");
    }
    setIsLoggedin(value);
  };

  return <AuthContext.Provider value={{ isLoggedin, setIsLoggedinWithLocalStorage }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
