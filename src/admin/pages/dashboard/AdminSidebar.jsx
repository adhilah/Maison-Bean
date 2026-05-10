import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  ShoppingCart,
  Menu,
  X,
  Milk,
} from "lucide-react";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { to: "/admin/dashboard",            icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/users-management",     icon: Users,           label: "User Management" },
    { to: "/admin/products-management",  icon: Package,         label: "Product Management" },
    { to: "/admin/bean-milk-management", icon: Milk,            label: "Bean Milk Management" },
    { to: "/admin/orders-management",    icon: ShoppingBag,     label: "Order Management" },
    { to: "/admin/cart-overview",        icon: ShoppingCart,    label: "Cart Overview" },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-9 h-9 rounded-lg border border-[#2b2b2b] flex items-center justify-center text-[#8a8680] hover:text-[#c9a96e] hover:border-[#c9a96e] transition-all duration-200"
        style={{ background: "#111111" }}
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-[#1f1f1f] flex flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:inset-0`}
        style={{ background: "#0a0a0a" }}
      >
        {/* Top — brand */}
        <div className="px-6 py-5 border-b border-[#1f1f1f] flex-shrink-0">
          <p className="text-[10px] tracking-[3px] uppercase text-[#8a6e45] mb-1">
            Control Panel
          </p>
          <h2
            className="text-[15px] font-medium text-[#f0ece4]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Maison Bean
          </h2>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group
                  ${active
                    ? "bg-[#1a1500] text-[#c9a96e] border border-[#2e2400]"
                    : "text-[#5a5650] border border-transparent hover:bg-[#141414] hover:text-[#a89070] hover:border-[#1f1f1f]"
                  }`}
              >
                <item.icon
                  size={16}
                  className={`flex-shrink-0 transition-colors duration-200 ${active ? "text-[#c9a96e]" : "text-[#3a3530] group-hover:text-[#8a6e45]"}`}
                />
                {item.label}
                {active && (
                  <div className="ml-auto w-1 h-1 rounded-full bg-[#c9a96e]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-6 py-4 border-t border-[#1f1f1f] flex-shrink-0">
          <p className="text-[10px] text-[#2e2b26] tracking-widest uppercase text-center">
            © 2026 Maison Bean
          </p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
        />
      )}
    </>
  );
}