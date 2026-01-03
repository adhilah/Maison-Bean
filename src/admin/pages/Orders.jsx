import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:3000";

export default function UserOrders() {
  // Store user orders
  const [orders, setOrders] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Get logged-in user from localStorage
  

  // Fetch orders when page loads
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, []);

  // 1️⃣ Fetch all orders and keep only this user's orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders`);

      // Filter orders by userId
      const userOrders = res.data.filter(
        (order) => String(order.userId) === String(user.id)
      );

      setOrders(userOrders.reverse()); // latest first
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  // 2️⃣ User confirms order is received
  const markAsReceived = async (orderId) => {
    try {
      await axios.patch(`${API}/orders/${orderId}`, {
        status: "completed",
        receivedByUser: true
      });

      // Reload orders after update
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // If user is not logged in
  if (!user) {
    return (
      <div className="text-center py-20">
        <p>Please login to view your orders</p>
        <Link to="/login" className="text-[#9c7635] underline">
          Login
        </Link>
      </div>
    );
  }

  // Loading message
  if (loading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }

  // No orders found
  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <p>No orders found</p>
        <Link to="/menu" className="text-[#9c7635] underline">
          Order something
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {/* Orders Table */}
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Track</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                {/* Order ID */}
                <td className="p-3 border font-medium">
                  #{order.id}
                </td>

                {/* Total Price */}
                <td className="p-3 border">
                  ${order.total.toFixed(2)}
                </td>

                {/* Order Status */}
                <td className="p-3 border capitalize">
                  {order.status.replaceAll("_", " ")}
                </td>

                {/* Track Order */}
                <td className="p-3 border">
                  <Link
                    to={`/track-order/${order.id}`}
                    className="text-[#9c7635] underline"
                  >
                    Track
                  </Link>
                </td>

                {/* Mark as Received */}
                <td className="p-3 border">
                  {order.status === "delivered" &&
                  !order.receivedByUser ? (
                    <button
                      onClick={() => markAsReceived(order.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Mark as Received
                    </button>
                  ) : order.receivedByUser ? (
                    <span className="text-green-600 font-semibold">
                      Received
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
