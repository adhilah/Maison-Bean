import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../hooks/useWishlist";

const Card = () => {
  const [product, setProduct] = useState([]);
  const { fetchCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProduct(res.data);
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = async (item) => {
    try {
      await axios.post("http://localhost:3000/cart", {
        productId: item.id,
        quantity: 1,
      });

      fetchCart(); // ✅ THIS IS THE ANSWER
      alert("Added to cart");
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (product.length === 0) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="bg-amber-100 px-4 sm:px-10 lg:px-25">
      <h2 className="text-2xl  text-black text-center mb-4 px-4 pt-6">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {product.slice(0, 8).map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
          >
            {/* IMAGE ===============================================================================================*/}
            <div className="h-40 relative">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />

              {/* WISHLIST========================================================================================== */}
              <button
                onClick={() => toggleWishlist(item.id)}
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow hover:scale-110 transition"
              >
                <span
                  className={`material-symbols-rounded text-xl ${
                    wishlist[item.id] ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  favorite
                </span>
              </button>
            </div>

            {/* CONTENT==================================================================================================== */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-amber-700 font-semibold mt-1">
                  ${item.basePrice}
                </p>
                <p className="text-sm">{item.description}</p>
              </div>

              {/* ADD TO CART============================================================================================= */}
              <button
                onClick={() => addToCart(item)}
                className="bg-amber-700 text-white py-2 rounded mt-3"
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

export default memo(Card);
