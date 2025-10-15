import React, { useState } from "react";

interface Props {
  images: string[];
}

const ProductGallery: React.FC<Props> = ({ images }) => {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Main Image */}
      <div className="relative w-full flex justify-center border border-gray-200 rounded-xl shadow-sm bg-white p-4">
        <img
          src={selected}
          alt="Product"
          className="object-contain max-h-[420px] w-auto transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>

      {/* Thumbnail List */}
      <div className="flex mt-4 gap-2 justify-center flex-wrap">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Thumbnail ${i + 1}`}
            className={`w-16 h-16 border rounded-md cursor-pointer object-contain transition-transform duration-200 ${
              img === selected
                ? "border-gray-800 scale-105"
                : "border-gray-300 hover:scale-105"
            }`}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>

      {/* Caption */}
      <p className="text-xs text-gray-400 mt-3">
        Hover over image to zoom in
      </p>
    </div>
  );
};

export default ProductGallery;
