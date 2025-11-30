import axios, { AxiosError } from "axios";
import type { IRefreshTokenRequest, IRefreshTokenResponse } from "../types/auth.type";

export const refreshState = {
    isRefreshing: false,

    failedQueue: [] as {
        resolve: (token: string) => void;
        reject: (err: any) => void;
    }[],
};

// Hàm xử lý queue
export const processQueue = (
    error: any,
    token: string | null = null
) => {
    refreshState.failedQueue.forEach((p) => {
        if (error) p.reject(error);
        else p.resolve(token!);
    });

    refreshState.failedQueue = [];
};

export async function handleTokenRefresh(_error: AxiosError): Promise<string> {
    const isRemember =
        (localStorage.getItem("isRemember") || "false") === "true";

    // Lấy refresh_token từ đúng storage
    const refreshToken = isRemember
        ? localStorage.getItem("refresh_token")
        : sessionStorage.getItem("refresh_token");

    if (!refreshToken) {
        throw new Error("Không tìm thấy refresh_token để refresh");
    }

    const payload: IRefreshTokenRequest = {
        isRemember,
    };

    const res = await axios.post<IRefreshTokenResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${refreshToken}`, // refresh token vẫn gửi qua header
            },
        }
    );

    const { access_token, refresh_token } = res.data.data;

    if (!access_token || !refresh_token) {
        throw new Error(
            "API refresh trả về thiếu access_token hoặc refresh_token"
        );
    }

    // Lưu token mới dựa vào isRemember
    if (isRemember) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
    } else {
        sessionStorage.setItem("access_token", access_token);
        sessionStorage.setItem("refresh_token", refresh_token);
    }

    console.log("Refresh token thành công");
    // Trả về access token mới cho interceptor dùng retry
    return access_token;
}
