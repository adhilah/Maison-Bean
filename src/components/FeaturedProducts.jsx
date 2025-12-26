// import axios from "axios";
// import { memo, useEffect, useState } from "react";
// import { useWishlist } from "../context/WishlistContext";
// import ProductModal from "./cards/ProductModal";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const { toggleWishlist, isWishlisted } = useWishlist();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("API ERROR:", err));
//   }, []);

//   if (products.length === 0) {
//     return <p className="text-center py-10">Loading...</p>;
//   }

//   return (
//     <div className="bg-[#ded4b0] px-4 sm:px-10">
//       <h2 className="text-2xl text-center font-semibold py-6">
//         Featured Products
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
//         {products.slice(0, 8).map((item) => (
//           <div
//             key={item.id}
//             onClick={() => setSelectedProduct(item)}
//             className="bg-white rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer flex flex-col"
//           >
//             {/* IMAGE */}
//             <div className="h-40 relative">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="h-full w-full object-cover rounded-t-2xl"
//               />

//               {/* WISHLIST */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleWishlist(item);
//                 }}
//                 className="absolute top-3 right-3 bg-white rounded-full p-1 shadow"
//               >
//                 <span
//                   className={`material-symbols-rounded text-xl ${
//                     isWishlisted(item.id)
//                       ? "text-red-500"
//                       : "text-gray-400"
//                   }`}
//                 >
//                   favorite
//                 </span>
//               </button>
//             </div>

//             {/* CONTENT */}
//             <div className="p-4 flex flex-col flex-1">
//               <h3 className="font-semibold line-clamp-2 min-h-[3rem]">
//                 {item.name}
//               </h3>

//               {/* RATING */}
//               {item.rating && (
//                 <div className="flex items-center gap-1 text-sm mt-1">
//                   <span className="text-yellow-500">★</span>
//                   <span className="font-medium">{item.rating}</span>
//                   {item.reviewsCount && (
//                     <span className="text-gray-500">
//                       ({item.reviewsCount})
//                     </span>
//                   )}
//                 </div>
//               )}

//               <p className="font-semibold text-[#9c7635] mt-2">
//                 ₹{item.basePrice}
//               </p>

//               <p className="text-sm text-gray-600 line-clamp-2 mt-1">
//                 {item.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {selectedProduct && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default memo(FeaturedProducts);




import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import ProductModal from "./cards/ProductModal";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  if (products.length === 0) {
    return <p className="text-center py-20 text-gray-600">Loading products...</p>;
  }

  return (
    <section className="bg-[#ded4b0] px-4 sm:px-10 py-12">
      <h2 className="text-4xl font-bold text-center text-[#5c4033] mb-10">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.slice(0, 8).map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedProduct(item)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col"
          >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening modal
                  toggleWishlist(item);
                }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 z-10"
                aria-label={
                  isWishlisted(item.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <span
                  className={`material-symbols-rounded text-2xl font-bold ${
                    isWishlisted(item.id)
                      ? "text-red-600 fill-current"
                      : "text-gray-600"
                  }`}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* Product Details */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-[#5c4033] line-clamp-2 mb-3">
                {item.name}
              </h3>

              {/* Rating */}
              {item.rating && (
                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="font-semibold text-gray-800">
                    {item.rating}
                  </span>
                  {item.reviewsCount && (
                    <span className="text-gray-500">
                      ({item.reviewsCount} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="mt-auto">
                <p className="text-2xl font-bold text-[#9c7635]">
                  ₹{item.basePrice}
                </p>

                {/* Short Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default memo(FeaturedProducts);