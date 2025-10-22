import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // ✅ Lấy dữ liệu giỏ hàng

const UserMenu: React.FC = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Thêm state để kích hoạt animation khi cart thay đổi
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 600); // reset sau 0.6s
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <div className="flex items-center text-sm text-black gap-3 mr-6">
      {/* ❤️ Wishlist */}
      <Heart className="cursor-pointer hover:text-[#A97132] transition" size={18} />

      {/* 🛒 Giỏ hàng */}
      <div className="relative">
        <Link
          to="/cart"
          className={`cursor-pointer transition-all ${
            animateCart ? "text-[#A97132] scale-110 rotate-3" : "hover:text-[#A97132]"
          }`}
        >
          <ShoppingCart size={20} />
        </Link>

        {/* 🟡 Badge hiển thị số lượng */}
        {totalItems > 0 && (
          <span
            className={`absolute -top-2 -right-2 bg-[#A97132] text-white text-[10px] font-semibold
                        w-4 h-4 flex items-center justify-center rounded-full shadow-sm
                        transition-all duration-300 ${
                          animateCart ? "scale-125 animate-bounce" : "scale-100"
                        }`}
          >
            {totalItems}
          </span>
        )}
      </div>

      {/* 👤 User info */}
      <div className="flex items-center gap-1">
        <User className="cursor-pointer hover:text-[#A97132] transition" size={18} />
        <span className="font-medium">Hello, Phuc</span>
      </div>
    </div>
  );
};

export default UserMenu;
