import axios, { AxiosError } from "axios";
import { forceLogout, getRefreshToken } from "../context/AuthContext";
import { refreshTokenAPI } from "./client/auth.api";

/**
 * Xử lý việc làm mới Access Token và thử lại request bị lỗi.
 */
export async function handleTokenRefresh(failedRequest: AxiosError) {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
        forceLogout();
        return Promise.reject(failedRequest);
    }
    
    try {
        const payload = { refresh_token: refreshToken };
        const response = await refreshTokenAPI(payload); 
        const data = response.data.data;
        
        const newAccessToken = data?.access_token;
        const newRefreshToken = data?.refresh_token; 
        
        if (newAccessToken && newRefreshToken) {
            // Cập nhật Token mới (Giả định lưu vào localStorage)
            localStorage.setItem("access_token", newAccessToken); 
            localStorage.setItem("refresh_token", newRefreshToken);
            
            // Cập nhật header cho request bị lỗi
            failedRequest.config!.headers["Authorization"] = `Bearer ${newAccessToken}`;
            
            // Trả về một Axios instance mới để thử lại request gốc
            return axios.request(failedRequest.config!);
        }
        
    } catch (e) {
        console.error("Làm mới token thất bại:", e);
        forceLogout();
        return Promise.reject(e);
    }
    
    forceLogout();
    return Promise.reject(failedRequest);
}