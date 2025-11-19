import React from "react";
import { useCart } from "../../context/CartContext";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";

const CartContent: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const safeCart = cart ?? [];
  const total = safeCart.reduce((sum, item) => {
    // SỬ DỤNG price_numeric (được giả định là chuỗi số đơn giản, ví dụ: "2800000")
    // và đảm bảo rằng product không bị undefined
    const priceString = item.product?.price_numeric || "0";
    const numericPrice = parseFloat(priceString) || 0;

    return sum + numericPrice * item.quantity;
}, 0);

  // Nếu giỏ hàng trống
  if (safeCart.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10 text-lg">
        Your cart is empty
      </p>
    );
  }

  // Nếu có sản phẩm
  return (
    <div className="space-y-6">
      {/* Bảng danh sách sản phẩm */}
      <CartTable
        items={cart}
        onIncrease={(productId) => { 
          const item = cart.find((i) => i.productId === productId);
          if (item) {
            updateQuantity(productId, item.quantity + 1);
          }
        }}
        onDecrease={(productId) => { 
          const item = cart.find((i) => i.productId === productId);
          
          if (item && item.quantity > 1) {
            updateQuantity(productId, item.quantity - 1);
          } else if (item && item.quantity === 1) {
            removeFromCart(productId);
          }
        }}
        onRemove={removeFromCart}
      />

      {/* Tổng cộng */}
      <CartSummary total={total} onClear={clearCart} />
    </div>
  );
};

export default CartContent;