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
//   CheckCircle
// } from "lucide-react";

// import { Link }
// from "react-router-dom";

// import toast
// from "react-hot-toast";


// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//  const fetchUsers = async () => {

//   try {

//     setLoading(true);

//     const data =
//       await getAllUsers();

//     console.log(data);

//     const usersArray =
//       Array.isArray(data)
//         ? data
//         : data.data || [];

//     setUsers(usersArray);

//   } catch (err) {

//     console.error(err);

//     toast.error(
//       "Failed to load users"
//     );

//     setUsers([]);

//   } finally {

//     setLoading(false);
//   }
// };
//   //  Block/Unblock Handler 
//   const handleToggleBlock =
//   async (
//     userId,
//     currentStatus
//   ) => {

//     const action =
//       currentStatus === "blocked"
//         ? "unblock"
//         : "block";

//     const loadingToast =
//       toast.loading(
//         `${action}ing user...`
//       );

//     try {

//       await toggleUser(userId);

//       setUsers((prev) =>
//         prev.map((u) =>

//           u.id === userId

//             ? {
//                 ...u,

//                 userStatus:
//                   u.userStatus === "blocked"
//                     ? "active"
//                     : "blocked",
//               }

//             : u
//         )
//       );

//       toast.dismiss(
//         loadingToast
//       );

//       toast.success(
//         `User ${action}ed successfully`
//       );

//     } catch (err) {

//       console.error(err);

//       toast.dismiss(
//         loadingToast
//       );

//       toast.error(
//         `Failed to ${action} user`
//       );
//     }
// };

//   const handleDeleteUser =
//   async (
//     userId,
//     userEmail
//   ) => {

//     const confirmDelete =
//       window.confirm(
//         `Delete ${userEmail} and all orders?`
//       );

//     if (!confirmDelete) return;

//     const loadingToast =
//       toast.loading(
//         "Deleting user..."
//       );

//     try {

//       const allOrders =
//         await getAllOrders();

//       const userOrders =
//         allOrders.filter(
//           (order) =>
//             order.userEmail ===
//             userEmail
//         );

//       if (userOrders.length > 0)
//       {
//         await Promise.all(

//           userOrders.map(
//             (order) =>

//               api.delete(
//                 `/order/${order.id}`
//               )
//           )
//         );
//       }

//       await deleteUser(userId);

//       setUsers((prev) =>
//         prev.filter(
//           (u) =>
//             u.id !== userId
//         )
//       );

//       toast.dismiss(
//         loadingToast
//       );

//       toast.success(
//         "User deleted successfully"
//       );

//     } catch (err) {

//       console.error(err);

//       toast.dismiss(
//         loadingToast
//       );

//       toast.error(
//         "Failed to delete user"
//       );
//     }
// };
//   const filteredUsers =
//   Array.isArray(users)

//     ? users.filter(
//         (user) =>

//           user.firstName
//             ?.toLowerCase()
//             .includes(
//               searchTerm.toLowerCase()
//             )

//           ||

//           user.lastName
//             ?.toLowerCase()
//             .includes(
//               searchTerm.toLowerCase()
//             )

//           ||

//           user.email
//             ?.toLowerCase()
//             .includes(
//               searchTerm.toLowerCase()
//             )
//       )

//     : [];

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           {/* HEADER SECTION */}
//           <div className="px-8 py-6 border-b border-gray-100">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
//                 <p className="text-gray-600 mt-1">Manage and control user access</p>
//               </div>

//               <div className="flex-1 max-w-lg mx-auto lg:mx-0">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   <input
//                     type="text"
//                     placeholder="Search by name or email..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-12 pr-6 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Link
//                   to="/admin/dashboard"
//                   className="flex items-center text-[#9c7635] font-medium hover:underline"
//                 >
//                   <ArrowLeft size={20} />
//                   Back to Dashboard
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* USERS TABLE */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
//                   <th className="px-8 py-4">User</th>
//                   <th className="px-8 py-4">Email</th>
//                   <th className="px-8 py-4">Status</th>
//                   <th className="px-8 py-4">Join</th>
//                   <th className="px-8 py-4 text-right">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {loading ? (
//                   [...Array(5)].map((_, i) => (
//                     <tr key={i} className="animate-pulse">
//                       <td className="px-8 py-6">
//                         <div className="flex items-center gap-4">
//                           <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
//                           <div className="h-4 bg-gray-200 rounded w-40"></div>
//                         </div>
//                       </td>
//                       <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
//                       <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
//                       <td className="px-8 py-6"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
//                       <td className="px-8 py-6 text-right"><div className="h-8 bg-gray-200 rounded w-28 inline-block"></div></td>
//                     </tr>
//                   ))
//                 ) : filteredUsers.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="px-8 py-16 text-center text-gray-500">
//                       <p className="text-lg">No users found</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredUsers.map((user) => (
//                     <tr
//                       key={user.id}
//                       className={`hover:bg-gray-50 transition ${user.userStatus === "blocked" ? "bg-red-50" : ""}`}
//                     >
//                       <td className="px-8 py-6">
//                         <div className="flex items-center gap-4">
//                           <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
//                             <span className="text-[#b69255] font-semibold text-sm">
//                               {user.firstName?.[0]?.toUpperCase() || ""}
//                               {user.lastName?.[0]?.toUpperCase() || ""}
//                             </span>
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-900">
//                               {user.firstName || "Unknown"} {user.lastName || ""}
//                             </p>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-8 py-6 text-gray-700">{user.email}</td>

//                       <td className="px-8 py-6">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                           user.userStatus === "blocked"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-green-100 text-green-800"
//                         }`}>
//                           {user.userStatus === "blocked" ? "Blocked" : "Active"}
//                         </span>
//                       </td>

//                       <td className="px-8 py-6 text-gray-600">
//                         {user.joinDate || "January 2026"}
//                       </td>

//                       <td className="px-8 py-6 text-right">
//                         <div className="flex items-center justify-end gap-3">
//                           <button
//                             onClick={() => handleToggleBlock(user.id, user.userStatus, user.email)}
//                             className={`px-4 py-2 rounded-xl font-medium transition flex items-center gap-2 ${
//                               user.userStatus === "blocked"
//                                 ? "bg-[#513f21] hover:bg-[#785c2c] text-white"
//                                 : "bg-[#9c7635] hover:bg-[#ac8b54] text-white"
//                             }`}
//                             title={user.userStatus === "blocked" ? "Unblock user" : "Block user"}
//                           >
//                             {user.userStatus === "blocked" ? (
//                               <>
//                                 <CheckCircle size={18} />
//                                 Unblock
//                               </>
//                             ) : (
//                               <>
//                                 <Ban size={18} />
//                                 Block
//                               </>
//                             )}
//                           </button>

//                           <button
//                             onClick={() => handleDeleteUser(user.id, user.email)}
//                             className="px-5 py-2 text-[#b78838] bg-white rounded-xl font-medium hover:bg-[#7f602b] hover:text-white transition"
//                             title="Delete user"
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


import { useEffect, useState } from "react";

import {
  getAllUsers,
  toggleUser,
  deleteUser,
} from "../../../services/userApi";

import {
  getAllOrders,
} from "../../../services/orderApi";

import api from "../../../services/api";

import {
  Search,
  Trash2,
  ArrowLeft,
  Ban,
  CheckCircle,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

/* ─── Inline styles for luxury dark-brown theme ─── */
const theme = {

  pageBg: "#0d0a05",

  cardBg: "#110d07",

  cardBorder: "rgba(201,169,110,0.12)",

  headerBg: "#110d07",

  tableHeadBg: "#0d0a05",

  rowHover: "#161008",

  rowBlocked: "#140909",

  gold: "#c9a96e",

  goldLight: "#d4b87a",

  goldDim: "rgba(201,169,110,0.55)",

  cream: "#f5f0e8",

  textPrimary: "#f5f0e8",

  textSecondary: "rgba(245,240,232,0.6)",

  textMuted: "rgba(245,240,232,0.25)",

  divider: "rgba(201,169,110,0.08)",

  inputBg: "#0d0a05",

  inputBorder: "rgba(201,169,110,0.12)",

  inputFocus: "#c9a96e",

  activeBadgeBg: "rgba(201,169,110,0.10)",

  activeBadgeText: "#c9a96e",

  blockedBadgeBg: "rgba(248,113,113,0.08)",

  blockedBadgeText: "rgba(248,113,113,0.75)",

  btnGold: "#c9a96e",

  btnGoldHover: "#d4b87a",

  btnDark: "#1a140c",

  btnDarkHover: "#241b10",

  skeletonBase: "#1a140c",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');

  .um-root * { box-sizing: border-box; margin: 0; padding: 0; }

  .um-root {
    font-family: 'Jost', sans-serif;
    background: ${theme.pageBg};
    min-height: 100vh;
    padding: 2.5rem 1.5rem;
    background-image:
      radial-gradient(ellipse at 20% 10%, rgba(180,130,40,0.05) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 90%, rgba(100,60,10,0.07) 0%, transparent 60%);
  }

  .um-inner { max-width: 1200px; margin: 0 auto; }

  .um-card {

  background: ${theme.cardBg};

  border:
    1px solid ${theme.cardBorder};

  overflow: hidden;

  box-shadow:
    0 0 0 1px rgba(201,169,110,0.04),
    0 30px 80px rgba(0,0,0,0.55);
}

  /* HEADER */
  .um-header {
    padding: 2rem 2.5rem;
    border-bottom: 1px solid ${theme.divider};
    background: ${theme.headerBg};
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: relative;
    overflow: hidden;
  }

  .um-header::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${theme.gold}, transparent);
  }

  .um-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .um-title-block {}

  .um-title-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${theme.goldDim};
    margin-bottom: 0.35rem;
  }

  .um-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    color: ${theme.cream};
    letter-spacing: 0.02em;
    line-height: 1.1;
  }

  .um-subtitle {
    font-size: 0.8rem;
    color: ${theme.textMuted};
    margin-top: 0.3rem;
    font-weight: 300;
    letter-spacing: 0.05em;
  }

  .um-icon-badge {
    background: linear-gradient(135deg, #3d2a0f, #2a1c0a);
    border: 1px solid ${theme.cardBorder};
    border-radius: 0.75rem;
    padding: 0.75rem;
    color: ${theme.gold};
  }

  /* SEARCH */
  .um-search-wrap {
    position: relative;
    flex: 1;
    max-width: 420px;
  }

  .um-search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.goldDim};
    pointer-events: none;
  }

  .um-search-input {
    width: 100%;
    background: ${theme.inputBg};
    border: 1px solid ${theme.inputBorder};
    border-radius: 0.75rem;
    padding: 0.8rem 1rem 0.8rem 2.75rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.875rem;
    color: ${theme.textPrimary};
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    letter-spacing: 0.03em;
  }

  .um-search-input::placeholder { color: ${theme.textMuted}; }

  .um-search-input:focus {
    border-color: ${theme.gold};
    box-shadow: 0 0 0 3px rgba(201,150,58,0.12);
  }

  /* BACK LINK */
  .um-back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: ${theme.textSecondary};
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.2s;
    white-space: nowrap;
  }
  .um-back-link:hover { color: ${theme.goldLight}; }

  /* TABLE */
  .um-table-wrap { overflow-x: auto; }

  .um-table {
    width: 100%;
    border-collapse: collapse;
  }

  .um-thead tr {
    background: ${theme.tableHeadBg};
    border-bottom: 1px solid ${theme.divider};
  }

  .um-thead th {
    padding: 1rem 2rem;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${theme.textMuted};
    text-align: left;
    font-family: 'Jost', sans-serif;
  }

  .um-thead th:last-child { text-align: right; }

  .um-tbody tr {
    border-bottom: 1px solid ${theme.divider};
    transition: background 0.15s;
  }

  .um-tbody tr:last-child { border-bottom: none; }

  .um-tbody tr:hover { background: ${theme.rowHover}; }

  .um-tbody tr.blocked { background: ${theme.rowBlocked}; }
  .um-tbody tr.blocked:hover { background: #321010; }

  .um-tbody td {
    padding: 1.25rem 2rem;
    vertical-align: middle;
  }

  /* AVATAR */
  .um-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #3d2a0f, #6b4c1a);
    border: 1px solid ${theme.cardBorder};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: ${theme.gold};
    flex-shrink: 0;
  }

  .um-user-cell {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .um-user-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${theme.textPrimary};
    letter-spacing: 0.02em;
  }

  .um-user-email {
    font-size: 0.825rem;
    color: ${theme.textSecondary};
    letter-spacing: 0.02em;
  }

  .um-join-date {
    font-size: 0.8rem;
    color: ${theme.textMuted};
    letter-spacing: 0.03em;
  }

  /* BADGE */
  .um-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .um-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
  }

  .um-badge.active {
    background: ${theme.activeBadgeBg};
    color: ${theme.activeBadgeText};
    border: 1px solid rgba(127,199,94,0.15);
  }
  .um-badge.active::before { background: ${theme.activeBadgeText}; }

  .um-badge.blocked {
    background: ${theme.blockedBadgeBg};
    color: ${theme.blockedBadgeText};
    border: 1px solid rgba(224,112,112,0.15);
  }
  .um-badge.blocked::before { background: ${theme.blockedBadgeText}; }

  /* ACTIONS */
  .um-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.6rem;
  }

  .um-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    border-radius: 0.6rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: all 0.18s;
  }

  .um-btn-block {
  background: ${theme.gold};
  color: #0d0a05;
  border: 1px solid rgba(201,169,110,0.18);
}
  .um-btn-block:hover {
  background: ${theme.goldLight};
  transform: translateY(-1px);
}

  .um-btn-unblock {
    background: linear-gradient(135deg, #1e3318, #152510);
    color: ${theme.activeBadgeText};
    border: 1px solid rgba(127,199,94,0.2);
  }
  .um-btn-unblock:hover {
    background: linear-gradient(135deg, #264423, #1c3018);
    box-shadow: 0 4px 16px rgba(80,160,60,0.2);
    transform: translateY(-1px);
  }

  // .um-btn-delete {
  //   background: transparent;
  //   color: ${theme.textMuted};
  //   border: 1px solid ${theme.cardBorder};
  //   padding: 0.5rem 0.75rem;
  // }
  // .um-btn-delete:hover {
  //   background: ${theme.blockedBadgeBg};
  //   color: ${theme.blockedBadgeText};
  //   border-color: rgba(224,112,112,0.25);
  //   transform: translateY(-1px);
  // }

  /* SKELETON */
  .um-skeleton {
    background: ${theme.skeletonBase};
    border-radius: 0.4rem;
    animation: um-pulse 1.6s ease-in-out infinite;
  }

  @keyframes um-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  /* EMPTY */
  .um-empty {
    text-align: center;
    padding: 5rem 2rem;
  }

  .um-empty-icon {
    color: ${theme.textMuted};
    margin: 0 auto 1rem;
    opacity: 0.4;
  }

  .um-empty-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    color: ${theme.textSecondary};
    letter-spacing: 0.05em;
  }

  @media (max-width: 768px) {
    .um-header { padding: 1.5rem; }
    .um-tbody td, .um-thead th { padding: 1rem 1rem; }
    .um-title { font-size: 1.5rem; }
  }
`;

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      const usersArray = Array.isArray(data) ? data : data.data || [];
      setUsers(usersArray);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async (userId, currentStatus) => {
    const action = currentStatus === "blocked" ? "unblock" : "block";
    const loadingToast = toast.loading(`${action}ing user...`);
    try {
      await toggleUser(userId);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, userStatus: u.userStatus === "blocked" ? "active" : "blocked" }
            : u
        )
      );
      toast.dismiss(loadingToast);
      toast.success(`User ${action}ed successfully`);
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error(`Failed to ${action} user`);
    }
  };

  // const handleDeleteUser = async (userId, userEmail) => {
  //   const confirmDelete = window.confirm(`Delete ${userEmail} and all their orders?`);
  //   if (!confirmDelete) return;
  //   const loadingToast = toast.loading("Deleting user...");
  //   try {
  //     const allOrders = await getAllOrders();
  //     const userOrders = allOrders.filter((order) => order.userEmail === userEmail);
  //     if (userOrders.length > 0) {
  //       await Promise.all(userOrders.map((order) => api.delete(`/order/${order.id}`)));
  //     }
  //     await deleteUser(userId);
  //     setUsers((prev) => prev.filter((u) => u.id !== userId));
  //     toast.dismiss(loadingToast);
  //     toast.success("User deleted successfully");
  //   } catch (err) {
  //     console.error(err);
  //     toast.dismiss(loadingToast);
  //     toast.error("Failed to delete user");
  //   }
  // };

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <style>{css}</style>

      <div className="um-root">
        <div className="um-inner">
          <div className="um-card">

            {/* ── HEADER ── */}
            <div className="um-header">
              <div className="um-header-row">
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div className="um-icon-badge">
                    <Users size={22} />
                  </div>
                  <div className="um-title-block">
                    <p className="um-title-eyebrow">Administration</p>
                    <h1 className="um-title">User Management</h1>
                    <p className="um-subtitle">Manage and control user access</p>
                  </div>
                </div>

                <Link to="/admin/dashboard" className="um-back-link">
                  <ArrowLeft size={15} />
                  Dashboard
                </Link>
              </div>

              <div className="um-search-wrap">
                <Search size={16} className="um-search-icon" />
                <input
                  type="text"
                  className="um-search-input"
                  placeholder="Search by name or email…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* ── TABLE ── */}
            <div className="um-table-wrap">
              <table className="um-table">
                <thead className="um-thead">
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody className="um-tbody">
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i}>
                        <td>
                          <div className="um-user-cell">
                            <div className="um-skeleton" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                            <div className="um-skeleton" style={{ width: 130, height: 14 }} />
                          </div>
                        </td>
                        <td><div className="um-skeleton" style={{ width: 180, height: 14 }} /></td>
                        <td><div className="um-skeleton" style={{ width: 70, height: 22, borderRadius: 999 }} /></td>
                        <td><div className="um-skeleton" style={{ width: 90, height: 14 }} /></td>
                        <td>
                          <div className="um-actions">
                            <div className="um-skeleton" style={{ width: 90, height: 32, borderRadius: 8 }} />
                            <div className="um-skeleton" style={{ width: 38, height: 32, borderRadius: 8 }} />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="um-empty">
                          <Users size={40} className="um-empty-icon" />
                          <p className="um-empty-text">No users found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className={user.userStatus === "blocked" ? "blocked" : ""}
                      >
                        <td>
                          <div className="um-user-cell">
                            <div className="um-avatar">
                              {user.firstName?.[0]?.toUpperCase() || ""}
                              {user.lastName?.[0]?.toUpperCase() || ""}
                            </div>
                            <p className="um-user-name">
                              {user.firstName || "Unknown"} {user.lastName || ""}
                            </p>
                          </div>
                        </td>

                        <td>
                          <span className="um-user-email">{user.email}</span>
                        </td>

                        <td>
                          <span className={`um-badge ${user.userStatus === "blocked" ? "blocked" : "active"}`}>
                            {user.userStatus === "blocked" ? "Blocked" : "Active"}
                          </span>
                        </td>

                        <td>
                          <span className="um-join-date">{user.joinDate || "January 2026"}</span>
                        </td>

                        <td>
                          <div className="um-actions">
                            <button
                              onClick={() => handleToggleBlock(user.id, user.userStatus)}
                              className={`um-btn ${user.userStatus === "blocked" ? "um-btn-unblock" : "um-btn-block"}`}
                              title={user.userStatus === "blocked" ? "Unblock user" : "Block user"}
                            >
                              {user.userStatus === "blocked" ? (
                                <><CheckCircle size={14} /> Unblock</>
                              ) : (
                                <><Ban size={14} /> Block</>
                              )}
                            </button>

                            {/* <button
                              onClick={() => handleDeleteUser(user.id, user.email)}
                              className="um-btn um-btn-delete"
                              title="Delete user"
                            >
                              <Trash2 size={15} />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}