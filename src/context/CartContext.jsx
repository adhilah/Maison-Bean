// import { createContext, useContext, useState } from "react";

// const CartContext = createContext(null);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === product.id);

//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? { ...item, qty: (item.qty || 1) + 1 }
//             : item
//         );
//       }

//       return [...prev, { ...product, qty: 1 }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);



// ----------------------------------------------------------------------------------------------------------------------------|


// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('🛒 CART UPDATED:', cart); // Debug log
  }, [cart]);

  const addToCart = (product) => {
    console.log('➕ ADDING TO CART:', product.name); // Debug
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (id, newQty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item
      ).filter(item => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    console.log('🗑️ REMOVING:', id);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.basePrice || 0) * (item.qty || 0), 0);

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotalItems,
    cartSubtotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};