// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useCart } from "../../context/CartContext";
// import toast from "react-hot-toast";

// const API = "http://localhost:3000";

// export default function CustomizeProduct({ product, onClose }) {
//   const { addToCart } = useCart();

//   const [beanTypes, setBeanTypes] = useState([]);
//   const [milkOptions, setMilkOptions] = useState([]);
//   const [selectedBean, setSelectedBean] = useState(null);
//   const [selectedMilk, setSelectedMilk] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ================= FETCH OPTIONS =================
//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const [beansRes, milkRes] = await Promise.all([
//           axios.get(`${API}/beanTypes`),
//           axios.get(`${API}/milkOptions`),
//         ]);

//         setBeanTypes(beansRes.data || []);
//         setMilkOptions(milkRes.data || []);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load customization options");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOptions();
//   }, []);

//   if (!product) return null;
//   if (loading) return <p className="text-center mt-20">Loading...</p>;
//   if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

//   const basePrice = product.basePrice || 0;
//   const totalPrice =
//     basePrice +
//     (selectedBean?.priceAdd || 0) +
//     (selectedMilk?.priceAdd || 0);

//   const isCoffee = product.category?.toLowerCase().includes("coffee");

//   // ================= ADD TO CART =================
//   const handleAddToCart = () => {
//     if (!selectedBean || !selectedMilk) {
//       toast.error("Please select both bean and milk type");
//       return;
//     }

//     addToCart({
//       productId: product.id,
//       beanId: selectedBean.id,
//       milkId: selectedMilk.id,
//       isCustomized: true,
//     });

//     onClose && onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-4xl rounded-xl p-6 relative">

//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
//         >
//           ×
//         </button>

//         {/* Title */}
//         <h1 className="text-3xl font-bold mb-6">
//           Customize {product.name}
//         </h1>

//         {/* ================= BEANS ================= */}
//         {isCoffee && (
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-3">Choose Bean Type</h2>
//             <div className="space-y-3">
//               {beanTypes.map((bean) => (
//                 <label
//                   key={bean.id}
//                   className={`block p-4 border rounded cursor-pointer ${
//                     selectedBean?.id === bean.id
//                       ? "border-[#9c7635] bg-[#fff7eb]"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="bean"
//                     className="hidden"
//                     checked={selectedBean?.id === bean.id}
//                     onChange={() => setSelectedBean(bean)}
//                   />
//                   <div className="font-medium">
//                     {bean.name}
//                     {bean.priceAdd > 0 && ` (+₹${bean.priceAdd})`}
//                   </div>
//                   <p className="text-sm text-gray-600">{bean.description}</p>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ================= MILK ================= */}
//         {isCoffee && (
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-3">Choose Milk Type</h2>
//             <div className="space-y-3">
//               {milkOptions.map((milk) => (
//                 <label
//                   key={milk.id}
//                   className={`block p-4 border rounded cursor-pointer ${
//                     selectedMilk?.id === milk.id
//                       ? "border-[#9c7635] bg-[#fff7eb]"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="milk"
//                     className="hidden"
//                     checked={selectedMilk?.id === milk.id}
//                     onChange={() => setSelectedMilk(milk)}
//                   />
//                   <div className="font-medium">
//                     {milk.name}
//                     {milk.priceAdd > 0 && ` (+₹${milk.priceAdd})`}
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     Calories: {milk.calories}
//                   </p>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ================= SUMMARY ================= */}
//         <div className="bg-gray-100 p-5 rounded-lg">
//           <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
//           <p>Bean: <b>{selectedBean?.name || "-"}</b></p>
//           <p>Milk: <b>{selectedMilk?.name || "-"}</b></p>
//           <p className="mt-2 text-xl font-bold">
//             Total: ${totalPrice.toFixed(2)}
//           </p>

//           <button
//             onClick={handleAddToCart}
//             className="mt-4 w-full py-3 bg-[#9c7635] text-white rounded-lg font-bold hover:bg-[#6c5225]"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../Navbar";

const API   = "http://localhost:3000";
const STEPS = ["Bean Type", "Milk Type", "Review"];

export default function CustomizeProductPage() {
  const { addToCart } = useCart();
  const { id }        = useParams();
  const navigate      = useNavigate();

  const [product,     setProduct]     = useState(null);
  const [beanTypes,   setBeanTypes]   = useState([]);
  const [milkOptions, setMilkOptions] = useState([]);
  const [selectedBean, setSelectedBean] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState(null);
  const [step,    setStep]    = useState(0);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [adding,  setAdding]  = useState(false);

  useEffect(() => {
    if (!id) { setError("No product ID."); setLoading(false); return; }
    (async () => {
      try {
        const [productRes, beanRes, milkRes] = await Promise.all([
          axios.get(`${API}/products/${id}`),
          axios.get(`${API}/beanTypes`),
          axios.get(`${API}/milkOptions`),
        ]);
        setProduct(productRes.data);
        setBeanTypes(beanRes.data || []);
        setMilkOptions(milkRes.data || []);
      } catch (err) {
        setError(err.response?.status === 404 ? "Product not found." : "Failed to load options.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const isCoffee   = product?.category?.toLowerCase().includes("coffee");
  const basePrice  = Number(product?.basePrice) || 0;
  const totalPrice = basePrice + (selectedBean?.priceAdd || 0) + (selectedMilk?.priceAdd || 0);

  const handleAddToCart = () => {
    setAdding(true);

    // ✅ Full object shape — consistent with modal version
    addToCart({
      id:        Date.now().toString() + Math.random(),
      productId: product.id,
      product,                   // full product object
      quantity:  1,
      bean:      selectedBean,   // full bean object
      milk:      selectedMilk,   // full milk object
      isCustomized: isCoffee,
    });

    setTimeout(() => navigate("/cart"), 500);
  };

  /* ── Loading ── */
  if (loading) return (
    <div className="min-h-screen bg-[#0d0a05] flex items-center justify-center">
      <div className="w-8 h-8 border border-[#c9a96e]/20 border-t-[#c9a96e] rounded-full animate-spin" />
    </div>
  );

  /* ── Error ── */
  if (error || !product) return (
    <div className="min-h-screen bg-[#0d0a05] flex items-center justify-center px-6">
      <div className="text-center space-y-5">
        <p className="text-white/20 text-[0.6rem] tracking-[0.3em] uppercase font-light">
          {error || "Product not found"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-[#c9a96e] border border-[#c9a96e]/30 px-6 py-2.5 text-[0.55rem] tracking-[0.28em] uppercase font-light hover:bg-[#c9a96e] hover:text-[#0d0a05] transition-all duration-300"
        >
          ← Back
        </button>
      </div>
    </div>
  );

  /* ── Option Card ── */
  const OptionCard = ({ item, selected, onClick, sub }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-5 border text-left relative transition-all duration-200
        ${selected
          ? "border-[#c9a96e]/45 bg-[#c9a96e]/[0.06]"
          : "border-[#c9a96e]/[0.08] hover:border-[#c9a96e]/25 hover:bg-[#c9a96e]/[0.03]"
        }`}
    >
      {selected && <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-[#c9a96e]" />}

      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200
        ${selected ? "border-[#c9a96e]" : "border-[#c9a96e]/20"}`}>
        <div className={`w-2 h-2 rounded-full bg-[#c9a96e] transition-all duration-200
          ${selected ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
      </div>

      <div className="flex-1">
        <p
          className={`text-lg font-light leading-tight transition-colors ${selected ? "text-[#c9a96e]" : "text-white/85"}`}
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          {item.name}
        </p>
        {sub && <p className="text-white/30 text-xs font-extralight mt-0.5">{sub}</p>}
      </div>

      <p
        className={`text-base font-light flex-shrink-0 transition-colors ${selected ? "text-[#c9a96e]" : "text-[#c9a96e]/35"}`}
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        {item.priceAdd > 0 ? `+₹${item.priceAdd}` : "Free"}
      </p>
    </button>
  );

  const SectionLabel = ({ children }) => (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[#c9a96e]/60 text-[0.48rem] tracking-[0.48em] uppercase font-extralight whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-[#c9a96e]/08" />
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');
      `}</style>

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif]">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-20 left-1/3 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.02] blur-[130px]" />
        </div>

        <div className="relative z-10">
          <Navbar />

          <div className="max-w-2xl mx-auto px-6 py-12">

            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#c9a96e]/40 text-[0.52rem] tracking-[0.3em] uppercase font-light mb-10 hover:text-[#c9a96e] transition-colors group"
            >
              <span className="h-px w-5 bg-current block transition-all duration-300 group-hover:w-8" />
              Back to Menu
            </button>

            {/* Product strip */}
            <div className="flex items-center gap-5 p-5 border border-[#c9a96e]/10 bg-[#110d07] mb-10">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover flex-shrink-0 opacity-80"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[#c9a96e]/55 text-[0.45rem] tracking-[0.45em] uppercase font-extralight mb-0.5">
                  {product.category}
                </p>
                <h1
                  className="text-white/90 text-2xl font-light truncate"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {product.name}
                </h1>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[#c9a96e]/40 text-[0.45rem] tracking-[0.3em] uppercase font-extralight">from</p>
                <p className="text-[#c9a96e] text-2xl font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  ₹{basePrice}
                </p>
              </div>
            </div>

            {/* Non-coffee — direct add */}
            {!isCoffee ? (
              <div className="text-center py-16 border border-[#c9a96e]/08 bg-[#110d07]">
                <p className="text-white/25 text-lg font-light italic mb-6" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  No customization available
                </p>
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="px-10 py-4 bg-[#c9a96e] text-[#0d0a05] text-[0.58rem] tracking-[0.3em] uppercase font-light hover:bg-[#d4b87a] transition-all duration-300 disabled:opacity-50"
                >
                  {adding ? "Adding…" : `Add to Cart — ₹${basePrice}`}
                </button>
              </div>
            ) : (
              <>
                {/* Step indicator */}
                <div className="flex items-center gap-0 mb-10">
                  {STEPS.map((s, i) => (
                    <React.Fragment key={s}>
                      <button
                        onClick={() => i < step && setStep(i)}
                        className={`flex items-center gap-2.5 ${i < step ? "cursor-pointer" : "cursor-default"}`}
                      >
                        <div className={`w-6 h-6 flex items-center justify-center text-[0.48rem] font-light transition-all duration-300
                          ${step === i
                            ? "bg-[#c9a96e] text-[#0d0a05]"
                            : i < step
                              ? "border border-[#c9a96e]/50 text-[#c9a96e]/60"
                              : "border border-[#c9a96e]/15 text-[#c9a96e]/20"
                          }`}
                        >
                          {i < step ? "✓" : i + 1}
                        </div>
                        <span className={`text-[0.48rem] tracking-[0.3em] uppercase font-extralight transition-colors
                          ${step === i ? "text-[#c9a96e]" : i < step ? "text-[#c9a96e]/50" : "text-white/18"}`}>
                          {s}
                        </span>
                      </button>
                      {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-px mx-3 transition-colors duration-300
                          ${i < step ? "bg-[#c9a96e]/30" : "bg-[#c9a96e]/08"}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* ── Step 0: Bean ── */}
                {step === 0 && (
                  <div>
                    <SectionLabel>Choose your bean</SectionLabel>
                    <div className="space-y-2 mb-8">
                      {beanTypes.map((bean) => (
                        <OptionCard
                          key={bean.id}
                          item={bean}
                          selected={selectedBean?.id === bean.id}
                          onClick={() => setSelectedBean(bean)}
                          sub={bean.description}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      disabled={!selectedBean}
                      className="w-full py-4 bg-[#c9a96e] text-[#0d0a05] text-[0.58rem] tracking-[0.3em] uppercase font-light hover:bg-[#d4b87a] hover:tracking-[0.38em] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:tracking-[0.3em]"
                    >
                      Continue — {selectedBean ? selectedBean.name : "Select a bean"}
                    </button>
                  </div>
                )}

                {/* ── Step 1: Milk ── */}
                {step === 1 && (
                  <div>
                    <SectionLabel>Choose your milk</SectionLabel>
                    <div className="space-y-2 mb-8">
                      {milkOptions.map((milk) => (
                        <OptionCard
                          key={milk.id}
                          item={milk}
                          selected={selectedMilk?.id === milk.id}
                          onClick={() => setSelectedMilk(milk)}
                          sub={milk.calories ? `${milk.calories} cal` : null}
                        />
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(0)}
                        className="px-8 py-4 border border-[#c9a96e]/20 text-[#c9a96e]/50 text-[0.58rem] tracking-[0.25em] uppercase font-light hover:border-[#c9a96e]/40 hover:text-[#c9a96e]/80 transition-all duration-300"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={() => setStep(2)}
                        disabled={!selectedMilk}
                        className="flex-1 py-4 bg-[#c9a96e] text-[#0d0a05] text-[0.58rem] tracking-[0.3em] uppercase font-light hover:bg-[#d4b87a] hover:tracking-[0.38em] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:tracking-[0.3em]"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 2: Review ── */}
                {step === 2 && (
                  <div>
                    <SectionLabel>Review your order</SectionLabel>

                    <div className="border border-[#c9a96e]/12 bg-[#110d07] mb-6">
                      {/* Product row */}
                      <div className="flex items-center gap-4 px-6 py-5 border-b border-[#c9a96e]/08">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover opacity-70 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-white/85 text-lg font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                            {product.name}
                          </p>
                          <p className="text-[#c9a96e]/45 text-[0.45rem] tracking-[0.3em] uppercase font-extralight">
                            {product.category}
                          </p>
                        </div>
                      </div>

                      {/* Selections */}
                      <div className="px-6 py-4 space-y-4 border-b border-[#c9a96e]/08">
                        {[
                          { label: "Bean", item: selectedBean },
                          { label: "Milk", item: selectedMilk },
                        ].map(({ label, item }) => (
                          <div key={label} className="flex justify-between items-center">
                            <div>
                              <p className="text-white/25 text-[0.45rem] tracking-[0.3em] uppercase font-extralight">{label}</p>
                              <p className="text-white/75 text-sm font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                                {item?.name}
                              </p>
                            </div>
                            <p className="text-[#c9a96e]/60 text-sm font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                              {item?.priceAdd > 0 ? `+₹${item.priceAdd}` : "Included"}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Price breakdown */}
                      <div className="px-6 py-5 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/28 text-[0.6rem] font-extralight">Base</span>
                          <span className="text-white/45 text-[0.6rem]">₹{basePrice.toFixed(2)}</span>
                        </div>
                        {selectedBean?.priceAdd > 0 && (
                          <div className="flex justify-between">
                            <span className="text-white/28 text-[0.6rem] font-extralight">{selectedBean.name}</span>
                            <span className="text-white/45 text-[0.6rem]">+₹{selectedBean.priceAdd.toFixed(2)}</span>
                          </div>
                        )}
                        {selectedMilk?.priceAdd > 0 && (
                          <div className="flex justify-between">
                            <span className="text-white/28 text-[0.6rem] font-extralight">{selectedMilk.name}</span>
                            <span className="text-white/45 text-[0.6rem]">+₹{selectedMilk.priceAdd.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-baseline pt-3 border-t border-[#c9a96e]/08">
                          <span className="text-white/22 text-[0.5rem] tracking-[0.3em] uppercase font-extralight">Total</span>
                          <span className="text-[#c9a96e] text-3xl font-light" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                            ₹{totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="px-8 py-4 border border-[#c9a96e]/20 text-[#c9a96e]/50 text-[0.58rem] tracking-[0.25em] uppercase font-light hover:border-[#c9a96e]/40 hover:text-[#c9a96e]/80 transition-all duration-300"
                      >
                        ← Edit
                      </button>
                      <button
                        onClick={handleAddToCart}
                        disabled={adding}
                        className="flex-1 py-4 bg-[#c9a96e] text-[#0d0a05] text-[0.58rem] tracking-[0.3em] uppercase font-light hover:bg-[#d4b87a] hover:tracking-[0.38em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {adding ? "Adding…" : `Add to Cart — ₹${totalPrice.toFixed(2)}`}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}