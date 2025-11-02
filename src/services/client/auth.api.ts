import { clientApi } from "../api.customize"
import type { IForgotPasswordRequest, ILoginRequest, ILoginResponse, IRefreshTokenRequest, IRefreshTokenResponse, IRegisterRequest, IRegisterResponse, IResetPasswordRequest } from "../../types/auth.type";

export const localLoginAPI = (data: ILoginRequest) => {
    const urlBackend = '/api/v1/auth/login/local'
    return clientApi.post<ILoginResponse>(urlBackend, data)
}

export const registerAPI = (data: IRegisterRequest) => {
    const urlBackend = '/api/v1/auth/register'
    return clientApi.post<IRegisterResponse>(urlBackend, data)
}

export const logoutAPI = () => {
  return clientApi.post("/api/v1/auth/logout");
};

export const getAccountAPI = () => {
  return clientApi.get<IRegisterResponse>("/api/v1/auth/account");
};

export const loginGoogleAPI = (googleToken: string) => {
  return clientApi.post<ILoginResponse>("/api/v1/auth/login/google", {
    token: googleToken,
  });
};

export const refreshTokenAPI = (data: IRefreshTokenRequest) => {
  return clientApi.post<IRefreshTokenResponse>("/api/v1/auth/refresh", data);
};

export const forgotPasswordAPI = (data: IForgotPasswordRequest) => {
  return clientApi.post<{ message: string }>("/api/v1/auth/forgot-password", data);
};

export const resetPasswordAPI = (data: IResetPasswordRequest) => {
  return clientApi.post<{ message: string }>("/api/v1/auth/reset-password", data);
};


