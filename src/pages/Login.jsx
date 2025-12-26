// import React from "react";
// import axios from "axios";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [valid, setValid] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let isvalid = true;
//     let validationErrors = {};

//     // Email validation
//     if (formData.email === "" || formData.email === null) {
//       isvalid = false;
//       validationErrors.email = "Email required";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       isvalid = false;
//       validationErrors.email = "Email is not valid";
//     }

//     // Password validation
//     if (formData.password === "" || formData.password === null) {
//       isvalid = false;
//       validationErrors.password = "Password required";
//     } else if (formData.password.length < 6) {
//       isvalid = false;
//       validationErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(validationErrors);
//     setValid(isvalid);

//     // Only proceed with API call if form is valid
//     if (isvalid) {
//       axios
//         .get("http://localhost:3000/users")
//         .then((result) => {
//           const users = result.data;
//           const user = users.find((u) => u.email === formData.email);

//           if (user) {
//             if (user.password === formData.password) {
//               // Login successful → Save user data to localStorage
//               localStorage.setItem("user", JSON.stringify({
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//               }));

//               alert("Login successful!");
//               navigate("/");

//               // Reset form
//               setFormData({ email: "", password: "" });
//               setErrors({});
//             } else {
//               setErrors({ password: "Wrong password" });
//             }
//           } else {
//             setErrors({ email: "Email not registered" });
//           }
//         })
//         .catch((err) => {
//           console.error("Login failed:", err);
//           alert("Login failed. Please try again later.");
//         });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-amber-900 mb-2">
//             Maison Bean
//           </h1>
//           <p className="text-amber-700">Join our coffee community</p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-amber-200">
//           <form className="space-y-5" onSubmit={handleSubmit} noValidate>
//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-amber-900 mb-2"
//               >
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg
//                     className="h-5 w-5 text-amber-600"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//                 <input
//                   id="email"
//                   type="email"
//                   className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-amber-50"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   required
//                 />
//                 {errors.email && (
//                   <p className="mt-2 text-sm text-rose-600 font-medium">
//                     {errors.email}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-amber-900 mb-2"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg
//                     className="h-5 w-5 text-amber-600"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                     />
//                   </svg>
//                 </div>
//                 <input
//                   id="password"
//                   type="password"
//                   className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-amber-50"
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   required
//                 />
//                 {errors.password && (
//                   <p className="mt-2 text-sm text-rose-600 font-medium">
//                     {errors.password}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 transition shadow-md hover:shadow-lg"
//             >
//               <div className="flex items-center justify-center">
//                 <svg
//                   className="h-5 w-5 mr-2"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
//                 </svg>
//                 Login
//               </div>
//             </button>
//           </form>

//           {/* Sign Up Link */}
//           <div className="mt-6 text-center">
//             <p className="text-amber-700">
//               Don't have an account?{" "}
//               <Link
//                 to="/registration"
//                 className="text-amber-800 hover:text-amber-900 font-medium border-b border-amber-800 hover:border-amber-900"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-6 text-center">
//           <p className="text-amber-600 text-sm">
//             Brew your perfect coffee experience with us
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;





import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ===============================
  // Helper functions (db.json safe)
  // ===============================

  const loadUserCart = async (userId) => {
    const res = await axios.get(
      `http://localhost:3000/cart?userId=${userId}`
    );
    return res.data || [];
  };

  const loadUserWishlist = async (userId) => {
    const res = await axios.get(
      `http://localhost:3000/wishlist?userId=${userId}`
    );
    return res.data || [];
  };

  const mergeGuestCart = async (userId) => {
    const guestCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (guestCart.length > 0) {
      for (let item of guestCart) {
        await axios.post("http://localhost:3000/cart", {
          ...item,
          userId,
        });
      }
      localStorage.removeItem("cart");
    }

    const res = await axios.get(
      `http://localhost:3000/cart?userId=${userId}`
    );

    return res.data || [];
  };

  // ===============================
  // Login Submit
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "Email required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      validationErrors.password = "Password required";
    } else if (formData.password.length < 6) {
      validationErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await axios.get("http://localhost:3000/users");
      const user = res.data.find(
        (u) => u.email === formData.email
      );

      if (!user) {
        setErrors({ email: "Email not registered" });
        return;
      }

      if (user.password !== formData.password) {
        setErrors({ password: "Wrong password" });
        return;
      }

      // ===============================
      // LOGIN SUCCESS
      // ===============================

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );

      const finalCart = await mergeGuestCart(user.id);
      const userWishlist = await loadUserWishlist(user.id);

      localStorage.setItem("cart", JSON.stringify(finalCart));
      localStorage.setItem(
        "wishlist",
        JSON.stringify(userWishlist)
      );

      alert("Login successful!");
      navigate("/");

      setFormData({ email: "", password: "" });
      setErrors({});
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Try again later.");
    }
  };

  // ===============================
  // UI (UNCHANGED)
  // ===============================

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            Maison Bean
          </h1>
          <p className="text-amber-700">
            Join our coffee community
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-200">
          <form
            className="space-y-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-lg"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
              {errors.email && (
                <p className="text-sm text-rose-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border rounded-lg"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
              {errors.password && (
                <p className="text-sm text-rose-600">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-800 text-white py-3 rounded-lg"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p>
              Don't have an account?{" "}
              <Link
                to="/registration"
                className="text-amber-800 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
