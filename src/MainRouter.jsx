

// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";

// import Home from "./pages";
// import Login from "./pages/Login";
// import RegistrationPage from "./pages/RegistrationPage";
// import Cards from "./components/cards/MainProducts";
// import Cart from "./components/Cart";
// import Wishlist from "./components/cards/Wishlist";
// import CustomizeProduct from "./components/customization/CustomizeProduct";
// import CustomizePage from "./components/customization/CustomizationPage";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PublicRoute from "./components/PublicRoute";
// import PaymentPage from "./pages/PaymentPage";
// import OrderList from "./pages/OrderList";
// import DeliveryDetails from "./pages/DeliveryDetails";
// import Dashboard from "./admin/pages/dashboard/Dashboard";
// import TrackOrder from "./pages/TrackOrder";
// import UserOrders from "./admin/pages/Orders";
// import UserManagement from "./admin/components/tables/UsersTable";
// import ProductList from "./admin/components/tables/ProductsTable";
// import OrderManagement from "./admin/components/tables/OrdersTable";

// // Role-based home redirect
// const HomeWithRedirect = () => {
//   const { user, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-amber-50 flex items-center justify-center">
//         <p className="text-amber-900 text-xl">Loading...</p>
//       </div>
//     );
//   }

//   if (user?.role === "admin") {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   return <Home />;
// };

// export default function MainRouter() {
//   const { isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-amber-50 flex items-center justify-center">
//         <p className="text-amber-900 text-xl">Loading Maison Bean...</p>
//       </div>
//     );
//   }

//   return (
//     <Routes>
//       {/* Public - Only when NOT logged in */}
//       <Route
//         path="/login"
//         element={
//           <PublicRoute>
//             <Login />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/registration"
//         element={
//           <PublicRoute>
//             <RegistrationPage />
//           </PublicRoute>
//         }
//       />

//       {/* Public Routes */}
//       <Route path="/" element={<HomeWithRedirect />} />
//       <Route path="/menu" element={<Cards />} />
//       <Route path="/menu/:category" element={<Cards />} />
//       <Route path="/track-order/:orderId" element={<TrackOrder />} />
//       <Route path="/user-management" element={<UserManagement />} />
//       <Route path="/products-list" element={<ProductList />} />
//       <Route path="/order-management" element={<OrderManagement />} /

//       {/* Protected - Logged in users */}
//       <Route
//         path="/payment"
//         element={
//           <ProtectedRoute>
//             <PaymentPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/customize/:id"
//         element={
//           <ProtectedRoute>
//             <CustomizeProduct />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/customize"
//         element={
//           <ProtectedRoute>
//             <CustomizePage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute>
//             <OrderList />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/delivery-details"
//         element={
//           <ProtectedRoute>
//             <DeliveryDetails />
//           </ProtectedRoute>
//         }
//       />

//       {/* Customer Only Routes */}
//       <Route
//         path="/cart"
//         element={
//           <ProtectedRoute allowedRoles={["customer"]}>
//             <Cart />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/wishlist"
//         element={
//           <ProtectedRoute allowedRoles={["customer"]}>
//             <Wishlist />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute allowedRoles={["customer"]}>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />

//       {/* ADMIN ROUTES - All protected under /admin/* */}
//       <Route
//         path="/admin/*"
//         element={
//           <ProtectedRoute allowedRoles={["admin"]}>
//             <Routes>
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="orders" element={<UserOrders />} />
//               {/* Add more admin pages here */}
//               <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
//             </Routes>
//           </ProtectedRoute>
//         }
//       />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }




import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages";
import Login from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import Cards from "./components/cards/MainProducts";
import Cart from "./components/Cart";
import Wishlist from "./components/cards/Wishlist";
import CustomizeProduct from "./components/customization/CustomizeProduct";
import CustomizePage from "./components/customization/CustomizationPage";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import PaymentPage from "./pages/PaymentPage";
import OrderList from "./pages/OrderList";
import DeliveryDetails from "./pages/DeliveryDetails";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import TrackOrder from "./pages/TrackOrder";
import UserOrders from "./admin/pages/Orders";
import UserManagement from "./admin/components/tables/UsersTable";
import ProductList from "./admin/components/tables/ProductsTable";
import OrderManagement from "./admin/components/tables/OrdersTable";

// Role-based home redirect
const HomeWithRedirect = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-amber-900 text-xl">Loading...</p>
      </div>
    );
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Home />;
};

export default function MainRouter() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <p className="text-amber-900 text-xl">Loading Maison Bean...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* PUBLIC - Only when NOT logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <PublicRoute>
            <RegistrationPage />
          </PublicRoute>
        }
      />

      {/* PUBLIC - Everyone */}
      <Route path="/" element={<HomeWithRedirect />} />
      <Route path="/menu" element={<Cards />} />
      <Route path="/menu/:category" element={<Cards />} />
      <Route path="/track-order/:orderId" element={<TrackOrder />} />

      {/* PROTECTED - Any logged-in user */}
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customize/:id"
        element={
          <ProtectedRoute>
            <CustomizeProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customize"
        element={
          <ProtectedRoute>
            <CustomizePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/delivery-details"
        element={
          <ProtectedRoute>
            <DeliveryDetails />
          </ProtectedRoute>
        }
      />

      {/* CUSTOMER ONLY */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ADMIN ONLY - All admin pages protected under /admin/* */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users-management" element={<UserManagement />} />
              <Route path="products-management" element={<ProductList />} />
              <Route path="orders-management" element={<OrderManagement />} />
              
              {/* Fallback for unknown admin routes */}
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* Global 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}