// admin/pages/users/UserManagement.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Trash2, Ban, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This cannot be undone.")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setUsers(users.filter((u) => u.id !== userId));
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const handleToggleBlock = async (user) => {
    const newStatus = user.isBlocked ? false : true;
    const action = newStatus ? "blocked" : "unblocked";

    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        isBlocked: newStatus,
      });

      setUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, isBlocked: newStatus } : u
        )
      );

      toast.success(`User has been ${action}`);
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header with Back Button */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage and control user access</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Back to Dashboard Button */}
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 px-5 py-3 bg-amber-100 text-amber-800 rounded-xl font-medium hover:bg-amber-200 transition shadow-sm"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                <th className="px-8 py-4">User</th>
                <th className="px-8 py-4">Email</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Joined</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                    <td className="px-8 py-6"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
                    <td className="px-8 py-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-8 py-6 text-right"><div className="h-8 bg-gray-200 rounded w-24"></div></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-gray-500">
                    <p>No users found</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${user.isBlocked ? "bg-red-50" : ""}`}>
                    {/* User Name + Avatar */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-700 font-semibold">
                            {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-8 py-6 text-gray-700">
                      {user.email}
                    </td>

                    {/* Status */}
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                          user.isBlocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.isBlocked ? (
                          <>
                            <Ban className="h-4 w-4" />
                            Blocked
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Active
                          </>
                        )}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="px-8 py-6 text-gray-600">
                      {user.joinDate || "Jan 2026"}
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleToggleBlock(user)}
                          className={`p-2 rounded-lg transition ${
                            user.isBlocked
                              ? "bg-green-100 text-green-600 hover:bg-green-200"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                          title={user.isBlocked ? "Unblock user" : "Block user"}
                        >
                          {user.isBlocked ? <CheckCircle size={18} /> : <Ban size={18} />}
                        </button>

                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
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
  );
}