import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b border-[#1f1f1f] flex-shrink-0 sticky top-0 z-40"
      style={{ background: "#0a0a0a" }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Logo dot */}
        <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
        <h1
          className="text-[15px] font-medium text-[#f0ece4] tracking-wide"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Maison Bean
          <span className="text-[#c9a96e] ml-1.5 text-[13px] font-normal tracking-widest uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            ✦ Admin
          </span>
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* User pill */}
        {user?.email && (
          <div className="hidden sm:flex items-center gap-2 bg-[#141414] border border-[#2b2b2b] rounded-full px-3.5 py-1.5">
            <div className="w-5 h-5 rounded-full bg-[#7a5c2e] flex items-center justify-center text-[10px] text-[#f5e8c8] font-medium uppercase">
              {user.email[0]}
            </div>
            <span className="text-[12px] text-[#8a8680]">{user.email}</span>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] text-[#8a8680] border border-[#1f1f1f] hover:border-[#c9a96e] hover:text-[#c9a96e] hover:bg-[#1a1500] transition-all duration-200 cursor-pointer"
          style={{ background: "#111111" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
}