import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import type { IGoogleLoginRequest, IGoogleLoginResponse, IRegisterRequest, IRegisterResponse } from "../../types/auth.type";
import { googleLoginAPI, registerAPI } from "../../services/client/auth.api";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { CartItem, IInitialCartSyncRequest, IInitialCartSyncResponse } from "../../types/cart.type";
import { useCart } from "../../context/CartContext";
import { initialCartSyncAPI } from "../../services/client/cart.api";

export default function SignupForm() {
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { setCart } = useCart();

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        dob: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

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
    const handleGoogleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async tokenResponse => {
            const tokenRequest: IGoogleLoginRequest = { code: tokenResponse.code };
            try {
                const response: IGoogleLoginResponse = await googleLoginAPI(tokenRequest);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        if (!formData.full_name || !formData.email || !formData.password) {
            setError("Vui lòng điền đầy đủ Họ, Tên, Email và Mật khẩu.");
            setIsSubmitting(false);
            return;
        }

        const registerPayload: IRegisterRequest = {
            email: formData.email,
            password: formData.password,
            full_name: formData.full_name,
            phone: formData.phone || undefined,
            address: formData.address || undefined,
            dob: formData.dob || undefined,
        };

        try {
            await registerAPI(registerPayload);
            setSuccessMessage("Success, please log in");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            const errorMessage = err?.message || "Unsuccessful, try again";
            setError(errorMessage);
            console.error("Register error:", err);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center items-center p-4">
            <form className="w-full max-w-xl p-8 space-y-4 bg-white border border-gray-200 rounded-xl shadow-xl" onSubmit={handleSubmit}>
                {successMessage && (
                    <div className="p-3 text-sm font-medium text-green-700 bg-green-100 border border-green-400 rounded-md">
                        {successMessage}
                    </div>
                )}
                {error && (
                    <div className="p-3 text-sm font-medium text-red-700 bg-red-100 border border-red-400 rounded-md">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Full Name" name="full_name" required type="text" placeholder="Enter Your Full Name" value={formData.full_name}
                        onChange={handleChange} />
                    <InputField label="Email" name="email" required type="email" placeholder="Enter Your email" value={formData.email}
                        onChange={handleChange} />
                </div>

                <InputField label="Password" name="password" required type="password" placeholder="Enter your password" value={formData.password}
                    onChange={handleChange} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Phone Number" name="phone" type="tel" placeholder="Enter Your phone number" value={formData.phone}
                        onChange={handleChange} />
                    <InputField label="Date of Birth" name="dob" type="date" placeholder="YYYY-MM-DD (Optional)" value={formData.dob}
                        onChange={handleChange}
                    />
                </div>

                <InputField label="Address" name="address" type="text" placeholder="Address" value={formData.address}
                    onChange={handleChange} />


                <div>
                    <button
                        type="submit"
                        className="w-full py-2.5 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-150 shadow-md"
                        disabled={isSubmitting || !!successMessage}
                    >
                        {isSubmitting && !successMessage ? 'Loading' : 'Signup'}
                    </button>

                    <p className="pt-4 text-center text-sm text-gray-600">
                        Have an account?
                        <Link
                            to="/login"
                            className="ml-1 font-medium text-red-500 hover:text-red-600 transition duration-150"
                        >
                            Login
                        </Link>
                    </p>
                    <div className="mt-4 space-y-4">
                        <button
                            onClick={() => handleGoogleLogin()}
                            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <FcGoogle className="w-6 h-6 mr-3" />
                            <span className="font-semibold text-gray-700">Đăng nhập với Google</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}