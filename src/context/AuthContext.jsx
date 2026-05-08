import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem("authUser");

      if (storedUser) {

        const parsedUser =
          JSON.parse(storedUser);

        setUser(parsedUser);
      }

    } catch (error) {

      console.error(
        "Failed to load auth user:",
        error
      );

      localStorage.removeItem("authUser");
    }

    setIsLoading(false);

  }, []);

  // Login
  const login = (userData) => {

    setUser(userData);

    localStorage.setItem(
      "authUser",
      JSON.stringify(userData)
    );
  };

  // Logout
  const logout = () => {

    setUser(null);

    localStorage.removeItem("authUser");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
  };

  // Clear invalid session
  const clearSession = () => {

    setUser(null);

    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{

        user,

        login,

        logout,

        clearSession,

        isLoading,

        // Role helpers
        isAdmin:
          user?.role?.toUpperCase() ===
          "ADMIN",

        isCustomer:
          user?.role?.toUpperCase() ===
          "CUSTOMER",

        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};