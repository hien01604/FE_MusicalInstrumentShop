import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BrandDrawerProps {
  open: boolean;
  onClose: () => void;
}

const BrandDrawer: React.FC<BrandDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleSelectBrand = (brandSlug: string) => {
    onClose();
    navigate(`/brand/${brandSlug}`);
  };

  return (
    <>
      {/* Overlay mờ */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer chính */}
      <div
        className={`fixed top-0 left-0 h-full w-[800px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">All Brands</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black transition">
            <X size={20} />
          </button>
        </div>

        {/* Hai cột layout */}
        <div className="flex h-[calc(100%-60px)]">
          {/* Cột trái — All Brands */}
          <div className="w-1/2 border-r border-gray-200 p-4 overflow-y-auto bg-white">
            {/* Filter A–Z */}
            <div className="flex flex-wrap gap-2 mb-4">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ch) => (
                <button
                  key={ch}
                  className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-yellow-100 transition"
                >
                  {ch}
                </button>
              ))}
            </div>

            {/* Placeholder */}
            <div className="p-3 text-gray-400 italic bg-gray-50 rounded-md border border-dashed border-gray-200">
              Brand list will appear here...
            </div>
          </div>

          {/* Cột phải — Top Brands */}
          <div className="w-1/2 p-4 bg-gray-50 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Top Brands</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-3 flex items-center justify-center h-20 text-gray-400 italic bg-white hover:shadow-md transition">
                Brand logos will appear here...
              </div>
              <div className="border border-gray-200 rounded-md p-3 flex items-center justify-center h-20 text-gray-400 italic bg-white hover:shadow-md transition">
                (empty)
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandDrawer;
