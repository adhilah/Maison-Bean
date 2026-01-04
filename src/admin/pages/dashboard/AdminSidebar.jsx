import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  ShoppingBag,
  FileText,
  Settings,
} from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r">

      {/* ================= ADMIN INFO ================= */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <Users className="text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold">Admin Panel</h3>
            <p className="text-sm text-gray-500">Full Access</p>
          </div>
        </div>
      </div>

      {/* ================= MENU ================= */}
      <nav className="p-4 space-y-1">

        <SidebarItem
          to="/admin/dashboard"
          icon={<LayoutDashboard />}
          label="Dashboard"
        />

        <SidebarItem
          to="/admin/analytics"
          icon={<BarChart3 />}
          label="Analytics"
        />

        <SidebarItem
          to="/admin/users"
          icon={<Users />}
          label="User Management"
        />

        <SidebarItem
          to="/admin/products"
          icon={<Package />}
          label="Product Management"
        />

        <SidebarItem
          to="/admin/orders"
          icon={<ShoppingBag />}
          label="Order Management"
        />

        <SidebarItem
          to="/admin/cart"
          icon={<ShoppingCart />}
          label="Cart Overview"
        />

        <SidebarItem
          to="/admin/reports"
          icon={<FileText />}
          label="Reports"
        />

        <SidebarItem
          to="/admin/settings"
          icon={<Settings />}
          label="Settings"
        />

      </nav>
    </aside>
  );
}

/* ================= SINGLE MENU ITEM ================= */
function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${
          isActive
            ? "bg-yellow-100 text-yellow-700 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
