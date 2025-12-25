import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <App />
          <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 2000,
            style: {
              background: '#333',
              color: '#fff',
              fontSize: '16px',
              padding: '12px 20px',
              borderRadius: '12px',
            },
            success: {
              icon: '',
              style: {
                background: '#756523', // green
              },
            },
          }}
        />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);