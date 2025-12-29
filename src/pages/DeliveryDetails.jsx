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
//     const addOns = (item.bean?.priceAdd || 0) + (item.milk?.priceAdd || 0);
//     return sum + (price + addOns) * item.quantity;
//   }, 0);

//   const shipping = 9.9;
//   const total = subtotal + shipping;

//   const validateForm = () => {
//     const newErrors = {};

//     if (!address.trim()) {
//       newErrors.address = "Delivery address is required";
//     }
//     if (phone1.length < 10) {
//       newErrors.phone1 = "Valid primary phone number required (10 digits)";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleProceed = () => {
//     if (!validateForm()) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     // Save address & phone temporarily (you can use context or localStorage)
//     // For now, we'll just proceed
//     navigate("/payment");
//   };

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
//         <h1 className="text-4xl font-bold text-center mb-10">Delivery Details</h1>

//         <div className="grid lg:grid-cols-3 gap-10">
//           {/* Left: Delivery Form */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h2 className="text-2xl font-bold mb-6">Where should we deliver?</h2>

//               <div className="space-y-6">
//                 {/* Address */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Delivery Address <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     placeholder="House no., Building, Street, Area, Landmark, City, PIN"
//                     rows="4"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c7635] resize-none"
//                   />
//                   {errors.address && (
//                     <p className="text-sm text-red-600 mt-2">{errors.address}</p>
//                   )}
//                 </div>

//                 {/* Primary Phone */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Primary Phone Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     value={phone1}
//                     onChange={(e) => setPhone1(e.target.value.slice(0, 10))}
//                     placeholder="10-digit mobile number"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c7635]"
//                   />
//                   {errors.phone1 && (
//                     <p className="text-sm text-red-600 mt-2">{errors.phone1}</p>
//                   )}
//                 </div>

//                 {/* Secondary Phone (Optional) */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Secondary Phone Number (optional)
//                   </label>
//                   <input
//                     type="tel"
//                     value={phone2}
//                     onChange={(e) => setPhone2(e.target.value.slice(0, 10))}
//                     placeholder="Alternate contact"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c7635]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right: Summary + Proceed Button */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
//               <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

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

//               {/* Button as Link to /payment */}
//               <Link to="/payment">
//                 <button
//                   onClick={handleProceed}
//                   className="w-full bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-5 rounded-2xl font-bold text-xl transition transform hover:scale-105"
//                 >
//                   Proceed to Payment
//                 </button>
//               </Link>

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
import toast from "react-hot-toast";

const DeliveryDetails = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product?.basePrice || 0;
    const addOns =
      (item.bean?.priceAdd || 0) + (item.milk?.priceAdd || 0);
    return sum + (price + addOns) * item.quantity;
  }, 0);

  const shipping = 9.9;
  const total = subtotal + shipping;

  // SIMPLE VALIDATION (NO FUNCTIONAL CHANGE)
  const validateForm = () => {
    const newErrors = {};

    if (!address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    if (!phone1 || phone1.length !== 10) {
      newErrors.phone1 = "Valid 10-digit phone number required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    navigate("/payment");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link
            to="/menu"
            className="text-[#9c7635] hover:underline text-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Delivery Details
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">
                Where should we deliver?
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600 mt-2">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Phone 1 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Primary Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone1}
                    onChange={(e) =>
                      setPhone1(e.target.value.slice(0, 10))
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  {errors.phone1 && (
                    <p className="text-sm text-red-600 mt-2">
                      {errors.phone1}
                    </p>
                  )}
                </div>

                {/* Phone 2 */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Secondary Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    value={phone2}
                    onChange={(e) =>
                      setPhone2(e.target.value.slice(0, 10))
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-2xl font-bold text-[#9c7635]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

             
                <button
                  onClick={handleProceed}
                  className="w-full bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-5 rounded-2xl font-bold text-xl transition"
                >
                  Proceed to Payment
                </button>
              

              <p className="text-center text-sm text-gray-500 mt-4">
                Secure checkout • Multiple payment options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
