// MainRouter.jsx
import { Routes, Route } from "react-router-dom";
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
import CheckoutPage from "./components/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";

export default function MainRouter() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Cards />} />
      <Route path="/menu/:category" element={<Cards />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      {/* PROTECTED */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
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
    </Routes>
  );
}
