// import axios from "axios";
// import { memo, useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const { addToCart } = useCart();
//   const { wishlist, toggleWishlist, isWishlisted } = useWishlist();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("API ERROR:", err));
//   }, []);

// const { carts, addToCarts } = useCart();

// useEffect(() => {
//   console.log("CART UPDATED:", carts);
// }, [carts]);

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
//             className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
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

//               <p className="font-semibold text-[#9c7635] mt-1">
//                 ₹{item.basePrice}
//               </p>

//               <p className="text-sm text-gray-600 line-clamp-2 mt-1">
//                 {item.description}
//               </p>

//               {/* ADD TO CART */}
//               <button
//                 onClick={() => addToCart(item)}
//                 className="mt-auto bg-[#9c7635] hover:bg-[#6c5225] text-white py-2 rounded-lg"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default memo(FeaturedProducts);


// // =============================================================================================


import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast"; 

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API ERROR:", err));
  }, []);

const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      icon: ' ',
      duration: 2200,
      position: "top-center", 
      style: {
        background: '#7a5c2a',
        color: 'white',
        fontSize: '16px',
        fontWeight: '600',
        borderRadius: '12px',
        padding: '14px 24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    });
  };

  if (products.length === 0) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="bg-[#ded4b0] px-4 sm:px-10">
      <h2 className="text-2xl text-center font-semibold py-6">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
        {products.slice(0, 8).map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
          >
            {/* IMAGE */}
            <div className="h-40 relative">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover rounded-t-2xl"
              />

              {/* WISHLIST */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item);
                }}
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow"
              >
                <span
                  className={`material-symbols-rounded text-xl ${
                    isWishlisted(item.id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold line-clamp-2 min-h-[3rem]">
                {item.name}
              </h3>

              <p className="font-semibold text-[#9c7635] mt-1">
                ₹{item.basePrice}
              </p>

              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {item.description}
              </p>

              {/* ADD TO CART */}
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-auto bg-[#9c7635] hover:bg-[#6c5225] text-white py-2 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(FeaturedProducts);
