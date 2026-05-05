import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <App />
              {/* Move Toaster inside providers - optional but cleaner */}
              {/* <Toaster
                position="top-center"
                gutter={8}
                toastOptions={{
                  duration: 2000,
                  style: {
                    background: "#333",
                    color: "#fff",
                    fontSize: "16px",
                    padding: "12px 20px",
                    borderRadius: "12px",
                  },
                  success: {
                    duration: 2000,
                    icon: "",
                    style: {
                      background: "#756523",
                    },
                  },
                  error: {
                    duration: 2000,
                  },
                }}
              /> */}

              <Toaster
  position="top-center"
  gutter={8}
  toastOptions={{
    duration: 2000,
    style: {
      background: "#1c1612",
      color: "#e8d5a3",
      fontSize: "13px",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "12px 24px",
      borderRadius: "3px",
      border: "1px solid #3a2e1a",
      boxShadow: "0 8px 40px rgba(0, 0, 0, 0.7)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    success: {
      duration: 2000,
      icon: null,
      style: {
        background: "#1c1612",
        color: "#c9a84c",
        border: "1px solid #c9a84c",
        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.7), 0 0 16px rgba(201, 168, 76, 0.12)",
      },
    },
    error: {
      duration: 2000,
      icon: null,
      style: {
        background: "#1c1612",
        color: "#a85c5c",
        border: "1px solid #6b2e2e",
        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.7), 0 0 16px rgba(168, 92, 92, 0.12)",
      },
    },
  }}
/>
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
