import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const MailIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const EyeIcon = ({ off }) =>
  off ? (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

const ArrowRight = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Field = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
  rightSlot,
}) => (
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
          border ${
            error ? "border-[#f87171]/50" : "border-[#c9a96e]/18"
          }
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
      <p className="text-[#f87171]/80 text-[10px] tracking-[0.2em]">
        {error}
      </p>
    )}
  </div>
);

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const validateForm = () => {
    const err = {};

    if (!formData.email) {
      err.email = "Email is required";
    }

    if (!formData.password) {
      err.password = "Password is required";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);

  try {

    const payload = {
      email: formData.email.trim(),
      password: formData.password,
    };

    const response = await api.post(
      "/auth/login",
      payload
    );

    const data = response.data;

    console.log(data);

    if (data.success) {

      const userData = {
        id: data.user.id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        role: data.user.role,
      };

      // SAVE ONLY USER
      localStorage.setItem(
        "authUser",
        JSON.stringify(userData)
      );

      // CONTEXT LOGIN
      login(userData);

      

      setTimeout(() => {

        if (
          data.user.role === "ADMIN"
        ) {

          navigate(
            "/admin/dashboard"
          );

        } else {

          navigate("/");
        }

      }, 2200);
      
    }

    // toast.success("Login successful");

  } catch (err) {

    console.log(
      err.response?.data
    );

    toast.error(
      err.response?.data?.message ||
      "Invalid email or password"
    );

  } finally {

    setLoading(false);
  }
};

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-[#0d0a05] font-['Jost',sans-serif] flex items-center justify-center p-4">

        <div className="w-full max-w-[420px]">

          <div className="text-center mb-10">

            <p className="text-[#c9a96e] text-[10px] tracking-[0.6em] uppercase opacity-70 mb-3">
              WELCOME BACK
            </p>

            <h1 className="font-['Cormorant_Garamond',serif] text-[2.8rem] font-light leading-none text-[#f5f0e8] tracking-wide">
              Maison
              <span className="italic text-[#c9a96e]">
                {" "}Bean
              </span>
            </h1>

          </div>

          <div className="bg-[#110d07] border border-[#c9a96e]/18 p-8 space-y-6">

            <Field
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange("email")}
              error={errors.email}
              icon={<MailIcon />}
            />

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
                  onClick={() =>
                    setShowPw((s) => !s)
                  }
                  className="text-[#f5f0e8]/25"
                >
                  <EyeIcon off={showPw} />
                </button>
              }
            />

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-between
                px-7 py-4 bg-[#c9a96e] text-[#0d0a05]
                text-[0.62rem] tracking-[0.4em] uppercase"
            >

              <span className="flex items-center gap-2.5">

                {loading
                  ? "Signing in..."
                  : "Sign In"}

              </span>

              {!loading && <ArrowRight />}

            </button>
                  <div className="flex justify-end -mt-2">
  <Link
    to="/forgot-password"
    className="text-[10px] tracking-[0.18em] uppercase text-[#c9a96e]/55 hover:text-[#c9a96e] transition-colors duration-200"
  >
    Forgot Password?
  </Link>
</div>
            <p className="text-center text-[#f5f0e8]/30 text-[11px] tracking-[0.15em]">
              Don't have an account?{" "}

              <Link
                to="/registration"
                className="text-[#c9a96e]/70"
              >
                Create one
              </Link>

            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default Login;