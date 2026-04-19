// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import Navbar from "./Navbar";

// const API_BEANS = "http://localhost:3000/beanTypes";
// const API_MILKS = "http://localhost:3000/milkOptions";

// const CartPage = () => {
//   const { cart, updateQuantity, removeFromCart } = useCart();

//   const [enrichedCart, setEnrichedCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const enrichCart = async () => {
//       if (!cart.length) {
//         setEnrichedCart([]);
//         setLoading(false);
//         return;
//       }

//       const [beans, milks] = await Promise.all([
//         fetch(API_BEANS).then((res) => res.json()),
//         fetch(API_MILKS).then((res) => res.json()),
//       ]);

//       const beanMap = Object.fromEntries(beans.map((b) => [b.id, b]));
//       const milkMap = Object.fromEntries(milks.map((m) => [m.id, m]));

//       const enriched = cart.map((item) => {
//         const product = item.product || {};

//         const basePrice = Number(product.basePrice ?? product.price ?? 0);

//         const bean = item.beanId ? beanMap[item.beanId] : null;
//         const milk = item.milkId ? milkMap[item.milkId] : null;

//         const beanAdd = Number(bean?.priceAdd ?? 0);
//         const milkAdd = Number(milk?.priceAdd ?? 0);

//         const unitPrice = basePrice + beanAdd + milkAdd;
//         const qty = Number(item.quantity ?? 1);

//         return {
//           cartId: item.id,
//           product: {
//             name: product.name || "Unknown Item",
//             image: product.image || "/placeholder.jpg",
//             description: product.description || "",
//             category: product.category || "N/A",
//           },
//           bean,
//           milk,
//           quantity: qty,
//           unitPrice,
//           lineTotal: unitPrice * qty,
//           isCustomized: item.isCustomized,
//         };
//       });

//       setEnrichedCart(enriched);
//       setLoading(false);
//     };

//     enrichCart();
//   }, [cart]);

//   const subtotal = enrichedCart.reduce(
//     (sum, item) => sum + (Number.isFinite(item.lineTotal) ? item.lineTotal : 0),
//     0
//   );

//   const shipping = 9.9;
//   const total = subtotal + shipping;

//   if (loading) return <p className="text-center mt-20">Loading cart...</p>;

//   if (!cart.length) {
//     return (
//       <div className="text-center mt-20">
//         <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
//         <Link to="/" className="text-[#9c7635] underline">
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 relative pb-32">
//       <Navbar />
//       <div className="max-w-6xl mx-auto py-8 px-4">
//         <div className="flex justify-between mb-8">
//           <h1 className="text-3xl font-bold">Cart</h1>
//           <Link to="/" className="text-[#9c7635] hover:underline">
//             ← Continue Shopping
//           </Link>
//         </div>

//         <div className="space-y-6">
//           {enrichedCart.map((item) => (
//             <div
//               key={item.cartId}
//               className="bg-white rounded-xl p-6 shadow grid grid-cols-12 gap-4 items-center"
//             >
//               <div className="col-span-6 flex gap-4">
//                 <img
//                   src={item.product.image}
//                   alt={item.product.name}
//                   className="w-24 h-24 rounded object-cover"
//                 />
//                 <div>
//                   <h3 className="font-bold text-lg">{item.product.name}</h3>
//                   <p className="text-sm text-gray-500">
//                     {item.product.category}
//                   </p>

//                   {item.isCustomized && (
//                     <div className="text-sm mt-2 text-gray-600">
//                       {item.bean && <p>Bean: {item.bean.name}</p>}
//                       {item.milk && <p>Milk: {item.milk.name}</p>}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="col-span-2 text-center font-semibold">
//                 ${item.unitPrice.toFixed(2)}
//               </div>

//               <div className="col-span-2 flex justify-center gap-3">
//                 <button
//                   onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
//                   disabled={item.quantity <= 1}
//                   className="border rounded-full w-8 h-8"
//                 >
//                   −
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
//                   className="border rounded-full w-8 h-8"
//                 >
//                   +
//                 </button>
//               </div>

//               <div className="col-span-1 font-bold text-right">
//                 ${item.lineTotal.toFixed(2)}
//               </div>

//               <div className="col-span-1 text-right">
//                 <button
//                   onClick={() => removeFromCart(item.cartId)}
//                   className="text-red-500 text-xl"
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Sticky Checkout Button - Shows SUBTOTAL only */}
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
//           <div className="max-w-6xl mx-auto flex items-center justify-between">
//             <div className="text-xl font-bold text-[#9c7635]">
//               Total: ${subtotal.toFixed(2)}
//             </div>
//             <Link to="/delivery-details">
//               <button className="bg-[#9c7635] hover:bg-[#7a5c2a] text-white px-10 py-4 rounded-2xl font-bold text-xl">
//                 Proceed to Checkout – ${subtotal.toFixed(2)}
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;




import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";

const API_BEANS = "http://localhost:3000/beanTypes";
const API_MILKS = "http://localhost:3000/milkOptions";

/* ── Icons ── */
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const BagIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Skeleton ── */
const SkeletonRow = () => (
  <div className="bg-[#110d07] border border-[#c9a96e]/10 p-6 flex gap-5 animate-pulse">
    <div className="w-24 h-24 bg-[#1a1510] flex-shrink-0" />
    <div className="flex-1 space-y-3 py-1">
      <div className="h-3 w-1/3 bg-[#1e1810] rounded" />
      <div className="h-5 w-1/2 bg-[#1e1810] rounded" />
      <div className="h-3 w-1/4 bg-[#1e1810] rounded" />
    </div>
    <div className="w-28 space-y-3 py-1">
      <div className="h-3 w-full bg-[#1e1810] rounded" />
      <div className="h-8 w-full bg-[#1e1810] rounded" />
    </div>
  </div>
);

/* ── Main Component ── */
const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [enrichedCart, setEnrichedCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const enrichCart = async () => {
      if (!cart.length) {
        setEnrichedCart([]);
        setLoading(false);
        return;
      }
      const [beans, milks] = await Promise.all([
        fetch(API_BEANS).then((r) => r.json()),
        fetch(API_MILKS).then((r) => r.json()),
      ]);
      const beanMap = Object.fromEntries(beans.map((b) => [b.id, b]));
      const milkMap = Object.fromEntries(milks.map((m) => [m.id, m]));

      const enriched = cart.map((item) => {
        const product = item.product || {};
        const basePrice = Number(product.basePrice ?? product.price ?? 0);
        const bean = item.beanId ? beanMap[item.beanId] : null;
        const milk = item.milkId ? milkMap[item.milkId] : null;
        const unitPrice = basePrice + Number(bean?.priceAdd ?? 0) + Number(milk?.priceAdd ?? 0);
        const qty = Number(item.quantity ?? 1);
        return {
          cartId: item.id,
          product: {
            name: product.name || "Unknown Item",
            image: product.image || "/placeholder.jpg",
            description: product.description || "",
            category: product.category || "",
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

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 350);
  };

  const subtotal = enrichedCart.reduce((s, i) => s + (Number.isFinite(i.lineTotal) ? i.lineTotal : 0), 0);
  const shipping = 49;
  const total = subtotal + shipping;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          to { opacity: 0; transform: translateX(16px); }
        }
        .cart-row-enter { animation: fadeSlideIn 0.4s ease forwards; }
        .cart-row-exit  { animation: fadeOut 0.35s ease forwards; }

        .qty-btn:hover { background: #c9a96e; color: #0d0a05; }

        /* thin gold scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0a05; }
        ::-webkit-scrollbar-thumb { background: #c9a96e33; border-radius: 2px; }
      `}</style>

      <div
        className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif]"
        style={{ paddingBottom: "140px" }}
      >
        <Navbar />

        {/* ── Page Header ── */}
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 pt-14 pb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.5em] uppercase mb-3">
                YOUR SELECTION
              </p>
              <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2.4rem,5vw,3.5rem)] font-light leading-none tracking-wide text-[#f5f0e8]">
                Your <span className="italic text-[#c9a96e]">Cart</span>
              </h1>
            </div>

            <Link
              to="/menu"
              className="text-[#c9a96e]/70 hover:text-[#c9a96e] text-xs tracking-[0.3em] uppercase flex items-center gap-3 transition-all group self-end md:self-auto"
            >
              CONTINUE SHOPPING
              <span className="group-hover:w-11 transition-all w-7 h-px bg-current inline-block" />
            </Link>
          </div>

          {/* thin gold rule */}
          <div className="mt-8 h-px bg-gradient-to-r from-[#c9a96e]/40 via-[#c9a96e]/10 to-transparent" />
        </div>

        {/* ── Content ── */}
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">

          {/* Empty State */}
          {!loading && !cart.length && (
            <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
              <div className="text-[#c9a96e]/25 flex items-center justify-center w-24 h-24 border border-[#c9a96e]/10 rounded-full mx-auto">
                <BagIcon />
              </div>
              <p className="font-['Cormorant_Garamond',serif] text-3xl font-light text-[#f5f0e8]/40 italic">
                Your cart is empty
              </p>
              <Link
                to="/menu"
                className="mt-2 text-[#c9a96e]/70 hover:text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase flex items-center gap-3 transition-all group"
              >
                EXPLORE MENU
                <span className="group-hover:w-10 transition-all w-6 h-px bg-current inline-block" />
              </Link>
            </div>
          )}

          {/* Cart Layout */}
          {(loading || cart.length > 0) && (
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-px bg-[#c9a96e]/10">

              {/* ── Left: Items ── */}
              <div className="bg-[#0d0a05]">
                {/* Column Headers */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#c9a96e]/10 bg-[#110d07]">
                  <p className="col-span-5 text-[10px] text-[#c9a96e]/50 tracking-[0.35em] uppercase">Item</p>
                  <p className="col-span-2 text-[10px] text-[#c9a96e]/50 tracking-[0.35em] uppercase text-center">Price</p>
                  <p className="col-span-3 text-[10px] text-[#c9a96e]/50 tracking-[0.35em] uppercase text-center">Qty</p>
                  <p className="col-span-1 text-[10px] text-[#c9a96e]/50 tracking-[0.35em] uppercase text-right">Total</p>
                  <p className="col-span-1" />
                </div>

                {/* Rows */}
                <div className="divide-y divide-[#c9a96e]/10">
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
                    : enrichedCart.map((item, idx) => (
                        <div
                          key={item.cartId}
                          className={`
                            group bg-[#0d0a05] hover:bg-[#110d07]
                            transition-all duration-500
                            ${removingId === item.cartId ? "cart-row-exit" : "cart-row-enter"}
                          `}
                          style={{ animationDelay: `${idx * 60}ms` }}
                        >
                          {/* Mobile layout */}
                          <div className="md:hidden flex gap-4 p-5">
                            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-[#1a1510]">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                              />
                              <div className="absolute inset-0 border border-[#c9a96e]/10" />
                            </div>
                            <div className="flex-1 min-w-0">
                              {item.product.category && (
                                <p className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase mb-1 opacity-70">
                                  {item.product.category}
                                </p>
                              )}
                              <h3 className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8] leading-tight mb-1">
                                {item.product.name}
                              </h3>
                              {item.isCustomized && (
                                <div className="text-[11px] text-[#f5f0e8]/40 mt-1 space-y-0.5">
                                  {item.bean && <p>Bean: {item.bean.name}</p>}
                                  {item.milk && <p>Milk: {item.milk.name}</p>}
                                </div>
                              )}
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2 border border-[#c9a96e]/20">
                                  <button
                                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="qty-btn w-7 h-7 text-[#c9a96e] transition-all disabled:opacity-30 text-lg leading-none"
                                  >
                                    −
                                  </button>
                                  <span className="text-[#f5f0e8] text-sm w-4 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                    className="qty-btn w-7 h-7 text-[#c9a96e] transition-all text-lg leading-none"
                                  >
                                    +
                                  </button>
                                </div>
                                <span className="font-['Cormorant_Garamond',serif] text-[1.2rem] text-[#c9a96e]">
                                  ₹{item.lineTotal.toFixed(0)}
                                </span>
                                <button
                                  onClick={() => handleRemove(item.cartId)}
                                  className="text-[#f5f0e8]/25 hover:text-[#e07070] transition-colors p-1"
                                  aria-label="Remove"
                                >
                                  <TrashIcon />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Desktop layout */}
                          <div className="hidden md:grid grid-cols-12 gap-4 items-center px-6 py-4">
                            {/* Product — col-span-5: image + name side by side */}
                            <div className="col-span-5 flex gap-5 items-center">
                              <div className="relative w-[88px] h-[72px] flex-shrink-0 overflow-hidden bg-[#1a1510]">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 border border-[#c9a96e]/10" />
                              </div>
                              <div className="min-w-0">
                                {item.product.category && (
                                  <p className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase mb-1 opacity-70">
                                    {item.product.category}
                                  </p>
                                )}
                                <h3 className="font-['Cormorant_Garamond',serif] text-[1.15rem] font-light text-[#f5f0e8] leading-tight group-hover:text-[#c9a96e] transition-colors truncate">
                                  {item.product.name}
                                </h3>
                                {item.isCustomized && (
                                  <div className="text-[11px] text-[#f5f0e8]/35 mt-1.5 space-y-0.5">
                                    {item.bean && <p>Bean: {item.bean.name}</p>}
                                    {item.milk && <p>Milk: {item.milk.name}</p>}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Unit Price — col-span-2 centered */}
                            <div className="col-span-2 text-center">
                              <span className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8]/60">
                                ₹{item.unitPrice.toFixed(0)}
                              </span>
                            </div>

                            {/* Qty — col-span-3 centered */}
                            <div className="col-span-3 flex justify-center">
                              <div className="flex items-center border border-[#c9a96e]/20 hover:border-[#c9a96e]/40 transition-colors">
                                <button
                                  onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="qty-btn w-9 h-9 text-[#c9a96e] transition-all disabled:opacity-25 text-lg leading-none flex items-center justify-center"
                                >
                                  −
                                </button>
                                <span className="text-[#f5f0e8] text-sm w-7 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                  className="qty-btn w-9 h-9 text-[#c9a96e] transition-all text-lg leading-none flex items-center justify-center"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Line Total */}
                            <div className="col-span-1 text-right">
                              <span className="font-['Cormorant_Garamond',serif] text-[1.25rem] text-[#c9a96e]">
                                ₹{item.lineTotal.toFixed(0)}
                              </span>
                            </div>

                            {/* Remove */}
                            <div className="col-span-1 flex justify-end">
                              <button
                                onClick={() => handleRemove(item.cartId)}
                                className="text-[#f5f0e8]/20 hover:text-[#e07070] transition-colors p-2 group/del"
                                aria-label="Remove item"
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              {/* ── Right: Order Summary ── */}
              <div className="bg-[#110d07] border-l border-[#c9a96e]/10">
                <div className="sticky top-6 p-8">
                  <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.5em] uppercase mb-2">
                    OVERVIEW
                  </p>
                  <h2 className="font-['Cormorant_Garamond',serif] text-[1.8rem] font-light text-[#f5f0e8] mb-8">
                    Order <span className="italic text-[#c9a96e]">Summary</span>
                  </h2>

                  {/* Lines */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-[#f5f0e8]/50 text-xs tracking-[0.2em] uppercase">
                        Subtotal
                      </span>
                      <span className="font-['Cormorant_Garamond',serif] text-lg text-[#f5f0e8]">
                        ₹{subtotal.toFixed(0)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#f5f0e8]/50 text-xs tracking-[0.2em] uppercase">
                        Delivery
                      </span>
                      <span className="font-['Cormorant_Garamond',serif] text-lg text-[#f5f0e8]">
                        ₹{shipping}
                      </span>
                    </div>

                    <div className="h-px bg-gradient-to-r from-[#c9a96e]/30 to-transparent" />

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[#f5f0e8]/80 text-xs tracking-[0.2em] uppercase font-light">
                        Total
                      </span>
                      <span className="font-['Cormorant_Garamond',serif] text-2xl text-[#c9a96e]">
                        ₹{total.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Promo */}
                  {/* <div className="flex gap-0 mb-8">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 bg-[#0d0a05] border border-[#c9a96e]/20 px-4 py-3 text-[#f5f0e8] text-xs tracking-widest placeholder:text-[#f5f0e8]/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                    />
                    <button className="px-5 bg-[#c9a96e]/10 border border-[#c9a96e]/20 hover:bg-[#c9a96e]/20 text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-all">
                      Apply
                    </button>
                  </div> */}

                  {/* Checkout CTA */}
                  <Link to="/delivery-details" className="block">
                    <button className="
                      w-full flex items-center justify-between
                      px-7 py-4
                      bg-[#c9a96e] hover:bg-[#d4b87a] active:bg-[#c9a96e]
                      text-[#0d0a05] text-[0.65rem] tracking-[0.35em] uppercase
                      transition-all duration-300
                      group/cta
                    ">
                      <span>Proceed to Checkout</span>
                      <span className="group-hover/cta:translate-x-1 transition-transform duration-200">
                        <ArrowRight />
                      </span>
                    </button>
                  </Link>

                  {/* Continue shopping */}
                  {/* <Link
                    to="/menu"
                    className="mt-5 flex justify-center text-[#c9a96e]/40 hover:text-[#c9a96e]/70 text-[10px] tracking-[0.3em] uppercase transition-colors"
                  >
                    ← Continue Shopping
                  </Link> */}

                  {/* Divider + trust badges */}
                  <div className="mt-8 pt-6 border-t border-[#c9a96e]/10">
                    <p className="text-[#f5f0e8]/20 text-[9px] tracking-[0.35em] uppercase text-center mb-4">
                      Secure Checkout
                    </p>
                    <div className="flex justify-center gap-3">
                      {["SSL Secured", "Easy Returns", "Fast Dispatch"].map((label) => (
                        <span
                          key={label}
                          className="text-[#c9a96e]/30 text-[9px] tracking-widest uppercase border border-[#c9a96e]/10 px-2 py-1"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;