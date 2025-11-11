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