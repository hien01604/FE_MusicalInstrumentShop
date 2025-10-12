import React, { type ReactNode } from "react";

interface FilterSectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  open,
  onToggle,
  children,
}) => (
  <div>
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-gray-800 font-semibold text-sm border-b pb-2"
    >
      <span>{title}</span>
      <span>{open ? "−" : "+"}</span>
    </button>
    {open && <div className="mt-3 space-y-2">{children}</div>}
  </div>
);

export default FilterSection;
