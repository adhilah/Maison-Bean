import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

/* ─────────── Icons ─────────── */
const UserIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const EyeIcon = ({ off = false }) => off ? (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
) : (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─────────── Password Field ─────────── */
const PasswordField = ({ label, placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#f5f0e8]/40 text-[10px] tracking-[0.35em] uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-[#0d0a05] border border-[#c9a96e]/18 hover:border-[#c9a96e]/35
            focus:border-[#c9a96e]/55 focus:outline-none
            px-4 py-3 pr-10
            text-[#f5f0e8] text-[13px] placeholder:text-[#f5f0e8]/18
            transition-all duration-200 font-['Jost',sans-serif]"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f5f0e8]/25 hover:text-[#c9a96e]/60 transition-colors"
          tabIndex={-1}
        >
          <EyeIcon off={show} />
        </button>
      </div>
    </div>
  );
};

/* ─────────── Main ─────────── */
const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData]               = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword]         = useState("");
  const [cPassword, setCPassword]             = useState("");
  const [saving, setSaving]                   = useState(false);
  const [saved, setSaved]                     = useState(false);

  useEffect(() => {

  if (!user)
    return;

  api
    .get("/user/me")
    .then((res) => {

      setUserData(
        res.data
      );

    })
    .catch(() => {

      toast.error(
        "Failed to load profile"
      );
    });

}, [user]);

  //=========================
  //change Password
  //==========================

  // const handleChangePassword = async () => {
  //   if (!currentPassword || !newPassword || !cPassword) {
  //     toast.error("Please fill all password fields");
  //     return;
  //   }
  //   if (currentPassword !== userData.password) {
  //     toast.error("Current password is incorrect");
  //     return;
  //   }
  //   if (newPassword !== cPassword) {
  //     toast.error("Passwords do not match");
  //     return;
  //   }
  //   try {
  //     setSaving(true);
  //     await api.patch(`/user/${user.id}`, { password: newPassword });
  //     setSaved(true);
  //     setTimeout(() => setSaved(false), 2500);
  //     toast.success("Password updated");
  //     setCurrentPassword(""); setNewPassword(""); setCPassword("");
  //   } catch {
  //     toast.error("Failed to update password");
  //   } finally {
  //     setSaving(false);
  //   }
  // };


  const handleChangePassword =
  async () => {

    if (
      !currentPassword ||
      !newPassword ||
      !cPassword
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }

    if (
      newPassword !== cPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    try {

      setSaving(true);

      await api.post(
  "/user/change-password",
  {
    currentPassword,
    newPassword,
    confirmPassword:
      cPassword
  }
);

      setSaved(true);

      toast.success(
        "Password updated"
      );

      setCurrentPassword("");
      setNewPassword("");
      setCPassword("");

      setTimeout(() => {
        setSaved(false);
      }, 2500);

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to update password"
      );

    } finally {

      setSaving(false);
    }
  };

  /* ── Loading ── */
  if (!userData) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@100;200;300;400&display=swap');`}</style>
      <div className="min-h-screen bg-[#0d0a05] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border border-[#c9a96e]/30 border-t-[#c9a96e] rounded-full animate-spin mx-auto" />
          <p className="font-['Cormorant_Garamond',serif] italic text-[#f5f0e8]/30 text-lg">
            Loading profile...
          </p>
        </div>
      </div>
    </>
  );

  const initials = `${userData.firstName?.[0] ?? ""}${userData.lastName?.[0] ?? ""}`.toUpperCase();
  const strengthScore = newPassword.length === 0 ? 0
    : newPassword.length < 6 ? 1
    : newPassword.length < 10 ? 2
    : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? 4
    : 3;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#f87171", "#f5a623", "#c9a96e", "#4ade80"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes avatarIn { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }

        .section-card { animation: fadeUp 0.45s ease forwards; }
        .avatar-ring  { animation: avatarIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        input:-webkit-autofill,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0d0a05 inset !important;
          -webkit-text-fill-color: #f5f0e8 !important;
          border-color: rgba(201,169,110,0.35) !important;
        }

        .gold-btn { transition: background 0.22s ease, transform 0.15s ease; }
        .gold-btn:hover  { background: #d4b87a; }
        .gold-btn:active { transform: scale(0.97); }
      `}</style>

      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#110d07", color: "#f5f0e8", border: "1px solid rgba(201,169,110,0.2)", borderRadius: 0, fontSize: "12px", padding: "12px 18px", fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em" },
          success: { iconTheme: { primary: "#c9a96e", secondary: "#0d0a05" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#0d0a05" } },
        }}
      />

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif]">

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.022] blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-[#c9a96e]/[0.015] blur-[110px]" />
        </div>

        <div className="relative z-10">
          <Navbar />

          {/* ══ PAGE HEADER ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pt-14 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div>
                <p className="text-[#c9a96e] text-[10px] font-light tracking-[0.55em] uppercase mb-3 opacity-75">
                  ACCOUNT
                </p>
                <h1 className="font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,5.5vw,4rem)] font-light leading-none tracking-wide text-[#f5f0e8]">
                  My <span className="italic text-[#c9a96e]">Profile</span>
                </h1>
              </div>
              <Link
                to="/"
                className="text-[#c9a96e]/60 hover:text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 transition-all group self-end md:self-auto"
              >
                CONTINUE SHOPPING
                <span className="group-hover:w-10 transition-all duration-300 w-6 h-px bg-current inline-block" />
              </Link>
            </div>
            {/* Rule */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/45 via-[#c9a96e]/12 to-transparent" />
              <div className="w-[5px] h-[5px] rotate-45 bg-[#c9a96e]/35 flex-shrink-0" />
            </div>
          </div>

          {/* ══ MAIN CONTENT ══ */}
          <div className="max-w-screen-xl mx-auto px-6 lg:px-14 pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-px bg-[#c9a96e]/10">

              {/* ── LEFT: Avatar + Info ── */}
              <div className="bg-[#0d0a05] section-card" style={{ animationDelay: "0ms" }}>
                <div className="bg-[#110d07] border border-[#c9a96e]/10 p-8 flex flex-col items-center gap-5 text-center">
                  <div className="avatar-ring relative">
                    <div className="w-28 h-28 rounded-full border border-[#c9a96e]/25 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border border-[#c9a96e]/15 bg-[#1a1510] flex items-center justify-center">
                        {initials ? (
                          <span className="font-['Cormorant_Garamond',serif] text-[2rem] font-light italic text-[#c9a96e]">
                            {initials}
                          </span>
                        ) : (
                          <span className="text-[#c9a96e]/30"><UserIcon /></span>
                        )}
                      </div>
                    </div>
                    <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#4ade80] rounded-full border-2 border-[#0d0a05]" />
                  </div>

                  <div>
                    <p className="font-['Cormorant_Garamond',serif] text-[1.5rem] font-light text-[#f5f0e8]">
                      {userData.firstName} {userData.lastName}
                    </p>
                    <p className="text-[#f5f0e8]/35 text-[11px] tracking-widest mt-1">{userData.email}</p>
                  </div>

                  {/* Quick links */}
                  <div className="w-full pt-4 border-t border-[#c9a96e]/10 space-y-1">
                    {[
                      { label: "My Orders",   to: "/orders"   },
                      { label: "My Wishlist", to: "/wishlist" },
                    ].map(({ label, to }) => (
                      <Link
                        key={to}
                        to={to}
                        className="flex items-center justify-between px-3 py-2.5 text-[#f5f0e8]/40 hover:text-[#c9a96e] hover:bg-[#c9a96e]/05 text-[10px] tracking-[0.3em] uppercase transition-all group"
                      >
                        {label}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Info Cards + Password ── */}
              <div className="bg-[#0d0a05]">

                {/* Info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#c9a96e]/10 section-card" style={{ animationDelay: "80ms" }}>
                  {[
                    { label: "First Name", value: userData.firstName },
                    { label: "Last Name",  value: userData.lastName  },
                    { label: "Email",      value: userData.email     },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#110d07] border border-[#c9a96e]/10 p-6 group hover:border-[#c9a96e]/25 transition-all duration-300">
                      <p className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase opacity-60 mb-2">
                        {label}
                      </p>
                      <p className="font-['Cormorant_Garamond',serif] text-[1.2rem] font-light text-[#f5f0e8] group-hover:text-[#c9a96e] transition-colors duration-300 truncate">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ── Change Password ── */}
                <div
                  className="bg-[#110d07] border border-[#c9a96e]/10 m-0 p-8 section-card"
                  style={{ animationDelay: "160ms" }}
                >
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-[#c9a96e]/50"><LockIcon size={14} /></span>
                    <div>
                      <p className="text-[#c9a96e] text-[9px] tracking-[0.4em] uppercase opacity-60 mb-0.5">
                        SECURITY
                      </p>
                      <h3 className="font-['Cormorant_Garamond',serif] text-[1.5rem] font-light text-[#f5f0e8]">
                        Change <span className="italic text-[#c9a96e]">Password</span>
                      </h3>
                    </div>
                  </div>

                  <div className="max-w-lg space-y-5">

                    <PasswordField
                      label="Current Password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    {/* ── Forgot password link ── */}
                    <div className="flex justify-end -mt-2">
                      <Link
                        to="/forgot-password"
                        className="text-[#c9a96e]/45 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="h-px bg-gradient-to-r from-[#c9a96e]/15 to-transparent" />

                    <PasswordField
                      label="New Password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    {/* Strength meter */}
                    {newPassword.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="h-[3px] flex-1 transition-all duration-400"
                              style={{
                                background: i <= strengthScore ? strengthColor[strengthScore] : "rgba(245,240,232,0.08)",
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: strengthColor[strengthScore] }}>
                          {strengthLabel[strengthScore]}
                        </p>
                      </div>
                    )}

                    <PasswordField
                      label="Confirm New Password"
                      placeholder="Confirm new password"
                      value={cPassword}
                      onChange={(e) => setCPassword(e.target.value)}
                    />

                    {/* Match indicator */}
                    {cPassword.length > 0 && (
                      <p className={`text-[10px] tracking-[0.25em] uppercase flex items-center gap-1.5 transition-colors
                        ${cPassword === newPassword ? "text-[#4ade80]" : "text-[#f87171]/70"}`}>
                        {cPassword === newPassword ? <><CheckIcon /> Passwords match</> : "Passwords do not match"}
                      </p>
                    )}

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        onClick={handleChangePassword}
                        disabled={saving}
                        className={`gold-btn flex items-center justify-center gap-2.5
                          w-full sm:w-auto px-10 py-3.5
                          text-[0.62rem] tracking-[0.38em] uppercase
                          transition-all duration-200 disabled:opacity-50
                          ${saved
                            ? "bg-[#4ade80]/20 border border-[#4ade80]/40 text-[#4ade80]"
                            : "bg-[#c9a96e] text-[#0d0a05]"
                          }`}
                        style={{ fontFamily: "'Jost',sans-serif" }}
                      >
                        {saving ? (
                          <div className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
                        ) : saved ? (
                          <><CheckIcon /> Updated</>
                        ) : (
                          <><LockIcon size={11} /> Update Password</>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;