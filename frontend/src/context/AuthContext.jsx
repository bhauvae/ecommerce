// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";

// Create a context with `null` default so consumers must use the provider
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  function get_username() {
    api
      .get("get_username")
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      const { exp } = jwtDecode(token); // decode returns { exp, iat, ... }
      if (exp > Date.now() / 1000) {
        setIsAuthenticated(true);
        get_username();
      }
    }
  }, []);

  const value = { isAuthenticated, setIsAuthenticated, get_username, username };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
