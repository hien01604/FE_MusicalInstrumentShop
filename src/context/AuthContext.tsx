import { createContext, useContext, useState, type ReactNode } from 'react';
import React from 'react';
// Import UserData và các kiểu dữ liệu cần thiết từ file types của bạn
import type { UserData } from '../types/auth.type'; 
import { logoutAPI } from '../services/client/auth.api';

// 1. Định nghĩa kiểu dữ liệu cho Context
export interface AuthContextType {
  isLoggedIn: boolean;
  user: UserData | null;
  // Hàm login: Luôn nhận UserData vì cả 2 API đều trả về
  login: (
      accessToken: string, 
      refreshToken: string, 
      rememberMe: boolean, 
      user: UserData
  ) => void;
  logout: () => void;
}

// Giá trị khởi tạo Context (sử dụng 'undefined' và kiểm tra trong useAuth)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Định nghĩa props cho Provider
interface AuthProviderProps {
  children: ReactNode;
}

const getStoredUser = (storage: Storage): UserData | null => {
    const userJson = storage.getItem('user_data');
    if (userJson) {
        try {
            return JSON.parse(userJson) as UserData;
        } catch (e) {
            console.error("Lỗi khi parse user data:", e);
            return null;
        }
    }
    return null;
};

// Hàm trợ giúp để lấy token từ bộ nhớ
const getInitialAuth = (): { isLoggedIn: boolean, user: UserData | null } => {
    // Ưu tiên session storage (cho phiên hiện tại)
    let token = sessionStorage.getItem('access_token');
    let user = getStoredUser(sessionStorage);

    // Nếu không có trong session, kiểm tra localStorage (cho rememberMe)
    if (!token) {
        token = localStorage.getItem('access_token');
        user = getStoredUser(localStorage);
    }
    
    // Trả về trạng thái xác thực và dữ liệu người dùng
    return {
        isLoggedIn: !!token,
        user: user
    };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // 2. State: Khởi tạo trạng thái ban đầu
    const initial = getInitialAuth();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initial.isLoggedIn);
    const [user, setUser] = useState<UserData | null>(initial.user);
    

    // 3. Hàm Login
    const login = (
        accessToken: string, 
        refreshToken: string, 
        rememberMe: boolean, 
        userData: UserData
    ) => {
        // Lựa chọn nơi lưu trữ token
        const storage = rememberMe ? localStorage : sessionStorage;
        
        // Ghi Access và Refresh Token
        storage.setItem("access_token", accessToken);
        storage.setItem("refresh_token", refreshToken);
        
        // Ghi User Data (Rất quan trọng để hiển thị tên, email ngay lập tức)
        storage.setItem("user_data", JSON.stringify(userData)); 

        // Cập nhật trạng thái Context
        setIsLoggedIn(true);
        setUser(userData);
    };

    // 4. Hàm Logout
    const logout = async () => {
        // 1. GỌI API /LOGOUT LÊN BE (Hủy bỏ Refresh Token)
        try {
            // Sử dụng clientApi.post("/api/v1/auth/logout")
            await logoutAPI(); 
            console.log("Logout API called successfully. Tokens invalidated on server.");
        } catch (e) {
            // Xử lý lỗi Axios (ví dụ: server không phản hồi, token đã hết hạn)
            console.warn("Lỗi khi hủy token trên server. Có thể token đã hết hạn hoặc server không khả dụng:", e);
            // Tiếp tục quá trình dọn dẹp cục bộ dù có lỗi, để đảm bảo người dùng bị đăng xuất.
        }
        
        // 2. DỌN DẸP TOKEN VÀ USER DATA CỤC BỘ
        // Xóa khỏi Local Storage (dành cho Remember Me)
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
        
        // Xóa khỏi Session Storage (dành cho phiên hiện tại)
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("user_data"); 
        
        // 3. CẬP NHẬT TRẠNG THÁI CONTEXT
        setIsLoggedIn(false);
        setUser(null);
        
        // TODO: (Tùy chọn) Kích hoạt Cart Sync: Lưu giỏ hàng Global State hiện tại vào Local Storage.
        // Ví dụ: saveCurrentCartToLocalStorage();
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

// 5. Custom Hook useAuth
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};