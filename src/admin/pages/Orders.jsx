import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function UserOrders() {
  const { user } = useAuth();        // Logged-in user
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch orders when page loads
  useEffect(() => {
    axios.get("http://localhost:3000/orders")
      .then(res => {
        // 🔹 SIMPLE FILTER:
        // Show only orders created by this user
        const userOrders = res.data.filter(
          order => order.userId === user.id
        );

        setOrders(userOrders);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // 🔹 Loading state
  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  return (
    // 🔹 Enables scrolling (important!)
    <main className="p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {/* 🔹 No orders */}
      {orders.length === 0 && (
        <p className="text-gray-500">You have no orders yet.</p>
      )}

      {/* 🔹 Orders Table */}
      {orders.length > 0 && (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Items</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map(order => (
                <tr key={order.id}>
                  
                  {/* Order ID */}
                  <td className="px-6 py-4 font-medium">
                    #{order.id.slice(-6)}
                  </td>

                  {/* Ordered Items */}
                  <td className="px-6 py-4 text-sm">
                    {order.items.map(item => (
                      <div key={item.id}>
                        {item.product.name} × {item.quantity}
                      </div>
                    ))}
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 font-semibold">
                    ₹{order.total}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"}
                    `}>
                      {order.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(order.tracking.confirmed).toLocaleDateString()}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
