// admin/pages/cart/CartOverview.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  DollarSign,
  Clock,
  Eye,
  Package,ArrowLeft
} from "lucide-react";

export default function CartOverview() {
  const [carts, setCarts] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCart, setSelectedCart] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [usersRes, productsRes] = await Promise.all([
        axios.get("http://localhost:3000/users"),
        axios.get("http://localhost:3000/products"),
      ]);

      setUsers(usersRes.data);
      setProducts(productsRes.data);

      // Extract active carts from users
      const activeCarts = [];
      usersRes.data.forEach((user) => {
        if (user.cart && user.cart.length > 0) {
          const cartTotal = user.cart.reduce((sum, cartItem) => {
            const product = productsRes.data.find(p => p.id === cartItem.productId);
            const price = product?.basePrice || 0;
            return sum + price * (cartItem.quantity || 1);
          }, 0);

          activeCarts.push({
            userId: user.id,
            userEmail: user.email,
            items: user.cart,
            itemsCount: user.cart.length,
            total: cartTotal,
            lastUpdated: user.cartUpdatedAt || new Date().toISOString(), // assume you have this field, or use current time
          });
        }
      });

      // Sort by most recently updated
      activeCarts.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

      setCarts(activeCarts);
    } catch (err) {
      toast.error("Failed to load cart data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product?.name || "Unknown Product";
  };

  // Stats
  const activeCartsCount = carts.length;
  const totalItems = carts.reduce((sum, cart) => sum + cart.itemsCount, 0);
  const potentialRevenue = carts.reduce((sum, cart) => sum + cart.total, 0);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
       <div className="flex items-center justify-between mb-8">
  <h1 className="text-3xl font-bold text-gray-900">
    Cart Overview
  </h1>

  <Link
    to="/admin/dashboard"
    className="flex items-center gap-2 text-[#9c7635] font-medium hover:underline"
  >
    <ArrowLeft size={20} />
    Back to Dashboard
  </Link>
</div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Carts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeCartsCount}</p>
              </div>
              <ShoppingCart className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Items in Carts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalItems}</p>
              </div>
              <Package className="h-12 w-12 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Potential Revenue</p>
                <p className="text-3xl font-bold text-amber-700 mt-2">
                  ${potentialRevenue.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-12 w-12 text-green-600" />
            </div>
          </div>
        </div>

        {/* Active Carts Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Current Customer Carts</h2>
            <p className="text-gray-600 mt-1">Live view of items customers have added</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Items</th>
                  <th className="px-8 py-4">Total</th>
                  <th className="px-8 py-4">Last Updated</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                      <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                      <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                      <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                      <td className="px-8 py-6 text-right"><div className="h-8 bg-gray-200 rounded w-20 inline-block"></div></td>
                    </tr>
                  ))
                ) : carts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-16 text-center text-gray-500">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No active carts at the moment</p>
                    </td>
                  </tr>
                ) : (
                  carts.map((cart) => (
                    <tr key={cart.userId} className="hover:bg-gray-50 transition">
                      <td className="px-8 py-6">
                        <span className="font-medium text-gray-900">
                          {cart.userEmail}
                        </span>
                      </td>

                      <td className="px-8 py-6 text-gray-700">
                        {cart.itemsCount} items
                      </td>

                      <td className="px-8 py-6 font-semibold text-gray-900">
                        ${cart.total.toFixed(2)}
                      </td>

                      <td className="px-8 py-6 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          {formatTimeAgo(cart.lastUpdated)}
                        </div>
                      </td>

                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => setSelectedCart(cart)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                        >
                          <Eye size={16} />
                          View Cart
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Viewing Cart Items */}
        {selectedCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    Cart Items - {selectedCart.userEmail}
                  </h3>
                  <button
                    onClick={() => setSelectedCart(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {selectedCart.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">
                          {getProductName(item.productId || item.product?.id)}
                        </p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ${(item.unitPrice || products.find(p => p.id === item.productId)?.basePrice || 0).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-900">Total</p>
                    <p className="text-2xl font-bold text-[#9c7635]">
                      ${selectedCart.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}