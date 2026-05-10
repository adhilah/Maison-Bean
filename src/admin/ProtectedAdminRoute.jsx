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
}// components/ProtectedAdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedAdminRoute() {
  const { user, loading } = useAuth();

  // Still checking auth → show nothing (prevents flash redirect)
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#080808" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  // Not logged in → home
  if (!user) return <Navigate to="/" replace />;

  // Logged in but not admin → home
  if (user.role !== "admin") return <Navigate to="/" replace />;

  // All good → render admin pages
  return <Outlet />;
}