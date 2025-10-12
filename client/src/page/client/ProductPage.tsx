import Header from "../../component/Header/Header";
import Breadcrumb from "../../component/Breadcrumb";
import Footer from "../../component/Footer/Footer";
import ProductCard from "../../component/ProductCard";
import ProductFilterSidebar from "../../component/ProductFilter/ProductFilterSidebar";
import data from "../../sample/sample";
import { useState } from "react";


export default function ProductPage() {
  const allProducts = data.sampleProducts;
  const [filters, setFilters] = useState<any>({});

  // Convert price string "16.830.000₫" → number
  const parsePrice = (price: string) => Number(price.replace(/[^\d]/g, "")) || 0;

  // Filtering logic
  const filtered = allProducts.filter((p: any) => {
    const brandOk = filters.brand ? p.brand === filters.brand : true;
    const categoryOk = filters.category ? p["Category"] === filters.category : true;
    const collectionOk = filters.collection
      ? p["Collection"] === filters.collection
      : true;
    const availabilityOk = filters.availability
      ? p.stock_quantity > 0
      : true;
    const priceOk = filters.priceRange
      ? parsePrice(p.price) >= filters.priceRange[0] &&
        parsePrice(p.price) <= filters.priceRange[1]
      : true;
    return brandOk && categoryOk && collectionOk && availabilityOk && priceOk;
  });

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <Breadcrumb /> 
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-20 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <ProductFilterSidebar products={allProducts} onFilterChange={(f: any) => setFilters((prev: any) => ({ ...prev, ...f }))} />
          </div>

          <section className="md:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-800">Products</h2>
              <p className="text-sm text-gray-500">{filtered.length} items</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
