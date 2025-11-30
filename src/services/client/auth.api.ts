import { clientApi } from "../api.customize"
import type { IForgotPasswordRequest, IForgotPasswordResponse, IGoogleLoginRequest, IGoogleLoginResponse, ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse, IResetPasswordRequest } from "../../types/auth.type";

const API_Backend_base = import.meta.env.VITE_API_BASE_URL;

export const localLoginAPI = (data: ILoginRequest): Promise<ILoginResponse> => {
    const urlBackend = `${API_Backend_base}/api/v1/auth/login/local`
    return clientApi.post(urlBackend, data)
}

export const googleLoginAPI = (data: IGoogleLoginRequest): Promise<IGoogleLoginResponse> => {
    const urlBackend = `${API_Backend_base}/api/v1/auth/login/google`
    return clientApi.post(urlBackend, data)
}

export const registerAPI = (data: IRegisterRequest): Promise<IRegisterResponse> => {
    const urlBackend = `${API_Backend_base}/api/v1/auth/register`
    return clientApi.post(urlBackend, data)
}

export const logoutAPI = () => {
    const urlBackend = `${API_Backend_base}/api/v1/auth/logout`
    return clientApi.post(urlBackend);
};

export const getAccountAPI = (): Promise<IRegisterResponse> => {
    const urlBackend = `${API_Backend_base}/api/v1/auth/account`
    return clientApi.get(urlBackend);
};

export const forgotPasswordAPI = (data: IForgotPasswordRequest): Promise<IForgotPasswordResponse> => {
    const urlBackend = `${API_Backend_base}/api/v1/auth/forgot-password`
    return clientApi.post(urlBackend, data);
};

export const resetPasswordAPI = (data: IResetPasswordRequest): Promise<{ message: string }> => {
    const urlBackend = `${API_Backend_base}/api/v1/auth/reset-password`
    return clientApi.post(urlBackend, data);
};