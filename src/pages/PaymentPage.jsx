

// ==================================================================================================================
// import { useState, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import toast from "react-hot-toast";
// import axios from "axios";

// const PaymentPage = () => {
//   const { cart, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [upiId, setUpiId] = useState("");
//   const [cardDetails, setCardDetails] = useState({
//     number: "",
//     name: "",
//     expiry: "",
//     cvv: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Calculate totals with useMemo for performance
//   const subtotal = useMemo(() => {
//     return cart.reduce((sum, item) => {
//       const base = Number(item.product?.basePrice || 0);
//       const beanAdd = Number(item.bean?.priceAdd || 0);
//       const milkAdd = Number(item.milk?.priceAdd || 0);
//       return sum + (base + beanAdd + milkAdd) * item.quantity;
//     }, 0);
//   }, [cart]);

//   const shipping = 9.9;
//   const total = subtotal + shipping;

//   // Card input formatting
//   const handleCardChange = (e) => {
//     const { name, value } = e.target;
//     let formattedValue = value;

//     if (name === "number") {
//       formattedValue = value.replace(/\D/g, "").slice(0, 16);
//       formattedValue = formattedValue.replace(/(.{4})/g, "$1 ").trim();
//     }
//     if (name === "expiry") {
//       formattedValue = value.replace(/\D/g, "").slice(0, 4);
//       if (formattedValue.length >= 2) {
//         formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
//       }
//     }
//     if (name === "cvv") {
//       formattedValue = value.replace(/\D/g, "").slice(0, 3);
//     }

//     setCardDetails({ ...cardDetails, [name]: formattedValue });
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};

//     if (paymentMethod === "upi" && !upiId.trim()) {
//       newErrors.upi = "UPI ID is required";
//     }

//     if (paymentMethod === "card") {
//       if (cardDetails.number.replace(/\s/g, "").length !== 16) {
//         newErrors.number = "Card number must be 16 digits";
//       }
//       if (!cardDetails.name.trim()) {
//         newErrors.name = "Cardholder name required";
//       }
//       if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
//         newErrors.expiry = "Valid expiry required (MM/YY)";
//       }
//       if (cardDetails.cvv.length !== 3) {
//         newErrors.cvv = "CVV must be 3 digits";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle order placement
//   const handlePayment = async () => {
//     if (!validateForm()) return;

//     const user = JSON.parse(localStorage.getItem("authUser") || "null");
//     if (!user) {
//       toast.error("Please login to place order", { duration: 2000 });
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log(user);
      
//       const order = {
//         id: Date.now().toString(),
//         userId: user.id,
//         userEmail: user.email,
//         items: cart, // cart already has all needed data
//         subtotal,
//         shipping,
//         total,
//         paymentMethod,
//         upiId: paymentMethod === "upi" ? upiId : null,
//         status: "confirmed",
//         date: new Date().toISOString(),
//       };

//       // Save order to backend
//       await axios.post("http://localhost:3000/orders", order);

//       // Clear cart via context (single source of truth)
//       await clearCart();

//       // Success message based on payment method
//       if (paymentMethod === "cod") {
//         toast.success("Order placed! Pay when delivered.", { duration: 2000 });
//       } else if (paymentMethod === "upi") {
//         toast.success(`Order placed! Use UPI ID: ${upiId}`, { duration: 2000 });
//       } else {
//         toast.success("Payment successful! Order confirmed.", { duration: 2000 });
//       }

//       navigate("/orders");
//     } catch (err) {
//       console.error("Order failed:", err);
//       toast.error("Order failed. Please try again.", { duration: 2000 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Empty cart view
//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
//           <Link to="/menu" className="text-[#9c7635] hover:underline text-lg">
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>

//         <div className="grid lg:grid-cols-3 gap-10">
//           {/* Payment Methods Section */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>

//               <div className="space-y-4">
//                 {/* Cash on Delivery */}
//                 <label className="flex items-center p-5 border-2 rounded-xl cursor-pointer transition hover:border-[#9c7635]">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="cod"
//                     checked={paymentMethod === "cod"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="mr-4 text-[#9c7635] focus:ring-[#9c7635]"
//                   />
//                   <div>
//                     <span className="font-semibold text-lg">Cash on Delivery</span>
//                     <p className="text-sm text-gray-600">Pay when you receive your order</p>
//                   </div>
//                 </label>

//                 {/* UPI */}
//                 <label className="flex items-center p-5 border-2 rounded-xl cursor-pointer transition hover:border-[#9c7635]">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="upi"
//                     checked={paymentMethod === "upi"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="mr-4 text-[#9c7635] focus:ring-[#9c7635]"
//                   />
//                   <div>
//                     <span className="font-semibold text-lg">UPI</span>
//                     <p className="text-sm text-gray-600">Pay via Google Pay, PhonePe, BHIM, etc.</p>
//                   </div>
//                 </label>

//                 {/* Credit/Debit Card */}
//                 <label className="flex items-center p-5 border-2 rounded-xl cursor-pointer transition hover:border-[#9c7635]">
//                   <input
//                     type="radio"
//                     name="payment"
//                     value="card"
//                     checked={paymentMethod === "card"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="mr-4 text-[#9c7635] focus:ring-[#9c7635]"
//                   />
//                   <div>
//                     <span className="font-semibold text-lg">Credit / Debit Card</span>
//                     <p className="text-sm text-gray-600">Secure card payment</p>
//                   </div>
//                 </label>
//               </div>

//               {/* UPI Input */}
//               {paymentMethod === "upi" && (
//                 <div className="mt-10 p-6 bg-blue-50 rounded-xl">
//                   <label className="block text-lg font-medium text-blue-900 mb-3">
//                     Enter your UPI ID
//                   </label>
//                   <input
//                     type="text"
//                     value={upiId}
//                     onChange={(e) => setUpiId(e.target.value)}
//                     placeholder="yourname@upi"
//                     className="w-full px-5 py-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
//                   />
//                   {errors.upi && (
//                     <p className="text-sm text-red-600 mt-2">{errors.upi}</p>
//                   )}
//                   <p className="text-sm text-blue-700 mt-3">
//                     Example: yourname@okaxis, yourphone@paytm, yourid@ybl
//                   </p>
//                 </div>
//               )}

//               {/* Card Details */}
//               {paymentMethod === "card" && (
//                 <div className="mt-10 p-6 bg-gray-50 rounded-xl space-y-5">
//                   <h3 className="text-xl font-semibold mb-4">Card Details</h3>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">Card Number</label>
//                     <input
//                       type="text"
//                       name="number"
//                       value={cardDetails.number}
//                       onChange={handleCardChange}
//                       placeholder="1234 5678 9012 3456"
//                       maxLength="19"
//                       className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9c7635]"
//                     />
//                     {errors.number && <p className="text-rose-600 text-sm mt-1">{errors.number}</p>}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">Cardholder Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={cardDetails.name}
//                       onChange={handleCardChange}
//                       placeholder="John Doe"
//                       className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9c7635]"
//                     />
//                     {errors.name && <p className="text-rose-600 text-sm mt-1">{errors.name}</p>}
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Expiry Date</label>
//                       <input
//                         type="text"
//                         name="expiry"
//                         value={cardDetails.expiry}
//                         onChange={handleCardChange}
//                         placeholder="MM/YY"
//                         maxLength="5"
//                         className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9c7635]"
//                       />
//                       {errors.expiry && <p className="text-rose-600 text-sm mt-1">{errors.expiry}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">CVV</label>
//                       <input
//                         type="text"
//                         name="cvv"
//                         value={cardDetails.cvv}
//                         onChange={handleCardChange}
//                         placeholder="123"
//                         maxLength="3"
//                         className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9c7635]"
//                       />
//                       {errors.cvv && <p className="text-rose-600 text-sm mt-1">{errors.cvv}</p>}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* COD Info */}
//               {paymentMethod === "cod" && (
//                 <div className="mt-8 p-6 bg-green-50 rounded-xl text-center">
//                   <p className="text-lg font-medium text-green-900">
//                     Cash will be collected at the time of delivery
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Secure Payment Badge */}
//             <div className="flex items-center justify-center gap-3 text-gray-600">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span>Safe & Secure Payment</span>
//             </div>
//           </div>

//           {/* Order Summary Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
//               <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

//               <div className="space-y-4">
//                 <div className="flex justify-between text-gray-700">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-700">
//                   <span>Shipping</span>
//                   <span>${shipping.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-4">
//                   <div className="flex justify-between text-2xl font-bold text-[#9c7635]">
//                     <span>Total</span>
//                     <span>${total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 disabled={loading}
//                 className="w-full mt-8 bg-[#9c7635] hover:bg-[#7a5c2a] disabled:opacity-70 text-white py-5 rounded-2xl font-bold text-xl transition transform hover:scale-105"
//               >
//                 {loading
//                   ? "Processing..."
//                   : paymentMethod === "cod"
//                   ? "Place Order (Cash on Delivery)"
//                   : paymentMethod === "upi"
//                   ? "Pay with UPI"
//                   : "Pay with Card"}
//               </button>

//               <p className="text-center text-sm text-gray-500 mt-4">
//                 By placing your order, you agree to our Terms & Conditions
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;



//====================================================================================================================================================



import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "../components/Navbar";

/* ─────────── Icons ─────────── */
const CodIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);
const UpiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    <line x1="6" y1="15" x2="10" y2="15" /><circle cx="17" cy="15" r="1.5" />
  </svg>
);
const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    <line x1="6" y1="16" x2="9" y2="16" /><line x1="13" y1="16" x2="16" y2="16" />
  </svg>
);
const LockIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

/* ─────────── Field ─────────── */
const Field = ({ label, name, type = "text", placeholder, value, onChange, error, maxLength }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[#f5f0e8]/40 text-[10px] tracking-[0.35em] uppercase">{label}</label>
    <input
      type={type} name={name} placeholder={placeholder} value={value}
      onChange={onChange} maxLength={maxLength}
      className={`w-full bg-[#0d0a05] px-4 py-3
        border ${error ? "border-[#f87171]/50" : "border-[#c9a96e]/18"}
        hover:border-[#c9a96e]/35 focus:border-[#c9a96e]/55 focus:outline-none
        text-[#f5f0e8] text-[13px] placeholder:text-[#f5f0e8]/18
        transition-all duration-200 font-['Jost',sans-serif]`}
    />
    {error && <p className="text-[#f87171]/75 text-[10px] tracking-[0.2em]">{error}</p>}
  </div>
);

/* ─────────── Payment Option ─────────── */
const PayOption = ({ id, label, desc, icon, checked, onChange }) => (
  <label
    className={`flex items-center gap-5 p-5 cursor-pointer border transition-all duration-300 group
      ${checked
        ? "border-[#c9a96e]/50 bg-[#c9a96e]/05"
        : "border-[#c9a96e]/12 hover:border-[#c9a96e]/30 bg-transparent"
      }`}
  >
    {/* Custom radio */}
    <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200
      ${checked ? "border-[#c9a96e]" : "border-[#f5f0e8]/20"}`}>
      {checked && <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />}
    </div>
    <input type="radio" name="payment" value={id} checked={checked} onChange={onChange} className="sr-only" />

    {/* Icon */}
    <span className={`transition-colors duration-200 flex-shrink-0 ${checked ? "text-[#c9a96e]" : "text-[#f5f0e8]/25"}`}>
      {icon}
    </span>

    {/* Text */}
    <div>
      <p className={`font-['Cormorant_Garamond',serif] text-[1.1rem] font-light transition-colors duration-200
        ${checked ? "text-[#c9a96e]" : "text-[#f5f0e8]/70"}`}>
        {label}
      </p>
      <p className="text-[#f5f0e8]/28 text-[11px] tracking-wide mt-0.5">{desc}</p>
    </div>

    {/* Right check */}
    {checked && (
      <span className="ml-auto text-[#c9a96e]/70 flex-shrink-0">
        <CheckCircle />
      </span>
    )}
  </label>
);

/* ─────────── Main ─────────── */
const PaymentPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [upiId, setUpiId]                 = useState("");
  const [cardDetails, setCardDetails]     = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [errors, setErrors]               = useState({});
  const [loading, setLoading]             = useState(false);

  const subtotal = useMemo(() => cart.reduce((sum, item) => {
    const base     = Number(item.product?.basePrice || 0);
    const beanAdd  = Number(item.bean?.priceAdd      || 0);
    const milkAdd  = Number(item.milk?.priceAdd      || 0);
    return sum + (base + beanAdd + milkAdd) * item.quantity;
  }, 0), [cart]);

  const shipping = 49;
  const total    = subtotal + shipping;

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === "number") {
      value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (name === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length >= 2) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (name === "cvv") value = value.replace(/\D/g, "").slice(0, 3);
    setCardDetails({ ...cardDetails, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const err = {};
    if (paymentMethod === "upi" && !upiId.trim()) err.upi = "UPI ID is required";
    if (paymentMethod === "card") {
      if (cardDetails.number.replace(/\s/g, "").length !== 16) err.number = "Card number must be 16 digits";
      if (!cardDetails.name.trim()) err.name = "Cardholder name required";
      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry))         err.expiry = "Valid expiry required (MM/YY)";
      if (cardDetails.cvv.length !== 3)                        err.cvv    = "CVV must be 3 digits";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handlePayment = async () => {
  if (!validateForm()) return;
  const user = JSON.parse(localStorage.getItem("authUser") || "null");
  if (!user) { toast.error("Please login to place an order"); return; }

  setLoading(true);
  try {
    const orderRequest = {
      userId:        user.id,
      userEmail:     user.email,
      paymentMethod: paymentMethod,
      upiId:         paymentMethod === "upi" ? upiId : null,
      subtotal,
      shipping,
      total,
      items: cart.map((item) => ({
        productId:       item.product.id,
        productName:     item.product.name,
        productImage:    item.product.image,
        productCategory: item.product.category || null,
        basePrice:       item.product.basePrice,
        quantity:        item.quantity,
        beanId:          item.bean?.id   || null,
        beanName:        item.bean?.name || null,
        beanPriceAdd:    item.bean?.priceAdd || 0,
        milkId:          item.milk?.id   || null,
        milkName:        item.milk?.name || null,
        milkPriceAdd:    item.milk?.priceAdd || 0,
      })),
    };

    await axios.post("http://localhost:5000/api/Order", orderRequest);
    await clearCart();

    const msg = paymentMethod === "cod"
      ? "Order placed! Pay on delivery."
      : paymentMethod === "upi"
      ? `Order placed! Use UPI ID: ${upiId}`
      : "Payment successful! Order confirmed.";

    toast.success(msg);
    navigate("/orders");
  } catch {
    toast.error("Order failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  /* ── Empty cart ── */
  if (cart.length === 0) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');`}</style>
      <div className="min-h-screen bg-[#0d0a05] flex flex-col items-center justify-center gap-6 font-['Jost',sans-serif]">
        <p className="font-['Cormorant_Garamond',serif] text-[2rem] italic text-[#f5f0e8]/30">Your cart is empty</p>
        <Link to="/menu" className="text-[#c9a96e]/60 hover:text-[#c9a96e] text-[10px] tracking-[0.4em] uppercase transition-colors">
          Explore Menu →
        </Link>
      </div>
    </>
  );

  const ctaLabel = paymentMethod === "cod" ? "Place Order" : paymentMethod === "upi" ? "Pay with UPI" : "Pay with Card";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(10px) scaleY(0.95)} to{opacity:1;transform:translateY(0) scaleY(1)} }

        .page-in   { animation: fadeUp  0.45s ease forwards; }
        .panel-in  { animation: fadeUp  0.45s ease 0.08s both; }
        .extra-in  { animation: slideIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; transform-origin: top; }

        input:-webkit-autofill, input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0d0a05 inset !important;
          -webkit-text-fill-color: #f5f0e8 !important;
          border-color: rgba(201,169,110,0.4) !important;
        }

        .gold-btn { transition: background 0.22s ease, transform 0.15s ease; }
        .gold-btn:hover:not(:disabled)  { background: #d4b87a; }
        .gold-btn:active:not(:disabled) { transform: scale(0.98); }
      `}</style>

      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#110d07", color: "#f5f0e8", border: "1px solid rgba(201,169,110,0.2)", borderRadius: 0, fontSize: "12px", padding: "12px 18px", fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em" },
          success: { iconTheme: { primary: "#c9a96e", secondary: "#0d0a05" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#0d0a05" } },
        }}
      />

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif]">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.022] blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-[#c9a96e]/[0.015] blur-[110px]" />
        </div>

        <div className="relative z-10">
          <Navbar />

          {/* ══ HEADER ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pt-14 pb-6 page-in">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.55em] uppercase mb-3 opacity-75">
                  SECURE CHECKOUT
                </p>
                <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-none tracking-wide text-[#f5f0e8]">
                  Payment <span className="italic text-[#c9a96e]">Details</span>
                </h1>
              </div>
              <Link to="/cart"
                className="text-[#c9a96e]/60 hover:text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 transition-all group self-end md:self-auto">
                ← BACK TO CART
                <span className="group-hover:w-10 transition-all duration-300 w-0 h-px bg-current inline-block" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/45 via-[#c9a96e]/12 to-transparent" />
              <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e]/35 flex-shrink-0" />
            </div>
          </div>

          {/* ══ CONTENT ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-px bg-[#c9a96e]/10">

              {/* ── LEFT: Payment Methods ── */}
              <div className="bg-[#0d0a05] panel-in">

                {/* Method selector */}
                <div className="bg-[#110d07] border border-[#c9a96e]/10 p-7">
                  <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-2 opacity-65">
                    STEP 1
                  </p>
                  <h2 className="font-['Cormorant_Garamond',serif] text-[1.5rem] font-light text-[#f5f0e8] mb-6">
                    Select Payment <span className="italic text-[#c9a96e]">Method</span>
                  </h2>

                  <div className="space-y-px bg-[#c9a96e]/08">
                    <PayOption id="cod"  label="Cash on Delivery" desc="Pay when you receive your order"    icon={<CodIcon />}  checked={paymentMethod === "cod"}  onChange={() => setPaymentMethod("cod")}  />
                    <PayOption id="upi"  label="UPI Payment"       desc="Google Pay, PhonePe, BHIM, Paytm"  icon={<UpiIcon />}  checked={paymentMethod === "upi"}  onChange={() => setPaymentMethod("upi")}  />
                    <PayOption id="card" label="Card Payment"      desc="Credit or Debit card, all networks" icon={<CardIcon />} checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                  </div>
                </div>

                {/* ── UPI Input ── */}
                {paymentMethod === "upi" && (
                  <div className="extra-in bg-[#110d07] border border-[#c9a96e]/10 border-t-0 p-7 space-y-5">
                    <div>
                      <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-2 opacity-65">STEP 2</p>
                      <h3 className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light text-[#f5f0e8]">
                        Enter UPI <span className="italic text-[#c9a96e]">ID</span>
                      </h3>
                    </div>
                    <Field
                      label="Your UPI ID"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => { setUpiId(e.target.value); if (errors.upi) setErrors({ ...errors, upi: "" }); }}
                      error={errors.upi}
                    />
                    <p className="text-[#f5f0e8]/22 text-[10px] tracking-wide">
                      e.g. yourname@okaxis · yourphone@paytm · yourid@ybl
                    </p>
                  </div>
                )}

                {/* ── Card Details ── */}
                {paymentMethod === "card" && (
                  <div className="extra-in bg-[#110d07] border border-[#c9a96e]/10 border-t-0 p-7 space-y-5">
                    <div>
                      <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-2 opacity-65">STEP 2</p>
                      <h3 className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light text-[#f5f0e8]">
                        Card <span className="italic text-[#c9a96e]">Details</span>
                      </h3>
                    </div>

                    {/* Card preview strip */}
                    <div className="relative h-14 border border-[#c9a96e]/15 bg-gradient-to-r from-[#1a1510] to-[#110d07] flex items-center px-5 gap-3 overflow-hidden">
                      <div className="w-8 h-5 border border-[#c9a96e]/25 rounded-sm bg-[#c9a96e]/08 flex-shrink-0" />
                      <span className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8]/50 tracking-[0.2em]">
                        {cardDetails.number || "•••• •••• •••• ••••"}
                      </span>
                      <div className="absolute right-5 w-8 h-8 rounded-full bg-[#c9a96e]/08 border border-[#c9a96e]/15" />
                      <div className="absolute right-8 w-8 h-8 rounded-full bg-[#c9a96e]/05 border border-[#c9a96e]/10" />
                    </div>

                    <Field label="Card Number" name="number" placeholder="1234 5678 9012 3456"
                      value={cardDetails.number} onChange={handleCardChange} error={errors.number} maxLength={19} />
                    <Field label="Cardholder Name" name="name" placeholder="Jane Doe"
                      value={cardDetails.name} onChange={handleCardChange} error={errors.name} />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Expiry (MM/YY)" name="expiry" placeholder="MM/YY"
                        value={cardDetails.expiry} onChange={handleCardChange} error={errors.expiry} maxLength={5} />
                      <Field label="CVV" name="cvv" placeholder="123"
                        value={cardDetails.cvv} onChange={handleCardChange} error={errors.cvv} maxLength={3} />
                    </div>
                  </div>
                )}

                {/* ── COD confirmation ── */}
                {paymentMethod === "cod" && (
                  <div className="extra-in bg-[#110d07] border border-[#c9a96e]/10 border-t-0 p-7">
                    <div className="flex items-center gap-4 p-4 border border-[#4ade80]/20 bg-[#4ade80]/04">
                      <div className="w-8 h-8 rounded-full border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80]/60 flex-shrink-0">
                        <CheckCircle />
                      </div>
                      <div>
                        <p className="text-[#4ade80]/80 text-[11px] tracking-[0.3em] uppercase mb-0.5">Ready to place</p>
                        <p className="text-[#f5f0e8]/45 text-[12px]">
                          Cash will be collected at the time of delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security note */}
                <div className="flex items-center justify-center gap-2.5 py-5 text-[#f5f0e8]/20 border-t border-[#c9a96e]/08">
                  <LockIcon size={11} />
                  <span className="text-[9px] tracking-[0.3em] uppercase">256-bit SSL Encrypted · Secure Payment</span>
                </div>
              </div>

              {/* ── RIGHT: Order Summary ── */}
              <div className="bg-[#110d07] border-l border-[#c9a96e]/10">
                <div className="sticky top-6 p-7">
                  <p className="text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase mb-2 opacity-65">OVERVIEW</p>
                  <h2 className="font-['Cormorant_Garamond',serif] text-[1.7rem] font-light text-[#f5f0e8] mb-7">
                    Order <span className="italic text-[#c9a96e]">Summary</span>
                  </h2>

                  {/* Items */}
                  <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1">
                    {cart.map((item, i) => {
                      const base    = Number(item.product?.basePrice || 0);
                      const beanAdd = Number(item.bean?.priceAdd      || 0);
                      const milkAdd = Number(item.milk?.priceAdd      || 0);
                      const price   = (base + beanAdd + milkAdd) * item.quantity;
                      return (
                        <div key={i} className="flex items-center gap-3 group">
                          <div className="relative w-12 h-10 flex-shrink-0 overflow-hidden bg-[#1a1510] border border-[#c9a96e]/10">
                            <img src={item.product?.image} alt={item.product?.name}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-['Cormorant_Garamond',serif] text-[0.95rem] font-light text-[#f5f0e8]/70 group-hover:text-[#c9a96e] transition-colors truncate">
                              {item.product?.name}
                            </p>
                            <p className="text-[#f5f0e8]/25 text-[10px]">× {item.quantity}</p>
                          </div>
                          <span className="font-['Cormorant_Garamond',serif] text-[0.95rem] text-[#c9a96e] flex-shrink-0">
                            ₹{price.toFixed(0)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="h-px bg-gradient-to-r from-[#c9a96e]/25 to-transparent mb-5" />

                  {/* Totals */}
                  <div className="space-y-3 mb-7">
                    <div className="flex justify-between">
                      <span className="text-[#f5f0e8]/40 text-[10px] tracking-[0.2em] uppercase">Subtotal</span>
                      <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/60">₹{subtotal.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#f5f0e8]/40 text-[10px] tracking-[0.2em] uppercase">Delivery</span>
                      <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#f5f0e8]/60">₹{shipping}</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-[#c9a96e]/20 to-transparent" />
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#f5f0e8]/70 text-[10px] tracking-[0.2em] uppercase">Total</span>
                      <span className="font-['Cormorant_Garamond',serif] text-[2rem] font-light text-[#c9a96e]">₹{total.toFixed(0)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="gold-btn w-full flex items-center justify-between
                      px-6 py-4 bg-[#c9a96e] text-[#0d0a05]
                      text-[0.62rem] tracking-[0.38em] uppercase
                      disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Jost',sans-serif" }}
                  >
                    <span className="flex items-center gap-2.5">
                      {loading
                        ? <div className="w-3.5 h-3.5 border border-[#0d0a05]/40 border-t-[#0d0a05] rounded-full animate-spin" />
                        : <LockIcon size={11} />}
                      {loading ? "Processing..." : ctaLabel}
                    </span>
                    {!loading && <ArrowRight />}
                  </button>

                  <p className="text-center text-[#f5f0e8]/18 text-[9px] tracking-[0.2em] mt-4">
                    By placing your order you agree to our Terms & Conditions
                  </p>

                  {/* Trust badges */}
                  <div className="mt-6 pt-5 border-t border-[#c9a96e]/08 flex justify-center gap-3">
                    {["SSL Secured", "Easy Returns", "Fast Dispatch"].map((b) => (
                      <span key={b} className="text-[#c9a96e]/25 text-[8px] tracking-widest uppercase border border-[#c9a96e]/08 px-2 py-1">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;