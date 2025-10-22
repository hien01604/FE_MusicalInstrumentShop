import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // 🟡 Icon mũi tên

interface Props {
  total: number;
  onClear: () => void;
}

const CartSummary: React.FC<Props> = ({ total, onClear }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-6 gap-4">
      {/* 🧹 Nút xóa giỏ hàng (Căn bên trái) */}
      <div className="w-full sm:w-auto">
        <button
          onClick={onClear}
          className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
        >
          Clear All
        </button>
      </div>

      {/* 💰 Tổng cộng */}
      <div className="text-xl font-semibold mt-4 sm:mt-0">
        Total:{" "}
        <span className="text-[#A97132]">
          {total.toLocaleString("vi-VN")}₫
        </span>
      </div>

      {/* 💎 Nút Thanh toán ngay (Luxury gradient + animated arrow) */}
      <div className="w-full sm:w-auto mt-4 sm:mt-0">
        <button
          onClick={() => navigate("/checkout")}
          className="group flex items-center gap-2 px-8 py-3 border-2 border-[#A97132] rounded-md 
                     text-[#A97132] font-semibold bg-white 
                     hover:bg-[#FAE1A8] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 
                     focus:ring-[#A97132] focus:ring-opacity-50"
        >
          Checkout
          {/* 🏹 Mũi tên có animation khi hover */}
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
