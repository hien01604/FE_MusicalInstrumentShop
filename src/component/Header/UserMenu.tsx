import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import type { UserData } from "../../types/auth.type";

const UserMenu: React.FC = () => {
  const { cart } = useCart();
  const cartItems = cart ?? [];
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // hêm state để kích hoạt animation khi cart thay đổi
  const [animateCart, setAnimateCart] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data") || sessionStorage.getItem("user_data");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Lỗi khi đọc user_data:", error);
        // localStorage.removeItem("user_data");
      }
    }
  }, []);

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
          className={`cursor-pointer transition-all ${animateCart ? "text-[#A97132] scale-110 rotate-3" : "hover:text-[#A97132]"
            }`}
        >
          <ShoppingCart size={20} />
        </Link>

        {/* 🟡 Badge hiển thị số lượng */}
        {totalItems > 0 && (
          <span
            className={`absolute -top-2 -right-2 bg-[#A97132] text-white text-[10px] font-semibold
                        w-4 h-4 flex items-center justify-center rounded-full shadow-sm
                        transition-all duration-300 ${animateCart ? "scale-125 animate-bounce" : "scale-100"
              }`}
          >
            {totalItems}
          </span>
        )}
      </div>

      {/* 👤 User info */}
      <div className="flex items-center gap-1">
        {currentUser ? (
          <>
            <User className="cursor-pointer hover:text-[#A97132] transition" size={18} />
            <span className="font-medium truncate max-w-[150px]">
              Hello, {currentUser.full_name}
            </span>
          </>
        ) : (
          // Nếu chưa đăng nhập
          <Link to="/login" className="font-medium hover:text-[#A97132] transition cursor-pointer">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
