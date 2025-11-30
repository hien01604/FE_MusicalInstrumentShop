import { useState, useMemo } from "react";
import { type CartItem } from "../types/cart.type";
import type { BillingInfo, CreateOrderRequest, DeliveryMethod, PaymentMethod } from "../types/order.type";
import { checkoutAPI } from "../services/client/order.api";

export default function useCheckout(cart: CartItem[]) {
  // STATES
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("free");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
  });

  // CALCULATIONS
  const subTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.product?.price_numeric || "0");
      return total + price * item.quantity;
    }, 0);
  }, [cart]);

  const deliveryCost = deliveryMethod === "flat" ? 50000 : 0;
  const totalAmount = subTotal + deliveryCost;

  // HANDLERS
  const handlePlaceOrder = async () => {
    const orderData: CreateOrderRequest = {
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity, // dùng đúng field trong type
      })),
      billing: billingInfo,
      delivery: deliveryMethod,
      payment: paymentMethod,
    };
    console.log("Placing Order:", orderData);
    try {
      const res = await checkoutAPI(orderData);
      console.log("Order created:", res);
      alert("Order placed successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return {
    deliveryMethod,
    setDeliveryMethod,
    paymentMethod,
    setPaymentMethod,
    billingInfo,
    setBillingInfo,
    subTotal,
    deliveryCost,
    totalAmount,
    handlePlaceOrder
  };
}
