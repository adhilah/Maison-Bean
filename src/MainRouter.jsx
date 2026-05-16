import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages";
import Login from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import Cards from "./components/cards/MainProducts";
import CartPage from "./components/Cart";
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
import UserManagement from "./admin/components/tables/UsersTable";
import ProductList from "./admin/components/tables/ProductsTable";
import OrderManagement from "./admin/components/tables/OrdersTable";
import CartOverview from "./admin/pages/CartOverview";
import AddToCart from "./admin/pages/AddToCart";
import EditProduct from "./admin/pages/EditProduct";
import Story from "./pages/Story";
import Sourcing from "./pages/Sourcing";
import Visit from "./pages/Visit";
import ForgotPassword from "./pages/ForgotPassword";
import BeanMilkManager from "./admin/pages/BeanMilk";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentFailed from "./pages/payment/PaymentFailed";
// ── Global loading screen ──────────────────────────────────────────────────
const AppLoader = ({ message = "Loading…" }) => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&family=Jost:wght@200;300&display=swap');
      @keyframes mb-spin { to { transform: rotate(360deg); } }
      @keyframes mb-pulse-fade {
        0%, 100% { opacity: 0.35; }
        50%       { opacity: 0.7; }
      }
    `}</style>
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0a05",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
      }}
    >
      {/* Logo */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.2rem",
          fontWeight: 300,
          letterSpacing: "0.55em",
          textTransform: "uppercase",
          color: "#f5f0e8",
          animation: "mb-pulse-fade 2s ease-in-out infinite",
        }}
      >
        Maison <span style={{ color: "#c9a96e" }}>Bean</span>
      </p>

      {/* Spinner */}
      <div
        style={{
          width: 28,
          height: 28,
          border: "1px solid rgba(201,169,110,0.15)",
          borderTop: "1px solid rgba(201,169,110,0.6)",
          borderRadius: "50%",
          animation: "mb-spin 1s linear infinite",
        }}
      />

      {/* Message */}
      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.5rem",
          fontWeight: 200,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.35)",
        }}
      >
        {message}
      </p>
    </div>
  </>
);

// ── Admin redirect wrapper ────────────────────────────────────────────────
const HomeWithRedirect = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <AppLoader />;
  if (user?.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  return <Home />;
};

// ── Main router ───────────────────────────────────────────────────────────
export default function MainRouter() {
  const { isLoading } = useAuth();

  if (isLoading) return <AppLoader message="Loading Maison Bean" />;

  return (
    <Routes>

      {/* ── Public — unauthenticated only ── */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/registration" element={<PublicRoute><RegistrationPage /></PublicRoute>} />

      {/* ── Public — everyone ── */}
      <Route path="/" element={<HomeWithRedirect />} />
      <Route path="/menu" element={<Cards />} />
      <Route path="/menu/:category" element={<Cards />} />
      <Route path="/track-order/:orderId" element={<TrackOrder />} />
      <Route path="/story" element={<Story />} />
      <Route path="/sourcing" element={<Sourcing />} />
      <Route path="/visit" element={<Visit />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ── Protected — customer ── */}
      <Route path="/cart" element={<ProtectedRoute allowedRoles={["customer"]}><CartPage /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute allowedRoles={["customer"]}><Wishlist /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute allowedRoles={["customer"]}><Profile /></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute allowedRoles={["customer"]}><PaymentPage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute allowedRoles={["customer"]}><OrderList /></ProtectedRoute>} />
      <Route path="/delivery-details" element={<ProtectedRoute allowedRoles={["customer"]}><DeliveryDetails /></ProtectedRoute>} />
      <Route path="/customize/:id" element={<ProtectedRoute allowedRoles={["customer"]}><CustomizeProduct /></ProtectedRoute>} />
      <Route path="/customize" element={<ProtectedRoute allowedRoles={["customer"]}><CustomizePage /></ProtectedRoute>} />

      {/* ── Protected — admin ── */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users-management" element={<UserManagement />} />
              <Route path="products-management" element={<ProductList />} />
              <Route path="bean-milk-management" element={<BeanMilkManager />} />
              <Route path="orders-management" element={<OrderManagement />} />
              <Route path="cart-overview" element={<CartOverview />} />
              <Route path="add-product" element={<AddToCart />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* ── 404 fallback ── */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}