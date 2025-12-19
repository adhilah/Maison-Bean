import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  // --------------------------------validation-------------------------------------------------------------------------------------------------------------------

   const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};

    // Email validation------------------------------------------------------------------------
    if (formData.email === "" || formData.email === null) {
      isvalid = false;
      validationErrors.email = "Email required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = "Email is not valid";
    }
    // Password validation-----------------------------------------------------------------------
    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationErrors.password = "password required";
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationErrors.password = "password length at least 6 character";
    }

    // ============= ADD THIS: Set errors for FORM VALIDATION =============
    setErrors(validationErrors);
    setValid(isvalid);

    // ============= Only proceed with API call if form is valid =============
    if (isvalid) {
      axios
        .get("http://localhost:3000/users")
        .then((result) => {
          let userFound = false;
          let passwordCorrect = false;
          
          result.data.forEach((user) => {
            if (user.email === formData.email) {
              userFound = true;
              if (user.password === formData.password) {
                passwordCorrect = true;
              }
            }
          });

          if (userFound && passwordCorrect) {
            alert("Login successfully");
            setFormData({
              email: "",
              password: "",
            });
            setErrors({}); // Clear errors on success
          } else if (userFound && !passwordCorrect) {
            setErrors({ password: "Wrong Password" });
          } else {
            setErrors({ email: "Email not registered" });
          }
        })
        .catch((err) => {
          console.error("Login failed:", err);
          alert("Login failed.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header with coffee theme */}
        <div className="text-center mb-8">
          {/* logo----------------------------------------------------------- */}
          {/* <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-amber-900 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-amber-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/>
              </svg>
            </div>
          </div>  */}
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            Maison Bean
          </h1>
          <p className="text-amber-700">Join our coffee community</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-amber-200">
          <form className="space-y-5 " onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-amber-900 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-amber-50"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                  required
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-rose-600 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* ---------------Password------------------------------------------------------------------------------------------------------------------------------- */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-amber-900 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-amber-50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                  }
                  required
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-rose-600 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {/*------------------------------------ Submit Button ----------------------------------------------------------------------------------------- */}
            <button
              type="submit"
              className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 transition shadow-md hover:shadow-lg"
            >
              <div className="flex items-center justify-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
                </svg>
                Login
              </div>
            </button>
          </form>

          {/*------------------- Already have account link -------------------------------------------------------------------------------------------*/}
          <div className="mt-6 text-center">
            <p className="text-amber-700">
              If you don't have an account?{" "}
              <Link
                to="/registration" 
                className="text-amber-800 hover:text-amber-900 font-medium border-b border-amber-800 hover:border-amber-900"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer/Info */}
        <div className="mt-6 text-center">
          <p className="text-amber-600 text-sm">
            Brew your perfect coffee experience with us
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
