import React, {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

import type { UserData } from "../types/auth.type";
import { logoutAPI } from "../services/client/auth.api";

// Lấy refresh token cho axios refresh logic
export const getRefreshToken = (): string | null => {
    return (
        localStorage.getItem("refresh_token") ||
        sessionStorage.getItem("refresh_token")
    );
};

// Dọn dẹp hoàn toàn & điều hướng
export const forceLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("isRemember");

    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user_data");

    window.location.href = "/login";
};

export interface AuthContextType {
    isLoggedIn: boolean;
    isRemember: boolean;
    user: UserData | null;
    login: (
        accessToken: string,
        refreshToken: string,
        rememberMe: boolean,
        user: UserData
    ) => void;
    logout: () => void;
}

// Tạo Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auto detect Remember Mode khi mở app / reload
const getInitialAuth = () => {
    // 1) Thử sessionStorage trước
    let token = sessionStorage.getItem("access_token");
    let user = getStoredUser(sessionStorage);
    let isRemember = false;

    // 2) Nếu không có → thử localStorage
    if (!token) {
        token = localStorage.getItem("access_token");
        if (token) {
            user = getStoredUser(localStorage);
            isRemember = true;
        }
    }

    // Lưu trạng thái remember để refresh logic dùng
    localStorage.setItem("isRemember", isRemember ? "true" : "false");

    return {
        isLoggedIn: !!token,
        user: user,
        isRemember,
    };
};

// Lấy user_data trong storage và parse JSON
const getStoredUser = (storage: Storage): UserData | null => {
    const userJson = storage.getItem("user_data");
    if (!userJson) return null;
    try {
        return JSON.parse(userJson);
    } catch {
        return null;
    }
};

// AuthProvider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const initial = getInitialAuth();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initial.isLoggedIn);
    const [isRemember, setIsRemember] = useState<boolean>(initial.isRemember);
    const [user, setUser] = useState<UserData | null>(initial.user);

    // LOGIN
    const login = (
        accessToken: string,
        refreshToken: string,
        rememberMe: boolean,
        userData: UserData
    ) => {
        // Lưu remember flag cho refresh logic
        localStorage.setItem("isRemember", rememberMe ? "true" : "false");
        setIsRemember(rememberMe);

        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem("access_token", accessToken);
        storage.setItem("refresh_token", refreshToken);
        storage.setItem("user_data", JSON.stringify(userData));

        setIsLoggedIn(true);
        setUser(userData);
    };

    // LOGOUT
    const logout = async () => {
        try {
            await logoutAPI();
        } catch (e) {
            console.warn("Server logout thất bại, vẫn dọn dẹp local", e);
        }

        forceLogout();

        setIsLoggedIn(false);
        setUser(null);
        setIsRemember(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isRemember,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook lấy context
export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
