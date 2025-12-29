import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";

const API = "http://localhost:3000";

export default function CustomizeProduct() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [beanTypes, setBeanTypes] = useState([]);
  const [milkOptions, setMilkOptions] = useState([]);
  const [selectedBean, setSelectedBean] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No product ID provided.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching product:", id); // Debug log

        const [productRes, beanRes, milkRes] = await Promise.all([
          axios.get(`${API}/products/${id}`),
          axios.get(`${API}/beanTypes`),
          axios.get(`${API}/milkOptions`),
        ]);

        console.log("Product:", productRes.data);
        console.log("Beans:", beanRes.data);
        console.log("Milks:", milkRes.data);

        setProduct(productRes.data);
        setBeanTypes(beanRes.data || []);
        setMilkOptions(milkRes.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        if (err.response?.status === 404) {
          setError("Product not found. Try Cappuccino (ID: 1) or Americano (ID: 2).");
        } else {
          setError(`Failed to load: ${err.message}. Check if JSON server is running on port 3000 with beanTypes/milkOptions.`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded-2xl text-center max-w-md">
          <div className="w-16 h-16 border-4 border-[#9c7635]/30 border-t-[#9c7635] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading your coffee customization...</p>
          <p className="text-sm text-gray-500 mt-2">Product ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        <div className="bg-white p-8 rounded-2xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-500">!</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error || "Product not found."}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#9c7635] text-white rounded-xl font-semibold hover:bg-[#7a5c2a] transition"
          >
            ← Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const isCoffee = product.category?.toLowerCase().includes("coffee");
  const basePrice = Number(product.basePrice) || 150;
  const totalPrice = basePrice + (selectedBean?.priceAdd || 0) + (selectedMilk?.priceAdd || 0);

  const handleAddToCart = () => {
    if (isCoffee && (!selectedBean || !selectedMilk)) {
      alert("Please select both bean type and milk option for your coffee");
      return;
    }

    const customizedItem = {
      id: Date.now().toString() + Math.random(),
      productId: product.id,
      name: isCoffee 
        ? `Custom ${product.name} (${selectedBean?.name || ''}${selectedMilk ? ` + ${selectedMilk.name}` : ''})`
        : product.name,
      category: product.category,
      image: product.image,
      basePrice: totalPrice,
      quantity: 1,
      beanId: selectedBean?.id,
      milkId: selectedMilk?.id,
      bean: selectedBean?.name,
      milk: selectedMilk?.name,
      description: isCoffee 
        ? `Customized with ${selectedBean?.name} beans and ${selectedMilk?.name}`
        : product.description,
      isCustomized: isCoffee,
    };

    console.log("Adding to cart:", customizedItem);
    addToCart(customizedItem);
  //  toast.success(`Added customized ${product.name} to cart! Total: ₹${totalPrice.toFixed(2)}`);

navigate("/cart");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-8">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl w-full max-w-4xl p-8 relative max-h-[95vh] overflow-y-auto shadow-2xl border border-white/50">
        
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 w-12 h-12 bg-white/80 hover:bg-white rounded-2xl flex items-center justify-center text-2xl text-gray-700 hover:text-[#9c7635] shadow-lg transition-all duration-200 hover:scale-110"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-3xl mx-auto mb-4 shadow-xl border-4 border-white/50"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9c7635] to-[#d4a574] bg-clip-text text-transparent mb-2">
            Customize {product.name}
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">{product.description}</p>
        </div>

        {/* Customization Options - Parallel Layout */}
{isCoffee ? (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
    
    {/* =========================================== BEAN TYPES ======================================================== */}
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        Bean Type
      </h2>

      <div className="max-h-[320px] overflow-y-auto pr-2 space-y-4">
        {beanTypes.map((bean) => (
          <label
            key={bean.id}
            className={`flex justify-between items-start p-4 rounded-xl border cursor-pointer transition
              ${
                selectedBean?.id === bean.id
                  ? "border-[#9c7635] bg-[#fff7eb]"
                  : "border-gray-200 hover:border-[#9c7635]/50"
              }`}
          >
            <input
              type="radio"
              name="bean"
              className="hidden"
              checked={selectedBean?.id === bean.id}
              onChange={() => setSelectedBean(bean)}
            />

            <div>
              <p className="font-bold text-lg">{bean.name}</p>
              <p className="text-sm text-gray-600">{bean.description}</p>
            </div>

            {bean.priceAdd > 0 && (
              <span className="text-sm font-semibold text-[#9c7635]">
                +₹{bean.priceAdd}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
    {/* ================================================== MILK TYPES ================================================ */}
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        Milk Type
      </h2>

      <div className="max-h-[320px] overflow-y-auto pr-2 space-y-4">
        {milkOptions.map((milk) => (
          <label
            key={milk.id}
            className={`flex justify-between items-start p-4 rounded-xl border cursor-pointer transition
              ${
                selectedMilk?.id === milk.id
                  ? "border-[#9c7635] bg-[#fff7eb]"
                  : "border-gray-200 hover:border-[#9c7635]/50"
              }`}
          >
            <input
              type="radio"
              name="milk"
              className="hidden"
              checked={selectedMilk?.id === milk.id}
              onChange={() => setSelectedMilk(milk)}
            />

            <div>
              <p className="font-bold text-lg">{milk.name}</p>
              <p className="text-sm text-gray-600">
                {milk.calories} calories
              </p>
            </div>

            {milk.priceAdd > 0 && (
              <span className="text-sm font-semibold text-[#9c7635]">
                +₹{milk.priceAdd}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  </div>
) : (
  <p className="text-center text-gray-500 py-12">
    No customization available for this product.
  </p>
)}

        {/* Order Summary */}
        <div className="bg-gradient-to-r from-[#9c7635]/5 to-[#d4a574]/5 backdrop-blur-sm p-8 rounded-3xl border border-[#9c7635]/20">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-lg">
              <span>Base Price</span>
              <span>₹{basePrice.toFixed(2)}</span>
            </div>
            {isCoffee && (
              <>
                {selectedBean && (
                  <div className="flex justify-between text-lg">
                    <span>{selectedBean.name} Beans</span>
                    <span>+₹{selectedBean.priceAdd.toFixed(2)}</span>
                  </div>
                )}
                {selectedMilk && (
                  <div className="flex justify-between text-lg">
                    <span>{selectedMilk.name}</span>
                    <span>+₹{selectedMilk.priceAdd.toFixed(2)}</span>
                  </div>
                )}
              </>
            )}
            <div className="border-t pt-4">
              <div className="flex justify-between text-3xl font-black text-[#9c7635]">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isCoffee && (!selectedBean || !selectedMilk)}
            className="w-full py-5 px-8 text-xl font-bold bg-gradient-to-r from-[#9c7635] to-[#d4a574] hover:from-[#7a5c2a] hover:to-[#b88c5f] text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isCoffee ? "Add Customized Coffee to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}