import React from "react";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductSpec";
import FAQSection from "./FAQSection";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import type { IProduct } from "../../types/product.type";


const ProductDetailMain: React.FC<{ product: IProduct }> = ({ product }) => {
  const { addToCart } = useCart();
  
  const isAvailable = product.stock_quantity > 0;
  
  const mainImage =
    product.images?.find(img => img.is_main)?.image_url ||
    product.images?.[0]?.image_url ||
    "/default-image.png";

  const cartProduct = {
    id: product.id,
    name: product.product_name,
    price: product.price_numeric, 
    image: mainImage,
    quantity: 1,
  };

  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.9fr] gap-10 items-start">
        <ProductGallery images={(product.images || []).map(img => img.image_url)} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold leading-snug">
              {product.product_name}
            </h1>

            <p className="text-3xl font-bold text-gray-900">
              {product.price_display || `${product.price_numeric} VNĐ`}
            </p>

            <p className="text-sm text-gray-500">
              {isAvailable ? `Còn hàng (${product.stock_quantity})` : "Hết hàng"}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => {
                  console.log("🧩 Clicked Add to Cart");
                  addToCart(cartProduct);
                }}
                disabled={!isAvailable}
                className={`flex items-center gap-2 py-2 px-5 rounded-lg transition ${
                  !isAvailable
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                <ShoppingCart size={18} />
                {isAvailable ? "Add to cart" : "Hết hàng"}
              </button>

              <button className="flex items-center gap-2 border border-gray-300 py-2 px-5 rounded-lg hover:bg-gray-100 transition">
                <Heart size={18} />
                Wishlist
              </button>
            </div>
          </div>

          <div className="-mt-2">
            <ProductTabs description={product.description} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <FAQSection />
      </div>
    </section>
  );
};

export default ProductDetailMain;