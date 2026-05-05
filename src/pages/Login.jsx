
// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";

// const API = "http://localhost:3000";

// function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { login, clearSession } = useAuth();

//   const validateForm = () => {
//     const err = {};
//     if (!formData.email) err.email = "Email required";
//     if (!formData.password) err.password = "Password required";
//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const handleChange = (field) => (e) => {
//     setFormData({ ...formData, [field]: e.target.value });
//     if (errors[field]) {
//       setErrors({ ...errors, [field]: "" });
//     }
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!validateForm()) return;

//   setLoading(true);
//   setErrors({});

//   try {
//     // Clear old session (safe — doesn't wipe cart)
//     if (clearSession) {
//       clearSession();
//     }

//     const [usersRes, adminRes] = await Promise.all([
//       axios.get(`${API}/users`),
//       axios.get(`${API}/admin`).catch(() => ({ data: null })), // Handle if admin endpoint doesn't exist
//     ]);

//     const normalizedEmail = formData.email.toLowerCase().trim();
    
//     // FIX: Case-insensitive email comparison
//     const userFound = usersRes.data.find((u) => 
//       u.email.toLowerCase().trim() === normalizedEmail
//     );
    
//     let adminFound = null;
//     if (adminRes.data) {
//       if (Array.isArray(adminRes.data)) {
//         adminFound = adminRes.data.find(a => 
//           a.email && a.email.toLowerCase().trim() === normalizedEmail
//         );
//       } else if (adminRes.data.email) {
//         adminFound = adminRes.data.email.toLowerCase().trim() === normalizedEmail 
//           ? adminRes.data 
//           : null;
//       }
//     }

//     const account = userFound || adminFound;

//     if (!account) {
//       setErrors({ email: "Email not registered" });
//       toast.error("No account found with this email");
//       setLoading(false);
//       return;
//     }

//     // FIX: Trim password for comparison
//     if (account.password.trim() !== formData.password.trim()) {
//       setErrors({ password: "Incorrect password" });
//       toast.error("Incorrect password. Please try again.");
//       setLoading(false);
//       return;
//     }

//     // Block check only for customers
//     if (userFound && account.userStatus === "blocked") {
//       toast.error("This account is blocked!");
//       setFormData({ email: "", password: "" });
//       setLoading(false);
//       return;
//     }

//     const loggedInUser = {
//       id: String(account.id || ""),
//       email: account.email,
//       role: adminFound ? "admin" : "customer",
//       firstName: account.firstName || account.fname || "",
//       lastName: account.lastName || account.lname || "",
//       fullName:
//         `${account.firstName || account.fname || ""} ${account.lastName || account.lname || ""}`.trim() ||
//         account.email.split("@")[0],
//     };

//     if (!loggedInUser.id) {
//       console.warn("User ID is missing, generating temporary ID");
//       loggedInUser.id = `temp_${Date.now()}`;
//     }

//     login(loggedInUser);
//     toast.success(`Welcome back, ${loggedInUser.fullName}!`);

//     if (loggedInUser.role === "admin") {
//       navigate("/admin/dashboard", { replace: true });
//     } else {
//       navigate("/", { replace: true });
//     }

//     setFormData({ email: "", password: "" });
//   } catch (err) {
//     console.error("Login error:", err);
//     if (err.response) {
//       toast.error(`Login failed: ${err.response.status}`);
//     } else if (err.request) {
//       toast.error("Network error. Please check your connection.");
//     } else {
//       toast.error("Login failed. Please try again.");
//     }
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-[#7a5c2a] mb-2">
//             Maison Bean
//           </h1>
//           <p className="text-[#b48a41]">
//             Welcome back! Please login to continue
//           </p>
//         </div>

//         {/* Login Form Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
//           <form className="space-y-6" onSubmit={handleSubmit} noValidate>
//             <div>
//               <label className="block text-sm font-medium text-amber-900 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange("email")}
//                 className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c7635] transition"
//                 placeholder="Enter Email"
//                 disabled={loading}
//               />
//               {errors.email && (
//                 <p className="text-sm text-rose-600 mt-2">{errors.email}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-amber-900 mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange("password")}
//                 className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c7635] transition"
//                 placeholder="••••••••"
//                 disabled={loading}
//               />
//               {errors.password && (
//                 <p className="text-sm text-rose-600 mt-2">{errors.password}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#9c7635] hover:bg-[#7a5c2a] disabled:opacity-70 text-white py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <div className="mt-8 text-center">
//             <p className="text-gray-700">
//               Don't have an account?{" "}
//               <Link
//                 to="/registration"
//                 className="text-[#9c7635] font-semibold hover:underline"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Continue Shopping Link */}
//         <div className="mt-12 text-center">
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 text-[#9c7635] hover:underline font-medium text-lg transition"
//           >
//             ← Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const API = "http://localhost:3000";

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

/* ─────────── Input Field ─────────── */
const Field = ({ label, type = "text", placeholder, value, onChange, error, icon, rightSlot }) => (
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
        className={`w-full bg-[#0d0a05] pl-10 pr-10 py-3.5
          border ${error ? "border-[#f87171]/50" : "border-[#c9a96e]/18"}
          hover:border-[#c9a96e]/35 focus:border-[#c9a96e]/55 focus:outline-none
          text-[#f5f0e8] text-[13px] placeholder:text-[#f5f0e8]/18
          transition-all duration-200 font-['Jost',sans-serif]`}
      />
      {rightSlot && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightSlot}
        </span>
      )}
    </div>
    {error && (
      <p className="text-[#f87171]/80 text-[10px] tracking-[0.2em]">{error}</p>
    )}
  </div>
);

/* ─────────── Main ─────────── */
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);

  const navigate = useNavigate();
  const { login, clearSession } = useAuth();

  const validateForm = () => {
    const err = {};
    if (!formData.email)    err.email    = "Email is required";
    if (!formData.password) err.password = "Password is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});

    try {
      if (clearSession) clearSession();

      const [usersRes, adminRes] = await Promise.all([
        axios.get(`${API}/users`),
        axios.get(`${API}/admin`).catch(() => ({ data: null })),
      ]);

      const normalizedEmail = formData.email.toLowerCase().trim();
      const userFound = usersRes.data.find(
        (u) => u.email.toLowerCase().trim() === normalizedEmail
      );

      let adminFound = null;
      if (adminRes.data) {
        if (Array.isArray(adminRes.data)) {
          adminFound = adminRes.data.find(
            (a) => a.email && a.email.toLowerCase().trim() === normalizedEmail
          );
        } else if (adminRes.data.email) {
          adminFound =
            adminRes.data.email.toLowerCase().trim() === normalizedEmail
              ? adminRes.data
              : null;
        }
      }

      const account = userFound || adminFound;

      if (!account) {
        setErrors({ email: "No account found with this email" });
        toast.error("No account found");
        return;
      }
      if (account.password.trim() !== formData.password.trim()) {
        setErrors({ password: "Incorrect password" });
        toast.error("Incorrect password");
        return;
      }
      if (userFound && account.userStatus === "blocked") {
        toast.error("This account has been blocked");
        setFormData({ email: "", password: "" });
        return;
      }

      const loggedInUser = {
        id: String(account.id || `temp_${Date.now()}`),
        email: account.email,
        role: adminFound ? "admin" : "customer",
        firstName: account.firstName || account.fname || "",
        lastName: account.lastName || account.lname || "",
        fullName:
          `${account.firstName || account.fname || ""} ${account.lastName || account.lname || ""}`.trim() ||
          account.email.split("@")[0],
      };

      login(loggedInUser);
      toast.success(`Welcome back, ${loggedInUser.fullName}`);
      navigate(loggedInUser.role === "admin" ? "/admin/dashboard" : "/", { replace: true });
      setFormData({ email: "", password: "" });
    } catch (err) {
      if (err.request) toast.error("Network error. Check your connection.");
      else toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Background atmosphere */}
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

        {/* Card */}
        <div className="relative z-10 w-full max-w-[420px]">

          {/* Brand */}
          <div className="brand-in text-center mb-10">
            <p className="text-[#c9a96e] text-[10px] tracking-[0.6em] uppercase opacity-70 mb-3">
              WELCOME BACK
            </p>
            <h1 className="font-['Cormorant_Garamond',serif] text-[2.8rem] font-light leading-none text-[#f5f0e8] tracking-wide">
              Maison<span className="italic text-[#c9a96e]"> Bean</span>
            </h1>
            <p className="text-[#f5f0e8]/30 text-[11px] tracking-[0.25em] mt-3">
              Sign in to your account
            </p>
          </div>

          {/* Form panel */}
          <div className="form-panel bg-[#110d07] border border-[#c9a96e]/18 relative overflow-hidden">
            <div className="h-px bg-gradient-to-r from-transparent via-[#c9a96e]/60 to-transparent" />

            <div className="p-8 space-y-6">

              {/* Email */}
              <Field
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange("email")}
                error={errors.email}
                icon={<MailIcon />}
              />

              {/* Password */}
              <Field
                label="Password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange("password")}
                error={errors.password}
                icon={<LockIcon />}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="text-[#f5f0e8]/25 hover:text-[#c9a96e]/60 transition-colors p-1"
                    tabIndex={-1}
                  >
                    <EyeIcon off={showPw} />
                  </button>
                }
              />

              {/* ── Forgot password link ── */}
              <div className="flex justify-end -mt-3">
                <Link
                  to="/forgot-password"
                  className="text-[#c9a96e]/45 hover:text-[#c9a96e] text-[10px] tracking-[0.3em] uppercase transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-[#c9a96e]/15 via-[#c9a96e]/08 to-transparent" />

              {/* Submit */}
              <button
                type="submit"
                onClick={handleSubmit}
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
                  {loading ? "Signing in..." : "Sign In"}
                </span>
                {!loading && <ArrowRight />}
              </button>

              {/* Sign up link */}
              <p className="text-center text-[#f5f0e8]/30 text-[11px] tracking-[0.15em]">
                Don't have an account?{" "}
                <Link
                  to="/registration"
                  className="text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors underline underline-offset-4"
                >
                  Create one
                </Link>
              </p>
            </div>

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
}

export default Login;