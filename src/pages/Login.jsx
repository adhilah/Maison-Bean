// // import React, { useState } from "react";
// // import axios from "axios";
// // import { Link, useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// // import { useAuth } from "../context/AuthContext";

// // function Login() {
// //   const [formData, setFormData] = useState({ email: "", password: "" });
// //   const [errors, setErrors] = useState({});
// //   const [loading, setLoading] = useState(false);

// //   const navigate = useNavigate();
// //   const { login } = useAuth(); // This will handle localStorage automatically

// //   // Simple form validation
// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.email) {
// //       newErrors.email = "Email required";
// //     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
// //       newErrors.email = "Email is not valid";
// //     }

// //     if (!formData.password) {
// //       newErrors.password = "Password required";
// //     } else if (formData.password.length < 6) {
// //       newErrors.password = "Password must be at least 6 characters";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!validateForm()) return;

// //     setLoading(true);

// //     try {
// //       // Fetch users and admin from json-server
// //       const usersRes = await axios.get("http://localhost:3000/users");
// //       const adminRes = await axios.get("http://localhost:3000/admin");

// //       // Find matching account
// //       const userFound = usersRes.data.find((u) => u.email === formData.email);
// //       const adminFound = adminRes.data.email === formData.email ? adminRes.data : null;

// //       const account = userFound || adminFound;

// //       if (!account) {
// //         setErrors({ email: "Email not registered" });
// //         setLoading(false);
// //         return;
// //       }

// //       if (account.password !== formData.password) {
// //         setErrors({ password: "Wrong password" });
// //         setLoading(false);
// //         return;
// //       }

// //       // Save complete user data to localStorage via AuthContext
// //       login({
// //         id: account.id || account.userId || "1",
// //         email: account.email,
// //         role: account.role || "customer", // admin from /admin, customer from /users
// //         firstName: account.firstName || "",
// //         lastName: account.lastName || "",
// //         fullName: `${account.firstName || ""} ${account.lastName || account.email.split("@")[0]}`.trim(),
// //       });

// //       toast.success("Login successful!");

// //       // Redirect based on role (already perfect!)
// //       if (account.role === "admin") {
// //         navigate("/admin/dashboard", { replace: true });
// //       } else {
// //         navigate("/", { replace: true });
// //       }

// //       // Reset form
// //       setFormData({ email: "", password: "" });
// //       setErrors({});
// //     } catch (err) {
// //       toast.error("Login failed. Try again later.");
// //       console.error("Login error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleChange = (field) => (e) => {
// //     setFormData({ ...formData, [field]: e.target.value });
// //     if (errors[field]) {
// //       setErrors({ ...errors, [field]: "" });
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
// //       <div className="w-full max-w-md">
// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-4xl font-bold text-[#7a5c2a] mb-2">Maison Bean</h1>
// //           <p className="text-[#b48a41]">Welcome back! Please login to continue</p>
// //         </div>

// //         {/* Login Form Card */}
// //         <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
// //           <form className="space-y-6" onSubmit={handleSubmit} noValidate>
// //             <div>
// //               <label className="block text-sm font-medium text-amber-900 mb-2">
// //                 Email Address
// //               </label>
// //               <input
// //                 type="email"
// //                 value={formData.email}
// //                 onChange={handleChange("email")}
// //                 className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c7635] transition"
// //                 placeholder="Enter Email"
// //                 disabled={loading}
// //               />
// //               {errors.email && (
// //                 <p className="text-sm text-rose-600 mt-2">{errors.email}</p>
// //               )}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-amber-900 mb-2">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 value={formData.password}
// //                 onChange={handleChange("password")}
// //                 className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c7635] transition"
// //                 placeholder="••••••••"
// //                 disabled={loading}
// //               />
// //               {errors.password && (
// //                 <p className="text-sm text-rose-600 mt-2">{errors.password}</p>
// //               )}
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-[#9c7635] hover:bg-[#7a5c2a] disabled:opacity-70 text-white py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
// //             >
// //               {loading ? "Logging in..." : "Login"}
// //             </button>
// //           </form>

// //           <div className="mt-8 text-center">
// //             <p className="text-gray-700">
// //               Don't have an account?{" "}
// //               <Link
// //                 to="/registration"
// //                 className="text-[#9c7635] font-semibold hover:underline"
// //               >
// //                 Sign up
// //               </Link>
// //             </p>
// //           </div>
// //         </div>

// //         {/* Continue Shopping Link */}
// //         <div className="mt-12 text-center">
// //           <Link
// //             to="/"
// //             className="inline-flex items-center gap-2 text-[#9c7635] hover:underline font-medium text-lg transition"
// //           >
// //             ← Continue Shopping
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

// // ======================================================================================================================

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
//   const { login, logout } = useAuth(); // logout used to clear old session

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = "Email required";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Email is not valid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       // Clear any previous session FIRST
//       logout();

//       // Fetch customer users
//       const usersRes = await axios.get(`${API}/users`);
//       const userFound = usersRes.data.find(
//         (u) => u.email === formData.email
//       );

//       // Fetch admin (single object)
//       const adminRes = await axios.get(`${API}/admin`);
//       const adminFound =
//         adminRes.data?.email === formData.email
//           ? adminRes.data
//           : null;

//       const account = userFound || adminFound;

//       if (!account) {
//         setErrors({ email: "Email not registered" });
//         return;
//       }

//       if (account.password !== formData.password) {
//         setErrors({ password: "Wrong password" });
//         return;
//       }

//       // NORMALIZED USER OBJECT (VERY IMPORTANT)
//       const loggedInUser = {
//         id: String(account.id), // MUST exist & be unique
//         email: account.email,
//         role: account.role || (adminFound ? "admin" : "customer"),
//         firstName: account.firstName || "",
//         lastName: account.lastName || "",
//         fullName:
//           `${account.firstName || ""} ${account.lastName || ""}`.trim() ||
//           account.email.split("@")[0],
//       };

//       if (!loggedInUser.id) {
//         toast.error("Invalid user ID. Please re-register.");
//         return;
//       }

//       // Save to AuthContext (and localStorage)
//       login(loggedInUser);

//       toast.success("Login successful!");

//       if (loggedInUser.role === "admin") {
//         navigate("/admin/dashboard", { replace: true });
//       } else {
//         navigate("/", { replace: true });
//       }

//       setFormData({ email: "", password: "" });
//       setErrors({});
//     } catch (err) {
//       console.error("Login error:", err);
//       toast.error("Login failed. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (field) => (e) => {
//     setFormData({ ...formData, [field]: e.target.value });
//     if (errors[field]) {
//       setErrors({ ...errors, [field]: "" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-[#7a5c2a] mb-2">Maison Bean</h1>
//           <p className="text-[#b48a41]">Welcome back! Please login to continue</p>
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
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const API = "http://localhost:3000";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, clearSession } = useAuth();

  const validateForm = () => {
    const err = {};
    if (!formData.email) err.email = "Email required";
    if (!formData.password) err.password = "Password required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  setErrors({});

  try {
    // Clear old session (safe — doesn't wipe cart)
    if (clearSession) {
      clearSession();
    }

    const [usersRes, adminRes] = await Promise.all([
      axios.get(`${API}/users`),
      axios.get(`${API}/admin`).catch(() => ({ data: null })), // Handle if admin endpoint doesn't exist
    ]);

    const normalizedEmail = formData.email.toLowerCase().trim();
    
    // FIX: Case-insensitive email comparison
    const userFound = usersRes.data.find((u) => 
      u.email.toLowerCase().trim() === normalizedEmail
    );
    
    let adminFound = null;
    if (adminRes.data) {
      if (Array.isArray(adminRes.data)) {
        adminFound = adminRes.data.find(a => 
          a.email && a.email.toLowerCase().trim() === normalizedEmail
        );
      } else if (adminRes.data.email) {
        adminFound = adminRes.data.email.toLowerCase().trim() === normalizedEmail 
          ? adminRes.data 
          : null;
      }
    }

    const account = userFound || adminFound;

    if (!account) {
      setErrors({ email: "Email not registered" });
      toast.error("No account found with this email");
      setLoading(false);
      return;
    }

    // FIX: Trim password for comparison
    if (account.password.trim() !== formData.password.trim()) {
      setErrors({ password: "Incorrect password" });
      toast.error("Incorrect password. Please try again.");
      setLoading(false);
      return;
    }

    // Block check only for customers
    if (userFound && account.userStatus === "blocked") {
      toast.error("This account is blocked!");
      setFormData({ email: "", password: "" });
      setLoading(false);
      return;
    }

    const loggedInUser = {
      id: String(account.id || ""),
      email: account.email,
      role: adminFound ? "admin" : "customer",
      firstName: account.firstName || account.fname || "",
      lastName: account.lastName || account.lname || "",
      fullName:
        `${account.firstName || account.fname || ""} ${account.lastName || account.lname || ""}`.trim() ||
        account.email.split("@")[0],
    };

    if (!loggedInUser.id) {
      console.warn("User ID is missing, generating temporary ID");
      loggedInUser.id = `temp_${Date.now()}`;
    }

    login(loggedInUser);
    toast.success(`Welcome back, ${loggedInUser.fullName}!`);

    if (loggedInUser.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }

    setFormData({ email: "", password: "" });
  } catch (err) {
    console.error("Login error:", err);
    if (err.response) {
      toast.error(`Login failed: ${err.response.status}`);
    } else if (err.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("Login failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#7a5c2a] mb-2">
            Maison Bean
          </h1>
          <p className="text-[#b48a41]">
            Welcome back! Please login to continue
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c7635] transition"
                placeholder="Enter Email"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-rose-600 mt-2">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c7635] transition"
                placeholder="••••••••"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-rose-600 mt-2">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#9c7635] hover:bg-[#7a5c2a] disabled:opacity-70 text-white py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/registration"
                className="text-[#9c7635] font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Continue Shopping Link */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#9c7635] hover:underline font-medium text-lg transition"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
