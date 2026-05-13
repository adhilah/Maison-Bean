import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import api from "../services/api";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  // =====================================
  // LOAD AUTHENTICATED USER
  // =====================================

  useEffect(() => {

    const loadUser = async () => {

      try {

        const response =
          await api.get(
            "/user/me",
            {
              withCredentials: true,
            }
          );

        setUser(response.data);

      } catch (error) {

        console.error(
          "Auth check failed:",
          error
        );

        setUser(null);

      } finally {

        setIsLoading(false);
      }
    };

    loadUser();

  }, []);

  // =====================================
  // LOGIN
  // =====================================

  const login = (userData) => {

    setUser(userData);
  };

  // =====================================
  // LOGOUT
  // =====================================

  const logout = async () => {

    try {

      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

    } catch (error) {

      console.error(
        "Logout failed:",
        error
      );

    } finally {

      setUser(null);
    }
  };

  // =====================================
  // CLEAR SESSION
  // =====================================

  const clearSession = () => {

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{

        user,

        login,

        logout,

        clearSession,

        isLoading,

        isAdmin:
          user?.role?.toUpperCase() ===
          "ADMIN",

        isCustomer:
          user?.role?.toUpperCase() ===
          "CUSTOMER",

        isAuthenticated:
          !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};