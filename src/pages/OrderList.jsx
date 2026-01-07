import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Package } from "lucide-react";

const API = "http://localhost:3000";

export default function OrderList() {
  // State management
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null); // Tracks which order is being cancelled
  const [deletingId, setDeletingId] = useState(null);   // Tracks which order is being deleted

  const navigate = useNavigate();
  const storedUser = localStorage.getItem("authUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // -------------------------------------------------------------
  // Clear all previous toasts when entering this page
  // This prevents old toasts (from cart, login, etc.) from stacking up
  // -------------------------------------------------------------
  useEffect(() => {
    toast.dismiss(); // Dismisses all active toasts instantly
  }, []);

  // -------------------------------------------------------------
  // Fetch orders on mount (only if user is logged in)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchOrders();
  }, []); // Empty dependency: run only once on mount

  // -------------------------------------------------------------
  // Fetch user's orders from json-server
  // -------------------------------------------------------------
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders`);
      const userOrders = res.data
        .filter((o) => String(o.userId) === String(user.id))
        .reverse(); // Newest orders first
      setOrders(userOrders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Show confirmation toast before cancelling an order
  // Styled with Maison Bean theme colors
  // -------------------------------------------------------------
  const confirmCancelOrder = (orderId) => {
    toast(
      (t) => (
        <div className="p-4 bg-white rounded-2xl shadow-2xl border border-amber-200">
          <p className="font-semibold text-[#7a5c2a] mb-3">
            Are you sure you want to cancel this order?
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleCancelOrder(orderId);
              }}
              className="px-5 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
            >
              Yes, Cancel
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-5 py-2 bg-amber-100 text-[#9c7635] rounded-xl font-medium hover:bg-amber-200 transition"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: { background: "transparent", boxShadow: "none" }, // Remove default dark background
      }
    );
  };

  // -------------------------------------------------------------
  // Actually cancel the order (after confirmation)
  // -------------------------------------------------------------
  const handleCancelOrder = async (orderId) => {
    try {
      setCancelingId(orderId);
      await axios.patch(`${API}/orders/${orderId}`, { status: "cancelled" });
      await fetchOrders();
      toast.success("Order cancelled successfully");
    } catch (err) {
      console.error("Cancel failed", err);
      toast.error("Failed to cancel order");
    } finally {
      setCancelingId(null);
    }
  };

  // -------------------------------------------------------------
  // Show confirmation toast before permanently deleting a cancelled order
  // Themed with warm amber tones
  // -------------------------------------------------------------
  const confirmDeleteOrder = (orderId) => {
    toast(
      (t) => (
        <div className="p-4 bg-white rounded-2xl shadow-2xl border border-amber-200">
          <p className="font-semibold text-[#7a5c2a] mb-2">
            Permanently delete this cancelled order?
          </p>
          <p className="text-sm text-[#b48a41] mb-4">This action cannot be undone.</p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleDelete(orderId);
              }}
              className="px-5 py-2 bg-[#9c7635] text-white rounded-xl font-medium hover:bg-[#7f602b] transition"
            >
              Delete Permanently
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-5 py-2 bg-amber-100 text-[#9c7635] rounded-xl font-medium hover:bg-amber-200 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: { background: "transparent", boxShadow: "none" },
      }
    );
  };

  // -------------------------------------------------------------
  // Permanently delete a cancelled order
  // -------------------------------------------------------------
  const handleDelete = async (orderId) => {
    try {
      setDeletingId(orderId);
      await axios.delete(`${API}/orders/${orderId}`);
      await fetchOrders();
      toast.success("Order deleted permanently");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete order");
    } finally {
      setDeletingId(null);
    }
  };

  // -------------------------------------------------------------
  // Helper: Format date nicely
  // -------------------------------------------------------------
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // -------------------------------------------------------------
  // Helper: Payment method badge styling
  // -------------------------------------------------------------
  const paymentMethodBadge = (method) => {
    switch (method) {
      case "cod":
        return { label: "Cash on Delivery", color: "bg-orange-100 text-orange-800" };
      case "upi":
        return { label: "UPI Payment", color: "bg-blue-100 text-blue-800" };
      case "card":
        return { label: "Card Payment", color: "bg-purple-100 text-purple-800" };
      default:
        return { label: "Unknown", color: "bg-gray-100 text-gray-800" };
    }
  };

  // -------------------------------------------------------------
  // Render: Not logged in
  // -------------------------------------------------------------
  if (!user) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <Link to="/login" className="text-2xl font-medium text-[#9c7635] underline hover:text-[#7a5c2a]">
          Please login to view your orders
        </Link>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render: Loading state
  // -------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9c7635] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-xl text-[#7a5c2a]">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render: No orders yet
  // -------------------------------------------------------------
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4">
        <Package size={80} className="text-amber-200 mb-6" />
        <h1 className="text-3xl font-bold text-[#7a5c2a] mb-4">No orders yet</h1>
        <p className="text-[#b48a41] mb-8">Start your coffee journey today!</p>
        <Link
          to="/"
          className="px-8 py-4 bg-[#9c7635] hover:bg-[#7a5c2a] text-white rounded-xl font-bold transition transform hover:scale-105"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Main Render: Orders List
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-amber-50 py-10 px-4">
      {/* Toaster with custom theme */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "16px",
            padding: "12px 20px",
            borderRadius: "12px",
          },
          success: { style: { background: "#756523" } },
          error: { style: { background: "#b91c1c" } },
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h1 className="text-4xl font-bold text-[#7a5c2a]">My Orders</h1>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
            <Link
              to="/"
              className="text-[#9c7635] hover:underline font-medium flex items-center gap-2 transition-colors order-2 sm:order-1"
            >
              ← Continue Shopping
            </Link>

            <Link
              to="/track-order/:orderId"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-[#9c7635] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#8a6a2f] hover:shadow-xl hover:-translate-y-1 order-1 sm:order-2"
            >
              <Package size={20} />
              <span className="relative z-10">Track Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#b8964f] to-[#9c7635] opacity-0 transition-opacity group-hover:opacity-40"></div>
            </Link>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="space-y-10">
          {orders.map((order) => {
            const canCancel = order.status !== "cancelled" && order.status !== "delivered";
            const isCancelled = order.status === "cancelled";
            const paymentInfo = paymentMethodBadge(order.paymentMethod);

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 border border-amber-100"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-[#9c7635] to-[#7a5c2a] text-white p-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                      <p className="text-sm opacity-80">Order ID</p>
                      <p className="text-2xl font-bold">#{order.id.slice(-8).toUpperCase()}</p>
                      <p className="text-sm mt-2 opacity-90">{formatDate(order.date)}</p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <div>
                        <p className="text-4xl font-bold">
                          ${Number(order.total || 0).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-end gap-3">
                        <span
                          className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold ${paymentInfo.color}`}
                        >
                          {paymentInfo.label}
                          {order.upiId && (
                            <span className="text-xs opacity-80 ml-1">({order.upiId})</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex gap-5 bg-amber-50 p-6 rounded-2xl shadow">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 rounded-xl object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-lg">{item.product.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                        <p className="font-bold text-[#9c7635] mt-3 text-xl">
                          ${(item.product.basePrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="border-t border-amber-100 p-8 flex flex-col sm:flex-row gap-5 justify-end items-center bg-gray-50">
                  {canCancel && (
                    <button
                      onClick={() => confirmCancelOrder(order.id)}
                      disabled={cancelingId === order.id}
                      className="px-8 py-3 rounded-xl bg-red-100 text-red-700 font-bold hover:bg-red-200 disabled:opacity-60 transition"
                    >
                      {cancelingId === order.id ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}

                  {isCancelled && (
                    <div className="flex items-center gap-4">
                      <span className="text-red-700 font-bold text-lg">Order Cancelled</span>
                      <button
                        onClick={() => confirmDeleteOrder(order.id)}
                        disabled={deletingId === order.id}
                        className="w-12 h-12 rounded-full bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 transition flex items-center justify-center text-3xl font-light"
                        title="Delete cancelled order"
                      >
                        {deletingId === order.id ? "..." : "×"}
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