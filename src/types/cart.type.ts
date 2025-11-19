import type { IProductImage } from "./product.type";

export interface ICartProductMinimal {
    id: number;
    product_name: string;
    slug: string;
    price_display: string;
    price_numeric: string;
    stock_quantity: number;
    main_image: IProductImage;
}

export interface CartItem {
    productId: number;
    quantity: number;
    product?: ICartProductMinimal;
}

export interface IInitialCartSyncRequest {
    guest_cart_items: {
        productId: number;
        quantity: number;
    }[];
}

export interface IInitialCartSyncResponse {
    cart_items: CartItem[];
}

export interface IAddUpdateCartItemRequest {
    productId: number;
    quantity: number;
}

export interface IUpdateQuantityRequest {
    quantity: number;
}

// Response chung cho các API CRUD (GET, POST, PATCH, DELETE) ---
// Server luôn trả về giỏ hàng mới nhất sau khi thao tác
export interface ICartResponse {
    data: ICartData
}

export interface ICartData {
    cart_items: CartItem[];
}