
// //==========================================================
// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// import {
//   getAllProductsForAdmin,
//   deleteProduct,
//   toggleProduct,
// } from "../../../services/productApi";

// import toast from "react-hot-toast";

// // ==========================================================
// // ICONS
// // ==========================================================

// const PlusIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <line x1="12" y1="5" x2="12" y2="19" />
//     <line x1="5" y1="12" x2="19" y2="12" />
//   </svg>
// );

// const EditIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//     <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
//     <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
//   </svg>
// );

// const TrashIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//     <polyline points="3 6 5 6 21 6" />
//     <path d="M19 6l-1 14H6L5 6" />
//     <path d="M10 11v6M14 11v6" />
//     <path d="M9 6V4h6v2" />
//   </svg>
// );

// const BlockIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//     <circle cx="12" cy="12" r="10" />
//     <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//   </svg>
// );

// const UnblockIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//     <circle cx="12" cy="12" r="10" />
//     <polyline points="9 12 11 14 15 10" />
//   </svg>
// );

// // ==========================================================
// // CONFIRM DIALOG
// // ==========================================================

// const ConfirmDialog = ({
//   title,
//   message,
//   confirmLabel,
//   confirmClass,
//   onConfirm,
//   onCancel,
// }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

//     <div
//       className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
//       onClick={onCancel}
//     />

//     <div className="relative w-full max-w-sm bg-[#110d07] border border-[#c9a96e]/20 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.7)]">

//       <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />

//       <h3 className="font-['Cormorant_Garamond',serif] text-[1.4rem] text-[#f5f0e8] text-center font-light mb-3">
//         {title}
//       </h3>

//       <p className="text-center text-[10px] tracking-[0.25em] uppercase text-[#f5f0e8]/30 mb-8">
//         {message}
//       </p>

//       <div className="flex gap-3">

//         <button
//           onClick={onCancel}
//           className="
//             flex-1 py-3
//             border border-[#c9a96e]/18
//             text-[#c9a96e]/60
//             hover:border-[#c9a96e]/45
//             hover:text-[#c9a96e]
//             transition-all
//             text-[9px]
//             tracking-[0.35em]
//             uppercase
//           "
//         >
//           Cancel
//         </button>

//         <button
//           onClick={onConfirm}
//           className={`
//             flex-1 py-3
//             transition-all
//             text-[9px]
//             tracking-[0.35em]
//             uppercase
//             ${confirmClass}
//           `}
//         >
//           {confirmLabel}
//         </button>

//       </div>
//     </div>
//   </div>
// );

// // ==========================================================
// // PRODUCT ROW
// // ==========================================================

// const ProductRow = ({
//   product,
//   onEdit,
//   onToggle,
//   onDelete,
//   index,
// }) => {

//   const isBlocked = product.isBlocked;

//   return (

//     <div
//       className={`
//         group
//         flex items-center gap-5
//         px-6 py-4
//         border-b border-[#c9a96e]/08
//         transition-all duration-300

//         ${
//           isBlocked
//             ? `
//               bg-[#080503]
//               opacity-[0.55]
//               hover:opacity-[0.7]
//             `
//             : `
//               bg-[#0d0a05]
//               hover:bg-[#110d07]
//             `
//         }
//       `}
//       style={{
//         animation: "fadeUp 0.45s ease forwards",
//         animationDelay: `${index * 40}ms`,
//       }}
//     >

//       {/* STATUS DOT */}

//       <div
//         className="w-[7px] h-[7px] rounded-full flex-shrink-0"
//         style={{
//           background: isBlocked
//             ? "rgba(248,113,113,0.55)"
//             : "rgba(201,169,110,0.7)",

//           boxShadow: isBlocked
//             ? "0 0 8px rgba(248,113,113,0.25)"
//             : "0 0 8px rgba(201,169,110,0.25)",
//         }}
//       />

//       {/* IMAGE */}

//       <div className="w-12 h-12 border border-[#c9a96e]/15 overflow-hidden bg-[#110d07]">

//         <img
//           src={product.image || "/placeholder.png"}
//           alt={product.name}
//           className={`
//             w-full h-full object-cover transition-all duration-300

//             ${
//               isBlocked
//                 ? "opacity-25 grayscale"
//                 : "opacity-80 group-hover:opacity-100"
//             }
//           `}
//         />
//       </div>

//       {/* INFO */}

//       <div className="flex-1 min-w-0">

//         <div className="flex items-center gap-2 flex-wrap">

//           <p
//             className={`
//               font-['Cormorant_Garamond',serif]
//               text-[1.05rem]
//               truncate

//               ${
//                 isBlocked
//                   ? "text-[#f5f0e8]/40"
//                   : "text-[#f5f0e8]/85"
//               }
//             `}
//           >
//             {product.name}
//           </p>

//           {isBlocked && (

//             <span
//               className="
//                 px-2 py-[3px]
//                 text-[8px]
//                 tracking-[0.42em]
//                 uppercase
//                 border
//                 border-red-400/12
//                 bg-red-400/[0.03]
//                 text-red-300/60
//               "
//             >
//               BLOCKED
//             </span>
//           )}
//         </div>

//         <p
//           className={`
//             text-[11px]
//             mt-1

//             ${
//               isBlocked
//                 ? "text-[#f5f0e8]/18"
//                 : "text-[#f5f0e8]/28"
//             }
//           `}
//         >
//           {product.category || "—"} · ID: {product.id}
//         </p>
//       </div>

//       {/* PRICE */}

//       <div className="min-w-[90px] text-right">

//         <span
//           className={`
//             font-['Cormorant_Garamond',serif]
//             text-[1rem]

//             ${
//               isBlocked
//                 ? "text-[#f5f0e8]/22"
//                 : "text-[#c9a96e]/80"
//             }
//           `}
//         >
//           ₹{product.basePrice ?? product.price ?? 0}
//         </span>
//       </div>

//       {/* ACTIONS */}

//       <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">

//         {/* EDIT */}

//         <button
//           onClick={() => onEdit(product)}
//           className="
//             w-8 h-8
//             flex items-center justify-center
//             border border-[#c9a96e]/15
//             text-[#c9a96e]/50
//             hover:border-[#c9a96e]/45
//             hover:text-[#c9a96e]
//             transition-all
//           "
//         >
//           <EditIcon />
//         </button>

//         {/* TOGGLE */}

//         <button
//           onClick={() => onToggle(product)}
//           className={`
//             w-8 h-8
//             flex items-center justify-center
//             border transition-all

//             ${
//               isBlocked
//                 ? `
//                   border-emerald-500/20
//                   text-emerald-400/50
//                   hover:border-emerald-500/50
//                   hover:text-emerald-400
//                 `
//                 : `
//                   border-amber-500/20
//                   text-amber-400/50
//                   hover:border-amber-500/50
//                   hover:text-amber-400
//                 `
//             }
//           `}
//         >
//           {isBlocked ? <UnblockIcon /> : <BlockIcon />}
//         </button>

//         {/* DELETE */}

//         <button
//           onClick={() => onDelete(product)}
//           className="
//             w-8 h-8
//             flex items-center justify-center
//             border border-red-400/15
//             text-red-400/40
//             hover:border-red-400/45
//             hover:text-red-400
//             transition-all
//           "
//         >
//           <TrashIcon />
//         </button>
//       </div>
//     </div>
//   );
// };

// // ==========================================================
// // MAIN COMPONENT
// // ==========================================================

// export default function ProductList() {

//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [confirm, setConfirm] = useState({
//     open: false,
//     type: null,
//     product: null,
//   });

//   // ==========================================================
//   // FETCH
//   // ==========================================================

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {

//     try {

//       setLoading(true);

//       const data =
//         await getAllProductsForAdmin();

//       const normalized =
//         (data || []).map((p) => ({
//           ...p,
//           isBlocked:
//             p.isBlocked ??
//             p.blocked ??
//             false,
//         }));

//       setProducts(normalized);

//     } catch (error) {

//       console.error(error);

//       toast.error(
//         "Failed to load products",
//         {
//           className: "luxury-toast",
//         }
//       );

//     } finally {

//       setLoading(false);
//     }
//   };

//   // ==========================================================
//   // EDIT
//   // ==========================================================

//   const handleEdit = (product) => {

//     navigate(
//       `/admin/edit-product/${product.id}`
//     );
//   };

//   // ==========================================================
//   // TOGGLE OPEN
//   // ==========================================================

//   const handleToggle = (product) => {

//     setConfirm({
//       open: true,
//       type: "toggle",
//       product,
//     });
//   };

//   // ==========================================================
//   // DELETE OPEN
//   // ==========================================================

//   const handleDelete = (product) => {

//     setConfirm({
//       open: true,
//       type: "delete",
//       product,
//     });
//   };

//   // ==========================================================
//   // CONFIRM ACTION
//   // ==========================================================

//   const handleConfirmAction = async () => {

//     if (!confirm.product) return;

//     const product = confirm.product;

//     try {

//       // ======================================================
//       // TOGGLE
//       // ======================================================

//       if (confirm.type === "toggle") {

//         const willBlock =
//           !product.isBlocked;

//         await toggleProduct(product.id);

//         // INSTANT UI UPDATE

//         setProducts((prev) =>
//           prev.map((p) =>
//             p.id === product.id
//               ? {
//                   ...p,
//                   isBlocked: willBlock,
//                 }
//               : p
//           )
//         );

//         toast.success(

//           willBlock
//             ? `${product.name} is blocked`
//             : `${product.name} is unblocked`,

//           {
//             className: "luxury-toast",

//             duration: 2400,

//             iconTheme: {

//               primary: willBlock
//                 ? "#f59e0b"
//                 : "#10b981",

//               secondary: "#0d0a05",
//             },
//           }
//         );
//       }

//       // ======================================================
//       // DELETE
//       // ======================================================

//       if (confirm.type === "delete") {

//         await deleteProduct(product.id);

//         setProducts((prev) =>
//           prev.filter((p) =>
//             p.id !== product.id
//           )
//         );

//         toast.success(

//           `${product.name} deleted`,

//           {
//             className: "luxury-toast",
//           }
//         );
//       }

//     } catch (error) {

//       console.error(error);

//       toast.error(

//         "Action failed",

//         {
//           className: "luxury-toast",
//         }
//       );
//     }

//     finally {

//       setConfirm({
//         open: false,
//         type: null,
//         product: null,
//       });
//     }
//   };

//   // ==========================================================
//   // COUNTS
//   // ==========================================================

//   const activeCount =
//     products.filter((p) => !p.isBlocked).length;

//   const blockedCount =
//     products.filter((p) => p.isBlocked).length;

//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (
//     <>
//       <style>{`

//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@200;300;400&display=swap');

//         @keyframes fadeUp {

//           from {
//             opacity: 0;
//             transform: translateY(16px);
//           }

//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .luxury-toast {

//           background: rgba(15,11,6,0.94) !important;

//           color: #f5f0e8 !important;

//           border:
//             1px solid rgba(201,169,110,0.12) !important;

//           backdrop-filter: blur(14px);

//           box-shadow:
//             0 20px 45px rgba(0,0,0,0.45),
//             0 0 0 1px rgba(201,169,110,0.05);

//           border-radius: 0px !important;

//           font-family: 'Jost', sans-serif !important;

//           font-size: 11px !important;

//           letter-spacing: 0.05em !important;

//           padding: 14px 16px !important;
//         }

//       `}</style>

//       <div className="min-h-screen bg-[#0d0a05] px-4 sm:px-6 lg:px-14 py-10">

//         {/* HEADER */}

//         <div className="flex items-center justify-between mb-10">

//           <div>

//             <p className="text-[#c9a96e] text-[10px] tracking-[0.5em] uppercase mb-2">
//               Admin Inventory
//             </p>

//             <h1 className="font-['Cormorant_Garamond',serif] text-5xl text-[#f5f0e8]">
//               Product Catalogue
//             </h1>
//           </div>

//           <Link
//             to="/admin/add-product"
//             className="
//               flex items-center gap-2
//               px-5 py-3
//               bg-[#c9a96e]
//               text-[#0d0a05]
//               text-[10px]
//               tracking-[0.35em]
//               uppercase
//               hover:bg-[#d4b87a]
//               transition-all
//             "
//           >
//             <PlusIcon />
//             Add Product
//           </Link>
//         </div>

//         {/* STATS */}

//         <div className="grid grid-cols-3 border border-[#c9a96e]/10 mb-6">

//           {[
//             {
//               label: "Total",
//               value: products.length,
//             },

//             {
//               label: "Active",
//               value: activeCount,
//               color: "text-[#c9a96e]",
//             },

//             {
//               label: "Blocked",
//               value: blockedCount,
//               color: "text-red-300/70",
//             },
//           ].map((item) => (

//             <div
//               key={item.label}
//               className="text-center py-5 border-r border-[#c9a96e]/08 last:border-r-0"
//             >

//               <p
//                 className={`
//                   font-['Cormorant_Garamond',serif]
//                   text-3xl
//                   ${
//                     item.color ||
//                     "text-[#f5f0e8]/60"
//                   }
//                 `}
//               >
//                 {item.value}
//               </p>

//               <p className="text-[10px] tracking-[0.35em] uppercase text-[#f5f0e8]/25 mt-1">
//                 {item.label}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* LIST */}

//         <div className="border border-[#c9a96e]/10">

//           {loading ? (

//             <div className="py-20 text-center text-[#f5f0e8]/40">
//               Loading...
//             </div>

//           ) : (

//             products.map((product, i) => (

//               <ProductRow
//                 key={product.id}
//                 product={product}
//                 index={i}
//                 onEdit={handleEdit}
//                 onToggle={handleToggle}
//                 onDelete={handleDelete}
//               />
//             ))
//           )}
//         </div>
//       </div>

//       {/* CONFIRM */}

//       {confirm.open && (

//         <ConfirmDialog

//           title={
//             confirm.type === "toggle"

//               ? confirm.product?.isBlocked
//                 ? `Unblock "${confirm.product?.name}"?`
//                 : `Block "${confirm.product?.name}"?`

//               : `Delete "${confirm.product?.name}"?`
//           }

//           message={
//             confirm.type === "toggle"

//               ? confirm.product?.isBlocked
//                 ? "This product will become visible again."
//                 : "This product will become unavailable to customers."

//               : "This action cannot be undone."
//           }

//           confirmLabel={
//             confirm.type === "toggle"

//               ? confirm.product?.isBlocked
//                 ? "Unblock"
//                 : "Block"

//               : "Delete"
//           }

//           confirmClass={
//             confirm.type === "toggle"

//               ? confirm.product?.isBlocked

//                 ? `
//                   bg-emerald-500
//                   text-[#0d0a05]
//                   hover:bg-emerald-400
//                 `

//                 : `
//                   bg-[#c9a96e]
//                   text-[#0d0a05]
//                   hover:bg-[#d4b87a]
//                 `

//               : `
//                 bg-red-400
//                 text-[#0d0a05]
//                 hover:bg-red-300
//               `
//           }

//           onConfirm={handleConfirmAction}

//           onCancel={() =>
//             setConfirm({
//               open: false,
//               type: null,
//               product: null,
//             })
//           }
//         />
//       )}
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  getAllProductsForAdmin,
  deleteProduct,
  toggleProduct,
} from "../../../services/productApi";

import toast from "react-hot-toast";

// ==========================================================
// ICONS
// ==========================================================

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const BlockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

const UnblockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const PackageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// ==========================================================
// CONFIRM DIALOG
// ==========================================================

const ConfirmDialog = ({
  title,
  message,
  confirmLabel,
  confirmClass,
  onConfirm,
  onCancel,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-[6px]" onClick={onCancel} />
    <div className="relative w-full max-w-sm bg-[#110d07] border border-[#c9a96e]/20 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.7)]">
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
      <h3 className="font-['Cormorant_Garamond',serif] text-[1.4rem] text-[#f5f0e8] text-center font-light mb-3">
        {title}
      </h3>
      <p className="text-center text-[10px] tracking-[0.25em] uppercase text-[#f5f0e8]/30 mb-8">
        {message}
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 border border-[#c9a96e]/18 text-[#c9a96e]/60 hover:border-[#c9a96e]/45 hover:text-[#c9a96e] transition-all text-[9px] tracking-[0.35em] uppercase font-['Jost',sans-serif]"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`flex-1 py-3 transition-all text-[9px] tracking-[0.35em] uppercase font-['Jost',sans-serif] ${confirmClass}`}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

// ==========================================================
// PRODUCT ROW
// ==========================================================

const ProductRow = ({ product, onEdit, onToggle, onDelete, index }) => {
  const isBlocked = product.isBlocked;

  return (
    <div
      className={`
        group flex items-center gap-5 px-6 py-4
        border-b border-[#c9a96e]/08
        transition-all duration-300
        ${isBlocked
          ? "bg-[#080503] opacity-[0.55] hover:opacity-[0.72]"
          : "bg-[#0d0a05] hover:bg-[#110d07]"
        }
      `}
      style={{
        animation: "fadeUp 0.45s ease forwards",
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* STATUS DOT */}
      <div
        className="w-[7px] h-[7px] rounded-full flex-shrink-0"
        style={{
          background: isBlocked ? "rgba(248,113,113,0.55)" : "rgba(201,169,110,0.7)",
          boxShadow: isBlocked ? "0 0 8px rgba(248,113,113,0.25)" : "0 0 8px rgba(201,169,110,0.25)",
        }}
      />

      {/* IMAGE */}
      <div className="w-12 h-12 border border-[#c9a96e]/15 overflow-hidden bg-[#110d07] flex-shrink-0">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          onError={(e) => (e.target.src = "/placeholder.png")}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isBlocked ? "opacity-25 grayscale" : "opacity-80 group-hover:opacity-100"
          }`}
        />
      </div>

      {/* INFO */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`font-['Cormorant_Garamond',serif] text-[1.05rem] truncate ${
            isBlocked ? "text-[#f5f0e8]/40" : "text-[#f5f0e8]/85"
          }`}>
            {product.name}
          </p>
          {isBlocked && (
            <span className="px-2 py-[3px] text-[8px] tracking-[0.42em] uppercase border border-red-400/12 bg-red-400/[0.03] text-red-300/60 flex-shrink-0">
              BLOCKED
            </span>
          )}
        </div>
        <p className={`text-[11px] mt-1 font-['Jost',sans-serif] ${
          isBlocked ? "text-[#f5f0e8]/18" : "text-[#f5f0e8]/28"
        }`}>
          {product.category || "—"} · ID: {product.id}
        </p>
      </div>

      {/* PRICE */}
      <div className="min-w-[90px] text-right flex-shrink-0">
        <span className={`font-['Cormorant_Garamond',serif] text-[1rem] ${
          isBlocked ? "text-[#f5f0e8]/22" : "text-[#c9a96e]/80"
        }`}>
          ${product.basePrice ?? product.price ?? 0}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button onClick={() => onEdit(product)}
          className="w-8 h-8 flex items-center justify-center border border-[#c9a96e]/15 text-[#c9a96e]/50 hover:border-[#c9a96e]/45 hover:text-[#c9a96e] transition-all">
          <EditIcon />
        </button>
        <button onClick={() => onToggle(product)}
          className={`w-8 h-8 flex items-center justify-center border transition-all ${
            isBlocked
              ? "border-emerald-500/20 text-emerald-400/50 hover:border-emerald-500/50 hover:text-emerald-400"
              : "border-amber-500/20 text-amber-400/50 hover:border-amber-500/50 hover:text-amber-400"
          }`}>
          {isBlocked ? <UnblockIcon /> : <BlockIcon />}
        </button>
        <button onClick={() => onDelete(product)}
          className="w-8 h-8 flex items-center justify-center border border-red-400/15 text-red-400/40 hover:border-red-400/45 hover:text-red-400 transition-all">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

// ==========================================================
// MAIN COMPONENT
// ==========================================================

export default function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState({ open: false, type: null, product: null });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProductsForAdmin();
      const normalized = (data || []).map((p) => ({
        ...p,
        isBlocked: p.isBlocked ?? p.blocked ?? false,
      }));
      setProducts(normalized);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products", { className: "luxury-toast" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => navigate(`/admin/edit-product/${product.id}`);

  const handleToggle = (product) => setConfirm({ open: true, type: "toggle", product });

  const handleDelete = (product) => setConfirm({ open: true, type: "delete", product });

  const handleConfirmAction = async () => {
    if (!confirm.product) return;
    const product = confirm.product;
    try {
      if (confirm.type === "toggle") {
        const willBlock = !product.isBlocked;
        await toggleProduct(product.id);
        setProducts((prev) =>
          prev.map((p) => p.id === product.id ? { ...p, isBlocked: willBlock } : p)
        );
        toast.success(willBlock ? `${product.name} is blocked` : `${product.name} is unblocked`, {
          className: "luxury-toast",
          iconTheme: { primary: willBlock ? "#f59e0b" : "#10b981", secondary: "#0d0a05" },
        });
      }
      if (confirm.type === "delete") {
        await deleteProduct(product.id);
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
        toast.success(`${product.name} deleted`, { className: "luxury-toast" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Action failed", { className: "luxury-toast" });
    } finally {
      setConfirm({ open: false, type: null, product: null });
    }
  };

  const filteredProducts = products.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(term) ||
      String(p.id).includes(term) ||
      p.category?.toLowerCase().includes(term)
    );
  });

  const activeCount = products.filter((p) => !p.isBlocked).length;
  const blockedCount = products.filter((p) => p.isBlocked).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pl-fadein { animation: fadeUp 0.5s ease forwards; }

        .pl-scroll::-webkit-scrollbar { width: 2px; }
        .pl-scroll::-webkit-scrollbar-track { background: transparent; }
        .pl-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }

        .luxury-toast {
          background: rgba(15,11,6,0.94) !important;
          color: #f5f0e8 !important;
          border: 1px solid rgba(201,169,110,0.12) !important;
          backdrop-filter: blur(14px);
          box-shadow: 0 20px 45px rgba(0,0,0,0.45);
          border-radius: 0px !important;
          font-family: 'Jost', sans-serif !important;
          font-size: 11px !important;
          letter-spacing: 0.05em !important;
          padding: 14px 16px !important;
        }
      `}</style>

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] px-4 sm:px-6 lg:px-14 py-10 lg:py-14">

        {/* AMBIENT GLOW */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-[700px] h-[400px] rounded-full bg-[#c9a96e]/[0.022] blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">

          {/* ── HEADER ── */}
          <div className="pl-fadein mb-12">

            {/* Top row: breadcrumb + dashboard link */}
            <div className="flex items-start justify-between mb-5">

              <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase opacity-65">
                Admin · Products
              </p>

              <Link
                to="/admin/dashboard"
                className="group flex items-center gap-3 text-[#c9a96e]/55 hover:text-[#c9a96e] transition-all uppercase tracking-[0.4em] text-[10px]"
              >
                <span className="w-8 h-px bg-[#c9a96e]/35 group-hover:w-12 group-hover:bg-[#c9a96e] transition-all duration-300" />
                Dashboard
              </Link>
            </div>

            {/* Title */}
            <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2.6rem,5vw,3.8rem)] font-light text-[#f5f0e8] leading-none mb-6">
              Product{" "}
              <span className="italic text-[#c9a96e]">Management</span>
            </h1>

            {/* Subtitle row */}
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-[#c9a96e]/50 to-transparent" />
                <p className="text-[#f5f0e8]/22 text-[10px] tracking-[0.4em] uppercase">
                  Manage and control product catalogue
                </p>
              </div>

              <Link
                to="/admin/add-product"
                className="flex items-center gap-2 px-5 py-3 bg-[#c9a96e] hover:bg-[#d4b87a] text-[#0d0a05] text-[10px] tracking-[0.35em] uppercase transition-all"
              >
                <PlusIcon />
                Add Product
              </Link>
            </div>
          </div>

          {/* ── PANEL ── */}
          <div className="border border-[#c9a96e]/10 pl-fadein" style={{ animationDelay: "80ms" }}>

            {/* Panel top bar: icon + title + search */}
            <div className="flex items-center justify-between gap-4 px-6 py-5 bg-[#110d07] border-b border-[#c9a96e]/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/65">
                  <PackageIcon />
                </div>
                <h2 className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light text-[#f5f0e8]">
                  All Products
                </h2>
              </div>

              <div className="flex-1 max-w-xs">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, category, ID…"
                  className="w-full bg-transparent text-[#f5f0e8]/70 text-[12px] font-light placeholder:text-[#f5f0e8]/18 focus:outline-none border-b border-[#c9a96e]/15 pb-1 focus:border-[#c9a96e]/40 transition-colors"
                />
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-4 divide-x divide-[#c9a96e]/08 border-b border-[#c9a96e]/08">
              {[
                { label: "Total",    value: products.length },
                { label: "Filtered", value: filteredProducts.length, color: "text-[#c9a96e]" },
                { label: "Active",   value: activeCount,              color: "text-[#c9a96e]" },
                { label: "Blocked",  value: blockedCount,             color: "text-red-300/70" },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center py-4 px-5">
                  <p className={`font-['Cormorant_Garamond',serif] text-[1.5rem] font-light ${color || "text-[#f5f0e8]/55"}`}>
                    {value}
                  </p>
                  <p className="text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/22 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* COLUMN HEADERS */}
            <div className="hidden md:flex items-center gap-5 px-6 py-2 border-b border-[#c9a96e]/06 bg-[#0d0a05]">
              <div className="w-[7px] flex-shrink-0" />
              <div className="w-12 flex-shrink-0" />
              <p className="flex-1 text-[9px] tracking-[0.38em] uppercase text-[#f5f0e8]/18">Product</p>
              <p className="w-[90px] text-right text-[9px] tracking-[0.38em] uppercase text-[#f5f0e8]/18">Price</p>
              <div className="w-[100px] flex-shrink-0" />
            </div>

            {/* LIST */}
            <div className="pl-scroll overflow-y-auto" style={{ maxHeight: "580px" }}>
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="w-5 h-5 border border-[#c9a96e]/20 border-t-[#c9a96e]/70 rounded-full animate-spin" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <p className="font-['Cormorant_Garamond',serif] italic text-[#f5f0e8]/20 text-[1.15rem]">
                    {search ? "No matches found" : "No products yet"}
                  </p>
                  {!search && (
                    <Link
                      to="/admin/add-product"
                      className="text-[#c9a96e]/45 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-colors"
                    >
                      + Add first product
                    </Link>
                  )}
                </div>
              ) : (
                filteredProducts.map((product, i) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    index={i}
                    onEdit={handleEdit}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>

          </div>
          {/* end panel */}

        </div>
      </div>

      {/* CONFIRM DIALOG */}
      {confirm.open && (
        <ConfirmDialog
          title={
            confirm.type === "toggle"
              ? confirm.product?.isBlocked
                ? `Unblock "${confirm.product?.name}"?`
                : `Block "${confirm.product?.name}"?`
              : `Delete "${confirm.product?.name}"?`
          }
          message={
            confirm.type === "toggle"
              ? confirm.product?.isBlocked
                ? "This product will become visible again."
                : "This product will become unavailable to customers."
              : "This action cannot be undone."
          }
          confirmLabel={
            confirm.type === "toggle"
              ? confirm.product?.isBlocked ? "Unblock" : "Block"
              : "Delete"
          }
          confirmClass={
            confirm.type === "toggle"
              ? confirm.product?.isBlocked
                ? "bg-emerald-500 text-[#0d0a05] hover:bg-emerald-400"
                : "bg-[#c9a96e] text-[#0d0a05] hover:bg-[#d4b87a]"
              : "bg-red-400 text-[#0d0a05] hover:bg-red-300"
          }
          onConfirm={handleConfirmAction}
          onCancel={() => setConfirm({ open: false, type: null, product: null })}
        />
      )}
    </>
  );
}