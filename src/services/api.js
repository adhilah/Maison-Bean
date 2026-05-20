import axios from "axios";

const api = axios.create({

  baseURL:"https://localhost:7257/api",
  //baseURL: "http://localhost:5038/api",
  // baseURL: "http://localhost:5038/api",

  withCredentials: true,
});

// ======================================
// REFRESH STATE
// ======================================

let isRefreshing = false;

let failedQueue = [];

// ======================================
// PROCESS QUEUE
// ======================================

const processQueue = (
  error = null
) => {

  failedQueue.forEach((promise) => {

    if (error) {

      promise.reject(error);

    } else {

      promise.resolve();
    }
  });

  failedQueue = [];
};

// ======================================
// RESPONSE INTERCEPTOR
// ======================================

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    if (
      !error.response ||
      !originalRequest
    ) {

      return Promise.reject(error);
    }

    if (
      originalRequest.url?.includes(
        "/auth/login"
      ) ||
      originalRequest.url?.includes(
        "/auth/refresh"
      ) ||
      originalRequest.url?.includes(
        "/auth/logout"
      )
    ) {

      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry
    ) {

      if (isRefreshing) {

        return new Promise(
          (resolve, reject) => {

            failedQueue.push({
              resolve,
              reject,
            });
          }
        ).then(() =>
          api(originalRequest)
        );
      }

      originalRequest._retry =
        true;

      isRefreshing = true;

      try {

        await api.post(
          "/auth/refresh"
        );

        processQueue();

        return api(
          originalRequest
        );

      } catch (refreshError) {

        processQueue(
          refreshError
        );

        localStorage.removeItem(
          "authUser"
        );

        return Promise.reject(
          refreshError
        );

      } finally {

        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;