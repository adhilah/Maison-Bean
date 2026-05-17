// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../../services/api";
// import { ArrowLeft, Save, Image as ImageIcon, HeartPulse, Tag, DollarSign, FileText, Coffee, ChefHat } from "lucide-react";
// import toast from "react-hot-toast";

// export default function AddProduct() {
//   const navigate = useNavigate();

//   const [product, setProduct] = useState({
//     name: "",
//     category: "",
//     basePrice: "",
//     image: "",
//     description: "",
//     healthBenefits: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//     if (e.target.name === "image") {
//       setImageError(false);
//     }
//   };

//   const handleSubmit = async (e) => {

//   e.preventDefault();

//   if (!product.name || !product.basePrice || !product.category) {

//     toast.error("Name, category and price are required");

//     return;
//   }

//   try {

//     setLoading(true);

//     await api.post("/products/product/ad", {

//       ...product,

//       price: Number(product.basePrice),
//     });

//     toast.success("Product added successfully!");

//     navigate("/admin/products");

//   } catch (err) {

//     console.error(err);

//     toast.error(
//       err.response?.data?.message ||
//       "Failed to add product"
//     );

//   } finally {

//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 p-4 md:p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="p-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl shadow-sm">
//                   <ChefHat className="text-[#a77c3b]" size={24} />
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
//               </div>
//               <p className="text-gray-600 ml-12">
//                 Fill in the details below to add a new item to your menu
//               </p>
//             </div>

//             <Link
//               to="/admin/dashboard"
//               className="flex items-center gap-2 px-4 py-3 bg-white text-[#a77c3b] font-medium rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-amber-50 border border-amber-100"
//             >
//               <ArrowLeft size={18} />
//               ← Back To Dashboard
//             </Link>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-amber-100">
//               <div className="mb-8">
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="w-8 h-1 bg-gradient-to-r from-[#a77c3b] to-[#c7a776] rounded-full"></div>
//                   <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
//                 </div>
//                 <p className="text-gray-500 text-sm">Fill in the basic information about your product</p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Product Name & Category Row */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Product Name */}
//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                       <Coffee size={16} className="text-[#a77c3b]" />
//                       Product Name
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         name="name"
//                         value={product.name}
//                         onChange={handleChange}
//                         placeholder="Product name"
//                         className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all duration-200 bg-gray-50/50"
//                       />
//                       <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                         <Coffee size={18} className="text-[#a77c3b]" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Category Dropdown */}
//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                       <Tag size={16} className="text-[#a77c3b]" />
//                       Category
//                     </label>
//                     <div className="relative">
//                       <select
//                         name="category"
//                         value={product.category}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 appearance-none transition-all duration-200 bg-gray-50/50"
//                       >
//                         <option value="">Select a category</option>
//                         <option value="Hot Coffee">Hot Coffee</option>
//                         <option value="Cold Coffee">Cold Coffee</option>
//                         <option value="Croissant">Croissant</option>
//                       </select>
//                       <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                         <Tag size={18} className="text-[#a77c3b]" />
//                       </div>
//                       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                     <DollarSign size={16} className="text-[#a77c3b]" />
//                     Price
//                   </label>
//                   <div className="relative max-w-xs">
//                     <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                       <DollarSign size={18} className="text-[#a77c3b]" />
//                     </div>
//                     <input
//                       type="number"
//                       name="basePrice"
//                       value={product.basePrice}
//                       onChange={handleChange}
//                       placeholder="0.00"
//                       step="0.01"
//                       min="0"
//                       className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all duration-200 bg-gray-50/50"
//                     />
//                     <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">USD</div>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                     <FileText size={16} className="text-[#a77c3b]" />
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={product.description}
//                     onChange={handleChange}
//                     rows={3}
//                     placeholder="Describe your product..."
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all duration-200 bg-gray-50/50 resize-none"
//                   />
//                   <p className="text-xs text-gray-500 text-right">
//                     {product.description.length}/500 characters
//                   </p>
//                 </div>

//                 {/* Health Benefits */}
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                     <HeartPulse size={16} className="text-[#a77c3b]" />
//                     Health Benefits
//                   </label>
//                   <textarea
//                     name="healthBenefits"
//                     value={product.healthBenefits}
//                     onChange={handleChange}
//                     rows={2}
//                     placeholder="Health benefits of this product..."
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all duration-200 bg-gray-50/50 resize-none"
//                   />
//                   <p className="text-xs text-gray-500">
//                     Separate benefits with commas (e.g., Boosts energy, Rich in antioxidants, Improves focus)
//                   </p>
//                 </div>

//                 {/* Image URL */}
//                 <div className="space-y-2">
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                     <ImageIcon size={16} className="text-[#a77c3b]" />
//                     Product Image URL
//                   </label>
//                   <div className="relative">
//                     <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                       <ImageIcon size={18} className="text-[#a77c3b]" />
//                     </div>
//                     <input
//                       type="text"
//                       name="image"
//                       value={product.image}
//                       onChange={handleChange}
//                       placeholder="Image url or path"
//                       className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all duration-200 bg-gray-50/50"
//                     />
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     Paste a direct image URL. We recommend using high-quality product images.
//                   </p>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-6 border-t border-gray-200">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#a77c3b] to-[#c5a068] text-white rounded-xl font-semibold hover:from-[#a57835] hover:to-[#a2732e] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto"
//                   >
//                     {loading ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                         Adding Product...
//                       </>
//                     ) : (
//                       <>
//                         <Save size={18} />
//                         Add Product to Menu
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Right Column - Preview */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-6">
//               {/* Preview Card */}
//               <div className="bg-white rounded-2xl shadow-xl p-6 border border-amber-100 mb-6">
//                 <div className="flex items-center gap-2 mb-6">
//                   <div className="w-8 h-1 bg-gradient-to-r from-[#a77c3b] to-[#ca9d59] rounded-full"></div>
//                   <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
//                 </div>

//                 <div className="space-y-6">
//                   {/* Image Preview */}
//                   <div className="relative">
//                     <div className="aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 to-rose-50 border-2 border-dashed border-amber-200 flex items-center justify-center">
//                       {product.image && !imageError ? (
//                         <img
//                           src={product.image}
//                           alt="Product preview"
//                           onError={() => setImageError(true)}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="text-center p-6">
//                           <ImageIcon size={48} className="text-[#c6a26a] mx-auto mb-3" />
//                           <p className="text-sm text-[#a77c3b] font-medium">Product Image Preview</p>
//                           <p className="text-xs text-gray-500 mt-1">
//                             {product.image ? "Failed to load image" : "Add an image URL to see preview"}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Product Info Preview */}
//                   <div className="space-y-4">
//                     <div>
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-bold text-lg text-gray-900">
//                             {product.name || "Product Name"}
//                           </h3>
//                           <p className="text-sm text-[#a77c3b] font-medium mt-1">
//                             {product.category || "Category"}
//                           </p>
//                         </div>
//                         {product.basePrice && (
//                           <div className="bg-amber-50 text-[#a77c3b] font-bold px-3 py-1 rounded-lg">
//                             ${parseFloat(product.basePrice).toFixed(2)}
//                           </div>
//                         )}
//                       </div>

//                       {product.description && (
//                         <p className="text-gray-600 text-sm mt-3 line-clamp-2">
//                           {product.description}
//                         </p>
//                       )}

//                       {product.healthBenefits && (
//                         <div className="mt-4">
//                           <p className="text-xs font-semibold text-gray-700 mb-2">Health Benefits:</p>
//                           <div className="flex flex-wrap gap-2">
//                             {product.healthBenefits
//                               .split(",")
//                               .filter(benefit => benefit.trim())
//                               .slice(0, 3)
//                               .map((benefit, index) => (
//                                 <span
//                                   key={index}
//                                   className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
//                                 >
//                                   {benefit.trim()}
//                                 </span>
//                               ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Help Card */}
//               <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-6 border border-amber-200">
//                 <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                   <svg className="w-5 h-5 text-[#a77c3b]" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                   </svg>
//                   Tips for better products
//                 </h3>
//                 <ul className="space-y-3 text-sm text-gray-700">
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 rounded-full bg-[#c5a068] mt-1.5"></div>
//                     Use high-quality, appetizing product images
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 rounded-full bg-[#c5a068] mt-1.5"></div>
//                     Keep descriptions clear and enticing
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 rounded-full bg-[#c5a068] mt-1.5"></div>
//                     Highlight unique selling points
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 rounded-full bg-[#c5a068] mt-1.5"></div>
//                     Ensure accurate pricing and categories
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

// ── Icons ──────────────────────────────────────────────────────
const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const SaveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);
const ChefHatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 019.18 0A4 4 0 0118 13.87V21H6z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
);
const ImageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const RupeeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12M6 8h12M6 13l6 8" /><path d="M6 8a6 6 0 010-5h12" /><path d="M6 13h6a6 6 0 000-5" />
  </svg>
);
const TextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);
const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);
const CoffeeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

// ── Field wrapper ──────────────────────────────────────────────
const Field = ({ label, icon, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center gap-2 text-[9px] tracking-[0.4em] uppercase font-['Jost',sans-serif] text-[#c9a96e]/55">
      <span className="text-[#c9a96e]/40">{icon}</span>
      {label}
    </label>
    {children}
    {hint && (
      <p className="text-[10px] font-['Jost',sans-serif] text-[#f5f0e8]/18 mt-0.5">{hint}</p>
    )}
  </div>
);

// ── Shared input class ─────────────────────────────────────────
const inputCls = `
  w-full bg-[#0d0a05] border border-[#c9a96e]/15
  px-4 py-3 text-[#f5f0e8]/80 text-[13px] font-light
  font-['Jost',sans-serif] placeholder:text-[#f5f0e8]/18
  focus:outline-none focus:border-[#c9a96e]/40
  transition-colors duration-200
`;

// ── Main Component ─────────────────────────────────────────────
export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "", category: "", basePrice: "",
    image: "", description: "", healthBenefits: "",
  });
  const [loading,    setLoading]    = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    if (e.target.name === "image") setImageError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.basePrice || !product.category) {
      toast.error("Name, category and price are required");
      return;
    }
    try {
      setLoading(true);
      await api.post("/products/product/ad", {
        ...product,
        price: Number(product.basePrice),
      });
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const benefits = product.healthBenefits
    .split(",").map((b) => b.trim()).filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ap-in { animation: fadeUp 0.45s ease forwards; }

        select option { background: #110d07; color: #f5f0e8cc; }

        textarea { resize: none; }

        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
      `}</style>

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] px-4 sm:px-6 lg:px-14 py-10 lg:py-14">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[#c9a96e]/[0.025] blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">

          {/* ── Page Header ── */}
          <div className="mb-10 ap-in">
            <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase mb-3 opacity-65">
              Admin · Inventory
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8] leading-none">
                Add
                <span className="italic text-[#c9a96e]"> Product</span>
              </h1>
              <Link
                to="/admin/dashboard"
                className="group flex items-center gap-3 text-[#c9a96e]/60 hover:text-[#c9a96e] transition-all uppercase tracking-[0.35em] text-[10px] font-['Jost',sans-serif]"
              >
                <span className="w-10 h-px bg-[#c9a96e]/35 group-hover:w-14 group-hover:bg-[#c9a96e] transition-all duration-300" />
                Dashboard
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-[#c9a96e]/40 to-transparent" />
              <p className="text-[#f5f0e8]/20 text-[10px] tracking-[0.3em] uppercase">
                Fill in the details below to add a new item to your menu
              </p>
            </div>
          </div>

          {/* ── Two-column grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ap-in">

            {/* ── LEFT: Form panel ── */}
            <div className="lg:col-span-2 bg-[#0d0a05] border border-[#c9a96e]/12">

              {/* Panel header */}
              <div className="px-6 py-5 border-b border-[#c9a96e]/10 bg-[#110d07] flex items-center gap-3">
                <div className="w-9 h-9 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/70">
                  <ChefHatIcon />
                </div>
                <div>
                  <h2 className="font-['Cormorant_Garamond',serif] text-[1.2rem] font-light text-[#f5f0e8] leading-tight">
                    Product Details
                  </h2>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/22 mt-0.5 font-['Jost',sans-serif]">
                    Basic information about your product
                  </p>
                </div>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} className="px-6 py-7 flex flex-col gap-7">

                {/* Name + Category row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Product Name" icon={<CoffeeIcon />}>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      placeholder="e.g. Cold Brew Reserve"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Category" icon={<TagIcon />}>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className={`${inputCls} appearance-none cursor-pointer`}
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(201,169,110,0.4)' stroke-width='1.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                    >
                      <option value="">Select a category</option>
                      <option value="Hot Coffee">Hot Coffee</option>
                      <option value="Cold Coffee">Cold Coffee</option>
                      <option value="Croissant">Croissant</option>
                    </select>
                  </Field>
                </div>

                {/* Price */}
                <Field label="Base Price (₹)" icon={<RupeeIcon />}>
                  <div className="relative max-w-[200px]">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-['Cormorant_Garamond',serif] text-[1rem] text-[#c9a96e]/50">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="basePrice"
                      value={product.basePrice}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="0.5"
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </Field>

                {/* Description */}
                <Field
                  label="Description"
                  icon={<TextIcon />}
                  hint={`${product.description.length} / 500 characters`}
                >
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={3}
                    maxLength={500}
                    placeholder="Describe the flavour, origin, preparation…"
                    className={inputCls}
                  />
                </Field>

                {/* Health benefits */}
                <Field
                  label="Health Benefits"
                  icon={<HeartIcon />}
                  hint="Separate with commas — e.g. Boosts energy, Rich in antioxidants"
                >
                  <textarea
                    name="healthBenefits"
                    value={product.healthBenefits}
                    onChange={handleChange}
                    rows={2}
                    placeholder="e.g. Boosts energy, Rich in antioxidants, Improves focus"
                    className={inputCls}
                  />
                </Field>

                {/* Image URL */}
                <Field
                  label="Image URL"
                  icon={<ImageIcon />}
                  hint="Paste a direct image URL. High-quality product photos recommended."
                >
                  <input
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="https://example.com/product.jpg"
                    className={inputCls}
                  />
                </Field>

                {/* Divider */}
                <div className="h-px bg-[#c9a96e]/08" />

                {/* Submit */}
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-[#c9a96e] hover:bg-[#d4b87a] disabled:opacity-50 text-[#0d0a05] text-[9px] tracking-[0.35em] uppercase font-['Jost',sans-serif] transition-all duration-200"
                  >
                    {loading ? (
                      <>
                        <div className="w-3 h-3 border border-[#0d0a05]/40 border-t-[#0d0a05] rounded-full animate-spin" />
                        Saving…
                      </>
                    ) : (
                      <>
                        <SaveIcon />
                        Add to Menu
                      </>
                    )}
                  </button>

                  <Link
                    to="/admin/products"
                    className="flex items-center gap-2 py-3 px-4 border border-[#c9a96e]/15 text-[#c9a96e]/55 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] text-[9px] tracking-[0.35em] uppercase transition-all font-['Jost',sans-serif]"
                  >
                    <ArrowLeftIcon /> Back to Products
                  </Link>
                </div>

              </form>
            </div>

            {/* ── RIGHT: Preview panel ── */}
            <div className="lg:col-span-1 flex flex-col gap-5">

              {/* Live preview card */}
              <div className="bg-[#0d0a05] border border-[#c9a96e]/12 sticky top-8">

                {/* Panel header */}
                <div className="px-5 py-4 border-b border-[#c9a96e]/10 bg-[#110d07]">
                  <p className="text-[9px] tracking-[0.45em] uppercase text-[#c9a96e]/45 font-['Jost',sans-serif]">
                    Live Preview
                  </p>
                  <h3 className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8] mt-0.5">
                    Card Preview
                  </h3>
                </div>

                {/* Image preview */}
                <div className="border-b border-[#c9a96e]/08">
                  <div className="relative aspect-square w-full bg-[#110d07] overflow-hidden">
                    {product.image && !imageError ? (
                      <img
                        src={product.image}
                        alt="Preview"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover opacity-85"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 border border-[#c9a96e]/15 flex items-center justify-center text-[#c9a96e]/30">
                          <ImageIcon />
                        </div>
                        <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/18 font-['Jost',sans-serif]">
                          {product.image ? "Failed to load" : "No image yet"}
                        </p>
                      </div>
                    )}

                    {/* Price overlay */}
                    {product.basePrice && (
                      <div className="absolute top-3 right-3 bg-[#0d0a05]/80 border border-[#c9a96e]/20 px-2.5 py-1">
                        <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#c9a96e]/85">
                          ₹{Number(product.basePrice).toFixed(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 py-5 flex flex-col gap-3">

                  {/* Status dot + name */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-[7px] h-[7px] rounded-full bg-[#c9a96e]/60 mt-[6px] flex-shrink-0"
                      style={{ boxShadow: "0 0 5px rgba(201,169,110,0.25)" }} />
                    <div className="min-w-0">
                      <p className="font-['Cormorant_Garamond',serif] text-[1.05rem] font-light text-[#f5f0e8]/85 leading-tight">
                        {product.name || <span className="italic text-[#f5f0e8]/20">Product name</span>}
                      </p>
                      <p className="text-[11px] font-['Jost',sans-serif] text-[#f5f0e8]/28 mt-0.5">
                        {product.category || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {product.description && (
                    <p className="text-[11px] font-['Jost',sans-serif] text-[#f5f0e8]/35 leading-relaxed line-clamp-3 border-t border-[#c9a96e]/06 pt-3">
                      {product.description}
                    </p>
                  )}

                  {/* Benefit tags */}
                  {benefits.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 border-t border-[#c9a96e]/06 pt-3">
                      {benefits.slice(0, 3).map((b, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 border border-[#c9a96e]/15 text-[#c9a96e]/55 text-[9px] tracking-[0.18em] uppercase font-['Jost',sans-serif]"
                        >
                          {b}
                        </span>
                      ))}
                      {benefits.length > 3 && (
                        <span className="text-[#f5f0e8]/20 text-[9px] font-['Jost',sans-serif] self-center">
                          +{benefits.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Tips panel */}
              <div className="bg-[#0d0a05] border border-[#c9a96e]/12">
                <div className="px-5 py-4 border-b border-[#c9a96e]/10 bg-[#110d07]">
                  <p className="text-[9px] tracking-[0.45em] uppercase text-[#c9a96e]/45 font-['Jost',sans-serif]">
                    Tips
                  </p>
                  <h3 className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-light text-[#f5f0e8] mt-0.5">
                    Better Listings
                  </h3>
                </div>
                <div className="px-5 py-5 flex flex-col gap-3">
                  {[
                    "Use high-quality, appetizing product images",
                    "Keep descriptions clear and enticing",
                    "Highlight unique selling points",
                    "Ensure accurate pricing and categories",
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-[5px] h-[5px] rounded-full bg-[#c9a96e]/40 mt-[5px] flex-shrink-0"
                      />
                      <p className="text-[11px] font-['Jost',sans-serif] text-[#f5f0e8]/30 leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            {/* end right */}

          </div>
        </div>
      </div>
    </>
  );
}