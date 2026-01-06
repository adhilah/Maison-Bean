import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //RESTORE USER ON PAGE REFRESH
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("authUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Failed to load user:", err);
      localStorage.removeItem("authUser");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // SAVE TO localStorage - SURVIVES REFRESH!
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

const logout = () => {
  setUser(null);
  localStorage.removeItem("authUser");
};

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);