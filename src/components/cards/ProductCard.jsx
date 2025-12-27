import { useState } from "react";
import ProductModal from "./ProductModal";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
      >
        {/* Wishlist Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 p-1"
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

        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover rounded"
        />

        <h3 className="mt-2 font-semibold">{product.name}</h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <p className="mt-2 font-bold text-[#9c7635]">
          ₹{product.basePrice}
        </p>
      </div>

      {open && (
        <ProductModal
          product={product}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
