export interface UserData {
    id: number;
    email: string;
    role: "customer" | "admin";
    full_name: string;
    phone?: string | null;
    address?: string | null;
    dob?: string | null;
}

// -----------------------------------------------------------------
// A. YÊU CẦU (REQUESTS)
// -----------------------------------------------------------------

export interface ILoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface IRegisterRequest {
    email: string;
    password: string;
    full_name: string;
    phone?: string;
    address?: string;
    dob?: string;
}

export interface IGoogleLoginRequest {
    code: string;
}

export interface IRefreshTokenRequest {
    refresh_token: string;
}

export interface IForgotPasswordRequest {
    email: string;
}

export interface IResetPasswordRequest {
    token: string;
    newPassword: string;
}

// -----------------------------------------------------------------
// B. PHẢN HỒI (RESPONSES)
// -----------------------------------------------------------------

// Cấu trúc phản hồi chung cho Đăng nhập/Google Login
export interface IAuthResponseData {
    access_token: string;
    refresh_token: string;
    user: UserData; 
}

export interface ILoginResponse extends IAuthResponseData {}
export interface IGoogleLoginResponse extends IAuthResponseData {}


// Phản hồi Đăng ký (IRegisterResponse)
export interface IRegisterResponse {
    user_id: number;
    full_name: string;
    email: string;
    role: "customer" | "admin"; 
    
    googleId: string | null;
    phone: string | null;
    address: string | null;
    dob: string | null;
    refreshTokenHash: string | null;
    loginMethod: "local" | "google";
    createdAt: string;
    updatedAt: string;
}


export interface IRefreshTokenResponse {
    user: UserData;
    access_token: string;
    refresh_token: string;
}