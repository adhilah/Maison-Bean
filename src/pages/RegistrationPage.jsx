import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  // ------------------ VALIDATION ------------------
  const validateForm = () => {
    let isValid = true;
    const validationErrors = {};

    if (!formData.fname.trim()) {
      isValid = false;
      validationErrors.fname = "First name required";
    }

    if (!formData.lname.trim()) {
      isValid = false;
      validationErrors.lname = "Last name required";
    }

    if (!formData.email.trim()) {
      isValid = false;
      validationErrors.email = "Email required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      isValid = false;
      validationErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      isValid = false;
      validationErrors.password = "Password required";
    } else if (formData.password.length < 6) {
      isValid = false;
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.cpassword) {
      isValid = false;
      validationErrors.cpassword = "Confirm password required";
    } else if (formData.password !== formData.cpassword) {
      isValid = false;
      validationErrors.cpassword = "Passwords do not match";
    }

    setErrors(validationErrors);
    return isValid;
  };

  // Check if email already exists
  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data || [];
      return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  // ------------------ SUBMIT ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setErrors({ email: "Email already registered" });
        toast.error("Email already exists. Please use a different email.");
        setLoading(false);
        return;
      }

      // Generate a simple ID (like json-server does)
      const userId = Math.random().toString(36).substring(2, 10);
      
      const userData = {
        id: userId,
        firstName: formData.fname.trim(),
        lastName: formData.lname.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: "customer",
        userStatus: "active",
        cart: [],
        wishlist: []
      };

      const response = await axios.post(
        "http://localhost:3000/users",
        userData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success(`Registered Successfully! Welcome ${formData.fname}`);
        console.log("User added:", response.data);

        setFormData({
          fname: "",
          lname: "",
          email: "",
          password: "",
          cpassword: "",
        });

        // Navigate to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      if (err.response) {
        toast.error(`Registration failed: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        toast.error("Registration failed: No response from server");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Rest of your JSX remains the same...
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#7a5c2a] mb-2">
            Maison Bean
          </h1>
          <p className="text-[#aa8950]">Join our coffee community</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-amber-200">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg bg-amber-50 ${
                    errors.fname ? "border-red-500" : "border-amber-300"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  value={formData.fname}
                  onChange={(e) =>
                    setFormData({ ...formData, fname: e.target.value })
                  }
                  disabled={loading}
                />
                {errors.fname && (
                  <p className="text-sm text-red-600 mt-1">{errors.fname}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg bg-amber-50 ${
                    errors.lname ? "border-red-500" : "border-amber-300"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  value={formData.lname}
                  onChange={(e) =>
                    setFormData({ ...formData, lname: e.target.value })
                  }
                  disabled={loading}
                />
                {errors.lname && (
                  <p className="text-sm text-red-600 mt-1">{errors.lname}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#7a5c2a] mb-2">
                Email
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 border rounded-lg bg-amber-50 ${
                  errors.email ? "border-red-500" : "border-amber-300"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#7a5c2a] mb-2">
                Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 border rounded-lg bg-amber-50 ${
                  errors.password ? "border-red-500" : "border-amber-300"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-3 border rounded-lg bg-amber-50 ${
                  errors.cpassword ? "border-red-500" : "border-amber-300"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                value={formData.cpassword}
                onChange={(e) =>
                  setFormData({ ...formData, cpassword: e.target.value })
                }
                disabled={loading}
              />
              {errors.cpassword && (
                <p className="text-sm text-red-600 mt-1">{errors.cpassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#af8741] hover:bg-[#7a5c2a] disabled:opacity-70 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#7a5c2a]">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#7a5c2a] font-medium border-b border-[#7a5c2a] hover:underline"
              >
                LogIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;