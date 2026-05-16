// // import { useEffect, useState } from "react";

// // import {
// //   getAllUsers,
// //   toggleUser,
// //   deleteUser,
// // } from "../../../services/userApi";

// // import {
// //   getAllOrders,
// // } from "../../../services/orderApi";

// // import api from "../../../services/api";

// // import {
// //   Search,
// //   Trash2,
// //   ArrowLeft,
// //   Ban,
// //   CheckCircle
// // } from "lucide-react";

// // import { Link }
// // from "react-router-dom";

// // import toast
// // from "react-hot-toast";


// // export default function UserManagement() {
// //   const [users, setUsers] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //  const fetchUsers = async () => {

// //   try {

// //     setLoading(true);

// //     const data =
// //       await getAllUsers();

// //     console.log(data);

// //     const usersArray =
// //       Array.isArray(data)
// //         ? data
// //         : data.data || [];

// //     setUsers(usersArray);

// //   } catch (err) {

// //     console.error(err);

// //     toast.error(
// //       "Failed to load users"
// //     );

// //     setUsers([]);

// //   } finally {

// //     setLoading(false);
// //   }
// // };
// //   //  Block/Unblock Handler 
// //   const handleToggleBlock =
// //   async (
// //     userId,
// //     currentStatus
// //   ) => {

// //     const action =
// //       currentStatus === "blocked"
// //         ? "unblock"
// //         : "block";

// //     const loadingToast =
// //       toast.loading(
// //         `${action}ing user...`
// //       );

// //     try {

// //       await toggleUser(userId);

// //       setUsers((prev) =>
// //         prev.map((u) =>

// //           u.id === userId

// //             ? {
// //                 ...u,

// //                 userStatus:
// //                   u.userStatus === "blocked"
// //                     ? "active"
// //                     : "blocked",
// //               }

// //             : u
// //         )
// //       );

// //       toast.dismiss(
// //         loadingToast
// //       );

// //       toast.success(
// //         `User ${action}ed successfully`
// //       );

// //     } catch (err) {

// //       console.error(err);

// //       toast.dismiss(
// //         loadingToast
// //       );

// //       toast.error(
// //         `Failed to ${action} user`
// //       );
// //     }
// // };

// //   const handleDeleteUser =
// //   async (
// //     userId,
// //     userEmail
// //   ) => {

// //     const confirmDelete =
// //       window.confirm(
// //         `Delete ${userEmail} and all orders?`
// //       );

// //     if (!confirmDelete) return;

// //     const loadingToast =
// //       toast.loading(
// //         "Deleting user..."
// //       );

// //     try {

// //       const allOrders =
// //         await getAllOrders();

// //       const userOrders =
// //         allOrders.filter(
// //           (order) =>
// //             order.userEmail ===
// //             userEmail
// //         );

// //       if (userOrders.length > 0)
// //       {
// //         await Promise.all(

// //           userOrders.map(
// //             (order) =>

// //               api.delete(
// //                 `/order/${order.id}`
// //               )
// //           )
// //         );
// //       }

// //       await deleteUser(userId);

// //       setUsers((prev) =>
// //         prev.filter(
// //           (u) =>
// //             u.id !== userId
// //         )
// //       );

// //       toast.dismiss(
// //         loadingToast
// //       );

// //       toast.success(
// //         "User deleted successfully"
// //       );

// //     } catch (err) {

// //       console.error(err);

// //       toast.dismiss(
// //         loadingToast
// //       );

// //       toast.error(
// //         "Failed to delete user"
// //       );
// //     }
// // };
// //   const filteredUsers =
// //   Array.isArray(users)

// //     ? users.filter(
// //         (user) =>

// //           user.firstName
// //             ?.toLowerCase()
// //             .includes(
// //               searchTerm.toLowerCase()
// //             )

// //           ||

// //           user.lastName
// //             ?.toLowerCase()
// //             .includes(
// //               searchTerm.toLowerCase()
// //             )

// //           ||

// //           user.email
// //             ?.toLowerCase()
// //             .includes(
// //               searchTerm.toLowerCase()
// //             )
// //       )

// //     : [];

// //   return (
// //     <div className="p-6 min-h-screen bg-gray-50">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
// //           {/* HEADER SECTION */}
// //           <div className="px-8 py-6 border-b border-gray-100">
// //             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
// //                 <p className="text-gray-600 mt-1">Manage and control user access</p>
// //               </div>

// //               <div className="flex-1 max-w-lg mx-auto lg:mx-0">
// //                 <div className="relative">
// //                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search by name or email..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="w-full pl-12 pr-6 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <Link
// //                   to="/admin/dashboard"
// //                   className="flex items-center text-[#9c7635] font-medium hover:underline"
// //                 >
// //                   <ArrowLeft size={20} />
// //                   Back to Dashboard
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>

// //           {/* USERS TABLE */}
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
// //                   <th className="px-8 py-4">User</th>
// //                   <th className="px-8 py-4">Email</th>
// //                   <th className="px-8 py-4">Status</th>
// //                   <th className="px-8 py-4">Join</th>
// //                   <th className="px-8 py-4 text-right">Actions</th>
// //                 </tr>
// //               </thead>

// //               <tbody className="divide-y divide-gray-100">
// //                 {loading ? (
// //                   [...Array(5)].map((_, i) => (
// //                     <tr key={i} className="animate-pulse">
// //                       <td className="px-8 py-6">
// //                         <div className="flex items-center gap-4">
// //                           <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
// //                           <div className="h-4 bg-gray-200 rounded w-40"></div>
// //                         </div>
// //                       </td>
// //                       <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
// //                       <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
// //                       <td className="px-8 py-6"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
// //                       <td className="px-8 py-6 text-right"><div className="h-8 bg-gray-200 rounded w-28 inline-block"></div></td>
// //                     </tr>
// //                   ))
// //                 ) : filteredUsers.length === 0 ? (
// //                   <tr>
// //                     <td colSpan={5} className="px-8 py-16 text-center text-gray-500">
// //                       <p className="text-lg">No users found</p>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   filteredUsers.map((user) => (
// //                     <tr
// //                       key={user.id}
// //                       className={`hover:bg-gray-50 transition ${user.userStatus === "blocked" ? "bg-red-50" : ""}`}
// //                     >
// //                       <td className="px-8 py-6">
// //                         <div className="flex items-center gap-4">
// //                           <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
// //                             <span className="text-[#b69255] font-semibold text-sm">
// //                               {user.firstName?.[0]?.toUpperCase() || ""}
// //                               {user.lastName?.[0]?.toUpperCase() || ""}
// //                             </span>
// //                           </div>
// //                           <div>
// //                             <p className="font-medium text-gray-900">
// //                               {user.firstName || "Unknown"} {user.lastName || ""}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       </td>

// //                       <td className="px-8 py-6 text-gray-700">{user.email}</td>

// //                       <td className="px-8 py-6">
// //                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
// //                           user.userStatus === "blocked"
// //                             ? "bg-red-100 text-red-800"
// //                             : "bg-green-100 text-green-800"
// //                         }`}>
// //                           {user.userStatus === "blocked" ? "Blocked" : "Active"}
// //                         </span>
// //                       </td>

// //                       <td className="px-8 py-6 text-gray-600">
// //                         {user.joinDate || "January 2026"}
// //                       </td>

// //                       <td className="px-8 py-6 text-right">
// //                         <div className="flex items-center justify-end gap-3">
// //                           <button
// //                             onClick={() => handleToggleBlock(user.id, user.userStatus, user.email)}
// //                             className={`px-4 py-2 rounded-xl font-medium transition flex items-center gap-2 ${
// //                               user.userStatus === "blocked"
// //                                 ? "bg-[#513f21] hover:bg-[#785c2c] text-white"
// //                                 : "bg-[#9c7635] hover:bg-[#ac8b54] text-white"
// //                             }`}
// //                             title={user.userStatus === "blocked" ? "Unblock user" : "Block user"}
// //                           >
// //                             {user.userStatus === "blocked" ? (
// //                               <>
// //                                 <CheckCircle size={18} />
// //                                 Unblock
// //                               </>
// //                             ) : (
// //                               <>
// //                                 <Ban size={18} />
// //                                 Block
// //                               </>
// //                             )}
// //                           </button>

// //                           <button
// //                             onClick={() => handleDeleteUser(user.id, user.email)}
// //                             className="px-5 py-2 text-[#b78838] bg-white rounded-xl font-medium hover:bg-[#7f602b] hover:text-white transition"
// //                             title="Delete user"
// //                           >
// //                             <Trash2 size={18} />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";

// import {
//   getAllUsers,
//   toggleUser,
//   deleteUser,
// } from "../../../services/userApi";

// import {
//   getAllOrders,
// } from "../../../services/orderApi";

// import api from "../../../services/api";

// import {
//   Search,
//   Trash2,
//   ArrowLeft,
//   Ban,
//   CheckCircle,
//   Users,
// } from "lucide-react";

// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// /* ─── Inline styles for luxury dark-brown theme ─── */
// const theme = {

//   pageBg: "#0d0a05",

//   cardBg: "#110d07",

//   cardBorder: "rgba(201,169,110,0.12)",

//   headerBg: "#110d07",

//   tableHeadBg: "#0d0a05",

//   rowHover: "#161008",

//   rowBlocked: "#140909",

//   gold: "#c9a96e",

//   goldLight: "#d4b87a",

//   goldDim: "rgba(201,169,110,0.55)",

//   cream: "#f5f0e8",

//   textPrimary: "#f5f0e8",

//   textSecondary: "rgba(245,240,232,0.6)",

//   textMuted: "rgba(245,240,232,0.25)",

//   divider: "rgba(201,169,110,0.08)",

//   inputBg: "#0d0a05",

//   inputBorder: "rgba(201,169,110,0.12)",

//   inputFocus: "#c9a96e",

//   activeBadgeBg: "rgba(201,169,110,0.10)",

//   activeBadgeText: "#c9a96e",

//   blockedBadgeBg: "rgba(248,113,113,0.08)",

//   blockedBadgeText: "rgba(248,113,113,0.75)",

//   btnGold: "#c9a96e",

//   btnGoldHover: "#d4b87a",

//   btnDark: "#1a140c",

//   btnDarkHover: "#241b10",

//   skeletonBase: "#1a140c",
// };

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');

//   .um-root * { box-sizing: border-box; margin: 0; padding: 0; }

//   .um-root {
//     font-family: 'Jost', sans-serif;
//     background: ${theme.pageBg};
//     min-height: 100vh;
//     padding: 2.5rem 1.5rem;
//     background-image:
//       radial-gradient(ellipse at 20% 10%, rgba(180,130,40,0.05) 0%, transparent 60%),
//       radial-gradient(ellipse at 80% 90%, rgba(100,60,10,0.07) 0%, transparent 60%);
//   }

//   .um-inner { max-width: 1200px; margin: 0 auto; }

//   .um-card {

//   background: ${theme.cardBg};

//   border:
//     1px solid ${theme.cardBorder};

//   overflow: hidden;

//   box-shadow:
//     0 0 0 1px rgba(201,169,110,0.04),
//     0 30px 80px rgba(0,0,0,0.55);
// }

//   /* HEADER */
//   .um-header {
//     padding: 2rem 2.5rem;
//     border-bottom: 1px solid ${theme.divider};
//     background: ${theme.headerBg};
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;
//     position: relative;
//     overflow: hidden;
//   }

//   .um-header::before {
//     content: '';
//     position: absolute;
//     top: 0; left: 0; right: 0;
//     height: 2px;
//     background: linear-gradient(90deg, transparent, ${theme.gold}, transparent);
//   }

//   .um-header-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     flex-wrap: wrap;
//     gap: 1rem;
//   }

//   .um-title-block {}

//   .um-title-eyebrow {
//     font-family: 'Jost', sans-serif;
//     font-size: 0.65rem;
//     font-weight: 600;
//     letter-spacing: 0.25em;
//     text-transform: uppercase;
//     color: ${theme.goldDim};
//     margin-bottom: 0.35rem;
//   }

//   .um-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 2rem;
//     font-weight: 300;
//     color: ${theme.cream};
//     letter-spacing: 0.02em;
//     line-height: 1.1;
//   }

//   .um-subtitle {
//     font-size: 0.8rem;
//     color: ${theme.textMuted};
//     margin-top: 0.3rem;
//     font-weight: 300;
//     letter-spacing: 0.05em;
//   }

//   .um-icon-badge {
//     background: linear-gradient(135deg, #3d2a0f, #2a1c0a);
//     border: 1px solid ${theme.cardBorder};
//     border-radius: 0.75rem;
//     padding: 0.75rem;
//     color: ${theme.gold};
//   }

//   /* SEARCH */
//   .um-search-wrap {
//     position: relative;
//     flex: 1;
//     max-width: 420px;
//   }

//   .um-search-icon {
//     position: absolute;
//     left: 1rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: ${theme.goldDim};
//     pointer-events: none;
//   }

//   .um-search-input {
//     width: 100%;
//     background: ${theme.inputBg};
//     border: 1px solid ${theme.inputBorder};
//     border-radius: 0.75rem;
//     padding: 0.8rem 1rem 0.8rem 2.75rem;
//     font-family: 'Jost', sans-serif;
//     font-size: 0.875rem;
//     color: ${theme.textPrimary};
//     outline: none;
//     transition: border-color 0.2s, box-shadow 0.2s;
//     letter-spacing: 0.03em;
//   }

//   .um-search-input::placeholder { color: ${theme.textMuted}; }

//   .um-search-input:focus {
//     border-color: ${theme.gold};
//     box-shadow: 0 0 0 3px rgba(201,150,58,0.12);
//   }

//   /* BACK LINK */
//   .um-back-link {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.4rem;
//     font-size: 0.8rem;
//     font-weight: 500;
//     letter-spacing: 0.06em;
//     color: ${theme.textSecondary};
//     text-decoration: none;
//     text-transform: uppercase;
//     transition: color 0.2s;
//     white-space: nowrap;
//   }
//   .um-back-link:hover { color: ${theme.goldLight}; }

//   /* TABLE */
//   .um-table-wrap { overflow-x: auto; }

//   .um-table {
//     width: 100%;
//     border-collapse: collapse;
//   }

//   .um-thead tr {
//     background: ${theme.tableHeadBg};
//     border-bottom: 1px solid ${theme.divider};
//   }

//   .um-thead th {
//     padding: 1rem 2rem;
//     font-size: 0.6rem;
//     font-weight: 600;
//     letter-spacing: 0.2em;
//     text-transform: uppercase;
//     color: ${theme.textMuted};
//     text-align: left;
//     font-family: 'Jost', sans-serif;
//   }

//   .um-thead th:last-child { text-align: right; }

//   .um-tbody tr {
//     border-bottom: 1px solid ${theme.divider};
//     transition: background 0.15s;
//   }

//   .um-tbody tr:last-child { border-bottom: none; }

//   .um-tbody tr:hover { background: ${theme.rowHover}; }

//   .um-tbody tr.blocked { background: ${theme.rowBlocked}; }
//   .um-tbody tr.blocked:hover { background: #321010; }

//   .um-tbody td {
//     padding: 1.25rem 2rem;
//     vertical-align: middle;
//   }

//   /* AVATAR */
//   .um-avatar {
//     width: 2.5rem;
//     height: 2.5rem;
//     border-radius: 50%;
//     background: linear-gradient(135deg, #3d2a0f, #6b4c1a);
//     border: 1px solid ${theme.cardBorder};
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 0.95rem;
//     font-weight: 700;
//     color: ${theme.gold};
//     flex-shrink: 0;
//   }

//   .um-user-cell {
//     display: flex;
//     align-items: center;
//     gap: 0.85rem;
//   }

//   .um-user-name {
//     font-size: 0.9rem;
//     font-weight: 500;
//     color: ${theme.textPrimary};
//     letter-spacing: 0.02em;
//   }

//   .um-user-email {
//     font-size: 0.825rem;
//     color: ${theme.textSecondary};
//     letter-spacing: 0.02em;
//   }

//   .um-join-date {
//     font-size: 0.8rem;
//     color: ${theme.textMuted};
//     letter-spacing: 0.03em;
//   }

//   /* BADGE */
//   .um-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.35rem;
//     padding: 0.3rem 0.75rem;
//     border-radius: 999px;
//     font-size: 0.7rem;
//     font-weight: 600;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//   }

//   .um-badge::before {
//     content: '';
//     width: 6px; height: 6px;
//     border-radius: 50%;
//   }

//   .um-badge.active {
//     background: ${theme.activeBadgeBg};
//     color: ${theme.activeBadgeText};
//     border: 1px solid rgba(127,199,94,0.15);
//   }
//   .um-badge.active::before { background: ${theme.activeBadgeText}; }

//   .um-badge.blocked {
//     background: ${theme.blockedBadgeBg};
//     color: ${theme.blockedBadgeText};
//     border: 1px solid rgba(224,112,112,0.15);
//   }
//   .um-badge.blocked::before { background: ${theme.blockedBadgeText}; }

//   /* ACTIONS */
//   .um-actions {
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;
//     gap: 0.6rem;
//   }

//   .um-btn {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.4rem;
//     padding: 0.5rem 1rem;
//     border-radius: 0.6rem;
//     font-family: 'Jost', sans-serif;
//     font-size: 0.75rem;
//     font-weight: 600;
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//     cursor: pointer;
//     border: none;
//     transition: all 0.18s;
//   }

//   .um-btn-block {
//   background: ${theme.gold};
//   color: #0d0a05;
//   border: 1px solid rgba(201,169,110,0.18);
// }
//   .um-btn-block:hover {
//   background: ${theme.goldLight};
//   transform: translateY(-1px);
// }

//   .um-btn-unblock {
//     background: linear-gradient(135deg, #1e3318, #152510);
//     color: ${theme.activeBadgeText};
//     border: 1px solid rgba(127,199,94,0.2);
//   }
//   .um-btn-unblock:hover {
//     background: linear-gradient(135deg, #264423, #1c3018);
//     box-shadow: 0 4px 16px rgba(80,160,60,0.2);
//     transform: translateY(-1px);
//   }

//   // .um-btn-delete {
//   //   background: transparent;
//   //   color: ${theme.textMuted};
//   //   border: 1px solid ${theme.cardBorder};
//   //   padding: 0.5rem 0.75rem;
//   // }
//   // .um-btn-delete:hover {
//   //   background: ${theme.blockedBadgeBg};
//   //   color: ${theme.blockedBadgeText};
//   //   border-color: rgba(224,112,112,0.25);
//   //   transform: translateY(-1px);
//   // }

//   /* SKELETON */
//   .um-skeleton {
//     background: ${theme.skeletonBase};
//     border-radius: 0.4rem;
//     animation: um-pulse 1.6s ease-in-out infinite;
//   }

//   @keyframes um-pulse {
//     0%, 100% { opacity: 0.5; }
//     50% { opacity: 1; }
//   }

//   /* EMPTY */
//   .um-empty {
//     text-align: center;
//     padding: 5rem 2rem;
//   }

//   .um-empty-icon {
//     color: ${theme.textMuted};
//     margin: 0 auto 1rem;
//     opacity: 0.4;
//   }

//   .um-empty-text {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 1.25rem;
//     color: ${theme.textSecondary};
//     letter-spacing: 0.05em;
//   }

//   @media (max-width: 768px) {
//     .um-header { padding: 1.5rem; }
//     .um-tbody td, .um-thead th { padding: 1rem 1rem; }
//     .um-title { font-size: 1.5rem; }
//   }
// `;

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllUsers();
//       const usersArray = Array.isArray(data) ? data : data.data || [];
//       setUsers(usersArray);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load users");
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleBlock = async (userId, currentStatus) => {
//     const action = currentStatus === "blocked" ? "unblock" : "block";
//     const loadingToast = toast.loading(`${action}ing user...`);
//     try {
//       await toggleUser(userId);
//       setUsers((prev) =>
//         prev.map((u) =>
//           u.id === userId
//             ? { ...u, userStatus: u.userStatus === "blocked" ? "active" : "blocked" }
//             : u
//         )
//       );
//       toast.dismiss(loadingToast);
//       toast.success(`User ${action}ed successfully`);
//     } catch (err) {
//       console.error(err);
//       toast.dismiss(loadingToast);
//       toast.error(`Failed to ${action} user`);
//     }
//   };

//   // const handleDeleteUser = async (userId, userEmail) => {
//   //   const confirmDelete = window.confirm(`Delete ${userEmail} and all their orders?`);
//   //   if (!confirmDelete) return;
//   //   const loadingToast = toast.loading("Deleting user...");
//   //   try {
//   //     const allOrders = await getAllOrders();
//   //     const userOrders = allOrders.filter((order) => order.userEmail === userEmail);
//   //     if (userOrders.length > 0) {
//   //       await Promise.all(userOrders.map((order) => api.delete(`/order/${order.id}`)));
//   //     }
//   //     await deleteUser(userId);
//   //     setUsers((prev) => prev.filter((u) => u.id !== userId));
//   //     toast.dismiss(loadingToast);
//   //     toast.success("User deleted successfully");
//   //   } catch (err) {
//   //     console.error(err);
//   //     toast.dismiss(loadingToast);
//   //     toast.error("Failed to delete user");
//   //   }
//   // };

//   const filteredUsers = Array.isArray(users)
//     ? users.filter(
//         (user) =>
//           user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : [];

//   return (
//     <>
//       <style>{css}</style>

//       <div className="um-root">
//         <div className="um-inner">
//           <div className="um-card">

//             {/* ── HEADER ── */}
//             <div className="um-header">
//               <div className="um-header-row">
//                 <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//                   <div className="um-icon-badge">
//                     <Users size={22} />
//                   </div>
//                   <div className="um-title-block">
//                     <p className="um-title-eyebrow">Administration</p>
//                     <h1 className="um-title">User Management</h1>
//                     <p className="um-subtitle">Manage and control user access</p>
//                   </div>
//                 </div>

//                 <Link to="/admin/dashboard" className="um-back-link">
//                   <ArrowLeft size={15} />
//                   Dashboard
//                 </Link>
//               </div>

//               <div className="um-search-wrap">
//                 <Search size={16} className="um-search-icon" />
//                 <input
//                   type="text"
//                   className="um-search-input"
//                   placeholder="Search by name or email…"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* ── TABLE ── */}
//             <div className="um-table-wrap">
//               <table className="um-table">
//                 <thead className="um-thead">
//                   <tr>
//                     <th>User</th>
//                     <th>Email</th>
//                     <th>Status</th>
//                     <th>Joined</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody className="um-tbody">
//                   {loading ? (
//                     [...Array(5)].map((_, i) => (
//                       <tr key={i}>
//                         <td>
//                           <div className="um-user-cell">
//                             <div className="um-skeleton" style={{ width: 40, height: 40, borderRadius: "50%" }} />
//                             <div className="um-skeleton" style={{ width: 130, height: 14 }} />
//                           </div>
//                         </td>
//                         <td><div className="um-skeleton" style={{ width: 180, height: 14 }} /></td>
//                         <td><div className="um-skeleton" style={{ width: 70, height: 22, borderRadius: 999 }} /></td>
//                         <td><div className="um-skeleton" style={{ width: 90, height: 14 }} /></td>
//                         <td>
//                           <div className="um-actions">
//                             <div className="um-skeleton" style={{ width: 90, height: 32, borderRadius: 8 }} />
//                             <div className="um-skeleton" style={{ width: 38, height: 32, borderRadius: 8 }} />
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : filteredUsers.length === 0 ? (
//                     <tr>
//                       <td colSpan={5}>
//                         <div className="um-empty">
//                           <Users size={40} className="um-empty-icon" />
//                           <p className="um-empty-text">No users found</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredUsers.map((user) => (
//                       <tr
//                         key={user.id}
//                         className={user.userStatus === "blocked" ? "blocked" : ""}
//                       >
//                         <td>
//                           <div className="um-user-cell">
//                             <div className="um-avatar">
//                               {user.firstName?.[0]?.toUpperCase() || ""}
//                               {user.lastName?.[0]?.toUpperCase() || ""}
//                             </div>
//                             <p className="um-user-name">
//                               {user.firstName || "Unknown"} {user.lastName || ""}
//                             </p>
//                           </div>
//                         </td>

//                         <td>
//                           <span className="um-user-email">{user.email}</span>
//                         </td>

//                         <td>
//                           <span className={`um-badge ${user.userStatus === "blocked" ? "blocked" : "active"}`}>
//                             {user.userStatus === "blocked" ? "Blocked" : "Active"}
//                           </span>
//                         </td>

//                         <td>
//                           <span className="um-join-date">{user.joinDate || "January 2026"}</span>
//                         </td>

//                         <td>
//                           <div className="um-actions">
//                             <button
//                               onClick={() => handleToggleBlock(user.id, user.userStatus)}
//                               className={`um-btn ${user.userStatus === "blocked" ? "um-btn-unblock" : "um-btn-block"}`}
//                               title={user.userStatus === "blocked" ? "Unblock user" : "Block user"}
//                             >
//                               {user.userStatus === "blocked" ? (
//                                 <><CheckCircle size={14} /> Unblock</>
//                               ) : (
//                                 <><Ban size={14} /> Block</>
//                               )}
//                             </button>

//                             {/* <button
//                               onClick={() => handleDeleteUser(user.id, user.email)}
//                               className="um-btn um-btn-delete"
//                               title="Delete user"
//                             >
//                               <Trash2 size={15} />
//                             </button> */}
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }





import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getAllUsers, toggleUser, deleteUser } from "../../../services/userApi";
import { getAllOrders } from "../../../services/orderApi";
import api from "../../../services/api";

/* ── Icons (inline SVG — same style as BeanMilkManager) ── */
const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const BlockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);
const UnblockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);

/* ── Confirm Dialog (same as BeanMilkManager) ── */
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
          Confirm
        </button>
      </div>
    </div>
  </div>
);

/* ── User Row (mirrors BeanMilkManager's Row) ── */
const UserRow = ({ user, onToggleBlock, onDelete, index }) => {
  const isBlocked = user.userStatus === "blocked";
  const initials  = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "?";

  return (
    <div
      className={`group flex items-center gap-4 px-6 py-4 border-b border-[#c9a96e]/08 transition-all duration-300
        ${isBlocked ? "bg-[#180808] hover:bg-[#1e0a0a]" : "bg-[#0d0a05] hover:bg-[#110d07]"}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Status dot */}
      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0
        ${isBlocked ? "bg-[#f87171]/70" : "bg-[#c9a96e]/60"}`}
      />

      {/* Avatar */}
      <div
        className={`w-9 h-9 flex-shrink-0 flex items-center justify-center border font-light
          ${isBlocked
            ? "border-[#f87171]/20 bg-[#f87171]/10 text-[#f87171]/50"
            : "border-[#c9a96e]/20 bg-[#c9a96e]/08 text-[#c9a96e]/70"
          }`}
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem" }}
      >
        {initials}
      </div>

      {/* Name + email */}
      <div className="flex-1 min-w-0">
        {/* Name row with blocked pill */}
        <div className="flex items-center gap-2 flex-wrap">
          <p
            className={`font-light leading-tight truncate
              ${isBlocked
                ? "text-[#f5f0e8]/35 line-through decoration-[#f87171]/30"
                : "text-[#f5f0e8]/85"
              }`}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
          >
            {user.firstName || "Unknown"} {user.lastName || ""}
          </p>
          {isBlocked && (
            <span className="px-1.5 py-0.5 text-[8px] tracking-[0.35em] uppercase font-['Jost',sans-serif] bg-[#f87171]/12 border border-[#f87171]/25 text-[#f87171]/65 flex-shrink-0">
              Blocked
            </span>
          )}
        </div>
        {/* Email */}
        <p className={`text-[11px] font-['Jost',sans-serif] font-light truncate mt-0.5
          ${isBlocked ? "text-[#f5f0e8]/18" : "text-[#f5f0e8]/28"}`}
        >
          {user.email}
        </p>
      </div>

      {/* Join date */}
      <div className="hidden sm:block flex-shrink-0 text-right">
        <span className={`text-[11px] font-['Jost',sans-serif]
          ${isBlocked ? "text-[#f5f0e8]/15" : "text-[#f5f0e8]/25"}`}
        >
          {user.joinDate || "—"}
        </span>
      </div>

      {/* Actions — fade in on hover */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onToggleBlock(user)}
          title={isBlocked ? "Unblock user" : "Block user"}
          className={`w-8 h-8 flex items-center justify-center border transition-all
            ${isBlocked
              ? "border-emerald-500/20 text-emerald-400/50 hover:border-emerald-500/50 hover:text-emerald-400"
              : "border-amber-500/20 text-amber-400/50 hover:border-amber-500/50 hover:text-amber-400"
            }`}
        >
          {isBlocked ? <UnblockIcon /> : <BlockIcon />}
        </button>
        {/* <button
          onClick={() => onDelete(user)}
          title="Delete user"
          className="w-8 h-8 flex items-center justify-center border border-[#f87171]/15 text-[#f87171]/40 hover:border-[#f87171]/45 hover:text-[#f87171] transition-all"
        >
          <TrashIcon />
        </button> */}
      </div>
    </div>
  );
};

/* ── Main ── */
export default function UserManagement() {
  const [users,   setUsers]   = useState([]);
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("all"); // all | active | blocked
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null);  // { message, action }

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : data.data || []);
    } catch {
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = (user) => {
    const willBlock = user.userStatus !== "blocked";
    setConfirm({
      message: `${willBlock ? "Block" : "Unblock"} "${user.firstName} ${user.lastName}"?`,
      action: async () => {
        try {
          await toggleUser(user.id);
          setUsers((prev) =>
            prev.map((u) =>
              u.id === user.id
                ? { ...u, userStatus: u.userStatus === "blocked" ? "active" : "blocked" }
                : u
            )
          );
          toast.success(`User ${willBlock ? "blocked" : "unblocked"}`);
        } catch {
          toast.error(`Failed to ${willBlock ? "block" : "unblock"} user`);
        }
        setConfirm(null);
      },
    });
  };

  const handleDelete = (user) => {
    setConfirm({
      message: `Delete "${user.email}" and all their orders? This cannot be undone.`,
      action: async () => {
        try {
          const allOrders  = await getAllOrders();
          const userOrders = allOrders.filter((o) => o.userEmail === user.email);
          if (userOrders.length > 0) {
            await Promise.all(userOrders.map((o) => api.delete(`/order/${o.id}`)));
          }
          await deleteUser(user.id);
          setUsers((prev) => prev.filter((u) => u.id !== user.id));
          toast.success("User deleted");
        } catch {
          toast.error("Failed to delete user");
        }
        setConfirm(null);
      },
    });
  };

  /* Filter + search */
  const filtered = users.filter((u) => {
    const matchFilter =
      filter === "all" ||
      (filter === "active"  && u.userStatus !== "blocked") ||
      (filter === "blocked" && u.userStatus === "blocked");
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q)  ||
      u.email?.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const activeCount  = users.filter((u) => u.userStatus !== "blocked").length;
  const blockedCount = users.filter((u) => u.userStatus === "blocked").length;

  const FILTER_TABS = [
    { key: "all",     label: "All",     count: users.length  },
    { key: "active",  label: "Active",  count: activeCount   },
    { key: "blocked", label: "Blocked", count: blockedCount  },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .um-in { animation: fadeUp 0.45s ease forwards; }

        .um-scroll::-webkit-scrollbar { width: 2px; }
        .um-scroll::-webkit-scrollbar-track { background: transparent; }
        .um-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }
      `}</style>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#110d07", color: "#f5f0e8",
            border: "1px solid rgba(201,169,110,0.2)", borderRadius: 0,
            fontSize: "11px", padding: "10px 16px",
            fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em",
          },
          success: { iconTheme: { primary: "#c9a96e", secondary: "#0d0a05" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#0d0a05" } },
        }}
      />

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] px-4 sm:px-6 lg:px-14 py-10 lg:py-14">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[#c9a96e]/[0.025] blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">

          {/* ── Page Header ── */}
          <div className="mb-10 um-in">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase mb-3 opacity-65">
                  Admin · Users
                </p>
                <h1
                  className="font-['Cormorant_Garamond',serif] font-light text-[#f5f0e8] leading-none"
                  style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
                >
                  User <span className="italic text-[#c9a96e]">Management</span>
                </h1>
              </div>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 text-[#c9a96e]/50 hover:text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase transition-colors group flex-shrink-0 mt-1"
              >
                <span className="h-px w-5 bg-current block group-hover:w-8 transition-all duration-300" />
                Dashboard
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-[#c9a96e]/40 to-transparent" />
              <p className="text-[#f5f0e8]/20 text-[10px] tracking-[0.3em] uppercase">
                Manage and control user access
              </p>
            </div>
          </div>

          {/* ── Panel (mirrors BeanMilkManager's Panel exactly) ── */}
          <div className="bg-[#0d0a05] border border-[#c9a96e]/12 flex flex-col um-in">

            {/* Panel header */}
            <div className="px-6 py-5 border-b border-[#c9a96e]/10 bg-[#110d07] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/70">
                  <UserIcon />
                </div>
                <h2 className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light text-[#f5f0e8] leading-tight">
                  All Users
                </h2>
              </div>
              {/* Filter tabs (replaces "Add" button since users self-register) */}
              <div className="flex border border-[#c9a96e]/15">
                {FILTER_TABS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setFilter(t.key)}
                    className={`px-4 py-2 text-[9px] tracking-[0.3em] uppercase transition-all duration-200 border-r border-[#c9a96e]/10 last:border-r-0 flex items-center gap-1.5
                      ${filter === t.key
                        ? "bg-[#c9a96e]/10 text-[#c9a96e]"
                        : "text-[#f5f0e8]/30 hover:text-[#f5f0e8]/55"
                      }`}
                    style={{ fontFamily: "'Jost',sans-serif" }}
                  >
                    {t.label}
                    <span className={`text-[8px] ${filter === t.key ? "text-[#c9a96e]/70" : "text-[#f5f0e8]/18"}`}>
                      {t.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats strip — mirrors BeanMilkManager exactly */}
            <div className="flex divide-x divide-[#c9a96e]/08 border-b border-[#c9a96e]/08">
              {[
                { label: "Total",   value: users.length,  color: "text-[#f5f0e8]/60" },
                { label: "Active",  value: activeCount,   color: "text-[#c9a96e]"     },
                { label: "Blocked", value: blockedCount,  color: "text-[#f87171]/60"  },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex-1 py-3 px-5 text-center">
                  <p className={`font-['Cormorant_Garamond',serif] text-[1.4rem] font-light ${color}`}>{value}</p>
                  <p className="text-[9px] tracking-[0.3em] uppercase font-['Jost',sans-serif] text-[#f5f0e8]/25 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="px-6 py-3 border-b border-[#c9a96e]/08 flex items-center gap-2">
              <span className="text-[#f5f0e8]/18 flex-shrink-0"><SearchIcon /></span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full bg-transparent text-[#f5f0e8]/70 text-[12px] font-['Jost',sans-serif] font-light placeholder:text-[#f5f0e8]/18 focus:outline-none"
              />
            </div>

            {/* User list */}
            <div className="um-scroll overflow-y-auto" style={{ maxHeight: 520 }}>
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-6 h-6 border border-[#c9a96e]/20 border-t-[#c9a96e]/60 rounded-full animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <p className="font-['Cormorant_Garamond',serif] italic text-[#f5f0e8]/20 text-[1.1rem]">
                    {search ? "No matches found" : "No users yet"}
                  </p>
                </div>
              ) : (
                filtered.map((user, i) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    index={i}
                    onToggleBlock={handleToggleBlock}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>

            {/* Footer count */}
            {!loading && filtered.length > 0 && (
              <div className="px-6 py-3 border-t border-[#c9a96e]/08 text-center">
                <p className="text-[#f5f0e8]/15 text-[9px] tracking-[0.4em] uppercase">
                  {filtered.length} {filtered.length === 1 ? "user" : "users"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm dialog */}
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