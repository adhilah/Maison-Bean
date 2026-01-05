// components/ProtectedAdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedAdminRoute() {
  const { user } = useAuth();

  // If not logged in → go to login/home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in but NOT admin → go home
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // All good → show admin pages
  return <Outlet />;
}