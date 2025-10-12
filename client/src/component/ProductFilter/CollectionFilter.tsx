import React from "react";
import FilterSection from "./FilterSection";

interface CollectionFilterProps {
  collections: string[];
  open: boolean;
  onToggle: () => void;
  onChange: (collection: string) => void;
}

const CollectionFilter: React.FC<CollectionFilterProps> = ({
  collections,
  open,
  onToggle,
  onChange,
}) => (
  <FilterSection title="Collection" open={open} onToggle={onToggle}>
    {collections.map((c) => (
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

export default CollectionFilter;
