import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface Props {
  description: string;
}

const ProductSpec: React.FC<Props> = ({ description }) => {
  const [openTabs, setOpenTabs] = useState<Set<number>>(new Set());

  const tabs = [
    {
      title: "Free Shipping & Collection",
      content:
        "Delivered in 3–5 days. Free collection available at select stores.",
    },
    {
      title: "About This Product",
      content: description,
    },
    {
      title: "Specifications",
      content: `
Body Shape: ST Style
Body Material: Poplar
Body Colour: Dove Grey
Body Finish: Gloss
Fretboard Material: Laurel
Fretboard Radius: 12"
Scale Length: 25"
No. of Frets: 22
Fretboard Inlays: Dot
Pickups: HSS
Bridge: 6 Point Vintage Tremolo
Strings: 09-42
Tuning Machines: Dot
Hardware Finish: Chrome
Case: None
      `,
    },
  ];

  const toggleTab = (index: number) => {
    setOpenTabs((prev) => {
      const newTabs = new Set(prev);
      if (newTabs.has(index)) {
        newTabs.delete(index); // Close tab if it's already open
      } else {
        newTabs.add(index); // Open tab if it's closed
      }
      return newTabs;
    });
  };

  return (
    <div className="w-full md:w-[90%] lg:w-[540px] mt-3 ml-[2px]">
      {/* Optional small header */}
      <h3 className="text-[15px] font-semibold text-gray-800 mb-2 md:hidden">
        Product Information
      </h3>

      {tabs.map((tab, i) => {
        const isOpen = openTabs.has(i);
        return (
          <div
            key={i}
            className={`transition-all duration-300 rounded-md border border-gray-200 mb-2 ${
              isOpen ? "bg-white" : "bg-[#F7F6F3]"
            }`}
          >
            {/* Header */}
            <button
              onClick={() => toggleTab(i)}
              className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-gray-100 transition"
            >
              <span className="font-medium text-[15px] text-gray-800 tracking-wide">
                {tab.title}
              </span>

              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200">
                {isOpen ? (
                  <Minus size={14} className="text-gray-600" />
                ) : (
                  <Plus size={14} className="text-gray-600" />
                )}
              </span>
            </button>

            {/* Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 bg-white whitespace-pre-line">
                {tab.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductSpec;
