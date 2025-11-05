import type { IProduct } from "../types/product.type";
import ProductCard from "./ProductCard";

interface ProductListGridProps {
  products: IProduct[];
}

export default function ProductListGrid({ products }: ProductListGridProps) {
  return (
    <div
      className="grid gap-6
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
