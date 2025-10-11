import React from "react";
import { Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Newsletter: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100", 
    "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=100",
    "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=100", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_09ffXFNY_3xly110ATqLM5wOhJQXL0oGw&s", 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQw3TVn8bYVpRIQBS2rwwaTfFZjaVqQwTaTg&s", 
  ];

  return (
    <div className="text-center md:text-left">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Subscribe Our Newsletter
      </h3>

      {/* --- Social Icons (on top of input) --- */}
      <div className="flex justify-center md:justify-start gap-4 mb-3">
        <a href="#" className="text-gray-500 hover:text-blue-600 transition">
          <FaFacebookF size={18} />
        </a>
        <a href="#" className="text-gray-500 hover:text-pink-600 transition">
          <FaInstagram size={18} />
        </a>
        <a href="#" className="text-gray-500 hover:text-red-600 transition">
          <FaYoutube size={18} />
        </a>
      </div>

      {/* --- Email Input --- */}
      <div className="flex items-center border rounded-md overflow-hidden mb-4 w-[300px] sm:w-[360px] md:w-[400px] lg:w-[270px] mx-auto md:mx-0">
        <input
          type="text"
          placeholder="Enter your email..."
          className="flex-1 px-3 py-2 text-sm outline-none"
        />
        <button className="bg-yellow-600 px-4 py-3 text-white hover:bg-yellow-700 transition">
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* --- Guitar Images --- */}
      <div className="flex justify-center md:justify-start gap-2">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`guitar-${idx}`}
            className="w-12 h-12 object-cover rounded-md transform hover:scale-110 hover:brightness-110 transition-transform duration-200"
          />
        ))}
      </div>
    </div>
  );
};

export default Newsletter;
