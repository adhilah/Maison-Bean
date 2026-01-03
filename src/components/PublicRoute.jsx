import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return null;

  if (user) {
    return user.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
