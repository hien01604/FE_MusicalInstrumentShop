import React from "react";
import { Link } from "react-router-dom";  
import logo from "../../assets/Logo.png";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
    <div className="flex items-center ">
      <img
        src={logo}
        alt="Solar Strings"
        className="w-20 h-16 object-contain rounded-full" 
      />
      <div className="flex flex-col justify-center leading-tight">
        <span
          className="font-bold text-xl bg-gradient-to-r from-orange-700 to-orange-500 text-transparent bg-clip-text whitespace-nowrap"
        >
          Solar Strings
        </span>
        <span className="font-dancing text-sm text-gray-700 font-medium -mt-0.5">
          Light up your tone
        </span>
      </div>
    </div>
    </Link>
  );
};

export default Logo;
