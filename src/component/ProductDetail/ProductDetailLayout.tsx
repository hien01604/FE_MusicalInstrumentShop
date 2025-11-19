import React from "react";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductSpec";
import FAQSection from "./FAQSection";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import type { IProduct } from "../../types/product.type";
import type { CartItem, ICartProductMinimal } from "../../types/cart.type";


const ProductDetailMain: React.FC<{ product: IProduct }> = ({ product }) => {
  const { addToCart } = useCart();

  const isAvailable = product.stock_quantity > 0;

  // Lấy đối tượng ảnh chính và URL để cấu trúc dữ liệu giỏ hàng
  const mainImageObject = product.images?.find(img => img.is_main) || product.images?.[0];
  const mainImageUrl = mainImageObject?.image_url || "/default-image.png";

  // 1. Xây dựng đối tượng ICartProductMinimal
  const productMinimal: ICartProductMinimal = {
    id: product.id,
    product_name: product.product_name,
    slug: product.slug || 'default-slug',
    price_display: product.price_display,
    price_numeric: product.price_numeric.toString(), // Phải là string
    stock_quantity: product.stock_quantity,
    main_image: mainImageObject || { id: 0, image_url: mainImageUrl, is_main: true },
  };

  // 2. Cấu trúc đối tượng CartItem hoàn chỉnh (sử dụng tên biến bạn đã gọi là cartItem)
  const cartItem: CartItem = {
    productId: product.id, // Thuộc tính BẮT BUỘC
    quantity: 1,
    product: productMinimal, // Đối tượng lồng ICartProductMinimal
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
                  addToCart(cartItem);
                }}
                disabled={!isAvailable}
                className={`flex items-center gap-2 py-2 px-5 rounded-lg transition ${!isAvailable
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