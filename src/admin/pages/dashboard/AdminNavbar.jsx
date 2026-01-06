import { Bell, LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ onMenuClick }) {
  const { user, logout } = useAuth();
    const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
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
          Maison Bean – Dashboard
        </h1>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        {/* <button className="relative p-2 rounded-md hover:bg-white/20">
          <Bell />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button> */}

        {/* Admin Email */}
        {/* <p className="hidden sm:block text-sm">
          Welcome, <span className="font-semibold">admin@gmail.com</span>
        </p> */}

        {/* Logout */}
       <button onClick={handleLogout} className="bg-[#a77c3b] border-amber-50 hover:bg-[#8e6a33] text-amber-50 px-6 py-2 rounded-lg font-medium transition flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">logout</span>
                Logout
              </button>
      </div>
    </header>
  );
}
