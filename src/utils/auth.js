// export const getLoggedInUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };



// ===========================================================================================



export const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Invalid user data in localStorage", error);
    return null;
  }
};
