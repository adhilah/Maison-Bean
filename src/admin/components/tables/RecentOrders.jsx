import { useEffect, useState } from "react";
import axios from "axios";
import { MoreVertical, Plus } from "lucide-react";

const STATUS_STYLES = {
  delivered: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  pending: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800",
  confirmed: "bg-purple-100 text-purple-800",
};

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((response) => {
        const processedOrders = response.data
          .map((order) => {
            // Extract date safely (from tracking.delivered, date, or tracking.confirmed)
            const dateSource =
              order.tracking?.delivered ||
              order.date ||
              order.tracking?.confirmed ||
              new Date().toISOString();

            const dateObj = new Date(dateSource);
            const validDate = !isNaN(dateObj.getTime()) ? dateObj : new Date();

            // Calculate total if missing (fallback)
            const calculatedTotal =
              order.items?.reduce((sum, item) => {
                return sum + (parseFloat(item.unitPrice || item.product?.basePrice || 0) * item.quantity);
              }, 0) || 0;

            return {
              id: order.id,
              customerEmail: order.userEmail || "unknown@user.com",
              date: validDate,
              amount: parseFloat(order.total || calculatedTotal || 0),
              status: (order.status || "pending").toLowerCase(), // normalize to lowercase
            };
          })
          .sort((a, b) => b.date - a.date) // Most recent first
          .slice(0, 5);

        setOrders(processedOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "—";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Extract display name from email (e.g., "adhilahussainar@gmail.com" → "adhilahussainar")
  const getCustomerName = (email) => {
    if (!email || email === "unknown@user.com") return "Guest";
    return email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              {/* <th className="px-6 py-3 text-right">Actions</th> */}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                  <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
                  <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                  <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                  <td className="px-6 py-5"><div className="h-6 bg-gray-200 rounded-full w-20"></div></td>
                  <td className="px-6 py-5 text-right"><div className="h-6 bg-gray-200 rounded w-6"></div></td>
                </tr>
              ))
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  {/* Order ID */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-[#e3ccaa] flex items-center justify-center">
                        <svg className="h-5 w-5 text-[#a77c3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">
                        #ORD-{order.id.slice(-4).toUpperCase()}
                      </span>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-300" />
                      <span className="text-gray-900">
                        {getCustomerName(order.customerEmail)}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-gray-600">
                    {formatDate(order.date)}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-5 font-semibold text-gray-900">
                    ${order.amount.toFixed(2)}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                        STATUS_STYLES[order.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>

                  {/* Actions */}
                  {/* <td className="px-6 py-5 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={20} />
                    </button>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}