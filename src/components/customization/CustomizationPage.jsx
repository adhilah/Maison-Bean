// import React, { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import axios from "axios";

// const API = "http://localhost:3000"; // make sure your JSON server is running

// const CustomizationPage = () => {
//   const { addToCart } = useCart();

//   const [beanTypes, setBeanTypes] = useState([]);
//   const [milkOptions, setMilkOptions] = useState([]);
//   const [selectedBean, setSelectedBean] = useState(null);
//   const [selectedMilk, setSelectedMilk] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const basePrice = 5;
//   const totalPrice = basePrice + (selectedBean?.priceAdd || 0) + (selectedMilk?.priceAdd || 0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [beanRes, milkRes] = await Promise.all([
//           axios.get(`${API}/beanTypes`),
//           axios.get(`${API}/milkOptions`)
//         ]);
//         setBeanTypes(beanRes.data || []);
//         setMilkOptions(milkRes.data || []);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load customization options. Check if JSON server is running.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddToCart = () => {
//     if (!selectedBean || !selectedMilk) {
//       alert("Please select both bean and milk type.");
//       return;
//     }

//     const customizedCoffee = {
//       id: Date.now().toString(),
//       name: "Customized Coffee",
//       category: "Custom Coffee",
//       basePrice: totalPrice,
//       qty: 1,
//       bean: selectedBean.name,
//       milk: selectedMilk.name,
//       description: `${selectedBean.name} + ${selectedMilk.name}`,
//       image: "https://images.unsplash.com/photo-1567936500817-ffadf115171f?auto=format&fit=crop&w=200&q=80"
//     };

//     addToCart(customizedCoffee);
//     alert("Customized coffee added to cart!");
//   };

//   if (loading) return <p className="text-center mt-20">Loading customization options...</p>;
//   if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-4xl font-bold mb-8 text-center">Customize Your Coffee</h1>

//       <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Bean Selection */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold mb-4">Select Bean Type</h2>
//           <div className="space-y-3">
//             {beanTypes.map((bean) => (
//               <label
//                 key={bean.id}
//                 className={`flex flex-col p-4 border rounded cursor-pointer hover:border-[#9c7635] ${
//                   selectedBean?.id === bean.id ? "border-[#9c7635] bg-[#fff7eb]" : "border-gray-200"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="bean"
//                   value={bean.id}
//                   className="hidden"
//                   checked={selectedBean?.id === bean.id}
//                   onChange={() => setSelectedBean(bean)}
//                 />
//                 <span className="font-medium">
//                   {bean.name} {bean.priceAdd > 0 && `(₹${bean.priceAdd.toFixed(2)})`}
//                 </span>
//                 <span className="text-gray-600 text-sm mt-1">{bean.description}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Milk Selection */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold mb-4">Select Milk Type</h2>
//           <div className="space-y-3">
//             {milkOptions.map((milk) => (
//               <label
//                 key={milk.id}
//                 className={`flex flex-col p-4 border rounded cursor-pointer hover:border-[#9c7635] ${
//                   selectedMilk?.id === milk.id ? "border-[#9c7635] bg-[#fff7eb]" : "border-gray-200"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="milk"
//                   value={milk.id}
//                   className="hidden"
//                   checked={selectedMilk?.id === milk.id}
//                   onChange={() => setSelectedMilk(milk)}
//                 />
//                 <span className="font-medium">
//                   {milk.name} {milk.priceAdd > 0 && `(₹${milk.priceAdd.toFixed(2)})`}
//                 </span>
//                 <span className="text-gray-600 text-sm mt-1">Calories: {milk.calories}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//         <p>Bean: <span className="font-medium">{selectedBean?.name || "None"}</span></p>
//         <p>Milk: <span className="font-medium">{selectedMilk?.name || "None"}</span></p>
//         <p className="mt-2 font-bold text-lg">Total: ₹{totalPrice.toFixed(2)}</p>
//         <button
//           onClick={handleAddToCart}
//           className="mt-4 w-full py-3 bg-[#9c7635] text-white font-bold rounded-lg hover:bg-[#6c5225] transition"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomizationPage;



// CustomizeProduct.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";

const API = "http://localhost:3000";

export default function CustomizeProduct({ product, onClose }) {
  const { addToCart } = useCart();

  const [beanTypes, setBeanTypes] = useState([]);
  const [milkOptions, setMilkOptions] = useState([]);
  const [selectedBean, setSelectedBean] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================= FETCH OPTIONS =================
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [beansRes, milkRes] = await Promise.all([
          axios.get(`${API}/beanTypes`),
          axios.get(`${API}/milkOptions`),
        ]);

        setBeanTypes(beansRes.data || []);
        setMilkOptions(milkRes.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load customization options");
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  if (!product) return null;
  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  const basePrice = product.basePrice || 0;
  const totalPrice =
    basePrice +
    (selectedBean?.priceAdd || 0) +
    (selectedMilk?.priceAdd || 0);

  const isCoffee = product.category?.toLowerCase().includes("coffee");

  // ================= ADD TO CART =================
  const handleAddToCart = () => {
    if (!selectedBean || !selectedMilk) {
      alert("Please select both bean and milk type");
      return;
    }

    addToCart({
      productId: product.id,
      beanId: selectedBean.id,
      milkId: selectedMilk.id,
      isCustomized: true,
    });

    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-xl p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">
          Customize {product.name}
        </h1>

        {/* ================= BEANS ================= */}
        {isCoffee && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Choose Bean Type</h2>
            <div className="space-y-3">
              {beanTypes.map((bean) => (
                <label
                  key={bean.id}
                  className={`block p-4 border rounded cursor-pointer ${
                    selectedBean?.id === bean.id
                      ? "border-[#9c7635] bg-[#fff7eb]"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="bean"
                    className="hidden"
                    checked={selectedBean?.id === bean.id}
                    onChange={() => setSelectedBean(bean)}
                  />
                  <div className="font-medium">
                    {bean.name}
                    {bean.priceAdd > 0 && ` (+₹${bean.priceAdd})`}
                  </div>
                  <p className="text-sm text-gray-600">{bean.description}</p>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ================= MILK ================= */}
        {isCoffee && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Choose Milk Type</h2>
            <div className="space-y-3">
              {milkOptions.map((milk) => (
                <label
                  key={milk.id}
                  className={`block p-4 border rounded cursor-pointer ${
                    selectedMilk?.id === milk.id
                      ? "border-[#9c7635] bg-[#fff7eb]"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="milk"
                    className="hidden"
                    checked={selectedMilk?.id === milk.id}
                    onChange={() => setSelectedMilk(milk)}
                  />
                  <div className="font-medium">
                    {milk.name}
                    {milk.priceAdd > 0 && ` (+₹${milk.priceAdd})`}
                  </div>
                  <p className="text-sm text-gray-600">
                    Calories: {milk.calories}
                  </p>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ================= SUMMARY ================= */}
        <div className="bg-gray-100 p-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <p>Bean: <b>{selectedBean?.name || "-"}</b></p>
          <p>Milk: <b>{selectedMilk?.name || "-"}</b></p>
          <p className="mt-2 text-xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-4 w-full py-3 bg-[#9c7635] text-white rounded-lg font-bold hover:bg-[#6c5225]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
