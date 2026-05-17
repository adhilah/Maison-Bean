import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getAllUsers, toggleUser, deleteUser } from "../../../services/userApi";
import { getAllOrders } from "../../../services/orderApi";
import api from "../../../services/api";

/* ── Icons ── */
const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const BlockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);
const UnblockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);

/* ── Confirm Dialog ── */
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-[#110d07] border border-[#c9a96e]/20 p-8 w-full max-w-sm">
      <p className="font-['Cormorant_Garamond',serif] text-[1.2rem] text-[#f5f0e8]/80 font-light mb-6 text-center">
        {message}
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 border border-[#c9a96e]/20 text-[#c9a96e]/60 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-all font-['Jost',sans-serif]"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3 bg-[#c9a96e] text-[#0d0a05] text-[10px] tracking-[0.3em] uppercase hover:bg-[#d4b87a] transition-all font-['Jost',sans-serif]"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

/* ── User Row ── */
const UserRow = ({ user, onToggleBlock, onDelete, index }) => {
  const isBlocked = (user.userStatus || "").toLowerCase() === "blocked";
  const initials  = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "?";

  return (
    <div
      className={`
        group flex items-center gap-4 px-6 py-4
        border-b border-[#c9a96e]/08
        transition-all duration-300
        bg-[#0d0a05] hover:bg-[#110d07]
        ${isBlocked ? "opacity-[0.55] hover:opacity-[0.72]" : ""}
      `}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Status dot */}
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#c9a96e]/60" />

      {/* Avatar */}
      <div
        className="w-9 h-9 flex-shrink-0 flex items-center justify-center border font-light border-[#c9a96e]/20 bg-[#c9a96e]/08 text-[#c9a96e]/70"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem" }}
      >
        {initials}
      </div>

      {/* Name + email */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p
            className="font-light leading-tight truncate text-[#f5f0e8]/85"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
          >
            {user.firstName || "Unknown"} {user.lastName || ""}
          </p>
          {isBlocked && (
            <span className="px-2 py-[3px] text-[8px] tracking-[0.42em] uppercase border border-red-400/12 bg-red-400/[0.03] text-red-300/60 flex-shrink-0">
              BLOCKED
            </span>
          )}
        </div>
        <p className="text-[11px] font-['Jost',sans-serif] font-light truncate mt-0.5 text-[#f5f0e8]/28">
          {user.email}
        </p>
      </div>

      {/* Join date */}
      <div className="hidden sm:block flex-shrink-0 text-right">
        <span className="text-[11px] font-['Jost',sans-serif] text-[#f5f0e8]/25">
          {user.joinDate || "—"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onToggleBlock(user)}
          title={isBlocked ? "Unblock user" : "Block user"}
          className={`w-8 h-8 flex items-center justify-center border transition-all
            ${isBlocked
              ? "border-emerald-500/20 text-emerald-400/50 hover:border-emerald-500/50 hover:text-emerald-400"
              : "border-amber-500/20 text-amber-400/50 hover:border-amber-500/50 hover:text-amber-400"
            }`}
        >
          {isBlocked ? <UnblockIcon /> : <BlockIcon />}
        </button>
        {/* <button
          onClick={() => onDelete(user)}
          title="Delete user"
          className="w-8 h-8 flex items-center justify-center border border-[#f87171]/15 text-[#f87171]/40 hover:border-[#f87171]/45 hover:text-[#f87171] transition-all"
        >
          <TrashIcon />
        </button> */}
      </div>
    </div>
  );
};

/* ── Main ── */
export default function UserManagement() {
  const [users,   setUsers]   = useState([]);
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("all");
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : data.data || []);
    } catch {
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = (user) => {
    const willBlock = (user.userStatus || "").toLowerCase() !== "blocked";
    setConfirm({
      message: `${willBlock ? "Block" : "Unblock"} "${user.firstName} ${user.lastName}"?`,
      action: async () => {
        try {
          await toggleUser(user.id);
          setUsers((prev) =>
            prev.map((u) =>
              u.id === user.id
                ? { ...u, userStatus: (u.userStatus || "").toLowerCase() === "blocked" ? "active" : "blocked" }
                : u
            )
          );
          toast.success(`User ${willBlock ? "blocked" : "unblocked"}`);
        } catch {
          toast.error(`Failed to ${willBlock ? "block" : "unblock"} user`);
        }
        setConfirm(null);
      },
    });
  };

  const handleDelete = (user) => {
    setConfirm({
      message: `Delete "${user.email}" and all their orders? This cannot be undone.`,
      action: async () => {
        try {
          const allOrders  = await getAllOrders();
          const userOrders = allOrders.filter((o) => o.userEmail === user.email);
          if (userOrders.length > 0) {
            await Promise.all(userOrders.map((o) => api.delete(`/order/${o.id}`)));
          }
          await deleteUser(user.id);
          setUsers((prev) => prev.filter((u) => u.id !== user.id));
          toast.success("User deleted");
        } catch {
          toast.error("Failed to delete user");
        }
        setConfirm(null);
      },
    });
  };

  const filtered = users.filter((u) => {
    const matchFilter =
      filter === "all" ||
      (filter === "active"  && (u.userStatus || "").toLowerCase() !== "blocked") ||
      (filter === "blocked" && (u.userStatus || "").toLowerCase() === "blocked");
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q)  ||
      u.email?.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const activeCount  = users.filter((u) => (u.userStatus || "").toLowerCase() !== "blocked").length;
  const blockedCount = users.filter((u) => (u.userStatus || "").toLowerCase() === "blocked").length;

  const FILTER_TABS = [
    { key: "all",     label: "All",     count: users.length },
    { key: "active",  label: "Active",  count: activeCount  },
    { key: "blocked", label: "Blocked", count: blockedCount },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .um-in { animation: fadeUp 0.45s ease forwards; }

        .um-scroll::-webkit-scrollbar { width: 2px; }
        .um-scroll::-webkit-scrollbar-track { background: transparent; }
        .um-scroll::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }
      `}</style>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#110d07", color: "#f5f0e8",
            border: "1px solid rgba(201,169,110,0.2)", borderRadius: 0,
            fontSize: "11px", padding: "10px 16px",
            fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em",
          },
          success: { iconTheme: { primary: "#c9a96e", secondary: "#0d0a05" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#0d0a05" } },
        }}
      />

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] px-4 sm:px-6 lg:px-14 py-10 lg:py-14">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[#c9a96e]/[0.025] blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">

          {/* ── Page Header ── */}
          <div className="mb-10 um-in">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase mb-3 opacity-65">
                  Admin · Users
                </p>
                <h1
                  className="font-['Cormorant_Garamond',serif] font-light text-[#f5f0e8] leading-none"
                  style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
                >
                  User <span className="italic text-[#c9a96e]">Management</span>
                </h1>
              </div>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 text-[#c9a96e]/50 hover:text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase transition-colors group flex-shrink-0 mt-1"
              >
                <span className="h-px w-5 bg-current block group-hover:w-8 transition-all duration-300" />
                Dashboard
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-[#c9a96e]/40 to-transparent" />
              <p className="text-[#f5f0e8]/20 text-[10px] tracking-[0.3em] uppercase">
                Manage and control user access
              </p>
            </div>
          </div>

          {/* ── Panel ── */}
          <div className="bg-[#0d0a05] border border-[#c9a96e]/12 flex flex-col um-in">

            {/* Panel header */}
            <div className="px-6 py-5 border-b border-[#c9a96e]/10 bg-[#110d07] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/70">
                  <UserIcon />
                </div>
                <h2 className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light text-[#f5f0e8] leading-tight">
                  All Users
                </h2>
              </div>
              {/* Filter tabs */}
              <div className="flex border border-[#c9a96e]/15">
                {FILTER_TABS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setFilter(t.key)}
                    className={`px-4 py-2 text-[9px] tracking-[0.3em] uppercase transition-all duration-200 border-r border-[#c9a96e]/10 last:border-r-0 flex items-center gap-1.5
                      ${filter === t.key
                        ? "bg-[#c9a96e]/10 text-[#c9a96e]"
                        : "text-[#f5f0e8]/30 hover:text-[#f5f0e8]/55"
                      }`}
                  >
                    {t.label}
                    <span className={`text-[8px] ${filter === t.key ? "text-[#c9a96e]/70" : "text-[#f5f0e8]/18"}`}>
                      {t.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats strip */}
            <div className="flex divide-x divide-[#c9a96e]/08 border-b border-[#c9a96e]/08">
              {[
                { label: "Total",   value: users.length,  color: "text-[#f5f0e8]/60" },
                { label: "Active",  value: activeCount,   color: "text-[#c9a96e]"     },
                { label: "Blocked", value: blockedCount,  color: "text-[#f87171]/60"  },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex-1 py-3 px-5 text-center">
                  <p className={`font-['Cormorant_Garamond',serif] text-[1.4rem] font-light ${color}`}>{value}</p>
                  <p className="text-[9px] tracking-[0.3em] uppercase font-['Jost',sans-serif] text-[#f5f0e8]/25 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="px-6 py-3 border-b border-[#c9a96e]/08 flex items-center gap-2">
              <span className="text-[#f5f0e8]/18 flex-shrink-0"><SearchIcon /></span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full bg-transparent text-[#f5f0e8]/70 text-[12px] font-['Jost',sans-serif] font-light placeholder:text-[#f5f0e8]/18 focus:outline-none"
              />
            </div>

            {/* User list */}
            <div className="um-scroll overflow-y-auto" style={{ maxHeight: 520 }}>
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-6 h-6 border border-[#c9a96e]/20 border-t-[#c9a96e]/60 rounded-full animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <p className="font-['Cormorant_Garamond',serif] italic text-[#f5f0e8]/20 text-[1.1rem]">
                    {search ? "No matches found" : "No users yet"}
                  </p>
                </div>
              ) : (
                filtered.map((user, i) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    index={i}
                    onToggleBlock={handleToggleBlock}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>

            {/* Footer count */}
            {!loading && filtered.length > 0 && (
              <div className="px-6 py-3 border-t border-[#c9a96e]/08 text-center">
                <p className="text-[#f5f0e8]/15 text-[9px] tracking-[0.4em] uppercase">
                  {filtered.length} {filtered.length === 1 ? "user" : "users"}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Confirm dialog */}
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={confirm.action}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}