import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../services/api";
import toast from "react-hot-toast";

const API = "https://localhost:7257/api";

// ── Icons ──────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
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
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const BeanIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="12" rx="9" ry="6" />
    <path d="M12 6 Q8 12 12 18" /><path d="M12 6 Q16 12 12 18" />
  </svg>
);
const MilkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M8 2h8l2 4v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" /><path d="M6 6h12" />
  </svg>
);

// ── Empty field template ───────────────────────────────────────
const emptyBean = { name: "", description: "", priceAdd: 0, blocked: false };
const emptyMilk = { name: "", calories: "", priceAdd: 0, blocked: false };

// ── Confirm dialog ────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-[#110d07] border border-[#c9a96e]/20 p-8 w-full max-w-sm">
      <p className="font-['Cormorant_Garamond',serif] text-[1.2rem] text-[#f5f0e8]/80 font-light mb-6 text-center">
        {message}
      </p>
      <div className="flex gap-3">
        <button onClick={onCancel}
          className="flex-1 py-3 border border-[#c9a96e]/20 text-[#c9a96e]/60 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-all">
          Cancel
        </button>
        <button onClick={onConfirm}
          className="flex-1 py-3 bg-[#c9a96e] text-[#0d0a05] text-[10px] tracking-[0.3em] uppercase hover:bg-[#d4b87a] transition-all">
          Confirm
        </button>
      </div>
    </div>
  </div>
);

// ── Modal form ─────────────────────────────────────────────────
const FormModal = ({ type, initial, onSave, onClose }) => {
  const isBean = type === "bean";
  const [form, setForm] = useState(initial || (isBean ? { ...emptyBean } : { ...emptyMilk }));
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error("Name is required"); return; }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const inputCls = `
    w-full bg-[#0d0a05] border border-[#c9a96e]/15 px-4 py-3
    text-[#f5f0e8] text-[13px] font-light
    placeholder:text-[#f5f0e8]/20
    focus:outline-none focus:border-[#c9a96e]/45
    transition-colors duration-200
    font-['Jost',sans-serif]
  `;
  const labelCls = "text-[#c9a96e]/60 text-[9px] tracking-[0.4em] uppercase font-['Jost',sans-serif] mb-1.5 block";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#110d07] border border-[#c9a96e]/20 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#c9a96e]/10">
          <div>
            <p className="text-[#c9a96e]/55 text-[9px] tracking-[0.5em] uppercase font-['Jost',sans-serif]">
              {initial?.id ? "Edit" : "New"} {isBean ? "Bean" : "Milk"}
            </p>
            <h3 className="font-['Cormorant_Garamond',serif] text-[1.4rem] font-light text-[#f5f0e8] mt-0.5">
              {initial?.id
                ? <><span className="italic text-[#c9a96e]">{initial.name}</span></>
                : <>Add {isBean ? "Bean Type" : "Milk Option"}</>
              }
            </h3>
          </div>
          <button onClick={onClose} className="text-[#f5f0e8]/30 hover:text-[#f5f0e8]/70 transition-colors p-1">
            <CloseIcon />
          </button>
        </div>

        {/* Fields */}
        <div className="px-7 py-6 space-y-5">
          <div>
            <label className={labelCls}>Name *</label>
            <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)}
              placeholder={isBean ? "e.g. Ethiopian Yirgacheffe" : "e.g. Oat Milk"} />
          </div>

          {isBean ? (
            <div>
              <label className={labelCls}>Description</label>
              <textarea className={`${inputCls} resize-none`} rows={3}
                value={form.description} onChange={(e) => set("description", e.target.value)}
                placeholder="Tasting notes, origin, roast level…" />
            </div>
          ) : (
            <div>
              <label className={labelCls}>Calories</label>
              <input className={inputCls} type="number" min="0"
                value={form.calories} onChange={(e) => set("calories", e.target.value)}
                placeholder="e.g. 120" />
            </div>
          )}

          <div>
            <label className={labelCls}>Price Add-on (₹)</label>
            <input className={inputCls} type="number" min="0" step="0.5"
              value={form.priceAdd} onChange={(e) => set("priceAdd", Number(e.target.value))}
              placeholder="0 = included" />
            <p className="text-[#f5f0e8]/20 text-[10px] mt-1.5 font-['Jost',sans-serif]">
              Enter 0 if this option is included in the base price
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 pb-7 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 border border-[#c9a96e]/20 text-[#c9a96e]/55 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-all font-['Jost',sans-serif]">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-3 bg-[#c9a96e] hover:bg-[#d4b87a] disabled:opacity-50 text-[#0d0a05] text-[10px] tracking-[0.3em] uppercase transition-all font-['Jost',sans-serif] flex items-center justify-center gap-2">
            {saving && <div className="w-3 h-3 border border-[#0d0a05]/40 border-t-[#0d0a05] rounded-full animate-spin" />}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Row ────────────────────────────────────────────────────────
const Row = ({ item, type, onEdit, onDelete, onToggleBlock, index }) => {
  const isBean = type === "bean";
  return (
    <div
      className={`
        group flex items-center gap-4 px-6 py-4
        border-b border-[#c9a96e]/08
        transition-all duration-300
        ${item.blocked ? "bg-[#0d0a05] opacity-50" : "bg-[#0d0a05] hover:bg-[#110d07]"}
      `}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Status dot */}
      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.blocked ? "bg-[#f87171]/50" : "bg-[#c9a96e]/60"}`} />

      {/* Name + sub */}
      <div className="flex-1 min-w-0">
        <p className="font-['Cormorant_Garamond',serif] text-[1.05rem] font-light text-[#f5f0e8]/85 truncate leading-tight">
          {item.name}
          {item.blocked && (
            <span className="ml-2 text-[9px] font-['Jost',sans-serif] tracking-[0.3em] text-[#f87171]/50 uppercase">Blocked</span>
          )}
        </p>
        <p className="text-[#f5f0e8]/28 text-[11px] font-['Jost',sans-serif] font-light truncate mt-0.5">
          {isBean ? (item.description || "—") : (item.calories ? `${item.calories} cal` : "—")}
        </p>
      </div>

      {/* Price badge */}
      <div className="flex-shrink-0 text-right hidden sm:block">
        <span className="font-['Cormorant_Garamond',serif] text-[1rem] text-[#c9a96e]/70">
          {item.priceAdd > 0 ? `+₹${item.priceAdd}` : <span className="text-[#f5f0e8]/25 text-[11px] tracking-widest">included</span>}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button onClick={() => onEdit(item)} title="Edit"
          className="w-8 h-8 flex items-center justify-center border border-[#c9a96e]/15 text-[#c9a96e]/50 hover:border-[#c9a96e]/45 hover:text-[#c9a96e] transition-all">
          <EditIcon />
        </button>
        <button onClick={() => onToggleBlock(item)} title={item.blocked ? "Unblock" : "Block"}
          className={`w-8 h-8 flex items-center justify-center border transition-all
            ${item.blocked
              ? "border-emerald-500/20 text-emerald-400/50 hover:border-emerald-500/50 hover:text-emerald-400"
              : "border-amber-500/20 text-amber-400/50 hover:border-amber-500/50 hover:text-amber-400"
            }`}>
          {item.blocked ? <UnblockIcon /> : <BlockIcon />}
        </button>
        <button onClick={() => onDelete(item)} title="Delete"
          className="w-8 h-8 flex items-center justify-center border border-[#f87171]/15 text-[#f87171]/40 hover:border-[#f87171]/45 hover:text-[#f87171] transition-all">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

// ── Panel (beans or milks) ─────────────────────────────────────
const Panel = ({ type, endpoint }) => {
  const isBean = type === "bean";
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(null); // null | { mode:'add'|'edit', item }
  const [confirm,  setConfirm]  = useState(null); // null | { action, item }
  const [search,   setSearch]   = useState("");

  const load = async () => {
    try {
      const res = await axios.get(`${API}/${endpoint}`);
      setItems(res.data || []);
    } catch {
      toast.error(`Failed to load ${isBean ? "beans" : "milks"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (form) => {
    try {
      if (modal.item?.id) {
        await axios.put(`${API}/${endpoint}/${modal.item.id}`, form);
        toast.success(`${form.name} updated`);
      } else {
        await axios.post(`${API}/${endpoint}`, { ...form, blocked: false });
        toast.success(`${form.name} added`);
      }
      setModal(null);
      load();
    } catch {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (item) => {
    setConfirm({
      message: `Delete "${item.name}"? This cannot be undone.`,
      action: async () => {
        try {
          await axios.delete(`${API}/${endpoint}/${item.id}`);
          toast.success(`${item.name} deleted`);
          load();
        } catch { toast.error("Delete failed"); }
        setConfirm(null);
      },
    });
  };

  const handleToggleBlock = async (item) => {
    const action = item.blocked ? "unblock" : "block";
    setConfirm({
      message: `${action.charAt(0).toUpperCase() + action.slice(1)} "${item.name}"?`,
      action: async () => {
        try {
          await axios.patch(`${API}/${endpoint}/${item.id}`, { blocked: !item.blocked });
          toast.success(`${item.name} ${action}ed`);
          load();
        } catch { toast.error(`Failed to ${action}`); }
        setConfirm(null);
      },
    });
  };

  const filtered = items.filter((i) =>
    i.name?.toLowerCase().includes(search.toLowerCase())
  );
  const active  = items.filter((i) => !i.blocked).length;
  const blocked = items.filter((i) =>  i.blocked).length;

  return (
    <div className="bg-[#0d0a05] border border-[#c9a96e]/12 flex flex-col">

      {/* Panel header */}
      <div className="px-6 py-5 border-b border-[#c9a96e]/10 bg-[#110d07] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]/70">
            {isBean ? <BeanIcon /> : <MilkIcon />}
          </div>
          <div>
            <p className="text-[#c9a96e]/55 text-[9px] tracking-[0.5em] uppercase font-['Jost',sans-serif]">Manage</p>
            <h2 className="font-['Cormorant_Garamond',serif] text-[1.3rem] font-light text-[#f5f0e8] leading-tight">
              {isBean ? "Bean Types" : "Milk Options"}
            </h2>
          </div>
        </div>
        <button
          onClick={() => setModal({ item: null })}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a96e] hover:bg-[#d4b87a] text-[#0d0a05] text-[9px] tracking-[0.3em] uppercase font-['Jost',sans-serif] transition-all flex-shrink-0"
        >
          <PlusIcon /> Add {isBean ? "Bean" : "Milk"}
        </button>
      </div>

      {/* Stats strip */}
      <div className="flex divide-x divide-[#c9a96e]/08 border-b border-[#c9a96e]/08">
        {[
          { label: "Total",   value: items.length },
          { label: "Active",  value: active,  color: "text-[#c9a96e]" },
          { label: "Blocked", value: blocked, color: "text-[#f87171]/60" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex-1 py-3 px-5 text-center">
            <p className={`font-['Cormorant_Garamond',serif] text-[1.4rem] font-light ${color || "text-[#f5f0e8]/60"}`}>{value}</p>
            <p className="text-[9px] tracking-[0.3em] uppercase font-['Jost',sans-serif] text-[#f5f0e8]/25 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="px-6 py-3 border-b border-[#c9a96e]/08">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${isBean ? "beans" : "milks"}…`}
          className="w-full bg-transparent text-[#f5f0e8]/70 text-[12px] font-['Jost',sans-serif] font-light placeholder:text-[#f5f0e8]/18 focus:outline-none"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: "480px" }}>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border border-[#c9a96e]/20 border-t-[#c9a96e]/60 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="font-['Cormorant_Garamond',serif] italic text-[#f5f0e8]/20 text-[1.1rem]">
              {search ? "No matches found" : `No ${isBean ? "beans" : "milks"} yet`}
            </p>
            {!search && (
              <button onClick={() => setModal({ item: null })}
                className="text-[#c9a96e]/50 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase font-['Jost',sans-serif] transition-colors">
                + Add first {isBean ? "bean" : "milk"}
              </button>
            )}
          </div>
        ) : (
          filtered.map((item, i) => (
            <Row key={item.id} item={item} type={type} index={i}
              onEdit={(it) => setModal({ item: it })}
              onDelete={handleDelete}
              onToggleBlock={handleToggleBlock}
            />
          ))
        )}
      </div>

      {/* Modals */}
      {modal !== null && (
        <FormModal
          type={type}
          initial={modal.item}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={confirm.action}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
};

// ── Main page ──────────────────────────────────────────────────
export default function BeanMilkManager() {
  const [tab, setTab] = useState("bean"); // "bean" | "milk"

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .bm-in { animation: fadeUp 0.45s ease forwards; }

        /* thin scrollbar */
        .overflow-y-auto::-webkit-scrollbar { width: 2px; }
        .overflow-y-auto::-webkit-scrollbar-track { background: transparent; }
        .overflow-y-auto::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); }
      `}</style>

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] px-6 lg:px-14 py-14">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-[#c9a96e]/[0.025] blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">

          {/* ── Page Header ── */}
          <div className="mb-12 bm-in">
            <p className="text-[#c9a96e] text-[10px] tracking-[0.55em] uppercase mb-3 opacity-65">
              Admin · Inventory
            </p>
            <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2rem,4vw,3rem)] font-light text-[#f5f0e8] leading-none">
              Beans &amp; <span className="italic text-[#c9a96e]">Milk</span>
            </h1>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-[#c9a96e]/40 to-transparent" />
              <p className="text-[#f5f0e8]/20 text-[10px] tracking-[0.3em] uppercase">
                Manage customization options
              </p>
            </div>
          </div>

          {/* ── Mobile tab switcher ── */}
          <div className="flex lg:hidden mb-6 border border-[#c9a96e]/15 bm-in">
            {[
              { key: "bean", label: "Bean Types",   Icon: BeanIcon },
              { key: "milk", label: "Milk Options",  Icon: MilkIcon },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.3em] uppercase transition-all
                  ${tab === key
                    ? "bg-[#c9a96e]/10 text-[#c9a96e] border-b-2 border-[#c9a96e]"
                    : "text-[#f5f0e8]/35 hover:text-[#f5f0e8]/60"
                  }`}
              >
                <Icon /> {label}
              </button>
            ))}
          </div>

          {/* ── Desktop: side by side | Mobile: tabbed ── */}
          <div className="hidden lg:grid grid-cols-2 gap-6 bm-in">
            <Panel type="bean" endpoint="beanTypes" />
            <Panel type="milk" endpoint="milkOptions" />
          </div>

          {/* Mobile: single panel based on tab */}
          <div className="lg:hidden bm-in">
            {tab === "bean"
              ? <Panel type="bean" endpoint="beanTypes" />
              : <Panel type="milk" endpoint="milkOptions" />
            }
          </div>

        </div>
      </div>
    </>
  );
}