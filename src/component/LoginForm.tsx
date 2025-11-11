import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom"; 
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useState } from "react";
import { googleLoginAPI, localLoginAPI } from "../services/client/auth.api";
import type { IGoogleLoginRequest, IGoogleLoginResponse, ILoginRequest, ILoginResponse } from "../types/auth.type";
import type { IBackendRes } from "../types/common.type";
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
        
        const guestCartItems: {productId: number, quantity: number}[] = JSON.parse(guestCartJson || '[]').map((item: CartItem) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));
        
        if (guestCartItems.length === 0) return;

        try {
            const payload: IInitialCartSyncRequest = { guest_cart_items: guestCartItems };
            const response: IBackendRes<IInitialCartSyncResponse> = await initialCartSyncAPI(payload);
            
            if (response.data) {
                const data: IInitialCartSyncResponse = response.data;
                
                localStorage.removeItem('guest_cart'); 
                setCart(data.cart_items); 
            }
        } catch (err: any) {
            console.error("Đồng bộ giỏ hàng thất bại:", err);
        }
    }

    const haddleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); 
        const loginPayload: ILoginRequest = { email, password, rememberMe };
        try {
            const response = await localLoginAPI(loginPayload);
            if (response.data) {
                const data: ILoginResponse = response.data;
                
                login(data.access_token, data.refresh_token, rememberMe, data.user);
                
                await handleInitialCartSync();
                
                navigate("/");
            }
            else {
                setError("Login failed: No data received");
            }
        }
        catch (err: any) {
            const errorMessage = err?.response?.data?.message || err?.message || "Đăng nhập thất bại.";
            setError(errorMessage);
            console.error("Local login error:", err);
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async tokenResponse => {
            const tokenRequest:IGoogleLoginRequest = { code: tokenResponse.code };
            try {
                const response: IBackendRes<IGoogleLoginResponse> = await googleLoginAPI(tokenRequest);
                
                if (response.error || !response.data) {
                    const errorMessage = response.message || "Đăng nhập Google thất bại.";
                    setError(errorMessage);
                    alert(errorMessage);
                    return;
                }
                
                const data: IGoogleLoginResponse = response.data;
                login(data.access_token, data.refresh_token, false, data.user); 
                
                await handleInitialCartSync();
                
                navigate('/');
            }
            catch (err: any) {
                const errorMessage = err?.message || "Lỗi kết nối đến Google API.";
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
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <InputField
                    label="Password"
                    required
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
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