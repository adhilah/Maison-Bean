import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Save, Image as ImageIcon, HeartPulse, Tag, DollarSign, FileText, Coffee, ChefHat } from "lucide-react";
import toast from "react-hot-toast";

export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    basePrice: "",
    image: "",
    description: "",
    healthBenefits: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    if (e.target.name === "image") {
      setImageError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.basePrice || !product.category) {
      toast.error("Name, category and price are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/products", {
        ...product,
        basePrice: Number(product.basePrice),
        createdAt: new Date(),
      });

      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to add product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl shadow-sm">
                  <ChefHat className="text-[#a77c3b]" size={24} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
              </div>
              <p className="text-gray-600 ml-12">
                Fill in the details below to add a new item to your menu
              </p>
            </div>

            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-4 py-3 bg-white text-[#a77c3b] font-medium rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-amber-50 border border-amber-100"
            >
              <ArrowLeft size={18} />
              ← Back To Dashboard
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-amber-100">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-1 bg-gradient-to-r from-[#a77c3b] to-[#c7a776] rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
                </div>
                <p className="text-gray-500 text-sm">Fill in the basic information about your product</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Product Name & Category Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Coffee size={16} className="text-[#a77c3b]" />
                      Product Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Product name"
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all duration-200 bg-gray-50/50"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Coffee size={18} className="text-[#a77c3b]" />
                      </div>
                    </div>
                  </div>

                  {/* Category Dropdown */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Tag size={16} className="text-[#a77c3b]" />
                      Category
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 appearance-none transition-all duration-200 bg-gray-50/50"
                      >
                        <option value="">Select a category</option>
                        <option value="Hot Coffee">Hot Coffee</option>
                        <option value="Cold Coffee">Cold Coffee</option>
                        <option value="Croissant">Croissant</option>
                      </select>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Tag size={18} className="text-[#a77c3b]" />
                      </div>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <DollarSign size={16} className="text-[#a77c3b]" />
                    Price
                  </label>
                  <div className="relative max-w-xs">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <DollarSign size={18} className="text-[#a77c3b]" />
                    </div>
                    <input
                      type="number"
                      name="basePrice"
                      value={product.basePrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all duration-200 bg-gray-50/50"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">USD</div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FileText size={16} className="text-[#a77c3b]" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe your product..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all duration-200 bg-gray-50/50 resize-none"
                  />
                  <p className="text-xs text-gray-500 text-right">
                    {product.description.length}/500 characters
                  </p>
                </div>

                {/* Health Benefits */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <HeartPulse size={16} className="text-[#a77c3b]" />
                    Health Benefits
                  </label>
                  <textarea
                    name="healthBenefits"
                    value={product.healthBenefits}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Health benefits of this product..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all duration-200 bg-gray-50/50 resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    Separate benefits with commas (e.g., Boosts energy, Rich in antioxidants, Improves focus)
                  </p>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <ImageIcon size={16} className="text-[#a77c3b]" />
                    Product Image URL
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <ImageIcon size={18} className="text-[#a77c3b]" />
                    </div>
                    <input
                      type="text"
                      name="image"
                      value={product.image}
                      onChange={handleChange}
                      placeholder="Image url or path"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all duration-200 bg-gray-50/50"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Paste a direct image URL. We recommend using high-quality product images.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#a77c3b] to-[#c5a068] text-white rounded-xl font-semibold hover:from-[#a57835] hover:to-[#a2732e] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Add Product to Menu
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* Preview Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-amber-100 mb-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-1 bg-gradient-to-r from-[#a77c3b] to-[#ca9d59] rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
                </div>

                <div className="space-y-6">
                  {/* Image Preview */}
                  <div className="relative">
                    <div className="aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 to-rose-50 border-2 border-dashed border-amber-200 flex items-center justify-center">
                      {product.image && !imageError ? (
                        <img
                          src={product.image}
                          alt="Product preview"
                          onError={() => setImageError(true)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-6">
                          <ImageIcon size={48} className="text-[#c6a26a] mx-auto mb-3" />
                          <p className="text-sm text-[#a77c3b] font-medium">Product Image Preview</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {product.image ? "Failed to load image" : "Add an image URL to see preview"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info Preview */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {product.name || "Product Name"}
                          </h3>
                          <p className="text-sm text-[#a77c3b] font-medium mt-1">
                            {product.category || "Category"}
                          </p>
                        </div>
                        {product.basePrice && (
                          <div className="bg-amber-50 text-[#a77c3b] font-bold px-3 py-1 rounded-lg">
                            ${parseFloat(product.basePrice).toFixed(2)}
                          </div>
                        )}
                      </div>

                      {product.description && (
                        <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {product.healthBenefits && (
                        <div className="mt-4">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Health Benefits:</p>
                          <div className="flex flex-wrap gap-2">
                            {product.healthBenefits
                              .split(",")
                              .filter(benefit => benefit.trim())
                              .slice(0, 3)
                              .map((benefit, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                                >
                                  {benefit.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-6 border border-amber-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#a77c3b]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Tips for better products
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c5a068] mt-1.5"></div>
                    Use high-quality, appetizing product images
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c5a068] mt-1.5"></div>
                    Keep descriptions clear and enticing
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c5a068] mt-1.5"></div>
                    Highlight unique selling points
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c5a068] mt-1.5"></div>
                    Ensure accurate pricing and categories
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}