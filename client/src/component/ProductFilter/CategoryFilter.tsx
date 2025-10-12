import React from "react";
import FilterSection from "./FilterSection.tsx";

interface CategoryFilterProps {
    categories: string[];
    open: boolean;
    onToggle: () => void;
    onChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    open,
    onToggle,
    onChange,
}) => (
    <FilterSection title="Category" open={open} onToggle={onToggle}>
        {categories.map((c) => (
            <label
                key={c}
                className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
            >
                <input
                    type="checkbox"
                    className="accent-yellow-500"
                    onChange={() => onChange(c)}
                />
                {c}
            </label>
        ))}
    </FilterSection>
);

export default CategoryFilter;
