import React from "react";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-[300px] sm:w-[400px] md:w-[410px] shadow-sm focus-within:ring-2 focus-within:ring-yellow-500 transition">
      <Search className="w-4 h-4 text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search for instruments..."
        className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;
