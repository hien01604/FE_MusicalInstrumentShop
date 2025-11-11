import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserData } from '../types/auth.type'; 
import { logoutAPI } from '../services/client/auth.api';


export const getRefreshToken = (): string | null => {
    return localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
};

export const forceLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user_data"); 
    
    window.location.href = "/login";
};

export interface AuthContextType {
    isLoggedIn: boolean;
    user: UserData | null;
    login: (
        accessToken: string, 
        refreshToken: string,
        rememberMe: boolean, 
        user: UserData
    ) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const getStoredUser = (storage: Storage): UserData | null => {
    const userJson = storage.getItem('user_data');
    if (userJson) {
        try {
            return JSON.parse(userJson) as UserData;
        } catch (e) {
            return null;
        }
    }
    return null;
};

const getInitialAuth = (): { isLoggedIn: boolean, user: UserData | null } => {
    let token = sessionStorage.getItem('access_token');
    let user = getStoredUser(sessionStorage);

    if (!token) {
        token = localStorage.getItem('access_token');
        if (token) user = getStoredUser(localStorage);
    }
 
    return {
        isLoggedIn: !!token,
        user: user
    };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const initial = getInitialAuth();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initial.isLoggedIn);
    const [user, setUser] = useState<UserData | null>(initial.user);
 

    const login = (
        accessToken: string, 
        refreshToken: string, 
        rememberMe: boolean, 
        userData: UserData
    ) => {
        const storage = rememberMe ? localStorage : sessionStorage;
 
        storage.setItem("access_token", accessToken);
        storage.setItem("refresh_token", refreshToken);
        storage.setItem("user_data", JSON.stringify(userData)); 


        setIsLoggedIn(true);
        setUser(userData);
    };
    
    const logout = async () => {
        try {
            await logoutAPI(); 
        } catch (e) {
            console.warn("Lỗi khi hủy token trên server. Tiếp tục dọn dẹp cục bộ.", e);
        }
 
        // Gọi hàm forceLogout để dọn dẹp và điều hướng
        forceLogout(); 

        setIsLoggedIn(false);
        setUser(null);
    };

    const value: AuthContextType = {
        isLoggedIn,
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};