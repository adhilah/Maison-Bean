import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user from localStorage on app load/refresh
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("authUser");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Failed to parse authUser from localStorage:", err);
        localStorage.removeItem("authUser");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
  };

  // Add clearSession function
  const clearSession = () => {
    // Only remove authUser, keep cart/wishlist for guest users
    localStorage.removeItem("authUser");
    setUser(null);
  };

  // Enhanced value with helper to check role
  const value = {
    user,
    login,
    logout,
    clearSession, // Added this
    isLoading,
    isAdmin: user?.role === "admin",
    isCustomer: user?.role !== "admin" && user !== null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};