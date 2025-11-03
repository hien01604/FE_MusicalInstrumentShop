export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ILoginResponse {
  user: {
    id: number;
    email: string;
    role: "customer" | "admin" ;
  };
  access_token: string;
  refresh_token: string;
}

export interface IRegisterRequest{
    email: string;
    password: string;
    full_name: string;
    phone?: string;
    address?: string;
    dob?: string;
}

export interface IRegisterResponse {
  user_id: number;
  full_name: string;
  email: string;
  googleId: string | null;
  phone: string | null;
  address: string | null;
  dob: string | null;
  refreshTokenHash: string | null;
  role: "customer" | "admin"; 
  loginMethod: "local" | "google";
  createdAt: string;
  updatedAt: string;
}

export interface IRefreshTokenRequest {
  refresh_token: string;
}

export interface IRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  token: string;
  newPassword: string;
}