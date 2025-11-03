import axios, { type AxiosInstance } from "axios";

export function createApi({
  baseURL,
  getToken,
  onUnauthorized,
}: {
  baseURL: string;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
}): AxiosInstance {
  const api = axios.create({
    baseURL,
    timeout: 20000,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken ? getToken() : null;
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (res) => (res && res.data ? res.data : res),
    (err) => {
      if (err?.response?.status === 401 && onUnauthorized) {
        onUnauthorized();
      }
      const errorData = err?.response?.data;
      return Promise.reject(errorData || err);
    }
  );

  return api;
}

export const clientApi = createApi({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  getToken: () => localStorage.getItem("access_token"),
  onUnauthorized: () => {
    // window.location.href = "/login";
  },
});

export const adminApi = createApi({
  baseURL:
    import.meta.env.VITE_ADMIN_BACKEND_URL ?? import.meta.env.VITE_BACKEND_URL,
  getToken: () => localStorage.getItem("admin_access_token"),
  onUnauthorized: () => {
    window.location.href = "/admin/login";
  },
});
