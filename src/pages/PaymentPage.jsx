// import { useState, useMemo } from "react";
// import { useNavigate, useLocation  } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import toast, { Toaster } from "react-hot-toast";
// import api from "../services/api";
// import Navbar from "../components/Navbar";

// /* ─────────── Icons ─────────── */
// const ArrowRight = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="5" y1="12" x2="19" y2="12" />
//     <polyline points="12 5 19 12 12 19" />
//   </svg>
// );

// const TruckIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="1" y="3" width="15" height="13" />
//     <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
//     <circle cx="5.5" cy="18.5" r="2.5" />
//     <circle cx="18.5" cy="18.5" r="2.5" />
//   </svg>
// );

// const LockIcon = ({ size = 12 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="3" y="11" width="18" height="11" rx="2" />
//     <path d="M7 11V7a5 5 0 0110 0v4" />
//   </svg>
// );

// const CodIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="2" y="5" width="20" height="14" rx="2" />
//     <line x1="2" y1="10" x2="22" y2="10" />
//   </svg>
// );

// const OnlineIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="10" />
//     <path d="M12 2a14.5 14.5 0 010 20M2 12h20" />
//   </svg>
// );

// const CheckIcon = () => (
//   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="20 6 9 17 4 12" />
//   </svg>
// );

// const ShieldIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//   </svg>
// );

// /* ─────────── Main ─────────── */
// const PaymentPage = () => {
//   const { cart, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [loading, setLoading] = useState(false);

//   const subtotal = useMemo(() =>
//     cart.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0),
//     [cart]
//   );

//   const shipping = 49;
//   const total = subtotal + shipping;

//   const handlePayment = async () => {
//     const user = JSON.parse(localStorage.getItem("authUser") || "null");

//     if (!user) {
//       toast.error("Please login");
//       return;
//     }

//     try {
//       setLoading(true);

//       const selectedAddressId = localStorage.getItem("selectedAddressId");

//       const orderRequest = {
//         addressId: Number(selectedAddressId),
//         paymentMethod: paymentMethod === "cod" ? "cod" : "razorpay",
//         upiId: null,
//       };

//       const orderResponse = await api.post("/Order", orderRequest);
//       const createdOrder = orderResponse.data;
//       const orderId = createdOrder.id || createdOrder.orderId || createdOrder.data?.id;

//       if (!orderId) {
//         toast.error("Order ID not found");
//         return;
//       }

//       // ── COD ──
//       if (paymentMethod === "cod") {
//         await clearCart();
//         toast.success("Order placed successfully");
//         navigate("/orders");
//         return;
//       }

//       // ── RAZORPAY ──
//       const paymentResponse = await api.post(`/payment/create/${orderId}`);
//       const paymentOrder = paymentResponse.data;
//       const razorpayOrderId =
//         paymentOrder.orderId || paymentOrder.razorpayOrderId || paymentOrder.id;

//       if (!razorpayOrderId) {
//         toast.error("Razorpay Order ID missing");
//         return;
//       }

//       if (!window.Razorpay) {
//         toast.error("Razorpay SDK failed to load");
//         return;
//       }

//       const options = {
//         key: "rzp_test_xxxxxxxxx",
//         amount: total * 100,
//         currency: "INR",
//         name: "Maison Bean",
//         description: "Coffee Order Payment",
//         order_id: razorpayOrderId,
//         handler: async function (response) {
//           try {
//             await api.post("/payment/verify", {
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//             });
//             await clearCart();
//             toast.success("Payment successful");
//             navigate("/orders");
//           } catch {
//             toast.error("Payment verification failed");
//           }
//         },
//         modal: { ondismiss: () => toast.error("Payment cancelled") },
//         prefill: { name: "Maison Bean Customer", email: user.email, contact: "9999999999" },
//         theme: { color: "#c9a96e" },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();

//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ── Empty cart ── */
//   if (cart.length === 0) return (
//     <>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');`}</style>
//       <div className="min-h-screen bg-[#0d0a05] flex flex-col items-center justify-center gap-6 font-['Jost',sans-serif]">
//         <p className="font-['Cormorant_Garamond',serif] text-[2rem] italic text-[#f5f0e8]/30">Your cart is empty</p>
//       </div>
//     </>
//   );

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@100;200;300;400;500&display=swap');

//         @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes slideIn { from{opacity:0;transform:translateY(10px) scaleY(0.95)} to{opacity:1;transform:translateY(0) scaleY(1)} }

//         .page-in  { animation: fadeUp  0.45s ease forwards; }
//         .panel-in { animation: fadeUp  0.45s ease 0.08s both; }
//         .card-in  { animation: slideIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; transform-origin: top; }

//         input[type="radio"] { display: none; }

//         .gold-btn { transition: background 0.22s ease, transform 0.15s ease; }
//         .gold-btn:hover:not(:disabled)  { background: #d4b87a; }
//         .gold-btn:active:not(:disabled) { transform: scale(0.98); }

//         .slim-scroll::-webkit-scrollbar { width: 3px; }
//         .slim-scroll::-webkit-scrollbar-track { background: transparent; }
//         .slim-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }

//         input:-webkit-autofill, input:-webkit-autofill:focus {
//           -webkit-box-shadow: 0 0 0 1000px #0d0a05 inset !important;
//           -webkit-text-fill-color: #f5f0e8 !important;
//         }
//       `}</style>

//       <Toaster
//         position="top-center"
//         toastOptions={{
//           style: {
//             background: "#110d07", color: "#f5f0e8",
//             border: "1px solid rgba(201,169,110,0.2)", borderRadius: 0,
//             fontSize: "12px", padding: "12px 18px",
//             fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em",
//           },
//           success: { iconTheme: { primary: "#c9a96e", secondary: "#0d0a05" } },
//           error:   { iconTheme: { primary: "#f87171", secondary: "#0d0a05" } },
//         }}
//       />

//       <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif]">

//         {/* Ambient glow */}
//         <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
//           <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.022] blur-[130px]" />
//           <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-[#c9a96e]/[0.015] blur-[110px]" />
//         </div>

//         <div className="relative z-10">
//           <Navbar />

//           {/* ══ HEADER ══ */}
//           <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pt-14 pb-6 page-in">
//             <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//               <div>
//                 <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.55em] uppercase mb-3 opacity-75">
//                   STEP 2 OF 2
//                 </p>
//                 <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-none tracking-wide text-[#f5f0e8]">
//                   Payment <span className="italic text-[#c9a96e]">Details</span>
//                 </h1>
//               </div>
//               <button
//                 onClick={() => navigate("/delivery")}
//                 className="text-[#c9a96e]/60 hover:text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 transition-all group self-end md:self-auto"
//               >
//                 ← BACK TO DELIVERY
//                 <span className="group-hover:w-10 transition-all duration-300 w-0 h-px bg-current inline-block" />
//               </button>
//             </div>

//             {/* Divider */}
//             <div className="mt-8 flex items-center gap-3">
//               <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/45 via-[#c9a96e]/12 to-transparent" />
//               <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e]/35 flex-shrink-0" />
//             </div>

//             {/* Progress Steps */}
//             <div className="mt-6 flex items-center gap-0">
//               {/* Step 1 - done */}
//               <div className="flex items-center gap-2.5">
//                 <div className="w-6 h-6 border border-[#c9a96e]/40 bg-[#c9a96e]/10 flex items-center justify-center">
//                   <CheckIcon />
//                 </div>
//                 <span className="text-[#c9a96e]/40 text-[9px] tracking-[0.35em] uppercase">Delivery</span>
//               </div>
//               <div className="mx-4 h-px w-12 bg-[#c9a96e]/40" />
//               {/* Step 2 - active */}
//               <div className="flex items-center gap-2.5">
//                 <div className="w-6 h-6 border border-[#c9a96e] flex items-center justify-center">
//                   <span className="text-[#c9a96e] text-[9px] tracking-widest">02</span>
//                 </div>
//                 <span className="text-[#c9a96e] text-[9px] tracking-[0.35em] uppercase">Payment</span>
//               </div>
//             </div>
//           </div>

//           {/* ══ CONTENT ══ */}
//           <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pb-28">
//             <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-px bg-[#c9a96e]/10">

//               {/* ── LEFT: Payment Methods ── */}
//               <div className="bg-[#0d0a05] panel-in">
//                 <div className="bg-[#110d07] border border-[#c9a96e]/10 p-7">

//                   {/* Section header */}
//                   <div className="flex items-start gap-4 mb-8">
//                     <span className="text-[#c9a96e]/50 mt-0.5 flex-shrink-0"><ShieldIcon /></span>
//                     <div>
//                       <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-1 opacity-65">SELECT METHOD</p>
//                       <h2 className="font-['Cormorant_Garamond',serif] text-[1.5rem] font-light text-[#f5f0e8]">
//                         Payment <span className="italic text-[#c9a96e]">Method</span>
//                       </h2>
//                     </div>
//                   </div>

//                   <div className="space-y-3">

//                     {/* ── COD ── */}
//                     <label
//                       htmlFor="cod"
//                       className={`block cursor-pointer p-5 border transition-all duration-200
//                         ${paymentMethod === "cod"
//                           ? "border-[#c9a96e] bg-[#c9a96e]/05"
//                           : "border-[#c9a96e]/15 hover:border-[#c9a96e]/35"
//                         }`}
//                     >
//                       <input
//                         type="radio"
//                         id="cod"
//                         checked={paymentMethod === "cod"}
//                         onChange={() => setPaymentMethod("cod")}
//                       />
//                       <div className="flex items-start gap-4">
//                         {/* Custom radio */}
//                         <div className={`mt-0.5 w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all
//                           ${paymentMethod === "cod" ? "border-[#c9a96e] bg-[#c9a96e]" : "border-[#c9a96e]/30"}`}>
//                           {paymentMethod === "cod" && (
//                             <div className="w-1.5 h-1.5 bg-[#0d0a05]" />
//                           )}
//                         </div>

//                         <span className={`flex-shrink-0 transition-colors ${paymentMethod === "cod" ? "text-[#c9a96e]" : "text-[#c9a96e]/40"}`}>
//                           <CodIcon />
//                         </span>

//                         <div className="flex-1">
//                           <p className={`text-[13px] tracking-[0.08em] mb-1 transition-colors ${paymentMethod === "cod" ? "text-[#f5f0e8]" : "text-[#f5f0e8]/55"}`}>
//                             Cash on Delivery
//                           </p>
//                           <p className="text-[#f5f0e8]/30 text-[10px] tracking-wide leading-relaxed">
//                             Pay in cash when your order arrives at your doorstep. No advance required.
//                           </p>
//                         </div>

//                         {paymentMethod === "cod" && (
//                           <span className="flex-shrink-0 text-[#c9a96e] text-[8px] tracking-[0.3em] uppercase border border-[#c9a96e]/30 px-2 py-1 self-start">
//                             Selected
//                           </span>
//                         )}
//                       </div>
//                     </label>

//                     {/* ── ONLINE ── */}
//                     <label
//                       htmlFor="online"
//                       className={`block cursor-pointer p-5 border transition-all duration-200
//                         ${paymentMethod === "online"
//                           ? "border-[#c9a96e] bg-[#c9a96e]/05"
//                           : "border-[#c9a96e]/15 hover:border-[#c9a96e]/35"
//                         }`}
//                     >
//                       <input
//                         type="radio"
//                         id="online"
//                         checked={paymentMethod === "online"}
//                         onChange={() => setPaymentMethod("online")}
//                       />
//                       <div className="flex items-start gap-4">
//                         {/* Custom radio */}
//                         <div className={`mt-0.5 w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all
//                           ${paymentMethod === "online" ? "border-[#c9a96e] bg-[#c9a96e]" : "border-[#c9a96e]/30"}`}>
//                           {paymentMethod === "online" && (
//                             <div className="w-1.5 h-1.5 bg-[#0d0a05]" />
//                           )}
//                         </div>

//                         <span className={`flex-shrink-0 transition-colors ${paymentMethod === "online" ? "text-[#c9a96e]" : "text-[#c9a96e]/40"}`}>
//                           <OnlineIcon />
//                         </span>

//                         <div className="flex-1">
//                           <p className={`text-[13px] tracking-[0.08em] mb-1 transition-colors ${paymentMethod === "online" ? "text-[#f5f0e8]" : "text-[#f5f0e8]/55"}`}>
//                             Online Payment
//                           </p>
//                           <p className="text-[#f5f0e8]/30 text-[10px] tracking-wide leading-relaxed">
//                             Pay securely via UPI, Debit / Credit Cards, or Wallets through Razorpay.
//                           </p>

//                           {/* Payment badges */}
//                           {paymentMethod === "online" && (
//                             <div className="mt-4 flex items-center gap-2 flex-wrap card-in">
//                               {["UPI", "Visa", "Mastercard", "Wallets"].map((b) => (
//                                 <span key={b} className="text-[#c9a96e]/40 text-[8px] tracking-[0.25em] uppercase border border-[#c9a96e]/15 px-2.5 py-1">
//                                   {b}
//                                 </span>
//                               ))}
//                             </div>
//                           )}
//                         </div>

//                         {paymentMethod === "online" && (
//                           <span className="flex-shrink-0 text-[#c9a96e] text-[8px] tracking-[0.3em] uppercase border border-[#c9a96e]/30 px-2 py-1 self-start">
//                             Selected
//                           </span>
//                         )}
//                       </div>
//                     </label>

//                   </div>

//                   {/* Info note */}
//                   <div className="mt-5 flex items-center gap-2 p-3 border border-[#c9a96e]/10 bg-[#c9a96e]/03">
//                     <span className="text-[#c9a96e]/35 flex-shrink-0"><TruckIcon /></span>
//                     <p className="text-[#f5f0e8]/28 text-[10px] tracking-wide leading-relaxed">
//                       {paymentMethod === "cod"
//                         ? "Please keep exact change ready. Our delivery partner will collect payment at your door."
//                         : "You will be redirected to Razorpay's secure payment gateway to complete your transaction."}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Security note */}
//                 <div className="flex items-center justify-center gap-2.5 py-5 text-[#f5f0e8]/20 border-t border-[#c9a96e]/08">
//                   <LockIcon size={11} />
//                   <span className="text-[9px] tracking-[0.3em] uppercase">All transactions are encrypted and secure</span>
//                 </div>
//               </div>

//               {/* ── RIGHT: Order Summary ── */}
//               <div className="bg-[#110d07] border-l border-[#c9a96e]/10">
//                 <div className="sticky top-6 p-7">
//                   <p className="text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase mb-2 opacity-65">OVERVIEW</p>
//                   <h2 className="font-['Cormorant_Garamond',serif] text-[1.7rem] font-light text-[#f5f0e8] mb-7">
//                     Order <span className="italic text-[#c9a96e]">Summary</span>
//                   </h2>

//                   {/* Items */}
//                   <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1 slim-scroll">
//                     {cart.map((item, i) => {
//                       const price = Number(item.totalPrice || 0);
//                       return (
//                         <div key={i} className="flex items-center gap-3 group">
//                           <div className="relative w-12 h-10 flex-shrink-0 overflow-hidden bg-[#1a1510] border border-[#c9a96e]/10">
//                             <img
//                               src={item?.product?.image || item?.image}
//                               alt={item?.product?.name || item?.name}
//                               className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
//                             />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="font-['Cormorant_Garamond',serif] text-[0.95rem] font-light text-[#f5f0e8]/70 group-hover:text-[#c9a96e] transition-colors truncate">
//                               {item?.product?.name || item?.name}
//                             </p>
//                             <div className="flex items-center gap-2 flex-wrap">
//                               <p className="text-[#f5f0e8]/25 text-[10px]">× {item.quantity}</p>
//                               {item.bean?.name && (
//                                 <p className="text-[#c9a96e]/30 text-[9px] tracking-wide">{item.bean.name}</p>
//                               )}
//                               {item.milk?.name && (
//                                 <p className="text-[#c9a96e]/30 text-[9px] tracking-wide">{item.milk.name}</p>
//                               )}
//                             </div>
//                           </div>
//                           <span className="font-['Cormorant_Garamond',serif] text-[0.95rem] text-[#c9a96e] flex-shrink-0">
//                             ₹{price.toFixed(0)}
//                           </span>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   <div className="h-px bg-gradient-to-r from-[#c9a96e]/25 to-transparent mb-5" />

//                   {/* Totals */}
//                   <div className="space-y-3 mb-7">
//                     <div className="flex justify-between">
//                       <span className="text-[#f5f0e8]/40 text-[10px] tracking-[0.2em] uppercase">Subtotal</span>
//                       <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/60">₹{subtotal.toFixed(0)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-[#f5f0e8]/40 text-[10px] tracking-[0.2em] uppercase">Delivery</span>
//                       <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/60">₹{shipping}</span>
//                     </div>
//                     <div className="h-px bg-gradient-to-r from-[#c9a96e]/20 to-transparent" />
//                     <div className="flex justify-between items-baseline">
//                       <span className="text-[#f5f0e8]/70 text-[10px] tracking-[0.2em] uppercase">Total</span>
//                       <span className="font-['Cormorant_Garamond',serif] text-[2rem] font-light text-[#c9a96e]">₹{total.toFixed(0)}</span>
//                     </div>
//                   </div>

//                   {/* CTA */}
//                   <button
//                     onClick={handlePayment}
//                     disabled={loading}
//                     className="gold-btn w-full flex items-center justify-between
//                       px-6 py-4 bg-[#c9a96e] text-[#0d0a05]
//                       text-[0.62rem] tracking-[0.38em] uppercase
//                       disabled:opacity-50 disabled:cursor-not-allowed"
//                     style={{ fontFamily: "'Jost',sans-serif" }}
//                   >
//                     <span className="flex items-center gap-2.5">
//                       {loading
//                         ? <div className="w-3.5 h-3.5 border border-[#0d0a05]/40 border-t-[#0d0a05] rounded-full animate-spin" />
//                         : <LockIcon size={14} />}
//                       {loading
//                         ? "Processing..."
//                         : paymentMethod === "cod"
//                         ? "Place Order"
//                         : "Pay Securely"}
//                     </span>
//                     {!loading && <ArrowRight />}
//                   </button>

//                   <p className="text-center text-[#f5f0e8]/18 text-[9px] tracking-[0.2em] mt-4">
//                     Free cancellation before your order is dispatched
//                   </p>

//                   {/* Trust badges */}
//                   <div className="mt-6 pt-5 border-t border-[#c9a96e]/08 flex justify-center gap-3">
//                     {["Fast Delivery", "Easy Returns", "Secure Pay"].map((b) => (
//                       <span key={b} className="text-[#c9a96e]/25 text-[8px] tracking-widest uppercase border border-[#c9a96e]/08 px-2 py-1">
//                         {b}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentPage;




//================================================



import { useState, useMemo } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useCart } from "../context/CartContext";

import toast from "react-hot-toast";

import api from "../services/api";
import Navbar from "../components/Navbar";

/* ─────────── Icons ─────────── */

const ArrowRight = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TruckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const LockIcon = ({ size = 12 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect
      x="3"
      y="11"
      width="18"
      height="11"
      rx="2"
    />

    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const CodIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      rx="2"
    />

    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const OnlineIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />

    <path d="M12 2a14.5 14.5 0 010 20M2 12h20" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* ─────────── Main ─────────── */

const PaymentPage = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const {
    cart,
    clearCart,
  } = useCart();

  /* ================= BUY NOW ================= */

  const buyNow =
    location.state?.buyNow;

  const buyNowProduct =
    location.state?.product;

  const addressId =
    location.state?.addressId;

  const finalCart =
    buyNow && buyNowProduct
      ? [
          {
            ...buyNowProduct,
            quantity:
              buyNowProduct.quantity || 1,
          },
        ]
      : cart;

  /* ================= STATES ================= */

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("cod");

  const [
    loading,
    setLoading,
  ] = useState(false);

  /* ================= TOTALS ================= */

  const subtotal = useMemo(
    () =>
      finalCart.reduce(
        (sum, item) =>
          sum +
          Number(
            item.totalPrice ||
            item.price ||
            0
          ),
        0
      ),

    [finalCart]
  );

  const shipping = 49;

  const total =
    subtotal + shipping;

  /* ================= PAYMENT ================= */

  const handlePayment = async () => {

    try {

      setLoading(true);

      const selectedAddressId =
  addressId ??
  localStorage.getItem(
    "selectedAddressId"
  );
if (!selectedAddressId) {

  toast.error(
    "Please select delivery address"
  );

  return;
}
      const orderRequest = {

        addressId:
          Number(
            selectedAddressId
          ),

        paymentMethod:
          paymentMethod === "cod"
            ? "cod"
            : "razorpay",

        upiId: null,

        items:
          finalCart.map(
            (item) => ({

              productId:
                item.productId ||
                item.id,

              quantity:
                item.quantity || 1,

              beanId:
                item.beanId || null,

              milkId:
                item.milkId || null,

            })
          ),
      };

      /* ================= CREATE ORDER ================= */

      let orderResponse;

if (buyNow) {

  orderResponse =
    await api.post(
      "/order/single",
      {
        productId:
          buyNowProduct.productId ||
          buyNowProduct.id,

        quantity:
          buyNowProduct.quantity || 1,

        isCustomized:
          buyNowProduct.isCustomized || false,

        beanId:
          buyNowProduct.beanId || null,

        milkId:
          buyNowProduct.milkId || null,

        addressId:
          Number(selectedAddressId),

        paymentMethod:
          paymentMethod === "cod"
            ? "cod"
            : "razorpay",

        upiId: null,
      }
    );

}
else {

  orderResponse =
    await api.post(
      "/order",
      orderRequest
    );
}

      const createdOrder =
        orderResponse.data;

      const orderId =
        createdOrder.id ||
        createdOrder.orderId ||
        createdOrder.data?.id;

      if (!orderId) {

        toast.error(
          "Order ID not found"
        );

        return;
      }

      /* ================= COD ================= */

      if (
        paymentMethod === "cod"
      ) {

        if (!buyNow) {
          await clearCart();
        }

        toast.success(
          "Order placed successfully"
        );

        navigate("/orders");

        return;
      }

      /* ================= RAZORPAY ================= */

      const paymentResponse =
        await api.post(
          `/payment/create/${orderId}`
        );

      const paymentOrder =
        paymentResponse.data;

      const razorpayOrderId =
        paymentOrder.orderId ||
        paymentOrder.razorpayOrderId ||
        paymentOrder.id;

      if (!razorpayOrderId) {

        toast.error(
          "Razorpay Order ID missing"
        );

        return;
      }

      if (!window.Razorpay) {

        toast.error(
          "Razorpay SDK failed to load"
        );

        return;
      }

      const options = {

        key:
          "rzp_test_xxxxxxxxx",

        amount:
          total * 100,

        currency: "INR",

        name:
          "Maison Bean",

        description:
          "Coffee Order Payment",

        order_id:
          razorpayOrderId,

        handler:
          async function (
            response
          ) {

            try {

              await api.post(
                "/payment/verify",
                {

                  razorpayOrderId:
                    response.razorpay_order_id,

                  razorpayPaymentId:
                    response.razorpay_payment_id,

                  razorpaySignature:
                    response.razorpay_signature,

                }
              );

              if (!buyNow) {
                await clearCart();
              }

              toast.success(
                "Payment successful"
              );

              navigate("/orders");

            }
            catch {

              toast.error(
                "Payment verification failed"
              );
            }
          },

        modal: {

          ondismiss: () =>
            toast.error(
              "Payment cancelled"
            ),
        },

        theme: {
          color: "#c9a96e",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    }
    catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );

    }
    finally {

      setLoading(false);
    }
  };

  /* ================= EMPTY ================= */

  if (
    finalCart.length === 0
  ) {

    return (

      <div className="min-h-screen bg-[#0d0a05] flex flex-col items-center justify-center gap-6 font-['Jost',sans-serif]">

        <p className="font-['Cormorant_Garamond',serif] text-[2rem] italic text-[#f5f0e8]/30">
          Your cart is empty
        </p>

      </div>
    );
  }

  /* ================= UI ================= */

  return (

    <>

      <div className="min-h-screen bg-[#0d0a05]">

        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="grid lg:grid-cols-[1fr_340px] gap-10">

            {/* ================= LEFT ================= */}

            <div>

              <div className="mb-8">

                <p className="text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase mb-2">
                  Step 2 Of 2
                </p>

                <h1 className="text-5xl text-[#f5f0e8] font-light">
                  Payment Details
                </h1>

              </div>

              <div className="space-y-4">

                {/* COD */}

                <button
                  onClick={() =>
                    setPaymentMethod(
                      "cod"
                    )
                  }
                  className={`
                    w-full p-6 border text-left transition-all

                    ${
                      paymentMethod === "cod"
                        ? "border-[#c9a96e] bg-[#c9a96e]/5"
                        : "border-[#c9a96e]/15"
                    }
                  `}
                >

                  <div className="flex items-start gap-4">

                    <CodIcon />

                    <div>

                      <h3 className="text-[#f5f0e8] text-lg">
                        Cash on Delivery
                      </h3>

                      <p className="text-[#f5f0e8]/40 text-sm mt-1">
                        Pay when order arrives
                      </p>

                    </div>

                  </div>

                </button>

                {/* ONLINE */}

                <button
                  onClick={() =>
                    setPaymentMethod(
                      "online"
                    )
                  }
                  className={`
                    w-full p-6 border text-left transition-all

                    ${
                      paymentMethod === "online"
                        ? "border-[#c9a96e] bg-[#c9a96e]/5"
                        : "border-[#c9a96e]/15"
                    }
                  `}
                >

                  <div className="flex items-start gap-4">

                    <OnlineIcon />

                    <div>

                      <h3 className="text-[#f5f0e8] text-lg">
                        Online Payment
                      </h3>

                      <p className="text-[#f5f0e8]/40 text-sm mt-1">
                        Razorpay Secure Payment
                      </p>

                    </div>

                  </div>

                </button>

              </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div className="border border-[#c9a96e]/10 bg-[#110d07] p-7 h-fit sticky top-8">

              <h2 className="text-[#f5f0e8] text-2xl mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">

                {finalCart.map(
                  (item, index) => {

                    const price =
                      Number(
                        item.totalPrice ||
                        item.price ||
                        0
                      );

                    return (

                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >

                        <img
                          src={
                            item?.image ||
                            item?.product?.image
                          }

                          alt={
                            item?.name ||
                            item?.product?.name
                          }

                          className="w-14 h-14 object-cover rounded"
                        />

                        <div className="flex-1">

                          <h3 className="text-[#f5f0e8] text-sm">

                            {item?.name ||
                              item?.product?.name}

                          </h3>

                          <p className="text-[#f5f0e8]/40 text-xs">

                            Qty:
                            {" "}
                            {item.quantity}

                          </p>

                          {item.bean?.name && (
                            <p className="text-[#c9a96e]/60 text-xs">
                              Bean:
                              {" "}
                              {item.bean.name}
                            </p>
                          )}

                          {item.milk?.name && (
                            <p className="text-[#c9a96e]/60 text-xs">
                              Milk:
                              {" "}
                              {item.milk.name}
                            </p>
                          )}

                        </div>

                        <span className="text-[#c9a96e]">
                          ₹{price}
                        </span>

                      </div>
                    );
                  }
                )}

              </div>

              <div className="border-t border-[#c9a96e]/10 pt-5 space-y-3">

                <div className="flex justify-between text-sm text-[#f5f0e8]/60">
                  <span>Subtotal</span>
                  <span>
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-[#f5f0e8]/60">
                  <span>Delivery</span>
                  <span>
                    ₹{shipping}
                  </span>
                </div>

                <div className="flex justify-between text-xl text-[#c9a96e] pt-3 border-t border-[#c9a96e]/10">
                  <span>Total</span>
                  <span>
                    ₹{total.toFixed(0)}
                  </span>
                </div>

              </div>

              <button
                onClick={handlePayment}

                disabled={loading}

                className="
                  mt-8 w-full
                  bg-[#c9a96e]
                  text-[#0d0a05]
                  py-4
                  uppercase
                  tracking-[0.3em]
                  text-xs
                  flex items-center justify-center gap-3
                  hover:bg-[#d6bb80]
                  transition-all
                  disabled:opacity-50
                "
              >

                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0d0a05]/40 border-t-[#0d0a05] rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <LockIcon size={14} />

                    {paymentMethod === "cod"
                      ? "Place Order"
                      : "Pay Securely"}

                    <ArrowRight />
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default PaymentPage;