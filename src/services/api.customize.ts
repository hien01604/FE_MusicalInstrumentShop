import axios, { AxiosError, type AxiosInstance } from "axios";
import { handleTokenRefresh, processQueue, refreshState } from "./api.config";
import { forceLogout } from "../context/AuthContext";
type RefreshTokenHandler = (error: AxiosError) => Promise<any>;

export function createApi({
  baseURL,
  getToken,
  onUnauthorized,
  handleRefreshToken,
}: {
  baseURL: string;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
  handleRefreshToken: RefreshTokenHandler;
}): AxiosInstance {
  const api = axios.create({
    baseURL,
    timeout: 20000,
  });

  //Request interceptor: thêm token vào header
  api.interceptors.request.use(
    (config) => {
      const token = getToken ? getToken() : null;
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (res) => res?.data?.data || res?.data || res,

    async (error) => {
      const originalRequest = error.config;

      if (error?.response?.status !== 401) {
        return Promise.reject(error?.response?.data || error);
      }


      if (originalRequest._retry) {
        onUnauthorized?.();
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      // Nếu đang refresh → request này phải đợi
      if (refreshState.isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshState.failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // --- BẮT ĐẦU REFRESH ---
      try {
        refreshState.isRefreshing = true;

        const newToken = await handleRefreshToken(error);

        processQueue(null, newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        onUnauthorized?.();
        return Promise.reject(refreshError);

      } finally {
        refreshState.isRefreshing = false;
      }
    }
  );

  return api;
}

export const clientApi = createApi({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  getToken: () => {
    const localToken = localStorage.getItem("access_token");
    if (localToken) return localToken;

    const sessionToken = sessionStorage.getItem("access_token");
    if (sessionToken) return sessionToken;

    return null;
  },
  onUnauthorized: () => {
    forceLogout();
    window.location.href = "/login";
  },
  handleRefreshToken: handleTokenRefresh,
});

export const adminApi = createApi({
  baseURL:
    import.meta.env.VITE_ADMIN_BACKEND_URL ?? import.meta.env.VITE_BACKEND_URL,
  getToken: () => localStorage.getItem("admin_access_token"),
  onUnauthorized: () => {
    window.location.href = "/admin/login";
  },
  handleRefreshToken: handleTokenRefresh,
});
