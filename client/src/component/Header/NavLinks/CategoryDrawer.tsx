import React, { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleNavigate = (slug: string) => {
    onClose();
    navigate(`/category/${slug}`);
  };

  return (
    <>
      {/* Overlay */}
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
          <h2 className="text-lg font-semibold text-gray-800">All Categories</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black transition">
            <X size={20} />
          </button>
        </div>

        {/* Hai cột layout */}
        <div className="flex h-[calc(100%-60px)]">
          {/* Cột trái — All Categories */}
          <div className="w-1/2 border-r border-gray-200 p-4 overflow-y-auto">
            <div className="text-gray-400 italic text-sm p-3 bg-gray-50 rounded-md border border-dashed border-gray-200">
              Category list will appear here...
            </div>
          </div>

          {/* Cột phải — Subcategories */}
          <div className="w-1/2 p-4 bg-gray-50 overflow-y-auto">
            {selectedCategory ? (
              <>
                <h3 className="text-sm font-semibold mb-3 text-gray-700">
                  Subcategories
                </h3>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleNavigate("example")}
                    className="flex justify-between items-center text-left py-2 px-2 rounded hover:bg-white hover:shadow-sm transition text-gray-700"
                  >
                    <span>Example subcategory...</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-gray-400 italic text-sm p-3 bg-gray-50 rounded-md border border-dashed border-gray-200">
                Select a category to view its subcategories...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDrawer;
