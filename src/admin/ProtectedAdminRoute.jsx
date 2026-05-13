// import {
//   Navigate,
//   Outlet
// } from "react-router-dom";

// import { useAuth }
//   from "../context/AuthContext";

// export default function ProtectedAdminRoute() {

//   const {
//     user,
//     loading
//   } = useAuth();

//   // ======================================
//   // LOADING
//   // ======================================

//   if (loading) {

//     return (

//       <div
//         className="min-h-screen flex items-center justify-center"
//         style={{
//           background: "#080808"
//         }}
//       >

//         <div className="flex items-center gap-3">

//           <div
//             className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce"
//             style={{
//               animationDelay: "0ms"
//             }}
//           />

//           <div
//             className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce"
//             style={{
//               animationDelay: "150ms"
//             }}
//           />

//           <div
//             className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce"
//             style={{
//               animationDelay: "300ms"
//             }}
//           />

//         </div>

//       </div>
//     );
//   }

//   // ======================================
//   // NOT LOGGED IN
//   // ======================================

//   if (!user) {

//     return (
//       <Navigate
//         to="/login"
//         replace
//       />
//     );
//   }

//   // ======================================
//   // NOT ADMIN
//   // ======================================

//   if (user.role !== "ADMIN") {

//     return (
//       <Navigate
//         to="/"
//         replace
//       />
//     );
//   }

//   // ======================================
//   // ALLOWED
//   // ======================================

//   return <Outlet />;
// }



import {
  Navigate,
  Outlet
} from "react-router-dom";

import { useAuth }
  from "../context/AuthContext";

export default function ProtectedAdminRoute() {

  const {
    user,
    isLoading
  } = useAuth();

  // ======================================
  // LOADING
  // ======================================

  if (isLoading) {

    return (

      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "#080808"
        }}
      >

        <div className="flex items-center gap-3">

          <div
            className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce"
            style={{
              animationDelay: "0ms"
            }}
          />

          <div
            className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce"
            style={{
              animationDelay: "150ms"
            }}
          />

          <div
            className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-bounce"
            style={{
              animationDelay: "300ms"
            }}
          />

        </div>

      </div>
    );
  }

  // ======================================
  // NOT LOGGED IN
  // ======================================

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ======================================
  // NOT ADMIN
  // ======================================

  if (user.role !== "ADMIN") {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // ======================================
  // ALLOWED
  // ======================================

  return <Outlet />;
}