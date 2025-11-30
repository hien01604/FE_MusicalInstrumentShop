import type { CheckoutResponse, CreateOrderRequest } from "../../types/order.type";
import { clientApi } from "../api.customize";

const API_Backend_base = import.meta.env.VITE_API_BASE_URL;

export const checkoutAPI = (data: CreateOrderRequest): Promise<CheckoutResponse> => {
    const urlBackend = `${API_Backend_base}/api/v1/orders`;
    return clientApi.post(urlBackend, data);
};