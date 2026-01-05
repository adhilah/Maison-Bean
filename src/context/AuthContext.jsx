// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   //Restoring login after refresh 
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   // login
//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   // logout
//   const logout = () => {
//   localStorage.removeItem("user");
//   setUser(null);
// };

//   // upade user data
//   const updateUser = (updatedData) => {
//     const newUser = { ...user, ...updatedData };
//     setUser(newUser);
//     localStorage.setItem("user", JSON.stringify(newUser));
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, updateUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// context/AuthContext.jsx - MUST HAVE localStorage!
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ RESTORE USER ON PAGE REFRESH
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
    // ✅ SAVE TO localStorage - SURVIVES REFRESH!
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