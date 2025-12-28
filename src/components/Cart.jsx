import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";

const API_BEANS = "http://localhost:3000/beanTypes";
const API_MILKS = "http://localhost:3000/milkOptions";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const [enrichedCart, setEnrichedCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const enrichCart = async () => {
      if (!cart.length) {
        setEnrichedCart([]);
        setLoading(false);
        return;
      }

      const [beans, milks] = await Promise.all([
        fetch(API_BEANS).then((res) => res.json()),
        fetch(API_MILKS).then((res) => res.json()),
      ]);

      const beanMap = Object.fromEntries(beans.map((b) => [b.id, b]));
      const milkMap = Object.fromEntries(milks.map((m) => [m.id, m]));

      const enriched = cart.map((item) => {
        const product = item.product || {};

        //  normalize price
        const basePrice = Number(product.basePrice ?? product.price ?? 0);

        const bean = item.beanId ? beanMap[item.beanId] : null;
        const milk = item.milkId ? milkMap[item.milkId] : null;

        const beanAdd = Number(bean?.priceAdd ?? 0);
        const milkAdd = Number(milk?.priceAdd ?? 0);

        const unitPrice = basePrice + beanAdd + milkAdd;
        const qty = Number(item.quantity ?? 1);

        return {
          cartId: item.id,
          product: {
            name: product.name || "Unknown Item",
            image: product.image || "/placeholder.jpg",
            description: product.description || "",
            category: product.category || "N/A",
          },
          bean,
          milk,
          quantity: qty,
          unitPrice,
          lineTotal: unitPrice * qty,
          isCustomized: item.isCustomized,
        };
      });

      setEnrichedCart(enriched);
      setLoading(false);
    };

    enrichCart();
  }, [cart]);

  const shippingCost = 9.9;

  const subtotal = enrichedCart.reduce(
    (sum, item) => sum + (Number.isFinite(item.lineTotal) ? item.lineTotal : 0),
    0
  );

  const total = subtotal + shippingCost;

  if (loading) return <p className="text-center mt-20">Loading cart...</p>;

  if (!cart.length) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/" className="text-[#9c7635] underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between mb-8">
           <h1 className="text-3xl font-bold">Cart</h1>
          <Link to="/" className="text-[#9c7635] hover:underline">
          ← Continue Shopping
        </Link>
        </div>

        <div className="space-y-6">
          {enrichedCart.map((item) => (
            <div
              key={item.cartId}
              className="bg-white rounded-xl p-6 shadow grid grid-cols-12 gap-4 items-center"
            >
              <div className="col-span-6 flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 rounded object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.product.category}
                  </p>

                  {item.isCustomized && (
                    <div className="text-sm mt-2 text-gray-600">
                      {item.bean && <p>Bean: {item.bean.name}</p>}
                      {item.milk && <p>Milk: {item.milk.name}</p>}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-2 text-center font-semibold">
                ${item.unitPrice.toFixed(2)}
              </div>

              <div className="col-span-2 flex justify-center gap-3">
                <button
                  onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="border rounded-full w-8 h-8"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                  className="border rounded-full w-8 h-8"
                >
                  +
                </button>
              </div>

              <div className="col-span-1 font-bold text-right">
                ${item.lineTotal.toFixed(2)}
              </div>

              <div className="col-span-1 text-right">
                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="text-red-500 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl p-8 ml-auto shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-dashed pt-4">
              <div className="flex justify-between text-2xl font-bold text-[#9c7635]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Link to="/payment">
            <button className="w-full mt-8 bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-5 rounded-2xl font-bold text-xl transition transform hover:scale-105">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
