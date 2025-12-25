import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.basePrice * item.qty,
    0
  );

// total unique products
const cartItemCount = cart.length;

// total quantity (recommended for cart badge)
const cartQuantity = cart.reduce(
  (total, item) => total + item.qty,
  0
);


  return (
    <CartContext.Provider
  value={{
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartItemCount,
    cartQuantity,
  }}
>

      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
