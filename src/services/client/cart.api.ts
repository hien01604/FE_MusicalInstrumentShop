import type { IAddUpdateCartItemRequest, ICartResponse, IInitialCartSyncRequest, IInitialCartSyncResponse, IUpdateQuantityRequest } from "../../types/cart.type";
import { clientApi } from "../api.customize";

const API_Backend_base = import.meta.env.VITE_API_BASE_URL;

// 1. Sync giỏ hàng (Khớp với @Post('sync'))
export const initialCartSyncAPI = (data: IInitialCartSyncRequest): Promise<IInitialCartSyncResponse> => {
    const urlBackend = `${API_Backend_base}/api/v1/cart/sync`;
    return clientApi.post(urlBackend, data);
}

// 2. Lấy giỏ hàng (Khớp với @Get())
export const getCartAPI = (): Promise<ICartResponse> => {
    const urlBackend = `${API_Backend_base}/api/v1/cart`;
    return clientApi.get(urlBackend);
};

// 3. Thêm sản phẩm (Khớp với @Post('items'))
export const addOrUpdateCartItemAPI = (
    data: IAddUpdateCartItemRequest
): Promise<ICartResponse> => {
    const urlBackend = `${API_Backend_base}/api/v1/cart/items`;
    return clientApi.post(urlBackend, data);
};

// 4. Cập nhật số lượng (Khớp với @Patch('items/:productId'))
export const updateCartItemQuantityAPI = (
    productId: number,
    quantity: number
): Promise<ICartResponse> => {
    const urlBackend = `${API_Backend_base}/api/v1/cart/items/${productId}`;
    const data: IUpdateQuantityRequest = {
        quantity
    };
    return clientApi.patch(urlBackend, data);
};

// 5. Xóa 1 sản phẩm (Khớp với @Delete('items/:productId'))
export const removeCartItemAPI = (
    productId: number
): Promise<ICartResponse> => {
    // 👇 Đã sửa: Thêm '/items' vào giữa url
    const urlBackend = `${API_Backend_base}/api/v1/cart/items/${productId}`;
    return clientApi.delete(urlBackend);
};

// 6. Xóa hết giỏ hàng (Khớp với @Delete() tại root)
export const clearAllCartItemsAPI = (): Promise<ICartResponse> => {
    // 👇 Đã sửa: Xóa bỏ chữ '/all' vì Backend dùng DELETE ngay tại gốc /cart
    const urlBackend = `${API_Backend_base}/api/v1/cart`;
    return clientApi.delete(urlBackend);
};