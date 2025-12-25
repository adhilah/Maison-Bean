import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isCoffee = product.category
    ?.toLowerCase()
    .includes("coffee");

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      isCustomized: false,
    });
    toast.success("Added to cart");
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500"
          >
            ✕
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover rounded mb-4"
          />

          <h2 className="text-xl font-bold mb-2">
            {product.name}
          </h2>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-[#9c7635] mb-6">
            ${product.basePrice}
          </p>

          {/* ACTIONS */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#9c7635] hover:bg-[#7a5c2a] text-white py-3 rounded-xl font-semibold"
            >
              Add to Cart
            </button>

            {isCoffee && (
              <button
                onClick={() =>
                  navigate(`/customize/${product.id}`)
                }
                className="w-full border-2 border-[#9c7635] text-[#9c7635] py-3 rounded-xl font-semibold"
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
