import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// const API = "https`://localhost:7257";

/* ─────────── Icons ─────────── */
const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const EyeIcon = ({ off }) => off ? (
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

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─────────── Field ─────────── */
const Field = ({ label, type = "text", placeholder, value, onChange, icon, rightSlot }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[#f5f0e8]/40 text-[10px] tracking-[0.38em] uppercase">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a96e]/35 pointer-events-none">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#0d0a05] pl-10 pr-10 py-3.5
          border border-[#c9a96e]/18
          hover:border-[#c9a96e]/35 focus:border-[#c9a96e]/55 focus:outline-none
          text-[#f5f0e8] text-[13px] placeholder:text-[#f5f0e8]/18
          transition-all duration-200 font-['Jost',sans-serif]"
      />
      {rightSlot && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightSlot}
        </span>
      )}
    </div>
  </div>
);

/* ─────────── Main ─────────── */
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email,       setEmail]       = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cPassword,   setCPassword]   = useState("");
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);

  const handleReset =
  async () => {

    if (
      !email ||
      !newPassword ||
      !cPassword
    ) {

      return toast.error(
        "Please fill all fields"
      );
    }

    if (
      newPassword !== cPassword
    ) {

      return toast.error(
        "Passwords do not match"
      );
    }

    try {

      setLoading(true);

      await api.post(
        "/user/forgot-password",
        {
          email,
          newPassword,
          confirmPassword:
            cPassword
        }
      );

      toast.success(
        "Password updated successfully"
      );

      setTimeout(() => {

        navigate("/login");

      }, 1800);

    } catch (err) {

      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  const strengthScore = newPassword.length === 0 ? 0
    : newPassword.length < 6 ? 1
    : newPassword.length < 10 ? 2
    : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? 4 : 3;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#f87171", "#f5a623", "#c9a96e", "#4ade80"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@100;200;300;400;500&display=swap');

        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes panIn  { from{opacity:0;transform:scale(0.97) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .form-panel { animation: panIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards; }
        .brand-in   { animation: fadeUp 0.5s ease 0.1s both; }
        .float-gem  { animation: float 5s ease-in-out infinite; }

        input:-webkit-autofill,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0d0a05 inset !important;
          -webkit-text-fill-color: #f5f0e8 !important;
          border-color: rgba(201,169,110,0.4) !important;
        }

        .gold-btn { transition: background 0.22s ease, transform 0.15s ease; }
        .gold-btn:hover:not(:disabled)  { background: #d4b87a; }
        .gold-btn:active:not(:disabled) { transform: scale(0.98); }
      `}</style>

      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#110d07", color: "#f5f0e8", border: "1px solid rgba(201,169,110,0.2)", borderRadius: 0, fontSize: "12px", padding: "12px 18px", fontFamily: "'Jost',sans-serif", letterSpacing: "0.05em" },
          success: { iconTheme: { primary: "#c9a96e", secondary: "#0d0a05" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#0d0a05" } },
        }}
      />

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] flex items-center justify-center p-4 relative overflow-hidden">

        {/* ── Background atmosphere ── */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#c9a96e]/[0.025] blur-[140px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#c9a96e]/[0.018] blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)",
              backgroundSize: "80px 80px"
            }}
          />
          <div className="float-gem absolute top-[18%] left-[12%] w-2 h-2 bg-[#c9a96e]/20 rotate-45" />
          <div className="float-gem absolute top-[65%] right-[14%] w-1.5 h-1.5 bg-[#c9a96e]/15 rotate-45" style={{ animationDelay: "1.5s" }} />
          <div className="float-gem absolute bottom-[25%] left-[20%] w-1 h-1 bg-[#c9a96e]/10 rotate-45" style={{ animationDelay: "3s" }} />
        </div>

        {/* ── Card ── */}
        <div className="relative z-10 w-full max-w-[420px]">

          {/* Brand */}
          <div className="brand-in text-center mb-10">
            <p className="text-[#c9a96e] text-[10px] tracking-[0.6em] uppercase opacity-70 mb-3">
              ACCOUNT RECOVERY
            </p>
            <h1 className="font-['Cormorant_Garamond',serif] text-[2.8rem] font-light leading-none text-[#f5f0e8] tracking-wide">
              Maison<span className="italic text-[#c9a96e]"> Bean</span>
            </h1>
            <p className="text-[#f5f0e8]/30 text-[11px] tracking-[0.25em] mt-3">
              Reset your password
            </p>
          </div>

          {/* Form panel */}
          <div className="form-panel bg-[#110d07] border border-[#c9a96e]/18 relative overflow-hidden">

            {/* Top gold accent */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/60 to-transparent" />

            <div className="p-8 space-y-6">

              {/* Email */}
              <Field
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<MailIcon />}
              />

              <div className="h-px bg-gradient-to-r from-[#c9a96e]/15 via-[#c9a96e]/08 to-transparent" />

              {/* New Password */}
              <Field
                label="New Password"
                type={showNew ? "text" : "password"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon={<LockIcon />}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowNew(s => !s)}
                    className="text-[#f5f0e8]/25 hover:text-[#c9a96e]/60 transition-colors p-1"
                    tabIndex={-1}
                  >
                    <EyeIcon off={showNew} />
                  </button>
                }
              />

              {/* Strength meter */}
              {newPassword.length > 0 && (
                <div className="space-y-1.5 -mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-[3px] flex-1 transition-all duration-300"
                        style={{ background: i <= strengthScore ? strengthColor[strengthScore] : "rgba(245,240,232,0.08)" }}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: strengthColor[strengthScore] }}>
                    {strengthLabel[strengthScore]}
                  </p>
                </div>
              )}

              {/* Confirm Password */}
              <Field
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                icon={<LockIcon />}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="text-[#f5f0e8]/25 hover:text-[#c9a96e]/60 transition-colors p-1"
                    tabIndex={-1}
                  >
                    <EyeIcon off={showConfirm} />
                  </button>
                }
              />

              {/* Match indicator */}
              {cPassword.length > 0 && (
                <p className={`-mt-2 text-[10px] tracking-[0.25em] uppercase flex items-center gap-1.5 transition-colors
                  ${cPassword === newPassword ? "text-[#4ade80]" : "text-[#f87171]/70"}`}>
                  {cPassword === newPassword ? <><CheckIcon /> Passwords match</> : "Passwords do not match"}
                </p>
              )}

              <div className="h-px bg-gradient-to-r from-[#c9a96e]/15 via-[#c9a96e]/08 to-transparent" />

              {/* Submit */}
              <button
                onClick={handleReset}
                disabled={loading}
                className="gold-btn w-full flex items-center justify-between
                  px-7 py-4 bg-[#c9a96e] text-[#0d0a05]
                  text-[0.62rem] tracking-[0.4em] uppercase
                  disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Jost',sans-serif" }}
              >
                <span className="flex items-center gap-2.5">
                  {loading ? (
                    <div className="w-3.5 h-3.5 border border-[#0d0a05]/40 border-t-[#0d0a05] rounded-full animate-spin" />
                  ) : (
                    <LockIcon />
                  )}
                  {loading ? "Updating..." : "Update Password"}
                </span>
                {!loading && <ArrowRight />}
              </button>

              {/* Back to login */}
              <p className="text-center text-[#f5f0e8]/30 text-[11px] tracking-[0.15em]">
                Remembered your password?{" "}
                <Link
                  to="/login"
                  className="text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors underline underline-offset-4"
                >
                  Sign in
                </Link>
              </p>

            </div>

            {/* Bottom gold accent */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />
          </div>

          {/* Continue shopping */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="text-[#c9a96e]/45 hover:text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 transition-all group"
            >
              <span className="group-hover:w-8 transition-all duration-300 w-5 h-px bg-current inline-block" />
              Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default ForgotPassword;