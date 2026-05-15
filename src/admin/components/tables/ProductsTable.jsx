// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   getAllProductsForAdmin,
//   deleteProduct,
// } from "../../../services/productApi";
// import { Package, Edit, Trash2, ArrowLeft, Plus } from "lucide-react"; // Added Plus icon
// import toast from "react-hot-toast";

// export default function ProductList() {
//   const navigate = useNavigate(); // Now properly imported

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await getAllProductsForAdmin();
//       setProducts(data);
//     } catch (err) {
//       toast.error("Failed to load products");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete =
//   async (id) => {

//     const confirmDelete =
//       window.confirm(
//         "Delete this product?"
//       );

//     if (!confirmDelete) return;

//     const loadingToast =
//       toast.loading(
//         "Deleting product..."
//       );

//     try {

//       await deleteProduct(id);

//       setProducts((prev) =>
//         prev.filter(
//           (p) => p.id !== id
//         )
//       );

//       toast.dismiss(
//         loadingToast
//       );

//       toast.success(
//         "Product deleted successfully"
//       );

//     } catch (err) {

//       console.error(err);

//       toast.dismiss(
//         loadingToast
//       );

//       toast.error(
//         "Failed to delete product"
//       );
//     }
// };

//   const handleEdit = (id) => {
//   navigate(`/admin/edit-product?edit=${id}`);
//   };

//   const filteredProducts = products.filter((product) => {
//     const term = search.toLowerCase();
//     return (
//       product.name?.toLowerCase().includes(term) ||
//       String(product.id).includes(term)
//     );
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
//           {/* ================= HEADER ================= */}
//           <div className="px-6 md:px-8 py-6 border-b border-gray-100">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl shadow-sm">
//                     <Package className="text-[#a77c3b]" size={24} />
//                   </div>
//                   <h1 className="text-3xl font-bold text-gray-900">Products</h1>
//                 </div>
//                 <p className="text-gray-600 ml-12">
//                   View and manage all products in your menu
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row items-center gap-4">
//                 <Link
//                   to="/admin/dashboard"
//                   className="flex items-center gap-2 px-4 py-3 text-[#a77c3b] font-medium rounded-xl hover:bg-amber-50 border border-amber-100 transition-all"
//                 >
//                   <ArrowLeft size={18} />
//                   Back to Dashboard
//                 </Link>

//                 <Link
//                   to="/admin/products/manage" 
//                   className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#a77c3b] to-[#c5a068] text-white rounded-xl font-semibold hover:from-[#a57835] hover:to-[#a2732e] shadow-lg hover:shadow-xl transition-all duration-300"
//                 >
//                   <Plus size={20} />
//                   Add New Product
//                 </Link>
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="max-w-md mx-auto mt-6">
//               <input
//                 type="text"
//                 placeholder="Search by product name or ID..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full px-5 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all bg-gray-50/50"
//               />
//               <svg
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* ================= TABLE ================= */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-amber-50/50 text-xs font-semibold uppercase text-gray-600">
//                 <tr>
//                   <th className="px-8 py-4 text-left">Product</th>
//                   <th className="px-8 py-4 text-left">Category</th>
//                   <th className="px-8 py-4 text-left">Price</th>
//                   <th className="px-8 py-4 text-left">Description</th>
//                   <th className="px-8 py-4 text-left">Health Benefits</th>
//                   <th className="px-8 py-4 text-left">Status</th>
//                   <th className="px-8 py-4 text-right">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={7} className="px-8 py-20 text-center text-gray-500">
//                       <div className="flex flex-col items-center">
//                         <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#a77c3b] border-t-transparent mb-4"></div>
//                         Loading products...
//                       </div>
//                     </td>
//                   </tr>
//                 ) : filteredProducts.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="px-8 py-20 text-center text-gray-500">
//                       <Package size={48} className="mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No products found</p>
//                       <p className="text-sm mt-2">
//                         {search
//                           ? "Try adjusting your search term"
//                           : "Start by adding your first product!"}
//                       </p>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredProducts.map((product) => (
//                     <tr key={product.id} className="hover:bg-amber-50/30 transition-colors">
//                       <td className="px-8 py-6">
//                         <div className="flex items-center gap-4">
//                           <img
//                             src={product.image || "/placeholder.png"}
//                             alt={product.name}
//                             onError={(e) => (e.target.src = "/placeholder.png")}
//                             className="h-16 w-16 object-cover rounded-xl border border-gray-200 shadow-sm"
//                           />
//                           <div>
//                             <p className="font-semibold text-gray-900">{product.name}</p>
//                             <p className="text-xs text-gray-500">ID: {product.id}</p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-8 py-6 text-gray-700">{product.category || "—"}</td>

//                       <td className="px-8 py-6 font-bold text-gray-900">
//                         ${Number(product.basePrice || 0).toFixed(2)}
//                       </td>

//                       <td className="px-8 py-6 text-sm text-gray-600 max-w-xs">
//                         {product.description || <span className="text-gray-400">No description</span>}
//                       </td>

//                       <td className="px-8 py-6 text-sm text-gray-600 max-w-xs">
//                         {product.healthBenefits ? (
//                           <div className="flex flex-wrap gap-1">
//                             {product.healthBenefits
//                               .split(",")
//                               .slice(0, 3)
//                               .map((benefit, i) => (
//                                 <span
//                                   key={i}
//                                   className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
//                                 >
//                                   {benefit.trim()}
//                                 </span>
//                               ))}
//                             {product.healthBenefits.split(",").length > 3 && (
//                               <span className="text-xs text-gray-500">+ more</span>
//                             )}
//                           </div>
//                         ) : (
//                           <span className="text-gray-400">—</span>
//                         )}
//                       </td>

//                       <td className="px-8 py-6">
//                         <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                           Active
//                         </span>
//                       </td>

//                       <td className="px-8 py-6">
//                         <div className="flex justify-end gap-3">
//                           <button
//                             onClick={() => handleEdit(product.id)}
//                             className="p-2.5 bg-amber-100 text-[#a77c3b] rounded-xl hover:bg-amber-200 transition-all"
//                             title="Edit Product"
//                           >
//                             <Edit size={18} />
//                           </button>

//                           <button
//                             onClick={() => handleDelete(product.id)}
//                             className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all"
//                             title="Delete Product"
//                           >
//                             <Trash2 size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



//============================================================



import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAllProductsForAdmin,
  deleteProduct,
  toggleProduct,
} from "../../../services/productApi";
import toast from "react-hot-toast";

// ── Icons ──────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);
const BlockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const PackageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// ── Confirm Dialog ─────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-[#110d07] border border-[#c9a96e]/20 p-8 w-full max-w-sm">
      <p className="font-['Cormorant_Garamond',serif] text-[1.2rem] text-[#f5f0e8]/80 font-light mb-6 text-center">
        {message}
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 border border-[#c9a96e]/20 text-[#c9a96e]/60 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-all font-['Jost',sans-serif]"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3 bg-[#c9a96e] text-[#0d0a05] text-[10px] tracking-[0.3em] uppercase hover:bg-[#d4b87a] transition-all font-['Jost',sans-serif]"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);


const ProductRow = ({
  product,
  onEdit,
  onDelete,
  onToggle,
  index,
}) => {

  return (

    <div
      className="group flex items-center gap-5 px-6 py-4 border-b border-[#c9a96e]/08 bg-[#0d0a05] hover:bg-[#110d07] transition-all duration-300"
      style={{
        animationDelay: `${index * 40}ms`
      }}
    >

      {/* Status Dot */}
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#c9a96e]/60" />

      {/* Product Image */}
      <div className="flex-shrink-0">

        <div className="w-12 h-12 border border-[#c9a96e]/15 overflow-hidden bg-[#110d07]">

          <img
            src={
              product.image ||
              "/placeholder.png"
            }
            alt={product.name}
            onError={(e) =>
              (e.target.src =
                "/placeholder.png")
            }
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />

        </div>

      </div>

      {/* Product Name */}
      <div className="flex-1 min-w-0">

        <p className="font-['Cormorant_Garamond',serif] text-[1.05rem] font-light text-[#f5f0e8]/85 truncate leading-tight">
          {product.name}
        </p>

        <p className="text-[#f5f0e8]/28 text-[11px] font-['Jost',sans-serif] font-light mt-0.5 truncate">
          {product.category || "—"} · ID: {product.id}
        </p>

      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right min-w-[90px]">

        <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#c9a96e]/80">

          ₹{
            product.basePrice ??
            product.price ??
            0
          }

        </span>

      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-100 transition-opacity duration-200">

        {/* Edit */}
        <button
          onClick={() =>
            onEdit(product.id)
          }
          title="Edit Product"
          className="w-8 h-8 flex items-center justify-center border border-[#c9a96e]/15 text-[#c9a96e]/50 hover:border-[#c9a96e]/45 hover:text-[#c9a96e] transition-all"
        >
          <EditIcon />
        </button>

        {/* Block / Unblock */}
        <button
          onClick={() =>
            onToggle(product)
          }
          title={
            product.isBlocked
              ? "Unblock Product"
              : "Block Product"
          }
          className={`w-8 h-8 flex items-center justify-center border transition-all
          ${
            product.isBlocked
              ? "border-[#c9a96e]/40 text-[#c9a96e]"
              : "border-[#f59e0b]/20 text-[#f59e0b]/60 hover:border-[#f59e0b]/50 hover:text-[#f59e0b]"
          }`}
        >

          <BlockIcon />

        </button>

        {/* Delete */}
        <button
          onClick={() =>
            onDelete(product)
          }
          title="Delete Product"
          className="w-8 h-8 flex items-center justify-center border border-[#f87171]/15 text-[#f87171]/40 hover:border-[#f87171]/45 hover:text-[#f87171] transition-all"
        >

          <TrashIcon />

        </button>

      </div>

    </div>
  );
};


// ── Main Component ─────────────────────────────────────────────
export default function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null); // null | { message, action }

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProductsForAdmin();
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (product) => {
    setConfirm({
      message: `Delete "${product.name}"? This cannot be undone.`,
      action: async () => {
        const loadingToast = toast.loading("Deleting product...");
        try {
          await deleteProduct(product.id);
          setProducts((prev) => prev.filter((p) => p.id !== product.id));
          toast.dismiss(loadingToast);
          toast.success("Product deleted successfully");
        } catch (err) {
          console.error(err);
          toast.dismiss(loadingToast);
          toast.error("Failed to delete product");
        }
        setConfirm(null);
      },
    });
  };
  const handleToggle = async (
  product
) => {

  try {

    await toggleProduct(
      product.id
    );

    setProducts((prev) =>
      prev.map((p) =>

        p.id === product.id

          ? {
              ...p,

              isBlocked:
                !p.isBlocked
            }

          : p
      )
    );

    toast.success(

      product.isBlocked

        ? "Product unblocked"

        : "Product blocked"
    );

  } catch (err) {

    console.error(err);

    toast.error(
      "Failed to update product"
    );
  }
};

  const handleEdit = (id) => {
    navigate(`/admin/edit-product?edit=${id}`);
  };

  const filteredProducts = products.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(term) ||
      String(p.id).includes(term) ||
      p.category?.toLowerCase().includes(term)
    );
  });

  const activeCount = products.length; // all products assumed active

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pl-in { animation: fadeUp 0.45s ease forwards; }

        .pl-scroll::-webkit-scrollbar { width: 2px; }
        .pl-scroll::-webkit-scrollbar-track { background: transparent; }
        .pl-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }
      `}</style>

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] px-4 sm:px-6 lg:px-14 py-10 lg:py-14">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[#c9a96e]/[0.025] blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">

          {/* ── Page Header ── */}
          <div className="mb-10 pl-in">
            <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase mb-3 opacity-65">
              Admin · Inventory
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8] leading-none">
                Product
                <span className="italic text-[#c9a96e]"> Catalogue</span>
              </h1>

              <div className="flex items-center gap-3">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 py-2.5 px-4 border border-[#c9a96e]/15 text-[#c9a96e]/55 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-all font-['Jost',sans-serif]"
                >
                  <ArrowLeftIcon /> Dashboard
                </Link>
                <Link
                  to="/admin/products/manage"
                  className="flex items-center gap-2 py-2.5 px-4 bg-[#c9a96e] hover:bg-[#d4b87a] text-[#0d0a05] text-[10px] tracking-[0.3em] uppercase transition-all font-['Jost',sans-serif]"
                >
                  <PlusIcon /> Add Product
                </Link>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-[#c9a96e]/40 to-transparent" />
              <p className="text-[#f5f0e8]/20 text-[10px] tracking-[0.3em] uppercase">
                View and manage all products in your menu
              </p>
            </div>
          </div>

          {/* ── Panel ── */}
          <div className="bg-[#0d0a05] border border-[#c9a96e]/12 flex flex-col pl-in">

            {/* Panel header */}
            <div className="px-6 py-5 border-b border-[#c9a96e]/10 bg-[#110d07] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/70">
                  <PackageIcon />
                </div>
                <div>
                  <h2 className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light text-[#f5f0e8] leading-tight">
                    All Products
                  </h2>
                </div>
              </div>

              {/* Search */}
              <div className="flex-1 max-w-xs">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, category, ID…"
                  className="w-full bg-transparent text-[#f5f0e8]/70 text-[12px] font-['Jost',sans-serif] font-light placeholder:text-[#f5f0e8]/18 focus:outline-none border-b border-[#c9a96e]/15 pb-1 focus:border-[#c9a96e]/40 transition-colors"
                />
              </div>
            </div>

            {/* Stats strip */}
            <div className="flex divide-x divide-[#c9a96e]/08 border-b border-[#c9a96e]/08">
              {[
                { label: "Total",    value: products.length },
                { label: "Filtered", value: filteredProducts.length, color: "text-[#c9a96e]" },
                { label: "Active",   value: activeCount, color: "text-[#c9a96e]" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex-1 py-3 px-5 text-center">
                  <p className={`font-['Cormorant_Garamond',serif] text-[1.4rem] font-light ${color || "text-[#f5f0e8]/60"}`}>
                    {value}
                  </p>
                  <p className="text-[9px] tracking-[0.3em] uppercase font-['Jost',sans-serif] text-[#f5f0e8]/25 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Column labels */}
            <div className="hidden md:flex items-center gap-5 px-6 py-2 border-b border-[#c9a96e]/06">
              <div className="w-1.5 flex-shrink-0" />
              <div className="w-12 flex-shrink-0" />
              <p className="flex-1 text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/20 font-['Jost',sans-serif]">Product</p>
              <p className="hidden lg:block w-[200px] flex-shrink-0 text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/20 font-['Jost',sans-serif]">Benefits</p>
              <p className="hidden sm:block w-[70px] flex-shrink-0 text-right text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/20 font-['Jost',sans-serif]">Price</p>
              <div className="w-[72px] flex-shrink-0" />
            </div>

            {/* List */}
            <div className="pl-scroll overflow-y-auto" style={{ maxHeight: "560px" }}>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-6 h-6 border border-[#c9a96e]/20 border-t-[#c9a96e]/60 rounded-full animate-spin" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <p className="font-['Cormorant_Garamond',serif] italic text-[#f5f0e8]/20 text-[1.1rem]">
                    {search ? "No matches found" : "No products yet"}
                  </p>
                  {!search && (
                    <Link
                      to="/admin/products/manage"
                      className="text-[#c9a96e]/50 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase font-['Jost',sans-serif] transition-colors"
                    >
                      + Add first product
                    </Link>
                  )}
                </div>
              ) : (
                filteredProducts.map((product, i) => (
                  <ProductRow
                  onToggle={handleToggle}
                    key={product.id}
                    product={product}
                    index={i}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>

          </div>
          {/* end panel */}

        </div>
      </div>

      {/* Confirm Dialog */}
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={confirm.action}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}