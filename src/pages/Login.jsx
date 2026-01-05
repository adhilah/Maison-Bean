

// // ==============================admin and user=============================================





// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";

// function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // Simple form validation
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) {
//       newErrors.email = "Email required";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Email is not valid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       // fetch users and admin
//       const usersRes = await axios.get("http://localhost:3000/users");
//       const adminRes = await axios.get("http://localhost:3000/admin");

//       // Find matching account
//       const userFound = usersRes.data.find(
//         (u) => u.email === formData.email
//       );

//       const adminFound =
//         adminRes.data.email === formData.email ? adminRes.data : null;

//       const account = userFound || adminFound;

//       if (!account) {
//         setErrors({ email: "Email not registered" });
//         setLoading(false);
//         return;
//       }

//       if (account.password !== formData.password) {
//         setErrors({ password: "Wrong password" });
//         setLoading(false);
//         return;
//       }

//       // Login with role
//       login({
//         id: account.id,
//         email: account.email,
//         role: account.role || "user",
//       });

//       toast.success("Login successful!");

//       // Redirect based on role
//      if (account.role === "admin") {
//   navigate("/admin/dashboard");
// } else {
//   navigate("/");
// }

//       setFormData({ email: "", password: "" });
//       setErrors({});
//     } catch (err) {
//       toast.error("Login failed. Try again later.");
//       console.error(err);
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
//           <h1 className="text-4xl font-bold text-amber-900 mb-2">Maison Bean</h1>
//           <p className="text-amber-700">Welcome back! Please login to continue</p>
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
//                 placeholder="you@example.com"
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





// ==========================================================================================================================================



import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // This will handle localStorage automatically

  // Simple form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      newErrors.password = "Password required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Fetch users and admin from json-server
      const usersRes = await axios.get("http://localhost:3000/users");
      const adminRes = await axios.get("http://localhost:3000/admin");

      // Find matching account
      const userFound = usersRes.data.find((u) => u.email === formData.email);
      const adminFound = adminRes.data.email === formData.email ? adminRes.data : null;

      const account = userFound || adminFound;

      if (!account) {
        setErrors({ email: "Email not registered" });
        setLoading(false);
        return;
      }

      if (account.password !== formData.password) {
        setErrors({ password: "Wrong password" });
        setLoading(false);
        return;
      }

      // ✅ FIXED: Save COMPLETE user data to localStorage via AuthContext
      login({
        id: account.id || account.userId || "1",
        email: account.email,
        role: account.role || "customer", // admin from /admin, customer from /users
        firstName: account.firstName || "",
        lastName: account.lastName || "",
        fullName: `${account.firstName || ""} ${account.lastName || account.email.split("@")[0]}`.trim(),
      });

      toast.success("Login successful!");

      // Redirect based on role (already perfect!)
      if (account.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      // Reset form
      setFormData({ email: "", password: "" });
      setErrors({});
    } catch (err) {
      toast.error("Login failed. Try again later.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Maison Bean</h1>
          <p className="text-amber-700">Welcome back! Please login to continue</p>
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
                placeholder="admin@gmail.com or customer@gmail.com"
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