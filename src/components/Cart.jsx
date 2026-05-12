// // import { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { useCart } from "../context/CartContext";
// // import Navbar from "./Navbar";

// // /* ── Icons ── */
// // const TrashIcon = () => (
// //   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //     <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
// //     <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
// //   </svg>
// // );
// // const BagIcon = () => (
// //   <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
// //     <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
// //     <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
// //   </svg>
// // );
// // const ArrowRight = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //     <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
// //   </svg>
// // );
// // const BeanIcon = () => (
// //   <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <ellipse cx="12" cy="12" rx="9" ry="6" />
// //     <path d="M12 6 Q8 12 12 18" /><path d="M12 6 Q16 12 12 18" />
// //   </svg>
// // );
// // const MilkIcon = () => (
// //   <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //     <path d="M8 2h8l2 4v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" /><path d="M6 6h12" />
// //   </svg>
// // );

// // const CartPage = () => {
// //   const { cart, updateQuantity, removeFromCart } = useCart();
// //   const [removingId, setRemovingId] = useState(null);

// //   const handleRemove = (id) => {
// //     setRemovingId(id);
// //     setTimeout(() => { removeFromCart(id); setRemovingId(null); }, 350);
// //   };

// //   // ── Compute totals directly from normalized cart items ──
// //   // CartContext now guarantees: item.product.basePrice, item.bean, item.milk
// //   const enriched = cart.map((item) => {
// //     const basePrice = Number(item.product?.basePrice ?? 0);
// //     const beanAdd   = Number(item.bean?.priceAdd   ?? 0);
// //     const milkAdd   = Number(item.milk?.priceAdd   ?? 0);
// //     const unitPrice = basePrice + beanAdd + milkAdd;
// //     const qty       = Number(item.quantity ?? 1);
// //     return { ...item, unitPrice, lineTotal: unitPrice * qty };
// //   });

// //   const subtotal = enriched.reduce((s, i) => s + i.lineTotal, 0);
// //   const shipping = 49;
// //   const total    = subtotal + shipping;

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

// //         @keyframes fadeSlideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
// //         @keyframes fadeOut      { to   { opacity:0; transform:translateX(16px); } }
// //         .row-enter { animation: fadeSlideIn 0.4s ease forwards; }
// //         .row-exit  { animation: fadeOut     0.35s ease forwards; }
// //         .qty-btn:hover { background:#c9a96e; color:#0d0a05; }

// //         .custom-pill {
// //           display: inline-flex; align-items: center; gap: 5px;
// //           padding: 2px 8px;
// //           border: 1px solid rgba(201,169,110,0.20);
// //           font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
// //           color: rgba(201,169,110,0.70); font-family:'Jost',sans-serif; font-weight:300;
// //           white-space: nowrap;
// //         }
// //         .custom-pill-add {
// //           color: rgba(201,169,110,0.38); font-size:8px; margin-left:1px;
// //         }
// //         ::-webkit-scrollbar { width:4px; }
// //         ::-webkit-scrollbar-track { background:#0d0a05; }
// //         ::-webkit-scrollbar-thumb { background:#c9a96e33; border-radius:2px; }
// //       `}</style>

// //       <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif]" style={{ paddingBottom: "140px" }}>
// //         <Navbar />

// //         {/* ── Header ── */}
// //         <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 pt-14 pb-10">
// //           <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
// //             <div>
// //               <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.5em] uppercase mb-3">YOUR SELECTION</p>
// //               <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2.4rem,5vw,3.5rem)] font-light leading-none tracking-wide text-[#f5f0e8]">
// //                 Your <span className="italic text-[#c9a96e]">Cart</span>
// //               </h1>
// //             </div>
// //             <Link to="/menu" className="text-[#c9a96e]/70 hover:text-[#c9a96e] text-xs tracking-[0.3em] uppercase flex items-center gap-3 transition-all group self-end md:self-auto">
// //               CONTINUE SHOPPING
// //               <span className="group-hover:w-11 transition-all w-7 h-px bg-current inline-block" />
// //             </Link>
// //           </div>
// //           <div className="mt-8 h-px bg-gradient-to-r from-[#c9a96e]/40 via-[#c9a96e]/10 to-transparent" />
// //         </div>

// //         <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">

// //           {/* ── Empty ── */}
// //           {!cart.length && (
// //             <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
// //               <div className="text-[#c9a96e]/25 flex items-center justify-center w-24 h-24 border border-[#c9a96e]/10 rounded-full mx-auto">
// //                 <BagIcon />
// //               </div>
// //               <p className="font-['Cormorant_Garamond',serif] text-3xl font-light text-[#f5f0e8]/40 italic">Your cart is empty</p>
// //               <Link to="/menu" className="mt-2 text-[#c9a96e]/70 hover:text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase flex items-center gap-3 transition-all group">
// //                 EXPLORE MENU <span className="group-hover:w-10 transition-all w-6 h-px bg-current inline-block" />
// //               </Link>
// //             </div>
// //           )}

// //           {/* ── Cart Grid ── */}
// //           {cart.length > 0 && (
// //             <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-px bg-[#c9a96e]/10">

// //               {/* LEFT — Items */}
// //               <div className="bg-[#0d0a05]">
// //                 {/* Headers */}
// //                 <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#c9a96e]/10 bg-[#110d07]">
// //                   {["Item", "Price", "Qty", "Total", ""].map((h, i) => (
// //                     <p key={i} className={`text-[10px] text-[#c9a96e]/50 tracking-[0.35em] uppercase
// //                       ${i === 0 ? "col-span-5" : i === 1 ? "col-span-2 text-center" : i === 2 ? "col-span-3 text-center" : i === 3 ? "col-span-1 text-right" : "col-span-1"}`}>
// //                       {h}
// //                     </p>
// //                   ))}
// //                 </div>

// //                 {/* Rows */}
// //                 <div className="divide-y divide-[#c9a96e]/10">
// //                   {enriched.map((item, idx) => (
// //                     <div
// //                       key={item.id}
// //                       className={`group bg-[#0d0a05] hover:bg-[#110d07] transition-all duration-500
// //                         ${removingId === item.id ? "row-exit" : "row-enter"}`}
// //                       style={{ animationDelay: `${idx * 60}ms` }}
// //                     >
// //                       {/* ── Mobile ── */}
// //                       <div className="md:hidden flex gap-4 p-5">
// //                         <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-[#1a1510]">
// //                           <img src={item.product?.image} alt={item.product?.name}
// //                             className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
// //                           <div className="absolute inset-0 border border-[#c9a96e]/10" />
// //                         </div>
// //                         <div className="flex-1 min-w-0">
// //                           {item.product?.category && (
// //                             <p className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase mb-1 opacity-70">{item.product.category}</p>
// //                           )}
// //                           <h3 className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8] leading-tight">
// //                             {item.product?.name}
// //                           </h3>
// //                           {item.isCustomized && (item.bean || item.milk) && (
// //                             <div className="flex flex-wrap gap-1.5 mt-1.5">
// //                               {item.bean && <span className="custom-pill"><BeanIcon />{item.bean.name}{item.bean.priceAdd > 0 && <span className="custom-pill-add">+₹{item.bean.priceAdd}</span>}</span>}
// //                               {item.milk && <span className="custom-pill"><MilkIcon />{item.milk.name}{item.milk.priceAdd > 0 && <span className="custom-pill-add">+₹{item.milk.priceAdd}</span>}</span>}
// //                             </div>
// //                           )}
// //                           <div className="flex items-center justify-between mt-3">
// //                             <div className="flex items-center gap-2 border border-[#c9a96e]/20">
// //                               <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}
// //                                 className="qty-btn w-7 h-7 text-[#c9a96e] transition-all disabled:opacity-30 text-lg leading-none">−</button>
// //                               <span className="text-[#f5f0e8] text-sm w-4 text-center">{item.quantity}</span>
// //                               <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
// //                                 className="qty-btn w-7 h-7 text-[#c9a96e] transition-all text-lg leading-none">+</button>
// //                             </div>
// //                             <span className="font-['Cormorant_Garamond',serif] text-[1.2rem] text-[#c9a96e]">₹{item.lineTotal.toFixed(0)}</span>
// //                             <button onClick={() => handleRemove(item.id)} className="text-[#f5f0e8]/25 hover:text-[#e07070] transition-colors p-1"><TrashIcon /></button>
// //                           </div>
// //                         </div>
// //                       </div>

// //                       {/* ── Desktop ── */}
// //                       <div className="hidden md:grid grid-cols-12 gap-4 items-center px-6 py-5">
// //                         {/* Product — col 5 */}
// //                         <div className="col-span-5 flex gap-5 items-start">
// //                           <div className="relative w-[88px] h-[72px] flex-shrink-0 overflow-hidden bg-[#1a1510]">
// //                             <img src={item.product?.image} alt={item.product?.name}
// //                               className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
// //                             <div className="absolute inset-0 border border-[#c9a96e]/10" />
// //                           </div>
// //                           <div className="min-w-0 flex flex-col gap-1 pt-0.5">
// //                             {item.product?.category && (
// //                               <p className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase opacity-70">{item.product.category}</p>
// //                             )}
// //                             <h3 className="font-['Cormorant_Garamond',serif] text-[1.15rem] font-light text-[#f5f0e8] leading-tight group-hover:text-[#c9a96e] transition-colors">
// //                               {item.product?.name}
// //                             </h3>
// //                             {/* ── Bean & Milk pills ── */}
// //                             {item.isCustomized && (item.bean || item.milk) && (
// //                               <div className="flex flex-wrap gap-1.5 mt-1">
// //                                 {item.bean && (
// //                                   <span className="custom-pill">
// //                                     <BeanIcon />
// //                                     {item.bean.name}
// //                                     {item.bean.priceAdd > 0 && <span className="custom-pill-add">+₹{item.bean.priceAdd}</span>}
// //                                   </span>
// //                                 )}
// //                                 {item.milk && (
// //                                   <span className="custom-pill">
// //                                     <MilkIcon />
// //                                     {item.milk.name}
// //                                     {item.milk.priceAdd > 0 && <span className="custom-pill-add">+₹{item.milk.priceAdd}</span>}
// //                                   </span>
// //                                 )}
// //                               </div>
// //                             )}
// //                           </div>
// //                         </div>

// //                         {/* Unit Price — col 2 */}
// //                         <div className="col-span-2 text-center">
// //                           <span className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8]/60">
// //                             ₹{item.unitPrice.toFixed(0)}
// //                           </span>
// //                         </div>

// //                         {/* Qty — col 3 */}
// //                         <div className="col-span-3 flex justify-center">
// //                           <div className="flex items-center border border-[#c9a96e]/20 hover:border-[#c9a96e]/40 transition-colors">
// //                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}
// //                               className="qty-btn w-9 h-9 text-[#c9a96e] transition-all disabled:opacity-25 text-lg flex items-center justify-center">−</button>
// //                             <span className="text-[#f5f0e8] text-sm w-7 text-center">{item.quantity}</span>
// //                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
// //                               className="qty-btn w-9 h-9 text-[#c9a96e] transition-all text-lg flex items-center justify-center">+</button>
// //                           </div>
// //                         </div>

// //                         {/* Line total — col 1 */}
// //                         <div className="col-span-1 text-right">
// //                           <span className="font-['Cormorant_Garamond',serif] text-[1.25rem] text-[#c9a96e]">
// //                             ₹{item.lineTotal.toFixed(0)}
// //                           </span>
// //                         </div>

// //                         {/* Remove — col 1 */}
// //                         <div className="col-span-1 flex justify-end">
// //                           <button onClick={() => handleRemove(item.id)}
// //                             className="text-[#f5f0e8]/20 hover:text-[#e07070] transition-colors p-2"><TrashIcon /></button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* RIGHT — Summary */}
// //               <div className="bg-[#110d07] border-l border-[#c9a96e]/10">
// //                 <div className="sticky top-6 p-8">
// //                   <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.5em] uppercase mb-2">OVERVIEW</p>
// //                   <h2 className="font-['Cormorant_Garamond',serif] text-[1.8rem] font-light text-[#f5f0e8] mb-8">
// //                     Order <span className="italic text-[#c9a96e]">Summary</span>
// //                   </h2>

// //                   <div className="space-y-4 mb-8">
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-[#f5f0e8]/50 text-xs tracking-[0.2em] uppercase">Subtotal</span>
// //                       <span className="font-['Cormorant_Garamond',serif] text-lg text-[#f5f0e8]">₹{subtotal.toFixed(0)}</span>
// //                     </div>
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-[#f5f0e8]/50 text-xs tracking-[0.2em] uppercase">Delivery</span>
// //                       <span className="font-['Cormorant_Garamond',serif] text-lg text-[#f5f0e8]">₹{shipping}</span>
// //                     </div>
// //                     <div className="h-px bg-gradient-to-r from-[#c9a96e]/30 to-transparent" />
// //                     <div className="flex justify-between items-center pt-1">
// //                       <span className="text-[#f5f0e8]/80 text-xs tracking-[0.2em] uppercase font-light">Total</span>
// //                       <span className="font-['Cormorant_Garamond',serif] text-2xl text-[#c9a96e]">₹{total.toFixed(0)}</span>
// //                     </div>
// //                   </div>

// //                   <Link to="/delivery-details" className="block">
// //                     <button className="w-full flex items-center justify-between px-7 py-4 bg-[#c9a96e] hover:bg-[#d4b87a] text-[#0d0a05] text-[0.65rem] tracking-[0.35em] uppercase transition-all duration-300 group/cta">
// //                       <span>Proceed to Checkout</span>
// //                       <span className="group-hover/cta:translate-x-1 transition-transform duration-200"><ArrowRight /></span>
// //                     </button>
// //                   </Link>

// //                   <div className="mt-8 pt-6 border-t border-[#c9a96e]/10">
// //                     <p className="text-[#f5f0e8]/20 text-[9px] tracking-[0.35em] uppercase text-center mb-4">Secure Checkout</p>
// //                     <div className="flex justify-center gap-3">
// //                       {["SSL Secured", "Easy Returns", "Fast Dispatch"].map((label) => (
// //                         <span key={label} className="text-[#c9a96e]/30 text-[9px] tracking-widest uppercase border border-[#c9a96e]/10 px-2 py-1">{label}</span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default CartPage;




// //===================================================================================


import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";

/* ── Icons ── */
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);
const BagIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const BeanIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="9" ry="6" />
    <path d="M12 6 Q8 12 12 18" /><path d="M12 6 Q16 12 12 18" />
  </svg>
);
const MilkIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 2h8l2 4v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" /><path d="M6 6h12" />
  </svg>
);
const FlameIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0-4 4-4 9a4 4 0 008 0c0-5-4-9-4-9z" />
    <path d="M12 12c0 0-2 2-2 4a2 2 0 004 0c0-2-2-4-2-4z" />
  </svg>
);
const SnowflakeIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);
const SugarIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12h8M12 8v8" />
  </svg>
);

/* ── Helpers ── */
const SWEETNESS_LABELS = ["None", "Hint", "Light", "Medium", "Sweet", "Very Sweet"];
const TEMP_LABELS = { iced: "Iced", warm: "Warm", hot: "Hot" };

const StrengthDots = ({ value = 3 }) => (
  <span style={{ letterSpacing: 1 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} style={{ opacity: i <= value ? 1 : 0.25 }}>●</span>
    ))}
  </span>
);

const CustomizationPills = ({ item }) => {
  if (!item.isCustomized) return null;
  const hasAny = item.bean || item.milk || item.strength || item.temp || item.sweetness != null;
  if (!hasAny) return null;
  const extraSweet = (item.sweetness ?? 0) > 3 ? 10 : 0;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 6 }}>
      {item.bean && (
        <span className="custom-pill">
          <BeanIcon /> {item.bean.name}
          {item.bean.priceAdd > 0 && <span className="custom-pill-add">+₹{item.bean.priceAdd}</span>}
        </span>
      )}
      {item.milk && (
        <span className="custom-pill">
          <MilkIcon /> {item.milk.name}
          {item.milk.priceAdd > 0 && <span className="custom-pill-add">+₹{item.milk.priceAdd}</span>}
        </span>
      )}
      {item.temp && (
        <span className="custom-pill">
          {item.temp === "iced" ? <SnowflakeIcon /> : <FlameIcon />}
          {TEMP_LABELS[item.temp] ?? item.temp}
        </span>
      )}
      {item.strength != null && (
        <span className="custom-pill" style={{ gap: 6 }}>
          <FlameIcon /> Strength&nbsp;<StrengthDots value={item.strength} />
        </span>
      )}
      {item.sweetness != null && (
        <span className="custom-pill">
          <SugarIcon /> {SWEETNESS_LABELS[item.sweetness] ?? `Level ${item.sweetness}`}
          {extraSweet > 0 && <span className="custom-pill-add">+₹{extraSweet}</span>}
        </span>
      )}
    </div>
  );
};

/* ── Main ── */
const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => { removeFromCart(id); setRemovingId(null); }, 350);
  };

  // Resolve image/name/category from nested product shape or flat shape
  const resolveItem = (item) => {
    const product = item.product ?? item;
    return {
      ...item,
      image:    item.image    ?? product.image    ?? "",
      name:     item.name     ?? product.name     ?? "",
      category: item.category ?? product.category ?? "",
    };
  };

  const enriched = cart.map((raw) => {
    const item      = resolveItem(raw);
    const basePrice = Number(item.unitPrice ?? item.product?.basePrice ?? item.product?.price ?? 0);
    const beanAdd   = Number(item.bean?.priceAdd   ?? 0);
    const milkAdd   = Number(item.milk?.priceAdd   ?? 0);
    const sweetExtra = (item.sweetness ?? 0) > 3 ? 10 : 0;
    const unitPrice  = basePrice + beanAdd + milkAdd + sweetExtra;
    const qty        = Number(item.quantity ?? 1);
    return { ...item, unitPrice, lineTotal: unitPrice * qty };
  });

  const subtotal = enriched.reduce((s, i) => s + i.lineTotal, 0);
  const shipping  = 49;
  const total     = subtotal + shipping;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          to { opacity: 0; transform: translateX(16px); }
        }

        .row-enter { animation: fadeSlideIn 0.4s ease forwards; }
        .row-exit  { animation: fadeOut 0.35s ease forwards; }

        .qty-btn { transition: background 0.18s ease, color 0.18s ease; }
        .qty-btn:hover:not(:disabled) { background: #c9a96e; color: #0d0a05; }
        .qty-btn:disabled { opacity: 0.25; cursor: not-allowed; }

        .custom-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 2px 8px;
          border: 1px solid rgba(201,169,110,0.20);
          font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(201,169,110,0.70); font-family: 'Jost', sans-serif; font-weight: 300;
          white-space: nowrap;
        }
        .custom-pill-add {
          color: rgba(201,169,110,0.38); font-size: 8px; margin-left: 1px;
        }

        .checkout-btn { transition: background 0.22s ease, transform 0.15s ease; }
        .checkout-btn:hover { background: #d4b87a; }
        .checkout-btn:active { transform: scale(0.98); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0a05; }
        ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); border-radius: 2px; }
      `}</style>

      <div
        className="min-h-screen bg-[#0d0a05]"
        style={{ fontFamily: "'Jost', sans-serif", paddingBottom: "120px" }}
      >
        <Navbar />

        {/* ── Page Header ── */}
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 pt-14 pb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.5em] uppercase mb-3 opacity-70">
                YOUR SELECTION
              </p>
              <h1
                className="text-[#f5f0e8] font-light leading-none tracking-wide"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem,5vw,3.5rem)" }}
              >
                Your <span className="italic text-[#c9a96e]">Cart</span>
              </h1>
            </div>
            <Link
              to="/menu"
              className="group flex items-center gap-3 text-[#c9a96e]/70 hover:text-[#c9a96e] text-xs tracking-[0.3em] uppercase transition-colors self-end md:self-auto"
            >
              CONTINUE SHOPPING
              <span className="h-px bg-current inline-block w-7 group-hover:w-11 transition-all duration-300" />
            </Link>
          </div>
          <div className="mt-8 h-px bg-gradient-to-r from-[#c9a96e]/40 via-[#c9a96e]/10 to-transparent" />
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">

          {/* ── Empty State ── */}
          {!cart.length && (
            <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
              <div className="text-[#c9a96e]/25 flex items-center justify-center w-24 h-24 border border-[#c9a96e]/10 rounded-full">
                <BagIcon />
              </div>
              <p
                className="text-[#f5f0e8]/40 italic"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 300 }}
              >
                Your cart is empty
              </p>
              <Link
                to="/menu"
                className="group flex items-center gap-3 text-[#c9a96e]/70 hover:text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase transition-colors mt-2"
              >
                EXPLORE MENU
                <span className="h-px bg-current inline-block w-6 group-hover:w-10 transition-all duration-300" />
              </Link>
            </div>
          )}

          {/* ── Cart Grid ── */}
          {cart.length > 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-px bg-[#c9a96e]/10">

              {/* ── LEFT: Items ── */}
              <div className="bg-[#0d0a05]">

                {/* Column headers — desktop only */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#c9a96e]/10 bg-[#110d07]">
                  {[
                    { label: "Item",  cls: "col-span-5" },
                    { label: "Price", cls: "col-span-2 text-center" },
                    { label: "Qty",   cls: "col-span-3 text-center" },
                    { label: "Total", cls: "col-span-1 text-right" },
                    { label: "",      cls: "col-span-1" },
                  ].map(({ label, cls }) => (
                    <p key={label} className={`text-[10px] text-[#c9a96e]/50 tracking-[0.35em] uppercase ${cls}`}>
                      {label}
                    </p>
                  ))}
                </div>

                {/* Rows */}
                <div className="divide-y divide-[#c9a96e]/10">
                  {enriched.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`group bg-[#0d0a05] hover:bg-[#110d07] transition-all duration-500
                        ${removingId === item.id ? "row-exit" : "row-enter"}`}
                      style={{ animationDelay: `${idx * 60}ms` }}
                    >

                      {/* Mobile layout */}
                      <div className="md:hidden flex gap-4 p-5">
                        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-[#1a1510]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                          />
                          <div className="absolute inset-0 border border-[#c9a96e]/10" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {item.category && (
                            <p className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase mb-1 opacity-70">
                              {item.category}
                            </p>
                          )}
                          <h3
                            className="text-[#f5f0e8] leading-tight"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300 }}
                          >
                            {item.name}
                          </h3>
                          <CustomizationPills item={item} />
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-0 border border-[#c9a96e]/20">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="qty-btn w-7 h-7 text-[#c9a96e] text-lg leading-none"
                              >−</button>
                              <span className="text-[#f5f0e8] text-sm w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="qty-btn w-7 h-7 text-[#c9a96e] text-lg leading-none"
                              >+</button>
                            </div>
                            <span
                              className="text-[#c9a96e]"
                              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 300 }}
                            >
                              ₹{item.lineTotal.toFixed(0)}
                            </span>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="text-[#f5f0e8]/25 hover:text-[#e07070] transition-colors p-1"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop layout */}
                      <div className="hidden md:grid grid-cols-12 gap-4 items-center px-6 py-5">

                        {/* Product info */}
                        <div className="col-span-5 flex gap-5 items-start">
                          <div className="relative w-[88px] h-[72px] flex-shrink-0 overflow-hidden bg-[#1a1510]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 border border-[#c9a96e]/10" />
                          </div>
                          <div className="min-w-0 flex flex-col gap-1 pt-0.5">
                            {item.category && (
                              <p className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase opacity-70">
                                {item.category}
                              </p>
                            )}
                            <h3
                              className="text-[#f5f0e8] leading-tight group-hover:text-[#c9a96e] transition-colors"
                              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 300 }}
                            >
                              {item.name}
                            </h3>
                            <CustomizationPills item={item} />
                          </div>
                        </div>

                        {/* Unit price */}
                        <div className="col-span-2 text-center">
                          <span
                            className="text-[#f5f0e8]/60"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300 }}
                          >
                            ₹{item.unitPrice.toFixed(0)}
                          </span>
                        </div>

                        {/* Qty controls */}
                        <div className="col-span-3 flex justify-center">
                          <div className="flex items-center border border-[#c9a96e]/20 hover:border-[#c9a96e]/40 transition-colors">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="qty-btn w-9 h-9 text-[#c9a96e] text-lg flex items-center justify-center"
                            >−</button>
                            <span className="text-[#f5f0e8] text-sm w-7 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="qty-btn w-9 h-9 text-[#c9a96e] text-lg flex items-center justify-center"
                            >+</button>
                          </div>
                        </div>

                        {/* Line total */}
                        <div className="col-span-1 text-right">
                          <span
                            className="text-[#c9a96e]"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 300 }}
                          >
                            ₹{item.lineTotal.toFixed(0)}
                          </span>
                        </div>

                        {/* Remove */}
                        <div className="col-span-1 flex justify-end">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-[#f5f0e8]/20 hover:text-[#e07070] transition-colors p-2"
                          >
                            <TrashIcon />
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Summary ── */}
              <div className="bg-[#110d07] border-l border-[#c9a96e]/10">
                <div className="sticky top-6 p-8">

                  <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.5em] uppercase mb-2 opacity-70">
                    OVERVIEW
                  </p>
                  <h2
                    className="text-[#f5f0e8] font-light mb-8"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem" }}
                  >
                    Order <span className="italic text-[#c9a96e]">Summary</span>
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-[#f5f0e8]/50 text-xs tracking-[0.2em] uppercase">Subtotal</span>
                      <span
                        className="text-[#f5f0e8]"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 300 }}
                      >
                        ${subtotal.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#f5f0e8]/50 text-xs tracking-[0.2em] uppercase">Delivery</span>
                      <span
                        className="text-[#f5f0e8]"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 300 }}
                      >
                        ${shipping}
                      </span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#c9a96e]/30 to-transparent" />
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[#f5f0e8]/80 text-xs tracking-[0.2em] uppercase font-light">Total</span>
                      <span
                        className="text-[#c9a96e]"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300 }}
                      >
                        ₹{total.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <Link to="/delivery-details">
                    <button className="checkout-btn w-full flex items-center justify-between px-7 py-4 bg-[#c9a96e] text-[#0d0a05] text-[0.65rem] tracking-[0.35em] uppercase group/cta">
                      <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                        Proceed to Checkout
                      </span>
                      <span className="group-hover/cta:translate-x-1 transition-transform duration-200">
                        <ArrowRight />
                      </span>
                    </button>
                  </Link>

                  <div className="mt-8 pt-6 border-t border-[#c9a96e]/10">
                    <p className="text-[#f5f0e8]/20 text-[9px] tracking-[0.35em] uppercase text-center mb-4">
                      Secure Checkout
                    </p>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {["SSL Secured", "Easy Returns", "Fast Dispatch"].map((label) => (
                        <span
                          key={label}
                          className="text-[#c9a96e]/30 text-[9px] tracking-widest uppercase border border-[#c9a96e]/10 px-2 py-1"
                          style={{ fontFamily: "'Jost', sans-serif" }}
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