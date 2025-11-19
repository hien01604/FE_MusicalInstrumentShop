import React, { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { groupCategoriesForMenu } from "../../../utils/categoryUtils"; 
import type { ICategoryItem, IParentCategory } from "../../../types/product.type";
import { getAllCategoryAPI } from "../../../services/client/product.api";

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const fetchCategories = async (): Promise<ICategoryItem[]> => {
    try {
        // --- CHỈNH SỬA TẠI ĐÂY ---
        // getAllCategoryAPI() giờ trả về Promise<ICategoryItem[]>, không cần .data
        const response: ICategoryItem[] = await getAllCategoryAPI();
        return response || [];
        
    } catch (error) {
        console.error("Lỗi khi gọi API danh mục:", error);
        return [];
    }
};


const CategoryDrawer: React.FC<CategoryDrawerProps> = ({ open, onClose }) => {
    const navigate = useNavigate();

    const [groupedCategories, setGroupedCategories] = useState<IParentCategory[]>([]);
    const [activeParent, setActiveParent] = useState<IParentCategory | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (open && groupedCategories.length === 0) {
            setLoading(true);
            fetchCategories()
                .then(flatData => {
                    const grouped = groupCategoriesForMenu(flatData); 
                    setGroupedCategories(grouped);
                    if (grouped.length > 0) {
                        setActiveParent(grouped[0]);
                    }
                })
                .catch(error => {
                    // Lỗi ở đây sẽ là dữ liệu lỗi (errorData) từ interceptor
                    console.error("Lỗi khi tải danh mục:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [open]);

    const handleNavigate = (slug: string) => {
        onClose();
        navigate(`/products/categories/${slug}`);
    };

    const handleActivateParent = (parent: IParentCategory) => {
        setActiveParent(parent);
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
                    open ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={onClose}
            />

            <div
                className={`fixed top-0 left-0 h-full w-[800px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">All Categories</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black transition">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex h-[calc(100%-60px)]">
                    
                    <div className="w-1/2 border-r border-gray-200 p-4 overflow-y-auto">
                        {loading && (
                            <div className="text-center p-4 text-gray-500">Đang tải danh mục...</div>
                        )}
                        {!loading && groupedCategories.length > 0 ? (
                            <div className="flex flex-col gap-1">
                                {groupedCategories.map(parent => (
                                    <div
                                        key={parent.id}
                                        onMouseEnter={() => setActiveParent(parent)}
                                        onClick={() => handleActivateParent(parent)}
                                        className={`flex justify-between items-center py-2 px-3 rounded-md cursor-pointer transition 
                                            ${activeParent?.id === parent.id 
                                                ? 'bg-orange-50 text-orange-700 font-semibold' 
                                                : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        <span>{parent.name}</span>
                                        <ChevronRight size={16} className="text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        ) : !loading && (
                            <div className="text-gray-400 italic text-sm p-3 bg-gray-50 rounded-md border border-dashed border-gray-200">
                                Không tìm thấy danh mục nào.
                            </div>
                        )}
                    </div>

                    <div className="w-1/2 p-4 bg-gray-50 overflow-y-auto">
                        {activeParent && (
                            <>
                                <div className="flex flex-col gap-2">
                                    {activeParent.subcategories.length > 0 ? (
                                        activeParent.subcategories.map(sub => (
                                            <button
                                                key={sub.id}
                                                onClick={() => handleNavigate(sub.slug)}
                                                className="flex justify-between items-center text-left py-2 px-2 rounded hover:bg-white hover:shadow-sm transition text-gray-700"
                                            >
                                                <span>{sub.name}</span>
                                                <ChevronRight size={16} className="text-gray-400" />
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-gray-400 italic text-sm p-3 rounded-md border border-dashed border-gray-200">
                                            Không có danh mục con cho mục này.
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryDrawer;