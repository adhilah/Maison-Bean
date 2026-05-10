// import React, { useEffect, useState } from "react";
// import api from "../../services/api";
// import { useAuth } from "../../context/AuthContext";

// export default function UserOrders() {
//   const { user } = useAuth();        // Logged-in user
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch orders when page loads
//   useEffect(() => {
//     api.get("/order")
//       .then(res => {
//         // 🔹 SIMPLE FILTER:
//         // Show only orders created by this user
//         const userOrders = res.data.filter(
//           order => order.userId === user.id
//         );

//         setOrders(userOrders);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [user]);

//   // 🔹 Loading state
//   if (loading) {
//     return <p className="p-6">Loading orders...</p>;
//   }

//   return (
//     // 🔹 Enables scrolling (important!)
//     <main className="p-6 overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-6">My Orders</h2>

//       {/* 🔹 No orders */}
//       {orders.length === 0 && (
//         <p className="text-gray-500">You have no orders yet.</p>
//       )}

//       {/* 🔹 Orders Table */}
//       {orders.length > 0 && (
//         <div className="bg-white rounded-xl shadow overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left">Order ID</th>
//                 <th className="px-6 py-3 text-left">Items</th>
//                 <th className="px-6 py-3 text-left">Total</th>
//                 <th className="px-6 py-3 text-left">Status</th>
//                 <th className="px-6 py-3 text-left">Date</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y">
//               {orders.map(order => (
//                 <tr key={order.id}>
                  
//                   {/* Order ID */}
//                   <td className="px-6 py-4 font-medium">
//                     #{order.id.slice(-6)}
//                   </td>

//                   {/* Ordered Items */}
//                   <td className="px-6 py-4 text-sm">
//                     {order.items.map(item => (
//                       <div key={item.id}>
//                         {item.product.name} × {item.quantity}
//                       </div>
//                     ))}
//                   </td>

//                   {/* Total */}
//                   <td className="px-6 py-4 font-semibold">
//                     ₹{order.total}
//                   </td>

//                   {/* Status */}
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold
//                       ${order.status === "delivered"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"}
//                     `}>
//                       {order.status}
//                     </span>
//                   </td>

//                   {/* Date */}
//                   <td className="px-6 py-4 text-gray-600">
//                     {new Date(order.tracking.confirmed).toLocaleDateString()}
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </main>
//   );
// }



//==========================================


import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Package, ChevronRight, Loader2 } from "lucide-react";

const STATUS_FLOW = {
  pending:         "processing",
  processing:      "shipping",
  shipping:        "outfordelivery",
  outfordelivery:  "delivered",
  delivered:       null,
};

const STATUS_LABEL = {
  pending:        "Pending",
  processing:     "Processing",
  shipping:       "Shipping",
  outfordelivery: "Out for Delivery",
  delivered:      "Delivered",
};

const STATUS_STYLE = {
  pending:        { dot: "bg-[#8a6e45]",  badge: "bg-[#1a1200] text-[#c9a96e]  border-[#2e2400]" },
  processing:     { dot: "bg-blue-500",   badge: "bg-[#0a1628] text-blue-400   border-blue-900"  },
  shipping:       { dot: "bg-purple-500", badge: "bg-[#130a28] text-purple-400 border-purple-900"},
  outfordelivery: { dot: "bg-orange-400", badge: "bg-[#1a0f00] text-orange-400 border-orange-900"},
  delivered:      { dot: "bg-emerald-500",badge: "bg-[#001a0f] text-emerald-400 border-emerald-900"},
};

export default function UserOrders({ isAdmin = false }) {
  const { user } = useAuth();
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [updating, setUpdating]   = useState(null); // order id being updated

  useEffect(() => {
    api.get("/order")
      .then(res => {
        const data = isAdmin
          ? res.data
          : res.data.filter(o => o.userId === user.id);
        setOrders(data);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load orders");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleAdvanceStatus = async (order) => {
    const current = order.status.toLowerCase();
    const next    = STATUS_FLOW[current];

    if (!next) {
      toast.error(`Order is already delivered.`);
      return;
    }

    setUpdating(order.id);
    try {
      await api.patch(`/order/${order.id}/status`, { status: next });
      setOrders(prev =>
        prev.map(o => o.id === order.id ? { ...o, status: next } : o)
      );
      toast.success(
        `${STATUS_LABEL[current]} → ${STATUS_LABEL[next]}`,
        { icon: "✦" }
      );
    } catch (err) {
      const msg = err?.response?.data?.message || `Invalid transition: ${STATUS_LABEL[current]} → ${STATUS_LABEL[next]}`;
      toast.error(msg);
    } finally {
      setUpdating(null);
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <main className="p-6 min-h-screen" style={{ background: "#080808" }}>
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="h-24 rounded-2xl animate-pulse border border-[#1f1f1f]" style={{ background: "#111111" }} />
          ))}
        </div>
      </main>
    );
  }

  /* ── Empty ── */
  if (orders.length === 0) {
    return (
      <main className="p-6 min-h-screen flex items-center justify-center" style={{ background: "#080808" }}>
        <div className="text-center">
          <Package size={36} className="text-[#2e2b26] mx-auto mb-3" />
          <p className="text-[#5a5650] text-sm italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            No orders yet.
          </p>
        </div>
      </main>
    );
  }

  /* ── Main ── */
  return (
    <main className="p-4 sm:p-6 lg:p-10 min-h-screen overflow-y-auto" style={{ background: "#080808" }}>

      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] tracking-[3px] uppercase text-[#8a6e45] mb-1">
          {isAdmin ? "Admin" : "Account"}
        </p>
        <h1
          className="text-3xl font-medium text-[#f0ece4]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {isAdmin ? "Order Management" : "My Orders"}
        </h1>
      </div>

      {/* Table wrapper */}
      <div className="rounded-2xl border border-[#1f1f1f] overflow-hidden" style={{ background: "#111111" }}>
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {["Order", "Items", "Total", "Status", "Date", ...(isAdmin ? ["Action"] : [])].map(h => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-[10px] tracking-[2px] uppercase text-[#3a3530] font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {orders.map((order, idx) => {
                const status  = order.status?.toLowerCase();
                const style   = STATUS_STYLE[status] || STATUS_STYLE.pending;
                const nextKey = STATUS_FLOW[status];
                const isLast  = idx === orders.length - 1;

                return (
                  <tr
                    key={order.id}
                    className={`group hover:bg-[#0f0f0f] transition-colors duration-150 ${!isLast ? "border-b border-[#1a1a1a]" : ""}`}
                  >

                    {/* Order ID */}
                    <td className="px-5 py-4">
                      <span className="text-[13px] font-medium text-[#c9a96e]">
                        #{order.id.slice(-6).toUpperCase()}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="px-5 py-4">
                      <div className="space-y-0.5">
                        {order.items.map(item => (
                          <div key={item.id} className="text-[12.5px] text-[#8a8680]">
                            {item.product.name}
                            <span className="text-[#3a3530] ml-1">× {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-5 py-4">
                      <span
                        className="text-[15px] font-medium text-[#f0ece4]"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        ₹{order.total}
                      </span>
                    </td>

                    {/* Status badge */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border ${style.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {STATUS_LABEL[status] || order.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-[12.5px] text-[#5a5650]">
                      {new Date(order.tracking?.confirmed).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </td>

                    {/* Admin action */}
                    {isAdmin && (
                      <td className="px-5 py-4">
                        {nextKey ? (
                          <button
                            onClick={() => handleAdvanceStatus(order)}
                            disabled={updating === order.id}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12px] font-medium border border-[#2e2400] text-[#c9a96e] hover:bg-[#1a1500] hover:border-[#c9a96e] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                            style={{ background: updating === order.id ? "#1a1500" : "transparent" }}
                          >
                            {updating === order.id
                              ? <Loader2 size={13} className="animate-spin" />
                              : <ChevronRight size={13} />
                            }
                            {STATUS_LABEL[nextKey]}
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#2e2b26] italic">Completed</span>
                        )}
                      </td>
                    )}

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-[11px] text-[#2e2b26] mt-8 tracking-widest uppercase">
        Maison Bean ✦ {isAdmin ? "Admin" : "Orders"}
      </p>
    </main>
  );
}