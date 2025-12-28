import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useCart } from "../../context/CartContext";
import RecommendationCarousel from "../cards/RecommendationCarousel";
import { useWishlist } from "../../context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Load products for recommendation
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const getPrice = (product) => Number(product.basePrice ?? product.price ?? 0);

  if (!wishlist) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <button onClick={() => navigate("/")} className="text-[#9c7635] hover:underline">
            ← Continue shopping
          </button>
        </div>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        ) : (
          wishlist.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedItem(product)}
              className="bg-white p-4 rounded-xl shadow mb-4 cursor-pointer relative"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className="absolute top-3 right-3 text-red-500"
              >
                ✕
              </button>

              <div className="flex gap-4">
                <img
                  src={product.image}
                  className="w-28 h-20 object-contain bg-gray-100 rounded"
                />
                <div>
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="text-[#9c7635] font-bold">
                    ₹{getPrice(product).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recommendations */}
      {products.length > 0 && (
        <RecommendationCarousel recommendations={products.slice(0, 6)} />
      )}

      {/* Modal */}
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
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-48 object-contain bg-gray-100 rounded mb-4"
              />

              <h2 className="text-2xl font-bold">{selectedItem.name}</h2>

              <p className="text-gray-500 mb-2">
                Category: {selectedItem.category || "N/A"}
              </p>

              <p className="mb-4">
                {selectedItem.description || "No description available."}
              </p>

              <div className="flex justify-between mb-6">
                <span className="text-xl font-bold text-[#9c7635]">
                  ₹{getPrice(selectedItem).toFixed(2)}
                </span>
              </div>

              {/* Add to Cart */}
              <button
                className="w-full bg-[#9c7635] text-white py-3 rounded-xl"
                onClick={() => {
                  addToCart(selectedItem);
                  setSelectedItem(null);
                }}
              >
                Add to Cart
              </button>

              {/* Customize button for coffee only */}
              {selectedItem.category
                ?.toString()
                .trim()
                .toLowerCase()
                .includes("coffee") && (
                <button
                  className="w-full mt-3 bg-gray-200 text-[#9c7635] py-3 rounded-xl"
                  onClick={() =>
                    navigate(`/customize/${selectedItem.id}`, {
                      state: { product: selectedItem },
                    })
                  }
                >
                  Customize
                </button>
              )}

              <button
                onClick={() => toggleWishlist(selectedItem)}
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
