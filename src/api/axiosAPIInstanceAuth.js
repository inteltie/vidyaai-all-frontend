import axios from "axios";
import config from "../../config";
import Cookies from "js-cookie";

const baseURL = config.VIDYAAI_API;

const axiosAPIInstanceAuth = axios.create({
  baseURL,
  headers: { "X-Requested-With": "XMLHttpRequest", "Accept-Language": Cookies.get("lang") || "en" }
});

axiosAPIInstanceAuth.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAPIInstanceAuth.interceptors.response.use(
  (response) => {
    response.headers["Accept-Language"] =  Cookies.get("lang")
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Access token expired, and refresh token failed.');
    } else {
      console.error('Error making request:', error);
    }
    return Promise.reject(error);
  }
);

export default axiosAPIInstanceAuth;
