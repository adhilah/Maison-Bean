// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import toast from "react-hot-toast";
// import axios from "axios";

// const API = "http://localhost:3000";

// export default function CustomizeProduct() {
//   const { addToCart } = useCart();
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [beanTypes, setBeanTypes] = useState([]);
//   const [milkOptions, setMilkOptions] = useState([]);
//   const [selectedBean, setSelectedBean] = useState(null);
//   const [selectedMilk, setSelectedMilk] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   // Prevents invalid API calls
//   useEffect(() => {
//     if (!id) {
//       setError("No product ID provided.");
//       setLoading(false);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         console.log("Fetching product:", id); // Debug log

//         const [productRes, beanRes, milkRes] = await Promise.all([
//           axios.get(`${API}/products/${id}`),
//           axios.get(`${API}/beanTypes`),
//           axios.get(`${API}/milkOptions`),
//         ]);

//         console.log("Product:", productRes.data);
//         console.log("Beans:", beanRes.data);
//         console.log("Milks:", milkRes.data);

//         setProduct(productRes.data);
//         setBeanTypes(beanRes.data || []);
//         setMilkOptions(milkRes.data || []);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         if (err.response?.status === 404) {
//           setError("Product not found. Try Cappuccino (ID: 1) or Americano (ID: 2).");
//         } else {
//           setError(`Failed to load: ${err.message}. Check if JSON server is running on port 3000 with beanTypes/milkOptions.`);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//         <div className="bg-white p-10 rounded-2xl text-center max-w-md">
//           <div className="w-16 h-16 border-4 border-[#9c7635]/30 border-t-[#9c7635] rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-xl font-semibold text-gray-700">Loading your coffee customization...</p>
//           <p className="text-sm text-gray-500 mt-2">Product ID: {id}</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//         <div className="bg-white p-8 rounded-2xl text-center max-w-md">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-2xl text-red-500">!</span>
//           </div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">Oops!</h2>
//           <p className="text-gray-600 mb-6">{error || "Product not found."}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-[#9c7635] text-white rounded-xl font-semibold hover:bg-[#7a5c2a] transition"
//           >
//             ← Back to Menu
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const isCoffee = product.category?.toLowerCase().includes("coffee");
//   const basePrice = Number(product.basePrice) || 150;
//   const totalPrice = basePrice + (selectedBean?.priceAdd || 0) + (selectedMilk?.priceAdd || 0);

//   const handleAddToCart = () => {
//     if (isCoffee && (!selectedBean || !selectedMilk)) {
//       alert("Please select both bean type and milk option for your coffee");
//       return;
//     }

//     const customizedItem = {
//       id: Date.now().toString() + Math.random(),
//       productId: product.id,
//       name: isCoffee 
//         ? `Custom ${product.name} (${selectedBean?.name || ''}${selectedMilk ? ` + ${selectedMilk.name}` : ''})`
//         : product.name,
//       category: product.category,
//       image: product.image,
//       basePrice: totalPrice,
//       quantity: 1,
//       beanId: selectedBean?.id,
//       milkId: selectedMilk?.id,
//       bean: selectedBean?.name,
//       milk: selectedMilk?.name,
//       description: isCoffee 
//         ? `Customized with ${selectedBean?.name} beans and ${selectedMilk?.name}`
//         : product.description,
//       isCustomized: isCoffee,
//     };

//     console.log("Adding to cart:", customizedItem);
//     addToCart(customizedItem);
//   //  toast.success(`Added customized ${product.name} to cart! Total: ₹${totalPrice.toFixed(2)}`);

// navigate("/cart");
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-8">
//       <div className="bg-white/95 backdrop-blur-md rounded-3xl w-full max-w-4xl p-8 relative max-h-[95vh] overflow-y-auto shadow-2xl border border-white/50">
        
//         {/* Close Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-6 right-6 w-12 h-12 bg-white/80 hover:bg-white rounded-2xl flex items-center justify-center text-2xl text-gray-700 hover:text-[#9c7635] shadow-lg transition-all duration-200 hover:scale-110"
//         >
//           ×
//         </button>

//         {/* Header */}
//         <div className="text-center mb-8">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-32 h-32 object-cover rounded-3xl mx-auto mb-4 shadow-xl border-4 border-white/50"
//           />
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9c7635] to-[#d4a574] bg-clip-text text-transparent mb-2">
//             Customize {product.name}
//           </h1>
//           <p className="text-gray-600 max-w-md mx-auto">{product.description}</p>
//         </div>

//         {/* Customization Options - Parallel Layout */}
// {isCoffee ? (
//   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
    
//     {/* =========================================== BEAN TYPES ======================================================== */}
//     <div className="bg-white rounded-2xl border shadow-sm p-6">
//       <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
//         Bean Type
//       </h2>

//       <div className="max-h-[320px] overflow-y-auto pr-2 space-y-4">
//         {beanTypes.map((bean) => (
//           <label
//             key={bean.id}
//             className={`flex justify-between items-start p-4 rounded-xl border cursor-pointer transition
//               ${
//                 selectedBean?.id === bean.id
//                   ? "border-[#9c7635] bg-[#fff7eb]"
//                   : "border-gray-200 hover:border-[#9c7635]/50"
//               }`}
//           >
//             <input
//               type="radio"
//               name="bean"
//               className="hidden"
//               checked={selectedBean?.id === bean.id}
//               onChange={() => setSelectedBean(bean)}
//             />

//             <div>
//               <p className="font-bold text-lg">{bean.name}</p>
//               <p className="text-sm text-gray-600">{bean.description}</p>
//             </div>

//             {bean.priceAdd > 0 && (
//               <span className="text-sm font-semibold text-[#9c7635]">
//                 +₹{bean.priceAdd}
//               </span>
//             )}
//           </label>
//         ))}
//       </div>
//     </div>
//     {/* ================================================== MILK TYPES ================================================ */}
//     <div className="bg-white rounded-2xl border shadow-sm p-6">
//       <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
//         Milk Type
//       </h2>

//       <div className="max-h-[320px] overflow-y-auto pr-2 space-y-4">
//         {milkOptions.map((milk) => (
//           <label
//             key={milk.id}
//             className={`flex justify-between items-start p-4 rounded-xl border cursor-pointer transition
//               ${
//                 selectedMilk?.id === milk.id
//                   ? "border-[#9c7635] bg-[#fff7eb]"
//                   : "border-gray-200 hover:border-[#9c7635]/50"
//               }`}
//           >
//             <input
//               type="radio"
//               name="milk"
//               className="hidden"
//               checked={selectedMilk?.id === milk.id}
//               onChange={() => setSelectedMilk(milk)}
//             />

//             <div>
//               <p className="font-bold text-lg">{milk.name}</p>
//               <p className="text-sm text-gray-600">
//                 {milk.calories} calories
//               </p>
//             </div>

//             {milk.priceAdd > 0 && (
//               <span className="text-sm font-semibold text-[#9c7635]">
//                 +₹{milk.priceAdd}
//               </span>
//             )}
//           </label>
//         ))}
//       </div>
//     </div>
//   </div>
// ) : (
//   <p className="text-center text-gray-500 py-12">
//     No customization available for this product.
//   </p>
// )}

//         {/* Order Summary */}
//         <div className="bg-gradient-to-r from-[#9c7635]/5 to-[#d4a574]/5 backdrop-blur-sm p-8 rounded-3xl border border-[#9c7635]/20">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
//           <div className="space-y-3 mb-8">
//             <div className="flex justify-between text-lg">
//               <span>Base Price</span>
//               <span>₹{basePrice.toFixed(2)}</span>
//             </div>
//             {isCoffee && (
//               <>
//                 {selectedBean && (
//                   <div className="flex justify-between text-lg">
//                     <span>{selectedBean.name} Beans</span>
//                     <span>+₹{selectedBean.priceAdd.toFixed(2)}</span>
//                   </div>
//                 )}
//                 {selectedMilk && (
//                   <div className="flex justify-between text-lg">
//                     <span>{selectedMilk.name}</span>
//                     <span>+₹{selectedMilk.priceAdd.toFixed(2)}</span>
//                   </div>
//                 )}
//               </>
//             )}
//             <div className="border-t pt-4">
//               <div className="flex justify-between text-3xl font-black text-[#9c7635]">
//                 <span>Total</span>
//                 <span>₹{totalPrice.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={handleAddToCart}
//             disabled={isCoffee && (!selectedBean || !selectedMilk)}
//             className="w-full py-5 px-8 text-xl font-bold bg-gradient-to-r from-[#9c7635] to-[#d4a574] hover:from-[#7a5c2a] hover:to-[#b88c5f] text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//           >
//             {isCoffee ? "Add Customized Coffee to Cart" : "Add to Cart"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

const API = "http://localhost:3000";

export default function CustomizeProduct({ product, onClose }) {
  const { addToCart } = useCart();

  const [beanTypes,   setBeanTypes]   = useState([]);
  const [milkOptions, setMilkOptions] = useState([]);
  const [selectedBean, setSelectedBean] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [adding,  setAdding]  = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [beansRes, milkRes] = await Promise.all([
          axios.get(`${API}/beanTypes`),
          axios.get(`${API}/milkOptions`),
        ]);
        setBeanTypes(beansRes.data || []);
        setMilkOptions(milkRes.data || []);
      } catch {
        setError("Failed to load customization options");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!product) return null;

  const isCoffee   = product.category?.toLowerCase().includes("coffee");
  const basePrice  = Number(product.basePrice) || 0;
  const totalPrice = basePrice + (selectedBean?.priceAdd || 0) + (selectedMilk?.priceAdd || 0);

  const handleAddToCart = () => {
    if (isCoffee && (!selectedBean || !selectedMilk)) {
      toast.error("Please select both bean and milk type");
      return;
    }
    setAdding(true);

    // ✅ Full object shape — product, bean, milk all as full objects
    addToCart({
      id:        Date.now().toString() + Math.random(),
      productId: product.id,
      product,                   // full object → used in Cart, OrderList, PaymentPage
      quantity:  1,
      bean:      selectedBean,   // full object { id, name, priceAdd, ... }
      milk:      selectedMilk,   // full object { id, name, priceAdd, ... }
      isCustomized: isCoffee,
    });

    setTimeout(() => onClose?.(), 600);
  };

  /* ── Option Row ── */
  const OptionRow = ({ item, selected, onClick, sub }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 border text-left relative transition-all duration-200
        ${selected
          ? "border-[#c9a96e]/50 bg-[#c9a96e]/[0.06]"
          : "border-[#c9a96e]/[0.07] hover:border-[#c9a96e]/25 hover:bg-[#c9a96e]/[0.03]"
        }`}
    >
      {selected && <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-[#c9a96e]" />}

      {/* Radio dot */}
      <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200
        ${selected ? "border-[#c9a96e]" : "border-[#c9a96e]/20"}`}>
        <div className={`w-1.5 h-1.5 rounded-full bg-[#c9a96e] transition-all duration-200
          ${selected ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-base font-light leading-tight transition-colors duration-200
            ${selected ? "text-[#c9a96e]" : "text-white/80"}`}
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          {item.name}
        </p>
        {sub && <p className="text-white/30 text-[0.58rem] font-extralight mt-0.5">{sub}</p>}
      </div>

      {/* Price */}
      <span
        className={`text-sm font-light flex-shrink-0 transition-colors duration-200
          ${selected ? "text-[#c9a96e]" : "text-[#c9a96e]/35"}`}
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        {item.priceAdd > 0 ? `+₹${item.priceAdd}` : "Included"}
      </span>
    </button>
  );

  const SectionLabel = ({ children }) => (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[#c9a96e]/65 text-[0.48rem] tracking-[0.48em] uppercase font-extralight whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-[#c9a96e]/10" />
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        .cust-modal { animation: fadeUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#040200]/85 backdrop-blur-md"
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        {/* Panel */}
        <div className="cust-modal bg-[#110d07] border border-[#c9a96e]/15 w-full max-w-2xl max-h-[92vh] flex flex-col relative">

          {/* ✕ */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-[#c9a96e]/15 text-white/40 hover:text-white/80 hover:border-[#c9a96e]/40 hover:bg-[#c9a96e]/[0.08] transition-all duration-200 text-sm"
          >
            ✕
          </button>

          {/* Header */}
          <div className="px-8 pt-7 pb-5 border-b border-[#c9a96e]/08 flex-shrink-0">
            <p className="text-[#c9a96e]/50 text-[0.48rem] tracking-[0.5em] uppercase font-extralight mb-1.5">
              Customise your order
            </p>
            <h2
              className="text-white/90 text-2xl font-light italic tracking-wide leading-none"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {product.name}
            </h2>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-7
            [&::-webkit-scrollbar]:w-[3px]
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[#c9a96e]/20"
          >
            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="w-7 h-7 border border-[#c9a96e]/20 border-t-[#c9a96e] rounded-full animate-spin" />
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-400/60 text-[0.6rem] tracking-[0.25em] uppercase font-light text-center py-12">
                {error}
              </p>
            )}

            {/* Options */}
            {!loading && !error && (
              <>
                {isCoffee ? (
                  <>
                    <div>
                      <SectionLabel>Bean Type</SectionLabel>
                      <div className="space-y-1.5">
                        {beanTypes.map((bean) => (
                          <OptionRow
                            key={bean.id}
                            item={bean}
                            selected={selectedBean?.id === bean.id}
                            onClick={() => setSelectedBean(bean)}
                            sub={bean.description}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <SectionLabel>Milk Type</SectionLabel>
                      <div className="space-y-1.5">
                        {milkOptions.map((milk) => (
                          <OptionRow
                            key={milk.id}
                            item={milk}
                            selected={selectedMilk?.id === milk.id}
                            onClick={() => setSelectedMilk(milk)}
                            sub={milk.calories ? `${milk.calories} cal` : null}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-14 gap-3">
                    <p className="text-white/25 text-lg font-light italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                      No customization available
                    </p>
                    <p className="text-white/15 text-[0.55rem] tracking-[0.3em] uppercase">
                      This item will be added as-is
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {!loading && !error && (
            <div className="flex-shrink-0 border-t border-[#c9a96e]/10 bg-[#c9a96e]/[0.02] px-8 py-5 flex items-center justify-between gap-6 flex-wrap">
              {/* Selections + price */}
              <div>
                <div className="space-y-0.5 mb-2">
                  {selectedBean && (
                    <p className="text-[0.58rem] font-extralight text-white/30 tracking-wide">
                      Bean — <span className="text-white/60 font-light">{selectedBean.name}</span>
                    </p>
                  )}
                  {selectedMilk && (
                    <p className="text-[0.58rem] font-extralight text-white/30 tracking-wide">
                      Milk — <span className="text-white/60 font-light">{selectedMilk.name}</span>
                    </p>
                  )}
                  {isCoffee && !selectedBean && !selectedMilk && (
                    <p className="text-[0.58rem] font-extralight text-white/20 italic">
                      Select your preferences above
                    </p>
                  )}
                </div>
                <p className="text-[#c9a96e] text-3xl font-light leading-none" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={adding || (isCoffee && (!selectedBean || !selectedMilk))}
                className="px-10 py-4 bg-[#c9a96e] text-[#0d0a05] text-[0.58rem] tracking-[0.3em] uppercase font-light transition-all duration-300 hover:bg-[#d4b87a] hover:tracking-[0.38em] disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:tracking-[0.3em] flex-shrink-0"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {adding ? "Adding…" : "Add to Cart"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}