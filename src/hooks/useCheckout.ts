import { useState, useMemo } from "react";
import { type CartItem } from "../types/cart.type";

export default function useCheckout(cart: CartItem[]) {
  // STATES
  const [deliveryMethod, setDeliveryMethod] = useState<"free" | "flat">("free");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "banking">("cod");
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
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
  const handlePlaceOrder = () => {
    const orderData = {
      items: cart.map(item => ({ productId: item.productId, qty: item.quantity })),
      billing: billingInfo,
      delivery: deliveryMethod,
      payment: paymentMethod,
      total: totalAmount
    };
    
    console.log("Placing Order:", orderData);
    // Gọi API checkout ở đây...
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
