export type UserRole = "admin" | "customer";

export interface IUser {
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
}

export interface UserData {
    id: number;
    email: string;
    full_name: string;
    role: string;
}