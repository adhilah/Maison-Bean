// import React, { useState, useEffect, memo } from "react";
// import axios from "axios";
// import ProductModal from "./cards/ProductModal";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";
// import { FiShoppingCart } from "react-icons/fi";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const { toggleWishlist, isWishlisted } = useWishlist();
//   const { addToCart } = useCart();

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
//               className="relative cursor-pointer bg-white rounded-xl shadow
//                          hover:shadow-lg transition
//                          flex flex-col h-full overflow-hidden"
//             >
//               {/* Wishlist */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleWishlist(product);
//                 }}
//                 className="absolute top-3 right-3 z-10 p-1"
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

//               {/* Image */}
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="h-44 w-full object-cover"
//               />

//               {/* Content */}
//               <div className="p-4 flex flex-col flex-1">
//                 <h3 className="font-semibold text-lg text-gray-900">
//                   {product.name}
//                 </h3>

//                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">
//                   {product.description}
//                 </p>

//                 {/* Bottom section */}
//                 <div className="mt-auto pt-4">
//                   <p className="font-bold text-[#9c7635] mb-3">
//                     ₹{product.basePrice}
//                   </p>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToCart(product);
//                     }}
//                     className="w-full bg-[#9c7635] hover:bg-[#8a6630]
//                                text-white font-medium py-2.5 rounded-lg
//                                flex items-center justify-center gap-2 transition"
//                   >
//                     <FiShoppingCart size={18} />
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Modal */}
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

const HeartIcon = ({ filled }) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill={filled ? "#c9a96e" : "none"}
    stroke={filled ? "#c9a96e" : "rgba(245,240,232,0.6)"}
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="transition-all duration-300"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const SkeletonCard = () => (
  <div className="bg-[#110d07] border border-[#c9a96e]/10 overflow-hidden">
    <div className="h-[260px] bg-gradient-to-r from-[#1a1510] via-[#211a12] to-[#1a1510] bg-[length:200%_100%] animate-[shimmer_1.8s_infinite]" />
    <div className="p-6">
      <div className="h-[7px] w-[38%] bg-[#1e1810] mb-3 rounded" />
      <div className="h-4 w-[72%] bg-[#1e1810] mb-2 rounded" />
      <div className="h-[7px] w-[90%] bg-[#1e1810] mb-1 rounded" />
      <div className="h-[7px] w-[55%] bg-[#1e1810] rounded" />
    </div>
  </div>
);

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* FULL-BLEED SECTION - Same style as your HeroSection */}
      <section className="bg-[#0d0a05] pt-16 pb-28 relative overflow-hidden font-['Jost',sans-serif]">

        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.5em] uppercase mb-3">
                HANDPICKED FOR YOU
              </p>
              <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(2.4rem,5vw,3.5rem)] font-light leading-none tracking-wide text-[#f5f0e8]">
                Featured <span className="italic text-[#c9a96e]">Products</span>
              </h2>
            </div>

            <a 
              href="/menu" 
              className="text-[#c9a96e]/70 hover:text-[#c9a96e] text-xs tracking-[0.3em] uppercase flex items-center gap-3 transition-all group self-end md:self-auto"
            >
              VIEW ALL
              <span className="group-hover:w-11 transition-all w-7 h-px bg-current inline-block" />
            </a>
          </div>

          {/* FULL WIDTH GRID - Tight & Clean */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#c9a96e]/10">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : products.slice(0, 8).map((product, idx) => {
                  const wishlisted = isWishlisted(product);
                  const isAdded = addedId === product.id;

                  return (
                    <div
                      key={product.id}
                      className="group bg-[#110d07] border border-[#c9a96e]/10 hover:border-[#c9a96e]/30 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {/* Image */}
                      <div className="relative h-[260px] overflow-hidden bg-[#1a1510]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#110d07] to-transparent" />

                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                          className="absolute top-3 right-3 w-8 h-8 bg-[#080502]/80 backdrop-blur-md border border-[#c9a96e]/20 rounded-full flex items-center justify-center hover:border-[#c9a96e]/50 hover:scale-110 transition-all"
                        >
                          <HeartIcon filled={wishlisted} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 flex flex-col border-t border-[#c9a96e]/10">
                        {product.category && (
                          <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.4em] uppercase mb-2 opacity-75">
                            {product.category}
                          </p>
                        )}

                        <h3 className="font-['Cormorant_Garamond',serif] text-[1.35rem] leading-tight font-light text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors mb-3">
                          {product.name}
                        </h3>

                        <p className="text-[#f5f0e8]/45 text-[13px] leading-relaxed line-clamp-2 mb-6 flex-1">
                          {product.description}
                        </p>

                        {/* Premium Gold Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#c9a96e]/10 mt-auto">
                          <span className="font-['Cormorant_Garamond',serif] text-2xl font-light text-[#c9a96e]">
                            ₹{product.basePrice}
                          </span>

                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className={`
                              flex items-center justify-center gap-2 
                              px-6 py-2.5
                              text-[0.58rem] font-light tracking-[0.28em] uppercase
                              text-[#0d0a05] bg-[#c9a96e]
                              hover:bg-[#d4b87a] active:bg-[#c9a96e]
                              transition-all duration-300
                              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/50
                            `}
                            style={{ fontFamily: "'Jost', sans-serif" }}
                          >
                            <CartIcon />
                            {isAdded ? "Added ✓" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
};

export default memo(FeaturedProducts);