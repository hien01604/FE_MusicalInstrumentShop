import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import type { CartItem } from "../../types/cart.type";

interface Props {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItemRow: React.FC<Props> = ({ item, onIncrease, onDecrease, onRemove }) => {
  const product = item.product;

  // Đảm bảo giá trị hiển thị là một chuỗi an toàn
  const priceDisplayString = product?.price_display || '0'; 

  // Tách phần số ra từ chuỗi "16.830.000₫"
   // (Đã thêm optional chaining và giá trị mặc định để tránh lỗi 'Cannot read properties of undefined (reading 'replace')')
  const numericPrice = parseFloat(priceDisplayString.replace(/[^\d]/g, "")) || 0;
  const total = numericPrice * item.quantity;

  return (
    <tr className="border-t border-[#E7D7A7]">
      <td className="p-4 flex items-center gap-3">
        <img src={product?.main_image?.image_url} alt={product?.product_name} className="w-14 h-14 rounded-lg object-cover" />
        <span>{product?.product_name}</span>
      </td>

      {/* ✅ Hiển thị đúng giá gốc */}
      <td className="p-4">{product?.price_display}</td>

      {/* ✅ Số lượng */}
      <td className="p-4">
        <div className="flex items-center border border-gray-300 rounded-lg w-fit">
          <button onClick={onDecrease} className="px-2">
            <Minus size={16} />
          </button>
          <span className="px-3">{item.quantity}</span>
          <button onClick={onIncrease} className="px-2">
            <Plus size={16} />
          </button>
        </div>
      </td>

      {/* ✅ Tổng tiền từng sản phẩm */}
      <td className="p-4">
        {total.toLocaleString("vi-VN")}₫
      </td>

      <td className="p-4">
        <button onClick={onRemove} className="text-red-500 hover:text-red-600">
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default CartItemRow;
