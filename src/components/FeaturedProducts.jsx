// import React, { useState, useEffect, memo } from "react";
// import axios from "axios";
// import ProductModal from "./cards/ProductModal";
// import { useWishlist } from "../context/WishlistContext";

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
//     return (
//       <p className="text-center py-20 text-gray-600">
//         Loading products...
//       </p>
//     );
//   }

//   return (
//     <section className="bg-[#ded4b0] px-4 sm:px-10 py-12">
//       <h2 className="text-4xl font-bold text-center text-[#5c4033] mb-10">
//         Featured Products
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//         {products.slice(0, 8).map((product) => {
//           const wishlisted = isWishlisted(product);

//           return (
//             <div
//               key={product.id}
//               onClick={() => setSelectedProduct(product)}
//               className="relative cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
//             >
//               {/* Wishlist Icon */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleWishlist(product);
//                 }}
//                 className="absolute top-3 right-3 p-1"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   className={`w-6 h-6 transition ${
//                     wishlisted
//                       ? "fill-red-500 stroke-red-500"
//                       : "fill-none stroke-gray-400 hover:stroke-red-500"
//                   }`}
//                   strokeWidth="2"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 21s-7.5-4.35-10-8.5C.5 8 3.5 4 7.5 4c2 0 3.5 1 4.5 2.5C13 5 14.5 4 16.5 4 20.5 4 23.5 8 22 12.5 19.5 16.65 12 21 12 21z"
//                   />
//                 </svg>
//               </button>

//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="h-40 w-full object-cover rounded"
//               />

//               <h3 className="mt-2 font-semibold">{product.name}</h3>

//               <p className="text-sm text-gray-500 line-clamp-2">
//                 {product.description}
//               </p>

//               <p className="mt-2 font-bold text-[#9c7635]">
//                 ₹{product.basePrice}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Product Modal */}
//       {selectedProduct && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}
//     </section>
//   );
// };

// export default memo(FeaturedProducts);




import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import ProductModal from "./cards/ProductModal";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  if (products.length === 0) {
    return (
      <p className="text-center py-20 text-gray-600">
        Loading products...
      </p>
    );
  }

  return (
    <section className="bg-[#ded4b0] px-4 sm:px-10 py-12">
      <h2 className="text-4xl font-bold text-center text-[#5c4033] mb-10">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.slice(0, 8).map((product) => {
          const wishlisted = isWishlisted(product);

          return (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="relative cursor-pointer bg-white rounded-xl shadow
                         hover:shadow-lg transition
                         flex flex-col h-full overflow-hidden"
            >
              {/* Wishlist */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className="absolute top-3 right-3 z-10 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`w-6 h-6 transition ${
                    wishlisted
                      ? "fill-red-500 stroke-red-500"
                      : "fill-none stroke-gray-400 hover:stroke-red-500"
                  }`}
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s-7.5-4.35-10-8.5C.5 8 3.5 4 7.5 4c2 0 3.5 1 4.5 2.5C13 5 14.5 4 16.5 4 20.5 4 23.5 8 22 12.5 19.5 16.65 12 21 12 21z"
                  />
                </svg>
              </button>

              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="h-44 w-full object-cover"
              />

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-gray-900">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>

                {/* Bottom section */}
                <div className="mt-auto pt-4">
                  <p className="font-bold text-[#9c7635] mb-3">
                    ₹{product.basePrice}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-full bg-[#9c7635] hover:bg-[#8a6630]
                               text-white font-medium py-2.5 rounded-lg
                               flex items-center justify-center gap-2 transition"
                  >
                    <FiShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
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
