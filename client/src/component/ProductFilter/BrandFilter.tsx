import React from "react";
import FilterSection from "./FilterSection.tsx";

interface BrandFilterProps {
    brands: string[];
    open: boolean;
    onToggle: () => void;
    onChange: (brand: string) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
    brands,
    open,
    onToggle,
    onChange,
}) => (
    <FilterSection title="Brand" open={open} onToggle={onToggle}>
        {brands.map((b) => (
            <label
                key={b}
                className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
            >
                <input
                    type="checkbox"
                    className="accent-yellow-500"
                    onChange={() => onChange(b)}
                />
                {b}
            </label>
        ))}
    </FilterSection>
);

export default BrandFilter;
