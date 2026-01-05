import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  ShoppingBag,
  ShoppingCart,
  FileText,
  Settings,
} from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      {/* Top - Admin Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
            <Users className="h-6 w-6 text-amber-700" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Admin Panel</h3>
            <p className="text-sm text-gray-500">Full Access</p>
          </div>
        </div>
      </div>

      {/* Menu Items - Simple Links */}
      <nav className="p-4 space-y-2">

        <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-800 transition">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link to="/admin/analytics" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-800 transition">
          <BarChart3 size={20} />
          <span>Analytics</span>
        </Link>

        <Link to="/user-management" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-800 transition">
          <Users size={20} />
          <span>User Management</span>
        </Link>

        <Link to="/products-list" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-800 transition">
          <Package size={20} />
          <span>Product Management</span>
        </Link>

        <Link to="/order-management" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-800 transition">
          <ShoppingBag size={20} />
          <span>Order Management</span>
        </Link>

        <Link to="/admin/cart" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-800 transition">
          <ShoppingCart size={20} />
          <span>Cart Overview</span>
        </Link>

        <Link to="/admin/reports" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-800 transition">
          <FileText size={20} />
          <span>Reports</span>
        </Link>

        <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-800 transition">
          <Settings size={20} />
          <span>Settings</span>
        </Link>

      </nav>
    </aside>
  );
}