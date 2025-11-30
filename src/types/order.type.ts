export interface BillingInfo {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    phone: string;
}

export type DeliveryMethod = "free" | "flat";
export type PaymentMethod = "cod" | "banking";

export interface OrderItemRequest {
    productId: number;
    quantity: number;
}

export interface CreateOrderRequest {
    items: OrderItemRequest[];
    billing: BillingInfo;
    delivery: DeliveryMethod;
    payment: PaymentMethod;
}

export type CheckoutResponse = {
    orderId: number;
    status: string;
    redirectUrl: string | null;
};