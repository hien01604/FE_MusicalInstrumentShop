import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { IBrand, IGroupedBrand } from "../../../types/product.type";
import { getAllBrandAPI } from "../../../services/client/product.api";
import { groupBrandsByInitial } from "../../../utils/brandUtils";

interface BrandDrawerProps {
  open: boolean;
  onClose: () => void;
}

const BrandDrawer: React.FC<BrandDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [groupedBrands, setGroupedBrands] = useState<IGroupedBrand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && brands.length === 0) {

      const fetchBrands = async () => {
        setIsLoading(true);
        setError(null);

        try {
          // API trả về IBrand[] trực tiếp nhờ Interceptor
          const data: IBrand[] = await getAllBrandAPI();

          setBrands(data);

          const grouped = groupBrandsByInitial(data);
          setGroupedBrands(grouped);

          console.log('Fetched and grouped brands successfully.');
        } catch (err: any) {
          // Lỗi từ Interceptor (ví dụ: lỗi 401, 500,...)
          const errorMessage = err?.message || "Đã xảy ra lỗi khi tải thương hiệu.";
          setError(errorMessage);
          setBrands([]);
          setGroupedBrands([]);
          console.error("Fetch brands error:", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBrands();
    }
  }, [open, brands.length]);


  const handleScrollToInitial = (initial: string) => {
    const element = document.getElementById(`brand-group-${initial}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectBrand = (brandSlug: string) => {
    onClose();
    navigate(`/products/brands/${brandSlug}`);
  };
  return (
    <>
      {/* Overlay mờ */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={onClose}
      />

      {/* Drawer chính */}
      <div
        className={`fixed top-0 left-0 h-full w-[800px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
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
          <div className="w-1/2 border-r border-gray-200 p-4 overflow-y-auto bg-white hide-scrollbar">

            {/* Filter A–Z */}
            <div className="top-0 bg-white z-10 flex flex-wrap gap-2 mb-4 pb-2 border-b border-gray-100 ">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ch) => (
                <button
                  key={ch}
                  className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-yellow-100 transition"
                  // Gọi hàm cuộn tới chữ cái đã chọn
                  onClick={() => handleScrollToInitial(ch)}
                >
                  {ch}
                </button>
              ))}
            </div>

            {/* Hiển thị lỗi hoặc trạng thái tải */}
            {isLoading && <p className="p-3 text-center text-gray-500">Loading Brands...</p>}
            {error && <p className="p-3 text-center text-red-500 border border-red-300 bg-red-50 rounded">{error}</p>}

            {/* Hiển thị danh sách Brand đã được nhóm */}
            {!isLoading && !error && groupedBrands.length > 0 && (
              <div className="brand-list-group">
                {groupedBrands.map((group) => (
                  <div key={group.initial} className="mb-6">

                    {/* Tiêu đề chữ cái (A, B, C...) */}
                    <h3
                      // Gán ID để chức năng cuộn trang hoạt động
                      id={`brand-group-${group.initial}`}
                      className="text-xl font-bold mb-3 pt-2"
                    >
                      {group.initial}
                    </h3>

                    {/* Danh sách Brand cho chữ cái này (chia 2 cột) */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {group.brands.map((brand) => (
                        <button
                          key={brand.brand_id}
                          className="text-left text-gray-700 hover:text-yellow-600 transition"
                          onClick={() => handleSelectBrand(brand.slug)}
                        >
                          {brand.name}
                        </button>
                      ))}
                    </div>

                    <hr className="mt-4 border-gray-200" />
                  </div>
                ))}
              </div>
            )}

            {/* Trường hợp không có dữ liệu */}
            {!isLoading && !error && groupedBrands.length === 0 && brands.length > 0 && (
              <div className="p-3 text-gray-400 italic text-center">Brand is not found</div>
            )}

            {!isLoading && !error && brands.length === 0 && (
              <div className="p-3 text-gray-400 italic text-center">Brand list is empty</div>
            )}
          </div>

          {/* Cột phải — Top Brands (Giữ nguyên Placeholder) */}
          <div className="w-1/2 p-4 bg-gray-50 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Top Brands</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Đây là nơi bạn sẽ thêm logic lặp qua danh sách Top Brands */}
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
