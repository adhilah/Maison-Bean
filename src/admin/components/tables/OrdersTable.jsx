// // admin/pages/orders/OrderManagement.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Package, Clock, Truck, CheckCircle, XCircle, ChevronDown, ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";

// const STATUS_OPTIONS = [
//   { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-800", icon: <Clock size={16} /> },
//   { value: "processing", label: "Processing", color: "bg-blue-100 text-blue-800", icon: <Package size={16} /> },
//   { value: "out_for_delivery", label: "Out for Delivery", color: "bg-purple-100 text-purple-800", icon: <Truck size={16} /> },
//   { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800", icon: <CheckCircle size={16} /> },
//   { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800", icon: <XCircle size={16} /> },
// ];

// export default function OrderManagement() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/orders");
//       const sorted = res.data.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
//       setOrders(sorted);
//     } catch (err) {
//       toast.error("Failed to load orders");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:3000/orders/${orderId}`, {
//         status: newStatus,
//       });

//       setOrders(orders.map(order => 
//         order.id === orderId ? { ...order, status: newStatus } : order
//       ));

//       toast.success("Order status updated!");
//     } catch (err) {
//       toast.error("Failed to update status");
//     }
//   };

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
//   };

//   const getStatusStyle = (status) => {
//     return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
//   };

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Header with Back Button */}
//         <div className="px-8 py-6 border-b border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
//               <p className="text-gray-600 mt-1">Track and update order statuses</p>
//             </div>

//             {/* Back to Dashboard Button */}
//             <Link
//               to="/admin/dashboard"
//               className="flex items-center  text-amber-800 font-medium hover:underline"
//             >
//               <ArrowLeft size={20} />
//               Back to Dashboard
//             </Link>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
//                 <th className="px-8 py-4">Order ID</th>
//                 <th className="px-8 py-4">Customer</th>
//                 <th className="px-8 py-4">Date</th>
//                 <th className="px-8 py-4">Items</th>
//                 <th className="px-8 py-4">Total</th>
//                 <th className="px-8 py-4">Status</th>
//                 <th className="px-8 py-4 text-right">Update Status</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-100">
//               {loading ? (
//                 [...Array(6)].map((_, i) => (
//                   <tr key={i} className="animate-pulse">
//                     <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
//                     <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
//                     <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
//                     <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
//                     <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
//                     <td className="px-8 py-6"><div className="h-8 bg-gray-200 rounded-full w-32"></div></td>
//                     <td className="px-8 py-6 text-right"><div className="h-10 bg-gray-200 rounded w-40 inline-block"></div></td>
//                   </tr>
//                 ))
//               ) : orders.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="px-8 py-16 text-center text-gray-500">
//                     <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                     <p>No orders found</p>
//                   </td>
//                 </tr>
//               ) : (
//                 orders.map((order) => {
//                   const statusStyle = getStatusStyle(order.status || "pending");

//                   return (
//                     <tr key={order.id} className="hover:bg-gray-50 transition">
//                       <td className="px-8 py-6">
//                         <span className="font-medium text-gray-900">
//                           #ORD-{order.id.slice(-6).toUpperCase()}
//                         </span>
//                       </td>

//                       <td className="px-8 py-6 text-gray-700">
//                         {order.userEmail?.split("@")[0] || "Guest"}
//                       </td>

//                       <td className="px-8 py-6 text-gray-600">
//                         {formatDate(order.date || order.createdAt)}
//                       </td>

//                       <td className="px-8 py-6 text-gray-700">
//                         {order.items?.length || 0} items
//                       </td>

//                       <td className="px-8 py-6 font-semibold text-gray-900">
//                         ${parseFloat(order.total || 0).toFixed(2)}
//                       </td>

//                       <td className="px-8 py-6">
//                         <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.color}`}>
//                           {statusStyle.icon}
//                           {statusStyle.label}
//                         </span>
//                       </td>

//                       {/* Status Update Dropdown */}
//                       <td className="px-8 py-6 text-right">
//                         <div className="relative inline-block text-left">
//                           <select
//                             value={order.status || "pending"}
//                             onChange={(e) => updateOrderStatus(order.id, e.target.value)}
//                             className="appearance-none bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
//                           >
//                             {STATUS_OPTIONS.map((opt) => (
//                               <option key={opt.value} value={opt.value}>
//                                 {opt.label}
//                               </option>
//                             ))}
//                           </select>
//                           <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" size={16} />
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }




// admin/pages/orders/OrderManagement.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Package, Clock, Truck, CheckCircle, ChevronDown, ArrowLeft, Sidebar } from "lucide-react";
import { Link } from "react-router-dom";


const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-800", icon: <Clock size={16} /> },
  { value: "processing", label: "Processing", color: "bg-blue-100 text-blue-800", icon: <Package size={16} /> },
  { value: "out_for_delivery", label: "Out for Delivery", color: "bg-purple-100 text-purple-800", icon: <Truck size={16} /> },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800", icon: <CheckCircle size={16} /> },
  // Cancelled option removed as requested
];

const getPaymentMethod = (method) => {
  switch (method) {
    case "cod":
      return { label: "Cash on Delivery", color: "bg-orange-100 text-orange-800" };
    case "upi":
      return { label: "UPI", color: "bg-indigo-100 text-indigo-800" };
    case "card":
      return { label: "Card", color: "bg-purple-100 text-purple-800" };
    default:
      return { label: "Unknown", color: "bg-gray-100 text-gray-700" };
  }
};

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/orders");
      const sorted = res.data.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
      setOrders(sorted);
    } catch (err) {
      toast.error("Failed to load orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, {
        status: newStatus,
      });

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast.success("Order status updated!");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getStatusStyle = (status) => {
    return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header with Back Button */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600 mt-1">Track and update order statuses</p>
            </div>

            {/* Back to Dashboard Button */}
            <Link
              to="/admin/dashboard"
              className="flex items-center  text-amber-800 font-medium hover:underline"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Items</th>
                <th className="px-8 py-4">Total</th>
                <th className="px-8 py-4">Payment Method</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Update Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-36"></div></td>
                    <td className="px-8 py-6"><div className="h-8 bg-gray-200 rounded-full w-32"></div></td>
                    <td className="px-8 py-6 text-right"><div className="h-10 bg-gray-200 rounded w-40 inline-block"></div></td>
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-8 py-16 text-center text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No orders found</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const statusStyle = getStatusStyle(order.status || "pending");
                  const paymentInfo = getPaymentMethod(order.paymentMethod);

                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-8 py-6">
                        <span className="font-medium text-gray-900">
                          #ORD-{order.id.slice(-6).toUpperCase()}
                        </span>
                      </td>

                      <td className="px-8 py-6 text-gray-700">
                        {order.userEmail?.split("@")[0] || "Guest"}
                      </td>

                      <td className="px-8 py-6 text-gray-600">
                        {formatDate(order.date || order.createdAt)}
                      </td>

                      <td className="px-8 py-6 text-gray-700">
                        {order.items?.length || 0} items
                      </td>

                      <td className="px-8 py-6 font-semibold text-gray-900">
                        ${parseFloat(order.total || 0).toFixed(2)}
                      </td>

                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${paymentInfo.color}`}>
                          {paymentInfo.label}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.color}`}>
                          {statusStyle.icon}
                          {statusStyle.label}
                        </span>
                      </td>

                      {/* Status Update Dropdown */}
                      <td className="px-8 py-6 text-right">
                        <div className="relative inline-block text-left">
                          <select
                            value={order.status || "pending"}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="appearance-none bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" size={16} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}