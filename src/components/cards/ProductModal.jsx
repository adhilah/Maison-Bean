import { useNavigate } from "react-router-dom"; 
// import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { getLoggedInUser } from "../../utils/auth";


export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isCoffee = product.category
    ?.toLowerCase()
    .includes("coffee");

  const handleAddToCart = () => {
  const user = getLoggedInUser();

  if (!user) {
    toast.error("Please login to add to cart");
    return;
  }

  addToCart({
  productId: product.id,
  isCustomized: false,
});

  onClose();
};


  if (!product) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-full object-cover rounded-xl mb-4"
          />

          {/* Name */}
          <h2 className="text-2xl font-bold mb-1">
            {product.name}
          </h2>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500">/ 5</span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          {/* Health Benefits */}
          {product.healthBenefits && (
  <div className="mb-4">
    <h4 className="font-semibold mb-2">Health Benefits</h4>

    {Array.isArray(product.healthBenefits) ? (
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        {product.healthBenefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-600">
        {product.healthBenefits}
      </p>
    )}
  </div>
)}

          {/* Price */}
          <p className="text-2xl font-bold text-[#9c7635] mb-6">
            ${product.basePrice}
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-3 rounded-xl font-semibold transition"
            >
              Add to Cart
            </button>

            {isCoffee && (
  <button
    onClick={() => {
      const user = getLoggedInUser();

      if (!user) {
        toast.error("Please login to customize product");
        return;
      }

      onClose();
      navigate(`/customize/${product.id}`);
    }}
    className="w-full border-2 border-[#9c7635] text-[#9c7635] py-3 rounded-xl font-semibold hover:bg-[#9c7635]/10 transition"
  >
    Customize
  </button>
)}

          </div>
        </div>
      </div>
    </>
  );
}
