// // App.jsx
// import React, { useState, useEffect } from "react";
// import { Package, Calendar, CheckCircle, Settings } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function App() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedOrders, setExpandedOrders] = useState({}); // Track expanded orders
//   const navigate = useNavigate();

//   // ------------------------------
//   // Fetch orders from API on mount
//   // ------------------------------
//   useEffect(() => {
//     fetch("http://localhost:3000/orders")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch orders");
//         return res.json();
//       })
//       .then((data) => {
//         const sortedOrders = data.sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );
//         setOrders(sortedOrders);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   // ------------------------------
//   // Map order status to badge colors
//   // ------------------------------
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "delivered":
//         return "bg-green-200 text-green-800";
//       case "shipped":
//         return "bg-blue-200 text-blue-800";
//       case "processing":
//         return "bg-yellow-200 text-yellow-800";
//       case "pending":
//         return "bg-gray-200 text-gray-800";
//       case "cancelled":
//         return "bg-red-200 text-red-800";
//       default:
//         return "bg-gray-200 text-gray-800";
//     }
//   };

//   // ------------------------------
//   // Toggle expanded/collapsed items for an order
//   // ------------------------------
//   const toggleExpand = (orderId) => {
//     setExpandedOrders((prev) => ({
//       ...prev,
//       [orderId]: !prev[orderId],
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="w-10 h-10 border-4 border-[#a77c3b] border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-3 text-gray-600">Loading orders...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white px-4 py-4 shadow-md">
//         <div className="max-w-6xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Package className="text-[#a77c3b]" size={24} />
//             <h1 className="text-xl font-semibold">My Orders</h1>
//           </div>
//           <button
//             onClick={() => navigate("/")}
//             className="text-[#9c7635] hover:underline font-medium flex items-center gap-2 transition-colors order-2 sm:order-1"
//           >
//             ← Continue Shopping
//           </button>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto p-4">
//         {/* Orders */}
//         <div className="space-y-6">
//           {orders.length === 0 && (
//             <div className="text-center py-12">
//               <Package size={48} className="mx-auto text-gray-300" />
//               <p className="mt-3 text-gray-500">No orders found</p>
//             </div>
//           )}

//           {orders.map((order) => {
//             const isExpanded = expandedOrders[order.id];
//             const itemsToShow = isExpanded ? order.items : order.items.slice(0, 3);
//             const remainingCount = order.items.length - 3;

//             return (
//               <div
//                 key={order.id}
//                 className="bg-white rounded-2xl shadow-xl p-6 relative"
//               >
//                 {/* Order Header */}
//                 <div className="flex justify-between mb-4">
//                   <div>
//                     <h3 className="font-medium text-lg">Order #{order.id.slice(-6)}</h3>
//                     <p className="text-sm text-gray-500 mt-1">{order.customer}</p>
//                   </div>

//                   {/* Highlighted Status */}
//                   <span
//                     className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
//                       order.status
//                     )}`}
//                   >
//                     {order.status.toUpperCase()}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center mb-3">
//                   <p className="font-bold text-[#a77c3b] text-lg">${order.total}</p>
//                   <div className="flex items-center gap-1 text-sm text-gray-500">
//                     <Calendar size={12} />
//                     {order.date}
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div className="space-y-3">
//                   {itemsToShow.map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between items-start text-sm"
//                     >
//                       <div>
//                         <p className="font-medium text-gray-800">{item.product?.name}</p>

//                         <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
//                           <span>Qty: {item.quantity}</span>

//                           {item.isCustomized && (
//                             <span className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
//                               <Settings size={12} />
//                               Customized
//                             </span>
//                           )}
//                         </div>

//                         {item.isCustomized && (
//                           <div className="text-xs text-gray-500 mt-1">
//                             {item.beanId && <span>Bean: {item.beanId}</span>}
//                             {item.milkId && (
//                               <span className="ml-2">Milk: {item.milkId}</span>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       <CheckCircle size={16} className="text-green-500 mt-1" />
//                     </div>
//                   ))}

//                   {/* "+X more items" button */}
//                   {!isExpanded && order.items.length > 3 && (
//                     <button
//                       onClick={() => toggleExpand(order.id)}
//                       className="text-sm text-[#a77c3b] font-medium mt-1 hover:underline"
//                     >
//                       +{remainingCount} more item{remainingCount > 1 ? "s" : ""}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }






// App.jsx
import React, { useState, useEffect } from "react";
import { Package, Calendar, CheckCircle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ IMPORTANT

export default function App() {
  const { user, isLoading: authLoading } = useAuth(); // ✅ logged-in user
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState({});
  const navigate = useNavigate();

  // ------------------------------
  // Fetch & filter orders
  // ------------------------------
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/orders")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        // ✅ FILTER ORDERS BY LOGGED-IN USER
        const userOrders = data.filter(
          (order) =>
            order.userId === user.id ||
            order.userEmail === user.email
        );

        const sortedOrders = userOrders.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setOrders(sortedOrders);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, authLoading]);

  // ------------------------------
  // Status badge colors
  // ------------------------------
  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-200 text-green-800";
      case "shipped":
        return "bg-blue-200 text-blue-800";
      case "processing":
        return "bg-yellow-200 text-yellow-800";
      case "pending":
        return "bg-gray-200 text-gray-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // ------------------------------
  // Loading / auth guard
  // ------------------------------
  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#a77c3b] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please login to view your orders</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="text-[#a77c3b]" size={24} />
            <h1 className="text-xl font-semibold">My Orders</h1>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-[#9c7635] hover:underline font-medium"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="space-y-6">
          {orders.length === 0 && (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-300" />
              <p className="mt-3 text-gray-500">No orders found</p>
            </div>
          )}

          {orders.map((order) => {
            const isExpanded = expandedOrders[order.id];
            const itemsToShow = isExpanded
              ? order.items
              : order.items.slice(0, 3);
            const remainingCount = order.items.length - 3;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-xl p-6 relative"
              >
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">
                      Order #{order.id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {user.email}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-[#a77c3b] text-lg">
                    ${order.total}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar size={12} />
                    {order.date}
                  </div>
                </div>

                <div className="space-y-3">
                  {itemsToShow.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">
                          {item.product?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                  ))}

                  {!isExpanded && order.items.length > 3 && (
                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="text-sm text-[#a77c3b] font-medium hover:underline"
                    >
                      +{remainingCount} more items
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
