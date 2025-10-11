import React from "react";
import { Heart, ShoppingCart, User } from "lucide-react";

const UserMenu: React.FC = () => {
  return (
    <div className="flex items-center text-sm text-black gap-3 mr-6">
      <Heart className="cursor-pointer hover:text-orange-600 transition" size={18} />
      <ShoppingCart className="cursor-pointer hover:text-orange-600 transition" size={18} />

      <div className="flex items-center gap-1">
        <User className="cursor-pointer hover:text-orange-600 transition" size={18} />
        <span className="font-medium">Hello, Phuc</span>
      </div>
    </div>
  );
};

export default UserMenu;
