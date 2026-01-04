import { Bell, LogOut } from "lucide-react";

export default function AdminNavbar({ onMenuClick }) {
  return (
    <header className="h-16 bg-[#a77c3b] text-white flex items-center justify-between px-6">

      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle (for mobile / future use) */}
        {/* <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-white/20"
        >
          ☰
        </button> */}

        <h1 className="text-lg font-semibold">
          Maison Bean – Admin Dashboard
        </h1>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="relative p-2 rounded-md hover:bg-white/20">
          <Bell />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Admin Email */}
        <p className="hidden sm:block text-sm">
          Welcome, <span className="font-semibold">admin@gmail.com</span>
        </p>

        {/* Logout */}
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
