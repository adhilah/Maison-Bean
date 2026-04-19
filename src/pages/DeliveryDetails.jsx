// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import toast from "react-hot-toast";

// const DeliveryDetails = () => {
//   const { cart } = useCart();
//   const navigate = useNavigate();

//   const [address, setAddress] = useState("");
//   const [phone1, setPhone1] = useState("");
//   const [phone2, setPhone2] = useState("");
//   const [errors, setErrors] = useState({});

//   const subtotal = cart.reduce((sum, item) => {
//     const price = item.product?.basePrice || 0;
//     const addOns =
//       (item.bean?.priceAdd || 0) + (item.milk?.priceAdd || 0);
//     return sum + (price + addOns) * item.quantity;
//   }, 0);

//   const shipping = 9.9;
//   const total = subtotal + shipping;

//   // SIMPLE VALIDATION (NO FUNCTIONAL CHANGE)
//   const validateForm = () => {
//     const newErrors = {};

//     if (!address.trim()) {
//       newErrors.address = "Delivery address is required";
//     }

//     if (!phone1 || phone1.length !== 10) {
//       newErrors.phone1 = "Valid 10-digit phone number required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleProceed = () => {
//     if (!validateForm()) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     navigate("/payment");
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
//           <Link
//             to="/menu"
//             className="text-[#9c7635] hover:underline text-lg"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-10">
//           Delivery Details
//         </h1>

//         <div className="grid lg:grid-cols-3 gap-10">
//           {/* LEFT */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold mb-6">
//                 Where should we deliver?
//               </h2>

//               <div className="space-y-6">
//                 {/* Address */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Delivery Address <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     rows="4"
//                     className="w-full px-4 py-3 border rounded-lg"
//                   />
//                   {errors.address && (
//                     <p className="text-sm text-red-600 mt-2">
//                       {errors.address}
//                     </p>
//                   )}
//                 </div>

//                 {/* Phone 1 */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Primary Phone Number{" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     value={phone1}
//                     onChange={(e) =>
//                       setPhone1(e.target.value.slice(0, 10))
//                     }
//                     className="w-full px-4 py-3 border rounded-lg"
//                   />
//                   {errors.phone1 && (
//                     <p className="text-sm text-red-600 mt-2">
//                       {errors.phone1}
//                     </p>
//                   )}
//                 </div>

//                 {/* Phone 2 */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Secondary Phone Number (optional)
//                   </label>
//                   <input
//                     type="tel"
//                     value={phone2}
//                     onChange={(e) =>
//                       setPhone2(e.target.value.slice(0, 10))
//                     }
//                     className="w-full px-4 py-3 border rounded-lg"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
//               <h2 className="text-2xl font-bold mb-6">
//                 Order Summary
//               </h2>

//               <div className="space-y-4 mb-8">
//                 <div className="flex justify-between text-lg">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-lg">
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

             
//                 <button
//                   onClick={handleProceed}
//                   className="w-full bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-5 rounded-2xl font-bold text-xl transition"
//                 >
//                   Proceed to Payment
//                 </button>
              

//               <p className="text-center text-sm text-gray-500 mt-4">
//                 Secure checkout • Multiple payment options
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryDetails;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

/* ─────────── Icons ─────────── */
const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.69a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const PhoneAltIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.69a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    <line x1="18" y1="2" x2="22" y2="2" />
    <line x1="20" y1="4" x2="20" y2="0" />
  </svg>
);

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const LockIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

/* ─────────── Field Components ─────────── */
const Field = ({ label, name, type = "text", placeholder, value, onChange, error, maxLength }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[#f5f0e8]/40 text-[10px] tracking-[0.35em] uppercase">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={`w-full bg-[#0d0a05] px-4 py-3
        border ${error ? "border-[#f87171]/50" : "border-[#c9a96e]/18"}
        hover:border-[#c9a96e]/35 focus:border-[#c9a96e]/55 focus:outline-none
        text-[#f5f0e8] text-[13px] placeholder:text-[#f5f0e8]/18
        transition-all duration-200 font-['Jost',sans-serif]`}
    />
    {error && <p className="text-[#f87171]/75 text-[10px] tracking-[0.2em]">{error}</p>}
  </div>
);

const TextAreaField = ({ label, placeholder, value, onChange, error }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[#f5f0e8]/40 text-[10px] tracking-[0.35em] uppercase">{label}</label>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={4}
      className={`w-full bg-[#0d0a05] px-4 py-3
        border ${error ? "border-[#f87171]/50" : "border-[#c9a96e]/18"}
        hover:border-[#c9a96e]/35 focus:border-[#c9a96e]/55 focus:outline-none
        text-[#f5f0e8] text-[13px] placeholder:text-[#f5f0e8]/18
        transition-all duration-200 font-['Jost',sans-serif]
        resize-none`}
    />
    {error && <p className="text-[#f87171]/75 text-[10px] tracking-[0.2em]">{error}</p>}
  </div>
);

/* ─────────── Main ─────────── */
const DeliveryDetails = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone1, setPhone1]   = useState("");
  const [phone2, setPhone2]   = useState("");
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const price  = item.product?.basePrice || 0;
    const addOns = (item.bean?.priceAdd || 0) + (item.milk?.priceAdd || 0);
    return sum + (price + addOns) * item.quantity;
  }, 0);

  const shipping = 49;
  const total    = subtotal + shipping;

  const validateForm = () => {
    const err = {};
    if (!address.trim())          err.address = "Delivery address is required";
    if (!phone1 || phone1.length !== 10) err.phone1 = "Valid 10-digit phone number required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleProceed = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/payment");
    }, 600);
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(10px) scaleY(0.95)} to{opacity:1;transform:translateY(0) scaleY(1)} }

        .page-in  { animation: fadeUp  0.45s ease forwards; }
        .panel-in { animation: fadeUp  0.45s ease 0.08s both; }
        .extra-in { animation: slideIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; transform-origin: top; }

        textarea:-webkit-autofill,
        input:-webkit-autofill, input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0d0a05 inset !important;
          -webkit-text-fill-color: #f5f0e8 !important;
          border-color: rgba(201,169,110,0.4) !important;
        }

        .gold-btn { transition: background 0.22s ease, transform 0.15s ease; }
        .gold-btn:hover:not(:disabled)  { background: #d4b87a; }
        .gold-btn:active:not(:disabled) { transform: scale(0.98); }

        /* Custom scrollbar */
        .slim-scroll::-webkit-scrollbar { width: 3px; }
        .slim-scroll::-webkit-scrollbar-track { background: transparent; }
        .slim-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }
      `}</style>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#110d07", color: "#f5f0e8",
            border: "1px solid rgba(201,169,110,0.2)", borderRadius: 0,
            fontSize: "12px", padding: "12px 18px",
            fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em",
          },
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
                  STEP 1 OF 2
                </p>
                <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-none tracking-wide text-[#f5f0e8]">
                  Delivery <span className="italic text-[#c9a96e]">Details</span>
                </h1>
              </div>
              <Link to="/cart"
                className="text-[#c9a96e]/60 hover:text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 transition-all group self-end md:self-auto">
                ← BACK TO CART
                <span className="group-hover:w-10 transition-all duration-300 w-0 h-px bg-current inline-block" />
              </Link>
            </div>

            {/* Divider */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/45 via-[#c9a96e]/12 to-transparent" />
              <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e]/35 flex-shrink-0" />
            </div>

            {/* Progress Steps */}
            <div className="mt-6 flex items-center gap-0">
              {/* Step 1 - active */}
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 border border-[#c9a96e] flex items-center justify-center">
                  <span className="text-[#c9a96e] text-[9px] tracking-widest">01</span>
                </div>
                <span className="text-[#c9a96e] text-[9px] tracking-[0.35em] uppercase">Delivery</span>
              </div>
              <div className="mx-4 h-px w-12 bg-[#c9a96e]/25" />
              {/* Step 2 - inactive */}
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 border border-[#f5f0e8]/12 flex items-center justify-center">
                  <span className="text-[#f5f0e8]/25 text-[9px] tracking-widest">02</span>
                </div>
                <span className="text-[#f5f0e8]/25 text-[9px] tracking-[0.35em] uppercase">Payment</span>
              </div>
            </div>
          </div>

          {/* ══ CONTENT ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-px bg-[#c9a96e]/10">

              {/* ── LEFT: Delivery Form ── */}
              <div className="bg-[#0d0a05] panel-in">

                {/* Address Section */}
                <div className="bg-[#110d07] border border-[#c9a96e]/10 p-7">
                  <div className="flex items-start gap-4 mb-7">
                    <span className="text-[#c9a96e]/50 mt-0.5 flex-shrink-0"><LocationIcon /></span>
                    <div>
                      <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-1 opacity-65">STEP 1</p>
                      <h2 className="font-['Cormorant_Garamond',serif] text-[1.5rem] font-light text-[#f5f0e8]">
                        Delivery <span className="italic text-[#c9a96e]">Address</span>
                      </h2>
                    </div>
                  </div>

                  <TextAreaField
                    label="Full Delivery Address *"
                    placeholder="House / Flat No., Street, Area, Landmark, City, Pincode"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); if (errors.address) setErrors({ ...errors, address: "" }); }}
                    error={errors.address}
                  />

                  <div className="mt-4 flex items-center gap-2 p-3 border border-[#c9a96e]/10 bg-[#c9a96e]/03">
                    <span className="text-[#c9a96e]/35 flex-shrink-0"><TruckIcon /></span>
                    <p className="text-[#f5f0e8]/28 text-[10px] tracking-wide leading-relaxed">
                      Please include a nearby landmark to help our delivery partner find you easily.
                    </p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="extra-in bg-[#110d07] border border-[#c9a96e]/10 border-t-0 p-7 space-y-5">
                  <div className="flex items-start gap-4 mb-2">
                    <span className="text-[#c9a96e]/50 mt-0.5 flex-shrink-0"><PhoneIcon /></span>
                    <div>
                      <p className="text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase mb-1 opacity-65">STEP 2</p>
                      <h3 className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light text-[#f5f0e8]">
                        Contact <span className="italic text-[#c9a96e]">Numbers</span>
                      </h3>
                    </div>
                  </div>

                  <Field
                    label="Primary Phone Number *"
                    name="phone1"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone1}
                    onChange={(e) => {
                      setPhone1(e.target.value.replace(/\D/g, "").slice(0, 10));
                      if (errors.phone1) setErrors({ ...errors, phone1: "" });
                    }}
                    error={errors.phone1}
                    maxLength={10}
                  />

                  <div className="relative">
                    <Field
                      label="Secondary Phone Number (Optional)"
                      name="phone2"
                      type="tel"
                      placeholder="Alternate contact number"
                      value={phone2}
                      onChange={(e) => setPhone2(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      maxLength={10}
                    />
                    <span className="absolute right-3 top-8 text-[#f5f0e8]/15 pointer-events-none">
                      <PhoneAltIcon />
                    </span>
                  </div>

                  <p className="text-[#f5f0e8]/22 text-[10px] tracking-wide">
                    Our delivery partner may call you for directions — please ensure your primary number is reachable.
                  </p>
                </div>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2.5 py-5 text-[#f5f0e8]/20 border-t border-[#c9a96e]/08">
                  <LockIcon size={11} />
                  <span className="text-[9px] tracking-[0.3em] uppercase">Your information is encrypted and secure</span>
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
                  <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1 slim-scroll">
                    {cart.map((item, i) => {
                      const base    = Number(item.product?.basePrice || 0);
                      const beanAdd = Number(item.bean?.priceAdd      || 0);
                      const milkAdd = Number(item.milk?.priceAdd      || 0);
                      const price   = (base + beanAdd + milkAdd) * item.quantity;
                      return (
                        <div key={i} className="flex items-center gap-3 group">
                          <div className="relative w-12 h-10 flex-shrink-0 overflow-hidden bg-[#1a1510] border border-[#c9a96e]/10">
                            <img
                              src={item.product?.image}
                              alt={item.product?.name}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
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
                    onClick={handleProceed}
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
                        : <TruckIcon />}
                      {loading ? "Saving..." : "Proceed to Payment"}
                    </span>
                    {!loading && <ArrowRight />}
                  </button>

                  <p className="text-center text-[#f5f0e8]/18 text-[9px] tracking-[0.2em] mt-4">
                    Free cancellation before your order is dispatched
                  </p>

                  {/* Trust badges */}
                  <div className="mt-6 pt-5 border-t border-[#c9a96e]/08 flex justify-center gap-3">
                    {["Fast Delivery", "Easy Returns", "Secure Pay"].map((b) => (
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

export default DeliveryDetails;