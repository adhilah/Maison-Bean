import axios from "axios";


//localhost------------
// const api = axios.create({
//   baseURL: "https://localhost:7257/api",
// });

// api.interceptors.request.use((config) => {

//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });


//cookies-----------------

const api = axios.create({
  baseURL: "https://localhost:7257/api",
  withCredentials: true,
});

export default api;