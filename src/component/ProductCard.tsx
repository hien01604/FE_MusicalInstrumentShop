import { Link } from "react-router-dom";
import type { IProduct } from "../types/product.type";

export type BestSellingProduct = {
  id: number;
  slug: string;
  productName: string;
  priceDisplay: string;
  imageUrl: string | null;
};

type ProductLike = IProduct | BestSellingProduct;

interface ProductCardProps {
  product: ProductLike;
}

function isBestSelling(p: ProductLike): p is BestSellingProduct {
  return "productName" in p; // best-selling có field productName
}

export default function ProductCard({ product }: ProductCardProps) {
  const brandName = isBestSelling(product) ? "Best seller" : product.brand?.name || "Brand không rõ";

  const name = isBestSelling(product) ? product.productName : product.product_name || "Sản phẩm không tên";
  const price = isBestSelling(product) ? product.priceDisplay : product.price_display || "Liên hệ";

  const image = isBestSelling(product)
    ? product.imageUrl || "/default-image.png"
    : product.images?.[0]?.image_url || "/default-image.png";

  const outOfStock = isBestSelling(product) ? false : product.stock_quantity <= 0;

  return (
    <div className="group bg-white p-3 border border-gray-100 rounded-xl shadow-sm cursor-pointer h-full flex flex-col hover:shadow-md transition-all">
      <Link to={`/products/${product.slug}`} state={{ productData: product }} className="flex flex-col flex-grow">
        <div className="relative mb-3 aspect-square overflow-hidden flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {outOfStock && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Hết hàng
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-1.5 p-1 flex-grow">
          <p className="text-gray-500 text-xs">{brandName}</p>
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2 leading-tight flex-grow">
            {name}
          </h3>
          <div className="flex items-end pt-1">
            <p className="text-xl font-bold text-red-600">{price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
