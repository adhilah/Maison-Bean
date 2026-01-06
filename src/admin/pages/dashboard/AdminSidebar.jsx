import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  ShoppingBag,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/users-management", icon: Users, label: "User Management" },
    { to: "/admin/products-management", icon: Package, label: "Product Management" },
    { to: "/admin/orders-management", icon: ShoppingBag, label: "Order Management" },
    { to: "/admin/cart-overview", icon: ShoppingCart, label: "Cart Overview" },
  ];

  return (
    <>
      {/* Mobile Hamburger Button (visible only on small screens) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white shadow-md hover:bg-gray-100 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <div className="flex flex-col h-full">
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

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)} // Close on mobile after click
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-100 hover:text-amber-800 transition"
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Optional Bottom Section */}
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">© 2026 Admin Panel</p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile (click to close) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </>
  );
}