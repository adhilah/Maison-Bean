// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dialog } from "@headlessui/react";

// const WishlistPage = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/wishlist")
//       .then((res) => setWishlist(res.data))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   const isCoffee =
//     selectedItem?.category?.toLowerCase().includes("coffee");

//   const handleRemoveFromWishlist = () => {
//     if (!selectedItem) return;

//     axios
//       .delete(`http://localhost:3000/wishlist/${selectedItem.id}`)
//       .then(() => {
//         setWishlist((prev) =>
//           prev.filter((item) => item.id !== selectedItem.id)
//         );
//         setSelectedItem(null);
//       })
//       .catch((err) => console.error(err));
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-[#faf9f7] py-10 px-4">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-gray-800">
//           My Wishlist
//         </h1>

//         {wishlist.length === 0 ? (
//           <p className="text-center text-gray-600">
//             Your wishlist is empty.
//           </p>
//         ) : (
//           <div className="space-y-5">
//             {wishlist.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => setSelectedItem(item)}
//                 className="flex gap-5 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer p-4"
//               >
//                 {/* IMAGE */}
//                 <div className="w-36 h-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>

//                 {/* CONTENT */}
//                 <div className="flex-1">
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     {item.name}
//                   </h2>

//                   <p className="text-sm text-gray-500 mb-2">
//                     Category: {item.category}
//                   </p>

//                   <div className="flex items-center gap-3">
//                     <span className="text-[#9c7635] font-bold text-lg">
//                       ₹{item.basePrice.toFixed(2)}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       {item.baseCalories} kcal
//                     </span>
//                   </div>

//                   <div className="mt-2 text-sm">
//                     <span className="text-yellow-500">
//                       {"★".repeat(Math.floor(item.rating))}
//                       {"☆".repeat(5 - Math.floor(item.rating))}
//                     </span>
//                     <span className="text-gray-500 ml-2">
//                       ({item.reviewsCount})
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ================= MODAL ================= */}
//       <Dialog
//         open={!!selectedItem}
//         onClose={() => setSelectedItem(null)}
//         className="fixed inset-0 z-50"
//       >
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
//           {selectedItem && (
//             <Dialog.Panel className="bg-white rounded-2xl max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
//               <button
//                 onClick={() => setSelectedItem(null)}
//                 className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800"
//               >
//                 ✕
//               </button>

//               {/* IMAGE */}
//               <div className="h-48 bg-gray-100 rounded-xl overflow-hidden mb-5">
//                 <img
//                   src={selectedItem.image}
//                   alt={selectedItem.name}
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               <h2 className="text-2xl font-bold text-gray-800">
//                 {selectedItem.name}
//               </h2>

//               <p className="text-gray-500 mb-3">
//                 Category: {selectedItem.category}
//               </p>

//               <p className="text-gray-700 mb-4">
//                 {selectedItem.description}
//               </p>

//               {selectedItem.healthBenefits && (
//                 <div className="bg-[#f3efe7] p-4 rounded-lg mb-4">
//                   <h4 className="font-semibold mb-1">Health Benefits</h4>
//                   <p className="text-sm text-gray-700">
//                     {selectedItem.healthBenefits}
//                   </p>
//                 </div>
//               )}

//               <div className="flex items-center justify-between mb-6">
//                 <p className="text-2xl font-bold text-[#9c7635]">
//                   ₹{selectedItem.basePrice.toFixed(2)}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {selectedItem.baseCalories} kcal
//                 </p>
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="flex gap-3">
//                 <button
//                   className="flex-1 bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-3 rounded-xl font-semibold transition"
//                   onClick={() => {
//                     console.log("Add to cart:", selectedItem);
//                     setSelectedItem(null);
//                   }}
//                 >
//                   Add to Cart
//                 </button>

//                 {isCoffee && (
//                   <button
//                     className="flex-1 border-2 border-[#9c7635] text-[#9c7635] py-3 rounded-xl font-semibold hover:bg-[#9c7635]/10 transition"
//                     onClick={() => console.log("Customize:", selectedItem)}
//                   >
//                     Customize
//                   </button>
//                 )}
//               </div>

//               {/* REMOVE */}
//               <button
//                 onClick={handleRemoveFromWishlist}
//                 className="w-full mt-4 text-red-600 font-medium hover:underline"
//               >
//                 Remove from Wishlist
//               </button>
//             </Dialog.Panel>
//           )}
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default WishlistPage;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/wishlist";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // SAFE PRICE HANDLER
  const getPrice = (item) =>
    Number(
      item?.product?.basePrice ??
      item?.product?.price ??
      0
    );

  // LOAD WISHLIST
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(API_URL);
        setWishlist(res.data);
      } catch (err) {
        console.error("Wishlist fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  // REMOVE ITEM
  const removeItem = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/${itemId}`);
      setWishlist((prev) => prev.filter((w) => w.id !== itemId));
      setSelectedItem(null);
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <button
            onClick={() => navigate("/")}
            className="text-[#9c7635] hover:underline"
          >
            ← Back
          </button>
        </div>

        {/* EMPTY */}
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="space-y-4">
            {wishlist.map((item) => {
              const p = item.product;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white p-4 rounded-xl shadow cursor-pointer relative"
                >
                  {/* REMOVE */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    className="absolute top-3 right-3 text-red-500"
                  >
                    ✕
                  </button>

                  <div className="flex gap-4">
                    <img
                      src={p?.image}
                      alt={p?.name}
                      className="w-28 h-20 object-contain bg-gray-100 rounded"
                    />

                    <div>
                      <h2 className="font-semibold">
                        {p?.name || "Unnamed product"}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Category: {p?.category || "N/A"}
                      </p>
                      <p className="text-[#9c7635] font-bold">
                        ${getPrice(item).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      <Dialog
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        className="fixed inset-0 z-50"
      >
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          {selectedItem && (
            <Dialog.Panel className="bg-white max-w-xl w-full rounded-xl p-6 relative">

              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 text-xl"
              >
                ✕
              </button>

              <img
                src={selectedItem.product?.image}
                alt={selectedItem.product?.name}
                className="w-full h-48 object-contain bg-gray-100 rounded mb-4"
              />

              <h2 className="text-2xl font-bold">
                {selectedItem.product?.name}
              </h2>

              <p className="text-gray-500 mb-2">
                Category: {selectedItem.product?.category || "N/A"}
              </p>

              <p className="mb-4">
                {selectedItem.product?.description || "No description available."}
              </p>

              <div className="flex justify-between mb-6">
                <span className="text-xl font-bold text-[#9c7635]">
                  ${getPrice(selectedItem).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  {selectedItem.product?.baseCalories ?? 0} kcal
                </span>
              </div>

              <button
                className="w-full bg-[#9c7635] text-white py-3 rounded-xl"
                onClick={() => {
                  console.log("Add to cart", selectedItem.product);
                  setSelectedItem(null);
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={() => removeItem(selectedItem.id)}
                className="w-full mt-3 text-[#9c7635] hover:underline"
              >
                Remove from Wishlist
              </button>
            </Dialog.Panel>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default WishlistPage;
