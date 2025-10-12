import React, { useState } from "react";
import data, { type SimpleProduct } from "../../sample/sample";
import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";
import CollectionFilter from "./CollectionFilter";
import PriceFilter from "./PriceFilter";
import FilterSection from "./FilterSection";

interface ProductFilterSidebarProps {
    products: SimpleProduct[];
  onFilterChange: (filters: any) => void;
}

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  onFilterChange,
}) => {
  const [showBrand, setShowBrand] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [showCollection, setShowCollection] = useState(true);
  const [showAvailability, setShowAvailability] = useState(true);

  const sampleProducts = data.sampleProducts;
  const gretschData = data.gretschData;

  // Extract data
  const brands = Array.from(new Set(sampleProducts.map((p) => p.brand).filter((brand): brand is string => Boolean(brand))));
  const categories = Array.from(new Set(sampleProducts.map((p: any) => p["Category"]).filter(Boolean)));
  const collections = Array.from(new Set(sampleProducts.map((p: any) => p["Collection"]).filter(Boolean)));
  const parsePrice = (price: string) => Number(price.replace(/[^\d]/g, "")) || 0;
  const allPrices = sampleProducts.map((p) => parsePrice(p.price));
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  return (
    <aside className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-5">
      {/* Availability */}
      <FilterSection
        title="Availability"
        open={showAvailability}
        onToggle={() => setShowAvailability(!showAvailability)}
      >
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            className="accent-yellow-500"
            onChange={(e) =>
              onFilterChange({ availability: e.target.checked })
            }
          />
          Exclude out of stock
        </label>
      </FilterSection>

      <BrandFilter
        brands={brands}
        open={showBrand}
        onToggle={() => setShowBrand(!showBrand)}
        onChange={(brand) => onFilterChange({ brand })}
      />

      <CategoryFilter
        categories={categories}
        open={showCategory}
        onToggle={() => setShowCategory(!showCategory)}
        onChange={(category) => onFilterChange({ category })}
      />

      <CollectionFilter
        collections={collections}
        open={showCollection}
        onToggle={() => setShowCollection(!showCollection)}
        onChange={(collection) => onFilterChange({ collection })}
      />

      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        open={showPrice}
        onToggle={() => setShowPrice(!showPrice)}
        onChange={(range) => onFilterChange({ priceRange: range })}
      />
    </aside>
  );
};

export default ProductFilterSidebar;
