import axios from "axios";
import config from "../../config";
import { isExpired } from "react-jwt";
import axiosAPIInstanceAuth from "./axiosAPIInstanceAuth";
import Cookies from 'js-cookie';
import { replaceStringQutes } from "@/helper/Helper";

const baseURL = config.VIDYAAI_API;

let isRefreshing = false;
let refreshPromise = null;

const axiosAPIInstance = axios.create({
    baseURL,
    headers: { 
        "X-Requested-With": "XMLHttpRequest" ,
        "Accept-Language": Cookies.get("lang") || "en"
    }
});


export const refreshAccessToken = async () => {
    const refreshToken = replaceStringQutes(Cookies.get("REFRESH_TOKEN"));
    refreshPromise = axiosAPIInstanceAuth.post(`api/v1/account/token/refresh/`, {
        refresh: refreshToken
    });

    const response = await refreshPromise;
    const newAccessToken = response.data.access;
    Cookies.set('ACCESS_TOKEN', newAccessToken,{expires:7});
    isRefreshing = false;
    return newAccessToken;
}

axiosAPIInstance.interceptors.request.use(
    async (config) => {
        let newToken;
        let accessToken = replaceStringQutes(Cookies.get("ACCESS_TOKEN"));
        newToken = accessToken
        if (isExpired(accessToken)) {
            newToken = await refreshAccessToken();
        }
        
        config.headers.Authorization = `Bearer ${newToken}`;
        config.headers["Accept-Language"] = Cookies.get("lang") || "en"
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosAPIInstance;

