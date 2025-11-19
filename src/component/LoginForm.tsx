import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useState } from "react";
import { googleLoginAPI, localLoginAPI } from "../services/client/auth.api";
import type { IGoogleLoginRequest, IGoogleLoginResponse, ILoginRequest, ILoginResponse } from "../types/auth.type";
import { useAuth } from "../context/AuthContext";
import type { CartItem, IInitialCartSyncRequest, IInitialCartSyncResponse } from "../types/cart.type";
import { initialCartSyncAPI } from "../services/client/cart.api";
import { useCart } from "../context/CartContext";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { setCart } = useCart();

    const handleInitialCartSync = async () => {
        const guestCartJson = localStorage.getItem('guest_cart');

        const guestCartItems: { productId: number, quantity: number }[] = JSON.parse(guestCartJson || '[]').map((item: CartItem) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        if (guestCartItems.length === 0) return;

        try {
            const payload: IInitialCartSyncRequest = { guest_cart_items: guestCartItems };
            // response đã là IInitialCartSyncResponse, không cần IBackendRes
            const response: IInitialCartSyncResponse = await initialCartSyncAPI(payload);

            if (response) {
                // const data: IInitialCartSyncResponse = response; // Không cần gán lại

                localStorage.removeItem('guest_cart');
                setCart(response.cart_items); // Dùng response trực tiếp
            }
        } catch (err: any) {
            console.error("Đồng bộ giỏ hàng thất bại:", err);
            // Có thể bỏ qua lỗi này vì nó không ảnh hưởng đến đăng nhập
        }
    }

    const haddleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const loginPayload: ILoginRequest = { email, password, rememberMe };
        try {
            // response đã là ILoginResponse, không cần IBackendRes
            const response: ILoginResponse = await localLoginAPI(loginPayload);

            if (response) {
                // Dùng response trực tiếp
                login(response.access_token, response.refresh_token, rememberMe, response.user);

                await handleInitialCartSync();

                navigate("/");
            }
            else {
                setError("Login failed: No data received");
            }
        }
        catch (err: any) {
            // Do interceptor trả về errorData, ta truy cập trực tiếp .message
            // Nếu err là một object có trường message:
            const errorMessage = err?.message || "Đăng nhập thất bại.";
            // Nếu err là một chuỗi (hiếm):
            // const errorMessage = typeof err === 'string' ? err : err?.message || "Đăng nhập thất bại.";

            setError(errorMessage);
            console.error("Local login error:", err);
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async tokenResponse => {
            const tokenRequest: IGoogleLoginRequest = { code: tokenResponse.code };
            try {
                // response đã là IGoogleLoginResponse, không cần IBackendRes
                const response: IGoogleLoginResponse = await googleLoginAPI(tokenRequest);

                // BỎ LOGIC KIỂM TRA response.error và response.data VÌ ĐÃ ĐƯỢC INTERCEPTOR XỬ LÝ
                // Nếu API thành công (2xx), response là IGoogleLoginResponse

                login(response.access_token, response.refresh_token, false, response.user);

                await handleInitialCartSync();

                navigate('/');
            }
            catch (err: any) {
                // Tương tự, lấy lỗi trực tiếp từ object lỗi (errorData)
                const errorMessage = err?.message || "Lỗi kết nối hoặc đăng nhập Google thất bại.";
                setError(errorMessage);
                console.error("Google login error:", err);
            }
        },
        onError: error => {
            console.log('Google login failed:', error);
            setError("Đăng nhập Google bị hủy hoặc thất bại.");
        },
    });

    return (
        <div className="flex justify-center items-center p-4 ">

            <form className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-xl shadow-xl"
                onSubmit={haddleSubmit}
            >
                {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

                <InputField
                    label="Email Address"
                    required
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                    label="Password"
                    required
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center space-x-2 text-gray-700">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-red-500 focus:ring-red-500 h-4 w-4"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>Remember Me</span>
                    </label>

                    <Link
                        to="/forgot-password"
                        className="text-gray-500 hover:text-red-600 transition duration-150"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className="w-full py-2.5 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-150 shadow-md"
                >
                    Login
                </button>

                <p className=" text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="ml-1 font-medium text-red-500 hover:text-red-600 transition duration-150"
                    >
                        Signup?
                    </Link>
                </p>
                <div className="mt-4 space-y-4">
                    <button
                        onClick={() => handleGoogleLogin()}
                        type="button"
                        className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <FcGoogle className="w-6 h-6 mr-3" />
                        <span className="font-semibold text-gray-700">Đăng nhập với Google</span>
                    </button>
                </div>
            </form>
        </div>
    );
}