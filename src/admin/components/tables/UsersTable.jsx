
// admin/pages/users/UserManagement.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * UserManagement Page - Admin Panel
 *
 * Purpose:
 * - Display all registered users
 * - Allow admin to search users by name or email
 * - Allow admin to permanently delete users + all their orders
 * - Provide easy navigation back to dashboard
 */

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Custom toast confirmation + actual deletion (same style as OrderList)
  const handleDeleteUser = (userId, userEmail) => {
    if (!userEmail) {
      toast.error("User email is missing");
      return;
    }

    toast(
      (t) => (
        <div className="p-5 bg-white rounded-2xl shadow-2xl border border-amber-200">
          <p className="font-semibold text-[#7a5c2a] mb-3 text-lg">
            Permanently delete this user?
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            This will <strong>delete the user</strong> and <strong>all their orders</strong>.<br />
            <span className="text-gray-600 font-medium">This action cannot be undone.</span>
          </p>

          <div className="flex gap-4 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-6 py-3 bg-amber-100 text-[#9c7635] rounded-xl font-medium hover:bg-amber-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                toast.loading("Deleting user and orders...");

                try {
                  const { data: allOrders } = await axios.get("http://localhost:3000/orders");
                  const userOrders = allOrders.filter(order => order.userEmail === userEmail);

                  if (userOrders.length > 0) {
                    await Promise.all(
                      userOrders.map(order => axios.delete(`http://localhost:3000/orders/${order.id}`))
                    );
                  }

                  await axios.delete(`http://localhost:3000/users/${userId}`);

                  setUsers(prev => prev.filter(u => u.id !== userId));

                  toast.dismiss();
                  toast.success(`User and ${userOrders.length} order${userOrders.length !== 1 ? 's' : ''} deleted successfully`);
                } catch (err) {
                  console.error("Delete error:", err);
                  toast.dismiss();
                  toast.error("Failed to delete user or orders");
                }
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition shadow-lg"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: { background: "transparent", boxShadow: "none" },
        position: "top-center",
      }
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* HEADER SECTION */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-1">Manage and control user access</p>
              </div>

              <div className="flex-1 max-w-lg mx-auto lg:mx-0">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                  />
                </div>
              </div>

              <div>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center text-[#9c7635] font-medium hover:underline"
                >
                  <ArrowLeft size={20} />
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* USERS TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Email</th>
                  <th className="px-8 py-4">Join</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-40"></div>
                        </div>
                      </td>
                      <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                      <td className="px-8 py-6"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
                      <td className="px-8 py-6 text-right"><div className="h-8 bg-gray-200 rounded w-28 inline-block"></div></td>
                    </tr>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-16 text-center text-gray-500">
                      <p className="text-lg">No users found</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className={`hover:bg-gray-50 transition-colors ${user.isBlocked ? "bg-red-50" : ""}`}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <span className="text-[#b69255] font-semibold text-sm">
                              {user.firstName?.[0]?.toUpperCase() || ""}
                              {user.lastName?.[0]?.toUpperCase() || ""}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.firstName || "Unknown"} {user.lastName || ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6 text-gray-700">{user.email}</td>

                      <td className="px-8 py-6 text-gray-600">
                        {user.joinDate || "January 2026"}
                      </td>

                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleDeleteUser(user.id, user.email)}
                            className="px-5 py-2 text-[#b78838] bg-white rounded-xl font-medium hover:bg-[#7f602b] hover:text-white transition"
                            title="Delete user"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}