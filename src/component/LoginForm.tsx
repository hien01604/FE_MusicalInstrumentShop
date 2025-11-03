import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom"; 
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useState } from "react";
import { localLoginAPI } from "../services/client/auth.api";
import type { ILoginRequest, ILoginResponse } from "../types/auth.type";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const haddleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginPayload: ILoginRequest = { email, password, rememberMe };
        try {
            const response = await localLoginAPI(loginPayload);
            if (response.data) {
                const data: ILoginResponse = response.data;
                if (rememberMe) {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                }
                else {
                    sessionStorage.setItem("access_token", data.access_token);
                    sessionStorage.setItem("refresh_token", data.refresh_token);
                }
                navigate("/");
            }
            else {
                setError("Login failed: No data received");
            }
        }
        catch (err: any) {
            setError(err.message);
        }
    }

    const handleGoogleLogin = async()=>{}
    return (
        <div className="flex justify-center items-center p-4 "> 
            
            <form className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-xl shadow-xl"
                onSubmit={haddleSubmit}
            >
                
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