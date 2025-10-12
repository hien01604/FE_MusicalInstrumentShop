import React from "react";
import FilterSection from "./FilterSection";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  open: boolean;
  onToggle: () => void;
  onChange: (range: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  open,
  onToggle,
  onChange,
}) => (
  <FilterSection title="Price (₫)" open={open} onToggle={onToggle}>
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder={minPrice.toLocaleString("vi-VN")}
          className="w-1/2 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-yellow-500"
          onChange={(e) =>
            onChange([Number(e.target.value) || minPrice, maxPrice])
          }
        />
        <span className="text-gray-400">–</span>
        <input
          type="number"
          placeholder={maxPrice.toLocaleString("vi-VN")}
          className="w-1/2 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-yellow-500"
          onChange={(e) =>
            onChange([minPrice, Number(e.target.value) || maxPrice])
          }
        />
      </div>
      <button
        className="w-full bg-yellow-600 text-white rounded-md py-1.5 text-sm hover:bg-yellow-700 transition"
        onClick={() => onChange([minPrice, maxPrice])}
      >
        Apply
      </button>
    </div>
  </FilterSection>
);

export default PriceFilter;
