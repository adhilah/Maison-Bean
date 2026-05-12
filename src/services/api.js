// import axios from "axios";

// const api = axios.create({

//   baseURL:
//     "http://localhost:5038/api",

//   // VERY IMPORTANT
//   withCredentials: true,

//   headers: {
//     "Content-Type":
//       "application/json",
//   },
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5038/api",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REFRESH CONTROL ================= */

let isRefreshing = false;

let failedQueue = [];

/* ================= PROCESS QUEUE ================= */

const processQueue = (error) => {

  failedQueue.forEach((prom) => {

    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

/* ================= RESPONSE INTERCEPTOR ================= */

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    /* ================= TOKEN EXPIRED ================= */

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      /* ================= ALREADY REFRESHING ================= */

      if (isRefreshing) {

        return new Promise(
          (resolve, reject) => {

            failedQueue.push({
              resolve,
              reject,
            });
          }
        )
        .then(() =>
          api(originalRequest)
        )
        .catch((err) =>
          Promise.reject(err)
        );
      }

      originalRequest._retry = true;

      isRefreshing = true;

      try {

        /* ================= REFRESH TOKEN ================= */

        await axios.post(
          "http://localhost:5038/api/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );

        processQueue(null);

        return api(originalRequest);

      }
      catch (refreshError) {

        processQueue(refreshError);

        window.location.href =
          "/login";

        return Promise.reject(
          refreshError
        );

      }
      finally {

        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;