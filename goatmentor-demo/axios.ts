import axios from "axios";
import logout from "./utils/logout";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logout();
    } else if (error.response.status === 403) {
      window.location.href = "/dashboard";
    }
    error.response.data = {
      message: error.response.data.message ?? "Something went wrong",
    };
    return error.response;
  }
);
