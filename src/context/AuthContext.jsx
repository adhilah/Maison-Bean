// // import React, { createContext, useContext, useState, useEffect } from "react";

// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   //RESTORE USER ON PAGE REFRESH
// //   useEffect(() => {
// //     try {
// //       const savedUser = localStorage.getItem("authUser");
// //       if (savedUser) {
// //         setUser(JSON.parse(savedUser));
// //       }
// //     } catch (err) {
// //       console.error("Failed to load user:", err);
// //       localStorage.removeItem("authUser");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, []);

// //   const login = (userData) => {
// //     setUser(userData);
// //     // SAVE TO localStorage - SURVIVES REFRESH!
// //     localStorage.setItem("authUser", JSON.stringify(userData));
// //   };

// // const logout = () => {
// //   setUser(null);
// //   localStorage.removeItem("authUser");
// // };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout, isLoading }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export const useAuth = () => useContext(AuthContext);




// // ==================================================================================



// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Restore user on refresh
//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem("authUser");
//       if (savedUser) {
//         setUser(JSON.parse(savedUser));
//       }
//     } catch (err) {
//       console.error("Failed to load user:", err);
//       localStorage.removeItem("authUser");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const login = (userData) => {
//     // Always overwrite session
//     setUser(userData);
//     localStorage.setItem("authUser", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);

//     localStorage.removeItem("authUser");

//     // clear user-scoped data
//     localStorage.removeItem("cart");
//     localStorage.removeItem("orders");
//     localStorage.removeItem("wishlist");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



// context/AuthContext.jsx
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

    // Optional: Clean up any leftover customer data
    // Remove if you want to preserve cart/wishlist across sessions
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
  };

  // Enhanced value with helper to check role
  const value = {
    user,
    login,
    logout,
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