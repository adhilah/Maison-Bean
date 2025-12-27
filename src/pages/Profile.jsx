
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const Profile = () => {
//   const { user } = useAuth(); // logged-in user
//   const [userData, setUserData] = useState(null);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [cPassword, setCPassword] = useState("");

//   // ================= FETCH USER DATA =================
//   useEffect(() => {
//     if (!user) return;

//     axios
//       .get(`http://localhost:3000/users/${user.id}`)
//       .then((res) => setUserData(res.data))
//       .catch(() => toast.error("Failed to load profile"));
//   }, [user]);

//   // ================= CHANGE PASSWORD =================
//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword || !cPassword) {
//       toast.error("Please fill all password fields");
//       return;
//     }

//     if (currentPassword !== userData.password) {
//       toast.error("Current password is incorrect");
//       return;
//     }

//     if (newPassword !== cPassword) {
//       toast.error("New password and confirm password do not match");
//       return;
//     }

//     try {
//       await axios.patch(`http://localhost:3000/users/${user.id}`, {
//         password: newPassword,
//       });

//       toast.success("Password updated successfully");
//       setCurrentPassword("");
//       setNewPassword("");
//       setCPassword("");
//     } catch (error) {
//       toast.error("Failed to update password");
//     }
//   };

//   if (!userData) {
//     return <p className="text-center py-20">Loading profile...</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto py-12 px-6">
//       <h2 className="text-3xl font-bold text-[#5c4033] mb-8">
//         My Profile
//       </h2>

//       {/* ================= USER INFO ================= */}
//       <div className="bg-white shadow rounded-xl p-6 space-y-4 mb-8">
//         <div>
//           <p className="text-sm text-gray-500">First Name</p>
//           <p className="text-lg font-medium">{userData.firstName}</p>
//         </div>

//         <div>
//           <p className="text-sm text-gray-500">Last Name</p>
//           <p className="text-lg font-medium">{userData.lastName}</p>
//         </div>

//         <div>
//           <p className="text-sm text-gray-500">Email</p>
//           <p className="text-lg font-medium">{userData.email}</p>
//         </div>
//       </div>

//       {/* ================= CHANGE PASSWORD ================= */}
//       <div className="bg-white shadow rounded-xl p-6 space-y-4">
//         <h3 className="text-xl font-semibold text-[#5c4033]">
//           Change Password
//         </h3>

//         {/* Current Password */}
//         <input
//           type="password"
//           placeholder="Current Password"
//           value={currentPassword}
//           onChange={(e) => setCurrentPassword(e.target.value)}
//           className="w-full border px-4 py-2 rounded-lg"
//         />

//         {/* New Password */}
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="w-full border px-4 py-2 rounded-lg"
//         />

//         {/* Confirm Password */}
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={cPassword}
//           onChange={(e) => setCPassword(e.target.value)}
//           className="w-full border px-4 py-2 rounded-lg"
//         />

//         <button
//           onClick={handleChangePassword}
//           className="bg-[#6c5225] text-white px-6 py-2 rounded-lg hover:bg-[#5c4033] transition"
//         >
//           Update Password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:3000/users/${user.id}`)
      .then((res) => setUserData(res.data))
      .catch(() => toast.error("Failed to load profile"));
  }, [user]);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !cPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (currentPassword !== userData.password) {
      toast.error("Current password is incorrect");
      return;
    }

    if (newPassword !== cPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        password: newPassword,
      });

      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setCPassword("");
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  if (!userData) {
    return <p className="text-center py-20 text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <button onClick={() => navigate("/")} className="text-[#9c7635]">
            ← Continue shopping
          </button>
        </div>


      {/* ================= USER INFO ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-1">First Name</p>
          <p className="text-lg font-semibold">{userData.firstName}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-sm text-gray-500 mb-1">Last Name</p>
          <p className="text-lg font-semibold">{userData.lastName}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition md:col-span-2">
          <p className="text-sm text-gray-500 mb-1">Email</p>
          <p className="text-lg font-semibold">{userData.email}</p>
        </div>
      </div>

      {/* ================= CHANGE PASSWORD ================= */}
      <div className="bg-white shadow rounded-2xl p-8 max-w-xl mx-auto space-y-6">
        <h3 className="text-2xl font-bold text-[#5c4033] text-center mb-4">
          Change Password
        </h3>

        {/* Current Password */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6c5225] transition"
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6c5225] transition"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6c5225] transition"
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleChangePassword}
          className="w-full bg-[#6c5225] text-white py-3 rounded-xl font-semibold hover:bg-[#5c4033] transition"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
