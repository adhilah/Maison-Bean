import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cart");
      const total = res.data.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(total);
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);