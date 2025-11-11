import React from "react";
import { useCart } from "../../context/CartContext";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";
// 🔥 Bạn có thể thêm import hàm formatCurrency nếu bạn có

/**
 * CartContent
 * - Quản lý toàn bộ logic giỏ hàng: tăng/giảm số lượng, xóa, tính tổng
 * - Dùng lại được ở nhiều nơi (CartPage, MiniCart, Checkout)
 */
const CartContent: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Tính tổng tiền
  const total = cart.reduce((sum, item) => {
    // 🔥 SỬ DỤNG price_numeric (được giả định là chuỗi số đơn giản, ví dụ: "2800000")
    // và đảm bảo rằng product không bị undefined
    const priceString = item.product?.price_numeric || "0";
    const numericPrice = parseFloat(priceString) || 0;

    return sum + numericPrice * item.quantity;
}, 0);

  // Nếu giỏ hàng trống
  if (cart.length === 0) {
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
        onIncrease={(productId) => { // Đổi id thành productId để rõ ràng
          // Tìm sản phẩm (KHÔNG DÙNG !)
          const item = cart.find((i) => i.productId === productId);
          // 🔥 Kiểm tra nếu tìm thấy, thì cập nhật số lượng
          if (item) {
            updateQuantity(productId, item.quantity + 1);
          }
        }}
        onDecrease={(productId) => { // Đổi id thành productId để rõ ràng
          // Tìm sản phẩm (KHÔNG DÙNG !)
          const item = cart.find((i) => i.productId === productId);
          
          // 🔥 Kiểm tra nếu tìm thấy VÀ số lượng > 1, thì giảm số lượng
          if (item && item.quantity > 1) {
            updateQuantity(productId, item.quantity - 1);
          } else if (item && item.quantity === 1) {
            // Tùy chọn: Xóa sản phẩm nếu số lượng về 0/1
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