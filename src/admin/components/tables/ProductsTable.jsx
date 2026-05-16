// //============================================================



// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   getAllProductsForAdmin,
//   deleteProduct,
//   toggleProduct,
// } from "../../../services/productApi";
// import toast from "react-hot-toast";

// // ── Icons ──────────────────────────────────────────────────────
// const PlusIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
//     <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );
// const EditIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//     <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//   </svg>
// );
// const TrashIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
//     <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
//   </svg>
// );
// const BlockIcon = () => (
//   <svg
//     width="12"
//     height="12"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//   </svg>
// );
// const ArrowLeftIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
//   </svg>
// );
// const PackageIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
//     <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
//     <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
//     <line x1="12" y1="22.08" x2="12" y2="12" />
//   </svg>
// );

// // ── Confirm Dialog ─────────────────────────────────────────────
// const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//     <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
//     <div className="relative bg-[#110d07] border border-[#c9a96e]/20 p-8 w-full max-w-sm">
//       <p className="font-['Cormorant_Garamond',serif] text-[1.2rem] text-[#f5f0e8]/80 font-light mb-6 text-center">
//         {message}
//       </p>
//       <div className="flex gap-3">
//         <button
//           onClick={onCancel}
//           className="flex-1 py-3 border border-[#c9a96e]/20 text-[#c9a96e]/60 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-all font-['Jost',sans-serif]"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={onConfirm}
//           className="flex-1 py-3 bg-[#c9a96e] text-[#0d0a05] text-[10px] tracking-[0.3em] uppercase hover:bg-[#d4b87a] transition-all font-['Jost',sans-serif]"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   </div>
// );


// const ProductRow = ({
//   product,
//   onEdit,
//   onDelete,
//   onToggle,
//   index,
// }) => {

//   const isBlocked =
//     product.isBlocked;

//   return (

//     <div
//       className={`group flex items-center gap-5 px-6 py-4 border-b border-[#c9a96e]/08 transition-all duration-300
//         ${
//           isBlocked

//             ? "bg-[#180808] hover:bg-[#1e0a0a]"

//             : "bg-[#0d0a05] hover:bg-[#110d07]"
//         }`}
//       style={{
//         animationDelay:
//           `${index * 40}ms`
//       }}
//     >

//       {/* Status Dot */}

//       <div
//         className={`w-1.5 h-1.5 rounded-full flex-shrink-0
//           ${
//             isBlocked

//               ? "bg-[#f87171]/70"

//               : "bg-[#c9a96e]/60"
//           }`}
//       />

//       {/* Product Image */}

//       <div className="flex-shrink-0">

//         <div
//           className={`w-12 h-12 border overflow-hidden
//             ${
//               isBlocked

//                 ? "border-[#f87171]/15 bg-[#1a0b0b]"

//                 : "border-[#c9a96e]/15 bg-[#110d07]"
//             }`}
//         >

//           <img
//             src={
//               product.image ||
//               "/placeholder.png"
//             }
//             alt={product.name}
//             onError={(e) =>
//               (e.target.src =
//                 "/placeholder.png")
//             }
//             className={`w-full h-full object-cover transition-opacity
//               ${
//                 isBlocked

//                   ? "opacity-35"

//                   : "opacity-80 group-hover:opacity-100"
//               }`}
//           />

//         </div>

//       </div>

//       {/* Product Info */}

//       <div className="flex-1 min-w-0">

//         {/* Name + badge */}

//         <div className="flex items-center gap-2 flex-wrap">

//           <p
//             className={`font-['Cormorant_Garamond',serif] text-[1.05rem] font-light truncate leading-tight
//               ${
//                 isBlocked

//                   ? "text-[#f5f0e8]/35 line-through decoration-[#f87171]/30"

//                   : "text-[#f5f0e8]/85"
//               }`}
//           >

//             {product.name}

//           </p>

//           {isBlocked && (

//             <span
//               className="
//                 px-1.5
//                 py-0.5
//                 text-[8px]
//                 tracking-[0.35em]
//                 uppercase
//                 font-['Jost',sans-serif]
//                 bg-[#f87171]/12
//                 border
//                 border-[#f87171]/25
//                 text-[#f87171]/65
//                 flex-shrink-0
//               "
//             >

//               Blocked

//             </span>
//           )}

//         </div>

//         {/* Category / ID */}

//         <p
//           className={`text-[11px] font-['Jost',sans-serif] font-light mt-0.5 truncate
//             ${
//               isBlocked

//                 ? "text-[#f5f0e8]/18"

//                 : "text-[#f5f0e8]/28"
//             }`}
//         >

//           {product.category || "—"} · ID: {product.id}

//         </p>

//       </div>

//       {/* Price */}

//       <div className="flex-shrink-0 text-right min-w-[90px]">

//         <span
//           className={`font-['Cormorant_Garamond',serif] text-[1rem]
//             ${
//               isBlocked

//                 ? "text-[#f5f0e8]/20"

//                 : "text-[#c9a96e]/80"
//             }`}
//         >

//           ₹{
//             product.basePrice ??
//             product.price ??
//             0
//           }

//         </span>

//       </div>

//       {/* Actions */}

//       <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">

//         {/* Edit */}

//         <button
//           onClick={() =>
//             onEdit(product.id)
//           }
//           title="Edit Product"
//           className="w-8 h-8 flex items-center justify-center border border-[#c9a96e]/15 text-[#c9a96e]/50 hover:border-[#c9a96e]/45 hover:text-[#c9a96e] transition-all"
//         >

//           <EditIcon />

//         </button>

//         {/* Block / Unblock */}

//         <button
//           onClick={() =>
//             onToggle(product)
//           }
//           title={
//             isBlocked
//               ? "Unblock Product"
//               : "Block Product"
//           }
//           className={`w-8 h-8 flex items-center justify-center border transition-all
//             ${
//               isBlocked

//                 ? "border-emerald-500/20 text-emerald-400/50 hover:border-emerald-500/50 hover:text-emerald-400"

//                 : "border-amber-500/20 text-amber-400/50 hover:border-amber-500/50 hover:text-amber-400"
//             }`}
//         >

//           {isBlocked

//             ? <UnblockIcon />

//             : <BlockIcon />}

//         </button>

//         {/* Delete */}

//         <button
//           onClick={() =>
//             onDelete(product)
//           }
//           title="Delete Product"
//           className="w-8 h-8 flex items-center justify-center border border-[#f87171]/15 text-[#f87171]/40 hover:border-[#f87171]/45 hover:text-[#f87171] transition-all"
//         >

//           <TrashIcon />

//         </button>

//       </div>

//     </div>
//   );
// };


// // ── Main Component ─────────────────────────────────────────────
// export default function ProductList() {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [confirm, setConfirm] = useState(null); // null | { message, action }

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {

//   try {

//     setLoading(true);

//     const data =
//       await getAllProductsForAdmin();

//     const normalized =
//       (data || []).map(
//         (product) => ({

//           ...product,

//           isBlocked:
//             product.isBlocked ??
//             product.blocked ??
//             false,
//         })
//       );

//     setProducts(normalized);

//   } catch (error) {

//     console.error(error);

//     toast.error(
//       "Failed to load products"
//     );

//   } finally {

//     setLoading(false);
//   }
// };
//   const handleDelete = async (
//   product
// ) => {

//   try {

//     await deleteProduct(
//       product.id
//     );

//     setProducts((prev) =>

//       prev.filter(
//         (p) => p.id !== product.id
//       )
//     );

//     toast.success(
//       "Product deleted"
//     );

//   } catch (error) {

//     console.error(error);

//     toast.error(
//       "Delete failed"
//     );
//   }
// };
//   const handleToggle = async (
//   product
// ) => {

//   try {

//     await toggleProduct(
//       product.id
//     );

//     setProducts((prev) =>

//       prev.map((p) =>

//         p.id === product.id

//           ? {
//               ...p,

//               isBlocked:
//                 !p.isBlocked
//             }

//           : p
//       )
//     );

//     toast.success(

//       product.isBlocked

//         ? "Product unblocked"

//         : "Product blocked"
//     );

//   } catch (error) {

//     console.error(error);

//     toast.error(
//       "Failed to update product"
//     );
//   }
// };
//   const handleEdit = (id) => {
//     navigate(`/admin/edit-product/${product.id}`);
//   };

//   const filteredProducts = products.filter((p) => {
//     const term = search.toLowerCase();
//     return (
//       p.name?.toLowerCase().includes(term) ||
//       String(p.id).includes(term) ||
//       p.category?.toLowerCase().includes(term)
//     );
//   });

//   const activeCount =
//   products.filter(
//     (p) => !p.isBlocked
//   ).length;

//   const blockedCount =
//   products.filter(
//     (p) => p.isBlocked
//   ).length;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .pl-in { animation: fadeUp 0.45s ease forwards; }

//         .pl-scroll::-webkit-scrollbar { width: 2px; }
//         .pl-scroll::-webkit-scrollbar-track { background: transparent; }
//         .pl-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }
//       `}</style>

//       <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] px-4 sm:px-6 lg:px-14 py-10 lg:py-14">

//         {/* Ambient glow */}
//         <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
//           <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[#c9a96e]/[0.025] blur-[160px]" />
//         </div>

//         <div className="relative z-10 max-w-screen-xl mx-auto">

//           {/* ── Page Header ── */}
//           <div className="mb-10 pl-in">
            
//             <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase mb-3 opacity-65">
//               Admin · Inventory
//             </p>
//             <div className="flex items-end justify-between flex-wrap gap-4">
//               <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8] leading-none">
//                 Product
//                 <span className="italic text-[#c9a96e]"> Catalogue</span>
//               </h1>
              

//               <div className="flex items-center gap-3">
//                 <Link
//     to="/admin/dashboard"
//     className="
//       group
//       flex
//       items-center
//       gap-3
//       text-[#c9a96e]/60
//       hover:text-[#c9a96e]
//       transition-all
//       uppercase
//       tracking-[0.35em]
//       text-[10px]
//       font-['Jost',sans-serif]
//     "
//   >

//     <span
//       className="
//         w-10
//         h-px
//         bg-[#c9a96e]/35
//         group-hover:w-14
//         group-hover:bg-[#c9a96e]
//         transition-all
//         duration-300
//       "
//     />

//     Dashboard

//   </Link>
                
//               </div>
              
//             </div>

//             <div className="mt-6 flex items-center justify-between gap-6">

//   {/* Left Content */}

//   <div className="flex items-center gap-3">

//     <div className="h-px w-16 bg-gradient-to-r from-[#c9a96e]/40 to-transparent" />

//     <p className="text-[#f5f0e8]/20 text-[10px] tracking-[0.3em] uppercase">
//       View and manage all products in your menu
//     </p>

//   </div>

//   {/* Right Side Button */}

//   <Link
//     to="/admin/products/manage"
//     className="
//       flex
//       items-center
//       gap-2
//       py-2.5
//       px-4
//       bg-[#c9a96e]
//       hover:bg-[#d4b87a]
//       text-[#0d0a05]
//       text-[10px]
//       tracking-[0.3em]
//       uppercase
//       transition-all
//       font-['Jost',sans-serif]
//     "
//   >

//     <PlusIcon />

//     Add Product

//   </Link>

// </div>
            
//           </div>

//           {/* ── Panel ── */}
//           <div className="bg-[#0d0a05] border border-[#c9a96e]/12 flex flex-col pl-in">

//             {/* Panel header */}
//             <div className="px-6 py-5 border-b border-[#c9a96e]/10 bg-[#110d07] flex items-center justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/70">
//                   <PackageIcon />
//                 </div>
//                 <div>
//                   <h2 className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light text-[#f5f0e8] leading-tight">
//                     All Products
//                   </h2>
//                 </div>
//               </div>

//               {/* Search */}
//               <div className="flex-1 max-w-xs">
//                 <input
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search by name, category, ID…"
//                   className="w-full bg-transparent text-[#f5f0e8]/70 text-[12px] font-['Jost',sans-serif] font-light placeholder:text-[#f5f0e8]/18 focus:outline-none border-b border-[#c9a96e]/15 pb-1 focus:border-[#c9a96e]/40 transition-colors"
//                 />
//               </div>
//             </div>

//             {/* Stats strip */}
//             <div className="flex divide-x divide-[#c9a96e]/08 border-b border-[#c9a96e]/08">
//               {[
//   {
//     label: "Total",
//     value: products.length
//   },

//   {
//     label: "Filtered",
//     value: filteredProducts.length,
//     color: "text-[#c9a96e]"
//   },

//   {
//     label: "Active",
//     value: activeCount,
//     color: "text-[#c9a96e]"
//   },

//   {
//     label: "Blocked",
//     value: blockedCount,
//     color: "text-[#f87171]/70"
//   },

// ].map(({ label, value, color }) => (
//                 <div key={label} className="flex-1 py-3 px-5 text-center">
//                   <p className={`font-['Cormorant_Garamond',serif] text-[1.4rem] font-light ${color || "text-[#f5f0e8]/60"}`}>
//                     {value}
//                   </p>
//                   <p className="text-[9px] tracking-[0.3em] uppercase font-['Jost',sans-serif] text-[#f5f0e8]/25 mt-0.5">
//                     {label}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Column labels */}
//             <div className="hidden md:flex items-center gap-5 px-6 py-2 border-b border-[#c9a96e]/06">
//               <div className="w-1.5 flex-shrink-0" />
//               <div className="w-12 flex-shrink-0" />
//               <p className="flex-1 text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/20 font-['Jost',sans-serif]">Product</p>
//               <p className="hidden lg:block w-[200px] flex-shrink-0 text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/20 font-['Jost',sans-serif]">Benefits</p>
//               <p className="hidden sm:block w-[70px] flex-shrink-0 text-right text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/20 font-['Jost',sans-serif]">Price</p>
//               <div className="w-[72px] flex-shrink-0" />
//             </div>

//             {/* List */}
//             <div className="pl-scroll overflow-y-auto" style={{ maxHeight: "560px" }}>
//               {loading ? (
//                 <div className="flex items-center justify-center py-20">
//                   <div className="w-6 h-6 border border-[#c9a96e]/20 border-t-[#c9a96e]/60 rounded-full animate-spin" />
//                 </div>
//               ) : filteredProducts.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center py-20 gap-3">
//                   <p className="font-['Cormorant_Garamond',serif] italic text-[#f5f0e8]/20 text-[1.1rem]">
//                     {search ? "No matches found" : "No products yet"}
//                   </p>
//                   {!search && (
//                     <Link
//                       to="/admin/products/manage"
//                       className="text-[#c9a96e]/50 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase font-['Jost',sans-serif] transition-colors"
//                     >
//                       + Add first product
//                     </Link>
//                   )}
//                 </div>
//               ) : (
//                 filteredProducts.map((product, i) => (
//                   <ProductRow
//                   onToggle={handleToggle}
//                     key={product.id}
//                     product={product}
//                     index={i}
//                     onEdit={handleEdit}
//                     onDelete={handleDelete}
//                   />
//                 ))
//               )}
//             </div>

//           </div>
//           {/* end panel */}

//         </div>
//       </div>

//       {/* Confirm Dialog */}
//       {confirm && (
//         <ConfirmDialog
//           message={confirm.message}
//           onConfirm={confirm.action}
//           onCancel={() => setConfirm(null)}
//         />
//       )}
//     </>
//   );
// }




//==========================================================

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
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
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
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
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

const UnblockIcon = () => (
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
    <polyline points="9 12 11 14 15 10" />
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

const ConfirmDialog = ({
  message,
  onConfirm,
  onCancel,
}) => (

  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      onClick={onCancel}
    />

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

// ── Product Row ─────────────────────────────────────────────

const ProductRow = ({
  product,
  onEdit,
  onDelete,
  onToggle,
  index,
}) => {

  const isBlocked =
    product.isBlocked;

  return (

    <div
      className={`group flex items-center gap-5 px-6 py-4 border-b border-[#c9a96e]/08 transition-all duration-300
        ${
          isBlocked
            ? "bg-[#180808] hover:bg-[#1e0a0a]"
            : "bg-[#0d0a05] hover:bg-[#110d07]"
        }`}
      style={{
        animationDelay:
          `${index * 40}ms`
      }}
    >

      <div
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0
          ${
            isBlocked
              ? "bg-[#f87171]/70"
              : "bg-[#c9a96e]/60"
          }`}
      />

      {/* Product Image */}

      <div className="flex-shrink-0">

        <div
          className={`w-12 h-12 border overflow-hidden
            ${
              isBlocked
                ? "border-[#f87171]/15 bg-[#1a0b0b]"
                : "border-[#c9a96e]/15 bg-[#110d07]"
            }`}
        >

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
            className={`w-full h-full object-cover transition-opacity
              ${
                isBlocked
                  ? "opacity-35"
                  : "opacity-80 group-hover:opacity-100"
              }`}
          />

        </div>

      </div>

      {/* Product Info */}

      <div className="flex-1 min-w-0">

        <div className="flex items-center gap-2 flex-wrap">

          <p
            className={`font-['Cormorant_Garamond',serif] text-[1.05rem] font-light truncate leading-tight
              ${
                isBlocked
                  ? "text-[#f5f0e8]/35 line-through decoration-[#f87171]/30"
                  : "text-[#f5f0e8]/85"
              }`}
          >

            {product.name}

          </p>

          {isBlocked && (

            <span
              className="
                px-1.5
                py-0.5
                text-[8px]
                tracking-[0.35em]
                uppercase
                font-['Jost',sans-serif]
                bg-[#f87171]/12
                border
                border-[#f87171]/25
                text-[#f87171]/65
                flex-shrink-0
              "
            >

              Blocked

            </span>
          )}

        </div>

        <p
          className={`text-[11px] font-['Jost',sans-serif] font-light mt-0.5 truncate
            ${
              isBlocked
                ? "text-[#f5f0e8]/18"
                : "text-[#f5f0e8]/28"
            }`}
        >

          {product.category || "—"} · ID: {product.id}

        </p>

      </div>

      {/* Price */}

      <div className="flex-shrink-0 text-right min-w-[90px]">

        <span
          className={`font-['Cormorant_Garamond',serif] text-[1rem]
            ${
              isBlocked
                ? "text-[#f5f0e8]/20"
                : "text-[#c9a96e]/80"
            }`}
        >

          ₹{
            product.basePrice ??
            product.price ??
            0
          }

        </span>

      </div>

      {/* Actions */}

      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">

        <button
          onClick={() =>
            onEdit(product)
          }
          title="Edit Product"
          className="w-8 h-8 flex items-center justify-center border border-[#c9a96e]/15 text-[#c9a96e]/50 hover:border-[#c9a96e]/45 hover:text-[#c9a96e] transition-all"
        >

          <EditIcon />

        </button>

        <button
          onClick={() =>
            onToggle(product)
          }
          title={
            isBlocked
              ? "Unblock Product"
              : "Block Product"
          }
          className={`w-8 h-8 flex items-center justify-center border transition-all
            ${
              isBlocked
                ? "border-emerald-500/20 text-emerald-400/50 hover:border-emerald-500/50 hover:text-emerald-400"
                : "border-amber-500/20 text-amber-400/50 hover:border-amber-500/50 hover:text-amber-400"
            }`}
        >

          {isBlocked
            ? <UnblockIcon />
            : <BlockIcon />}

        </button>

        <button
          onClick={() =>
            setConfirm({
              message: `Delete "${product.name}"?`,
              action: async () => {
                await onDelete(product);
                setConfirm(null);
              },
            })
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

  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [confirm, setConfirm] =
    useState(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {

      try {

        setLoading(true);

        const data =
          await getAllProductsForAdmin();

        const normalized =
          (data || []).map(
            (product) => ({

              ...product,

              isBlocked:
                product.isBlocked ??
                product.blocked ??
                false,
            })
          );

        setProducts(normalized);

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to load products"
        );

      } finally {

        setLoading(false);
      }
    };

  const handleDelete =
    async (product) => {

      try {

        await deleteProduct(
          product.id
        );

        setProducts((prev) =>
          prev.filter(
            (p) => p.id !== product.id
          )
        );

        toast.success(
          "Product deleted"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Delete failed"
        );
      }
    };

  const handleToggle =
    async (product) => {

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

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to update product"
        );
      }
    };

  const handleEdit = (
    product
  ) => {

    navigate(
      `/admin/edit-product/${product.id}`
    );
  };

  const filteredProducts =
    products.filter((p) => {

      const term =
        search.toLowerCase();

      return (

        p.name
          ?.toLowerCase()
          .includes(term)

        ||

        String(p.id)
          .includes(term)

        ||

        p.category
          ?.toLowerCase()
          .includes(term)
      );
    });

  const activeCount =
    products.filter(
      (p) => !p.isBlocked
    ).length;

  const blockedCount =
    products.filter(
      (p) => p.isBlocked
    ).length;

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
    className="
      group
      flex
      items-center
      gap-3
      text-[#c9a96e]/60
      hover:text-[#c9a96e]
      transition-all
      uppercase
      tracking-[0.35em]
      text-[10px]
      font-['Jost',sans-serif]
    "
  >

    <span
      className="
        w-10
        h-px
        bg-[#c9a96e]/35
        group-hover:w-14
        group-hover:bg-[#c9a96e]
        transition-all
        duration-300
      "
    />

    Dashboard

  </Link>
                
              </div>
              
            </div>

            <div className="mt-6 flex items-center justify-between gap-6">

  {/* Left Content */}

  <div className="flex items-center gap-3">

    <div className="h-px w-16 bg-gradient-to-r from-[#c9a96e]/40 to-transparent" />

    <p className="text-[#f5f0e8]/20 text-[10px] tracking-[0.3em] uppercase">
      View and manage all products in your menu
    </p>

  </div>

  {/* Right Side Button */}

  <Link
    to="/admin/products/manage"
    className="
      flex
      items-center
      gap-2
      py-2.5
      px-4
      bg-[#c9a96e]
      hover:bg-[#d4b87a]
      text-[#0d0a05]
      text-[10px]
      tracking-[0.3em]
      uppercase
      transition-all
      font-['Jost',sans-serif]
    "
  >

    <PlusIcon />

    Add Product

  </Link>

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
  {
    label: "Total",
    value: products.length
  },

  {
    label: "Filtered",
    value: filteredProducts.length,
    color: "text-[#c9a96e]"
  },

  {
    label: "Active",
    value: activeCount,
    color: "text-[#c9a96e]"
  },

  {
    label: "Blocked",
    value: blockedCount,
    color: "text-[#f87171]/70"
  },

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