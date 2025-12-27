import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!formData.email) validationErrors.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) validationErrors.email = "Email is not valid";
    if (!formData.password) validationErrors.password = "Password required";
    else if (formData.password.length < 6) validationErrors.password = "Password must be at least 6 characters";
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await axios.get("http://localhost:3000/users");
      const userFound = res.data.find(u => u.email === formData.email);
      if (!userFound) { setErrors({ email: "Email not registered" }); return; }
      if (userFound.password !== formData.password) { setErrors({ password: "Wrong password" }); return; }

      login({ id: userFound.id, email: userFound.email });
      toast.success("Login successful!");
      navigate("/");
      setFormData({ email: "", password: "" });
      setErrors({});
    } catch (err) {
      toast.error("Login failed. Try again later.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Maison Bean</h1>
          <p className="text-amber-700">Join our coffee community</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-200">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-lg"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-sm text-rose-600 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border rounded-lg"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <p className="text-sm text-rose-600 mt-1">{errors.password}</p>}
            </div>
            <button type="submit" className="w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 transition">Login</button>
          </form>
          <div className="mt-6 text-center">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/registration" className="text-amber-800 font-medium">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
