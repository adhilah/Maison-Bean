// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children, allowedRoles = [] }) {
//   const { user, isLoading } = useAuth();
//   const location = useLocation();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-amber-50">
//         <p className="text-amber-900 text-xl">Loading...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     // Redirect to login, remember where they were trying to go
//     return <Navigate to="/login" replace state={{ from: location.pathname }} />;
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }



import {
  Navigate,
  useLocation
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles = []
}) {

  const {
    user,
    isLoading
  } = useAuth();

  const location =
    useLocation();

  // =========================================
  // LOADING
  // =========================================

  if (isLoading) {

    return (

      <div className="
        flex items-center
        justify-center
        min-h-screen
        bg-black
        text-white
      ">
        <p className="text-xl">
          Loading...
        </p>
      </div>
    );
  }

  // =========================================
  // NOT LOGGED IN
  // =========================================

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname
        }}
      />
    );
  }

  // =========================================
  // ROLE CHECK
  // =========================================

  const normalizedUserRole =
    user?.role
      ?.toUpperCase();

  const normalizedAllowedRoles =
    allowedRoles.map(role =>
      role.toUpperCase()
    );

  if (
    allowedRoles.length > 0 &&
    !normalizedAllowedRoles.includes(
      normalizedUserRole
    )
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // =========================================
  // ACCESS GRANTED
  // =========================================

  return children;
}