

// // ==============================================================================



// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API = "http://localhost:3000";

// export default function OrderList() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancelingId, setCancelingId] = useState(null);

//   const navigate = useNavigate();

//   // Logged-in user
//   const storedUser = localStorage.getItem("user");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   useEffect(() => {
//     if (!user) {
//       setLoading(false);
//       return;
//     }
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API}/orders`);
//       const userOrders = res.data
//         .filter((o) => String(o.userId) === String(user.id))
//         .reverse();

//       setOrders(userOrders);
//     } catch (err) {
//       console.error("Failed to fetch orders", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;

//     try {
//       setCancelingId(orderId);

//       await axios.patch(`${API}/orders/${orderId}`, {
//         status: "cancelled",
//       });

//       fetchOrders();
//     } catch (err) {
//       console.error("Cancel failed", err);
//     } finally {
//       setCancelingId(null);
//     }
//   };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   const statusBadge = (status) => {
//     switch (status) {
//       case "confirmed":
//         return "bg-green-100 text-green-700";
//       case "cancelled":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Link to="/login" className="text-xl text-[#9c7635] underline">
//           Please login
//         </Link>
//       </div>
//     );
//   }

//   if (loading) {
//     return <div className="text-center py-20 text-xl">Loading orders...</div>;
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl">No orders found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between mb-8">
//           <h1 className="text-3xl font-bold">My Orders</h1>
//           <Link to="/" className="text-[#9c7635] hover:underline">
//             ← Continue Shopping
//           </Link>
//         </div>

//         <div className="space-y-8">
//           {orders.map((order) => {
//             const canCancel =
//               order.status !== "cancelled" &&
//               order.status !== "delivered";

//             return (
//               <div
//                 key={order.id}
//                 className="bg-white rounded-2xl shadow-lg overflow-hidden border"
//               >
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-[#9c7635] to-[#7a5c2a] text-white p-6 flex justify-between items-center">
//                   <div>
//                     <p className="text-sm opacity-80">Order ID</p>
//                     <p className="text-xl font-bold">#{order.id}</p>
//                     <p className="text-sm mt-1">
//                       {formatDate(order.date)}
//                     </p>
//                   </div>

//                   <div className="text-right">
//                     <p className="text-3xl font-bold">
//                       ${order.total.toFixed(2)}
//                     </p>
//                     <span
//                       className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium ${statusBadge(
//                         order.status
//                       )}`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Items */}
//                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {order.items.map((item, i) => (
//                     <div
//                       key={i}
//                       className="flex gap-4 bg-gray-50 p-4 rounded-xl"
//                     >
//                       <img
//                         src={item.product.image}
//                         alt={item.product.name}
//                         className="w-20 h-20 rounded-lg object-cover"
//                       />
//                       <div>
//                         <h4 className="font-semibold">
//                           {item.product.name}
//                         </h4>
//                         <p className="text-sm text-gray-500">
//                           Qty: {item.quantity}
//                         </p>
//                         <p className="font-bold mt-1">
//                           ${item.unitPrice}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Actions */}
//                 <div className="border-t p-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
//                   <Link
//                     to={`/track-order/${order.id}`}
//                     className="px-5 py-2 rounded-md bg-[#9c7635] text-white hover:bg-[#7a5c2a]"
//                   >
//                     Track Order
//                   </Link>

//                   {canCancel && (
//                     <button
//                       onClick={() => cancelOrder(order.id)}
//                       disabled={cancelingId === order.id}
//                       className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
//                     >
//                       {cancelingId === order.id
//                         ? "Cancelling..."
//                         : "Cancel Order"}
//                     </button>
//                   )}

//                   {order.status === "cancelled" && (
//                     <span className="text-red-600 font-medium">
//                       Order Cancelled
//                     </span>
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


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // for toast messages

const API = "http://localhost:3000";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  // Logged-in user
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchOrders();
  }, []);

  // Fetch user orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders`);
      const userOrders = res.data
        .filter((o) => String(o.userId) === String(user.id))
        .reverse();
      setOrders(userOrders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      setCancelingId(orderId);

      await axios.patch(`${API}/orders/${orderId}`, {
        status: "cancelled",
      });

      fetchOrders();
      toast.success("Order cancelled successfully");
    } catch (err) {
      console.error("Cancel failed", err);
      toast.error("Failed to cancel order");
    } finally {
      setCancelingId(null);
    }
  };

  // Toast confirmation for deleting canceled orders
  const confirmDeleteOrder = (orderId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this canceled order?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                handleDelete(orderId);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              OK
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // Actual deletion
  const handleDelete = async (orderId) => {
    try {
      setDeletingId(orderId);
      await axios.delete(`${API}/orders/${orderId}`);
      fetchOrders();
      toast.success("Order deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete order");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const statusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link to="/login" className="text-xl text-[#9c7635] underline">
          Please login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">No orders found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Toaster container with custom colors */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "16px",
            padding: "12px 20px",
            borderRadius: "12px",
          },
          success: {
            icon: "",
            style: { background: "#756523" },
          },
          error: {
            icon: "",
            style: { background: "#b91c1c" },
          },
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <Link to="/" className="text-[#9c7635] hover:underline">
            ← Continue Shopping
          </Link>
        </div>

        <div className="space-y-8">
          {orders.map((order) => {
            const canCancel =
              order.status !== "cancelled" &&
              order.status !== "delivered";

            const isCancelled = order.status === "cancelled";

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border relative"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#9c7635] to-[#7a5c2a] text-white p-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-80">Order ID</p>
                    <p className="text-xl font-bold">#{order.id}</p>
                    <p className="text-sm mt-1">{formatDate(order.date)}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold">
                      ${order.total.toFixed(2)}
                    </p>
                    <span
                      className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium ${statusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 bg-gray-50 p-4 rounded-xl"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="font-bold mt-1">${item.unitPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="border-t p-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  {/* Track button only if not canceled */}
                  {!isCancelled && (
                    <Link
                      to={`/track-order/${order.id}`}
                      className="px-5 py-2 rounded-md bg-[#9c7635] text-white hover:bg-[#7a5c2a]"
                    >
                      Track Order
                    </Link>
                  )}

                  {/* Cancel order button */}
                  {canCancel && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      disabled={cancelingId === order.id}
                      className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      {cancelingId === order.id ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}

                  {/* Canceled order label + X button */}
                  {isCancelled && (
                    <div className="flex items-center gap-2">
                      <span className="text-red-600 font-medium">
                        Order Cancelled
                      </span>

                      <button
                        onClick={() => confirmDeleteOrder(order.id)}
                        disabled={deletingId === order.id}
                        className="px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
                        title="Delete Order"
                      >
                        {deletingId === order.id ? "Deleting..." : "✕"}
                      </button>
                    </div>
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
