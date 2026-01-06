import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Package } from "lucide-react"; 

const API = "http://localhost:3000";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchOrders();
  }, []);

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

  const cancelOrder = async (orderId) => {
    try {
      setCancelingId(orderId);
      await axios.patch(`${API}/orders/${orderId}`, { status: "cancelled" });
      fetchOrders();
      toast.success("Order cancelled successfully");
    } catch (err) {
      console.error("Cancel failed", err);
      toast.error("Failed to cancel order");
    } finally {
      setCancelingId(null);
    }
  };

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
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold mb-4">Your order is empty</h1>
        <Link to="/" className="text-[#9c7635] underline text-lg hover:text-[#7a5d2c]">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
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
        {/* Header with Continue Shopping at top-right (before Track button) */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
            {/* Continue Shopping - now top-right aligned */}
            <Link
              to="/"
              className="text-[#9c7635] hover:text-[#7a5d2c] font-medium flex items-center gap-2 transition-colors order-2 sm:order-1"
            >
              ← Continue Shopping
            </Link>

            {/* Enhanced Track Products Button with Cardboard Box Icon */}
            <Link
              to="/track-order/:orderId"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-[#9c7635] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#8a6a2f] hover:shadow-xl hover:-translate-y-1 order-1 sm:order-2"
            >
              <Package size={18} />
              <span className="relative z-10">Track Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#b8964f] to-[#9c7635] opacity-0 transition-opacity group-hover:opacity-40"></div>
            </Link>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {orders.map((order) => {
            const canCancel = order.status !== "cancelled" && order.status !== "delivered";
            const isCancelled = order.status === "cancelled";

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-[#9c7635] to-[#7a5c2a] text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-sm opacity-80">Order ID</p>
                    <p className="text-2xl font-bold">#{order.id}</p>
                    <p className="text-sm mt-1 opacity-90">{formatDate(order.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">${order.total.toFixed(2)}</p>
                    <span
                      className={`inline-block mt-3 px-5 py-2 rounded-full text-sm font-semibold ${statusBadge(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex gap-4 bg-gray-50 p-5 rounded-xl">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.product.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                        <p className="font-bold mt-2 text-lg">${item.unitPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 p-6 flex flex-col sm:flex-row gap-4 justify-end items-center">
                  {canCancel && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      disabled={cancelingId === order.id}
                      className="px-6 py-3 rounded-xl bg-[#f2e8d5] text-[#9c7635] font-medium hover:bg-[#8a6a2f] disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                      {cancelingId === order.id ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}
                  {isCancelled && (
                    <div className="flex items-center gap-3">
                      <span className="text-red-600 font-medium">Order Cancelled</span>
                      <button
                        onClick={() => confirmDeleteOrder(order.id)}
                        disabled={deletingId === order.id}
                        className="w-10 h-10 rounded-full bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 transition flex items-center justify-center text-2xl"
                        title="Delete Order"
                      >
                        {deletingId === order.id ? "..." : "✕"}
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