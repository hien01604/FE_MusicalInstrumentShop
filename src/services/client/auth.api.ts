import { clientApi } from "../api.customize"
import type { IForgotPasswordRequest, IGoogleLoginRequest, IGoogleLoginResponse, ILoginRequest, ILoginResponse, IRefreshTokenRequest, IRefreshTokenResponse, IRegisterRequest, IRegisterResponse, IResetPasswordRequest } from "../../types/auth.type";

const API_Backend_base = import.meta.env.VITE_API_BASE_URL;

export const localLoginAPI = (data: ILoginRequest): Promise<ILoginResponse>  => {
    const urlBackend = `${API_Backend_base}/api/v1/auth/login/local`
    return clientApi.post(urlBackend, data)
}

export const googleLoginAPI = (data: IGoogleLoginRequest): Promise<IGoogleLoginResponse> => { 
    
    const urlBackend = `${API_Backend_base}/api/v1/auth/login/google`
    return clientApi.post(urlBackend, data)
}

export const registerAPI = (data: IRegisterRequest): Promise<IRegisterResponse> => {
    const urlBackend = '/api/v1/auth/register'
    return clientApi.post(urlBackend, data)
}

export const logoutAPI = () => {
    return clientApi.post("/api/v1/auth/logout");
};

export const getAccountAPI = (): Promise<IRegisterResponse> => {
    return clientApi.get("/api/v1/auth/account");
};


export const refreshTokenAPI = (data: IRefreshTokenRequest): Promise<IRefreshTokenResponse> => {
    return clientApi.post("/api/v1/auth/refresh", data);
};

export const forgotPasswordAPI = (data: IForgotPasswordRequest): Promise<{ message: string }> => {
    return clientApi.post("/api/v1/auth/forgot-password", data);
};

export const resetPasswordAPI = (data: IResetPasswordRequest): Promise<{ message: string }> => {
    return clientApi.post("/api/v1/auth/reset-password", data);
};