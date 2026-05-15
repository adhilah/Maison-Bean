import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
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
  // PREVENT DOUBLE LOAD
  // =====================================

  const initialized =
    useRef(false);

  // =====================================
  // LOAD AUTH USER
  // =====================================

  useEffect(() => {

    if (initialized.current)
      return;

    initialized.current = true;

    let mounted = true;

    const loadUser =
      async () => {

        try {

          const response =
            await api.get(
              "/user/me"
            );

          if (!mounted)
            return;

          setUser(
            response.data
          );

        } catch {

          if (!mounted)
            return;

          localStorage.removeItem(
            "authUser"
          );

          setUser(null);

        } finally {

          if (!mounted)
            return;

          setIsLoading(false);
        }
      };

    loadUser();

    return () => {

      mounted = false;
    };

  }, []);

  // =====================================
  // LOGIN
  // =====================================

  const login = (
    userData
  ) => {

    localStorage.setItem(
      "authUser",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  // =====================================
  // LOGOUT
  // =====================================

  const logout =
    async () => {

      try {

        await api.post(
          "/auth/logout"
        );

      } catch (error) {

        console.error(
          "Logout failed:",
          error
        );

      } finally {

        localStorage.removeItem(
          "authUser"
        );

        setUser(null);
      }
    };

  // =====================================
  // CLEAR SESSION
  // =====================================

  const clearSession =
    () => {

      localStorage.removeItem(
        "authUser"
      );

      setUser(null);
    };

  // =====================================
  // CONTEXT VALUE
  // =====================================

  const value = {

    user,

    login,

    logout,

    clearSession,

    isLoading,

    isAuthenticated:
      !!user,

    isAdmin:
      user?.role
        ?.toUpperCase() ===
      "ADMIN",

    isCustomer:
      user?.role
        ?.toUpperCase() ===
      "CUSTOMER",
  };

  return (

    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =====================================
// HOOK
// =====================================

export const useAuth =
  () => {

    const context =
      useContext(
        AuthContext
      );

    if (!context) {

      throw new Error(
        "useAuth must be used within AuthProvider"
      );
    }

    return context;
};
