// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const API = "http://localhost:3000";

// const CartPage = () => {
//   const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [shippingMode, setShippingMode] = useState("pickup");

//   useEffect(() => {
//     Promise.all([
//       fetch(`${API}/cart`).then((res) => res.json()),
//       fetch(`${API}/products`).then((res) => res.json()),
//     ]).then(([cartData, productData]) => {
//       setCart(cartData);
//       setProducts(productData);
//     });
//   }, []);

//   const getProduct = (productId) =>
//     products.find((p) => Number(p.id) === Number(productId));

//   const increaseQty = (item) => {
//     fetch(`${API}/cart/${item.id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ quantity: item.quantity + 1 }),
//     }).then(() =>
//       setCart((prev) =>
//         prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         )
//       )
//     );
//   };

//   const decreaseQty = (item) => {
//     if (item.quantity === 1) return;

//     fetch(`${API}/cart/${item.id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ quantity: item.quantity - 1 }),
//     }).then(() =>
//       setCart((prev) =>
//         prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
//         )
//       )
//     );
//   };

//   const removeItem = (id) => {
//     fetch(`${API}/cart/${id}`, { method: "DELETE" }).then(() =>
//       setCart((prev) => prev.filter((i) => i.id !== id))
//     );
//   };

//   const subtotal = cart.reduce((sum, item) => {
//     const product = getProduct(item.productId);
//     return product ? sum + product.basePrice * item.quantity : sum;
//   }, 0);

//   const shippingCost = shippingMode === "delivery" ? 9.9 : 0;
//   const total = subtotal + shippingCost;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-10">
//           <h1 className="text-4xl font-bold">My Cart</h1>
//           <Link to="/">
//             <button className="border px-4 py-2 rounded-lg text-sm">
//               ← Continue shopping
//             </button>
//           </Link>
//         </div>

//         {/* Cart Items */}
//         <div className="space-y-6">
//           {cart.map((item) => {
//             const product = getProduct(item.productId);
//             if (!product) return null;

//             return (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-lg p-6 grid grid-cols-12 gap-4 items-center shadow-sm"
//               >
//                 {/* Product */}
//                 <div className="col-span-6 flex gap-6">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-24 h-24 object-cover rounded"
//                   />
//                   <div>
//                     <h3 className="font-semibold">{product.name}</h3>
//                     <p className="text-sm text-gray-600">
//                       Category: {product.category}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="col-span-2 text-center font-semibold">
//                   €{product.basePrice.toFixed(2)}
//                 </div>

//                 {/* Quantity */}
//                 <div className="col-span-2 flex justify-center gap-3">
//                   <button
//                     onClick={() => decreaseQty(item)}
//                     className="w-8 h-8 border rounded"
//                   >
//                     −
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => increaseQty(item)}
//                     className="w-8 h-8 border rounded"
//                   >
//                     +
//                   </button>
//                 </div>

//                 {/* Total */}
//                 <div className="col-span-2 text-right font-bold">
//                   €{(product.basePrice * item.quantity).toFixed(2)}
//                 </div>

//                 {/* Remove */}
//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="text-gray-400 hover:text-red-500 text-xl"
//                 >
//                   ×
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* Summary */}
//         <div className="bg-gray-100 rounded-2xl p-8 max-w-3xl ml-auto mt-10">
//           <h2 className="text-xl font-semibold mb-6">
//             Choose shipping mode
//           </h2>

//           <div className="space-y-4 mb-8">
//             <label className="flex gap-4 cursor-pointer">
//               <input
//                 type="radio"
//                 name="shipping"
//                 checked={shippingMode === "pickup"}
//                 onChange={() => setShippingMode("pickup")}
//               />
//               <p className="font-medium">Store pickup</p>
//             </label>

//             <label className="flex gap-4 cursor-pointer">
//               <input
//                 type="radio"
//                 name="shipping"
//                 checked={shippingMode === "delivery"}
//                 onChange={() => setShippingMode("delivery")}
//               />
//               <p className="font-medium">
//                 Delivery at home (30 min) - €9.90
//               </p>
//             </label>
//           </div>

//           <div className="space-y-3 text-lg">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>€{subtotal.toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between text-gray-600">
//               <span>Shipping</span>
//               <span>
//                 {shippingCost === 0
//                   ? "Free"
//                   : `€${shippingCost.toFixed(2)}`}
//               </span>
//             </div>

//             <div className="flex justify-between font-bold text-xl pt-4 border-t">
//               <span>Total</span>
//               <span>€{total.toFixed(2)}</span>
//             </div>
//           </div>

//           <button
//             disabled={cart.length === 0}
//             className={`w-full mt-8 py-4 rounded-lg text-xl font-bold ${
//               cart.length === 0
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-[#9c7635] hover:bg-[#6c5225] text-white"
//             }`}
//           >
//             Checkout €{total.toFixed(2)}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


// src/pages/CartPage.jsx or wherever it is
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API = "http://localhost:3000";

const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
  } = useCart();

  const [shippingMode, setShippingMode] = useState("pickup");

  const shippingCost = shippingMode === "delivery" ? 9.9 : 0;
  const total = cartSubtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-8">My Cart</h1>
        <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
        <Link to="/">
          <button className="bg-[#9c7635] text-white px-6 py-3 rounded-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">My Cart</h1>
          <Link to="/">
            <button className="border px-4 py-2 rounded-lg text-sm">
              ← Continue shopping
            </button>
          </Link>
        </div>

        {/* Cart Items */}
        <div className="space-y-6 mb-10">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-6 grid grid-cols-12 gap-4 items-center shadow-sm"
            >
              {/* Product */}
              <div className="col-span-6 flex gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Category: {item.category}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center font-semibold">
                ₹{item.basePrice.toFixed(2)}
              </div>

              {/* Quantity */}
              <div className="col-span-2 flex justify-center gap-3 items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.qty - 1)}
                  className="w-8 h-8 border rounded hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-8 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.qty + 1)}
                  className="w-8 h-8 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Total */}
              <div className="col-span-1 text-right font-bold">
                ₹{(item.basePrice * item.qty).toFixed(2)}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-500 text-2xl"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-100 rounded-2xl p-8 max-w-3xl ml-auto">
          <h2 className="text-xl font-semibold mb-6">Choose shipping mode</h2>

          <div className="space-y-4 mb-8">
            <label className="flex gap-4 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                checked={shippingMode === "pickup"}
                onChange={() => setShippingMode("pickup")}
              />
              <p className="font-medium">Store pickup</p>
            </label>

            <label className="flex gap-4 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                checked={shippingMode === "delivery"}
                onChange={() => setShippingMode("delivery")}
              />
              <p className="font-medium">Delivery at home (30 min) - ₹9.90</p>
            </label>
          </div>

          <div className="space-y-3 text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between font-bold text-xl pt-4 border-t">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="w-full mt-8 py-4 rounded-lg text-xl font-bold bg-[#9c7635] hover:bg-[#6c5225] text-white transition"
          >
            Checkout ₹{total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;