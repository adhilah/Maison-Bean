import React from "react";
import { useState } from "react";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  // --------------------------------validation-------------------------------------------------------------------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};
    // First name validation--------------------------------------------------------------------
    if (formData.fname === "" || formData.fname === null) {
      isvalid = false;
      validationErrors.fname = "First name required";
    }
    // Last name validation--------------------------------------------------------------------
    if (formData.lname === "" || formData.lname === null) {
      isvalid = false;
      validationErrors.lname = "Last name required";
    }
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
    // Confirm password validation---------------------------------------------------------------
    if (formData.cpassword === "" || formData.cpassword === null) {
      isvalid = false;
      validationErrors.cpassword = "Confirm password required";
    } else if (formData.cpassword !== formData.password) {
      isvalid = false;
      validationErrors.cpassword = "Confirm password is not match";
    }
    setErrors(validationErrors);
    setValid(isvalid);

    if (isvalid) {
      const userData = {
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        password: formData.password,
        role: "customer",
      };
      axios
        .post("http://localhost:3000/users", userData)
        .then((result) => {
          alert("Registered Successfully! Welcome " + formData.fname);
          console.log("User added:", result.data);

          setFormData({
            fname: "",
            lname: "",
            email: "",
            password: "",
            cpassword: "",
          });
        })
        .catch((err) => {
          console.error("Registration failed:", err);
          alert("Registration failed.");
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
          {/* {
            valid? <></>:
            <span className='text-danger'>
              {errors.fname}; {errors.lname}; {errors.email}; {errors.password}; {errors.cpassword};
            </span>

          } */}

          <form className="space-y-5 " onSubmit={handleSubmit} noValidate>
            {/* Two Column Layout for Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-amber-900 mb-2"
                >
                  First Name
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-amber-50"
                    placeholder="First Name"
                    value={formData.fname}
                    onChange={(event) =>
                      setFormData({ ...formData, fname: event.target.value })
                    }
                    required
                  />
                  {errors.fname && (
                    <p className="mt-2 text-sm text-red-600! font-medium">
                      {errors.fname}
                    </p>
                  )}
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-amber-900 mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-amber-50"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={(event) =>
                    setFormData({ ...formData, lname: event.target.value })
                  }
                  required
                />
                {errors.lname && (
                  <p className="mt-2 text-sm text-rose-600 font-medium">
                    {errors.lname}
                  </p>
                )}
              </div>
            </div>

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

            {/* Phone Number */}
            {/* <div>
              <label htmlFor="phone" className="block text-sm font-medium text-amber-900 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  id="phone"
                  type="tel"
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-amber-50"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div> */}

            {/* Password */}
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-amber-900 mb-2"
              >
                Confirm Password
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-amber-50"
                  placeholder="••••••••"
                  value={formData.cpassword}
                  onChange={(event) =>
                    setFormData({ ...formData, cpassword: event.target.value })
                  }
                  required
                />
                {errors.cpassword && (
                  <p className="mt-2 text-sm text-rose-600 font-medium">
                    {errors.cpassword}
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            {/* <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-amber-700 border-amber-300 rounded focus:ring-amber-500"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-amber-800">
                  I agree to the{' '}
                  <a href="#" className="text-amber-700 hover:text-amber-600 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-amber-700 hover:text-amber-600 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div> */}

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
                Create Account
              </div>
            </button>
          </form>

          {/*------------------- Already have account link -------------------------------------------------------------------------------------------*/}
          <div className="mt-6 text-center">
            <p className="text-amber-700">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-amber-800 hover:text-amber-900 font-medium border-b border-amber-800 hover:border-amber-900"
              >
                LogIn
              </a>
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
};
export default RegistrationPage;
