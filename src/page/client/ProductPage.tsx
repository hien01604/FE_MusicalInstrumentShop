import Header from "../../component/Header/Header";
import Breadcrumb from "../../component/Breadcrumb";
import Footer from "../../component/Footer/Footer";
import ProductCard from "../../component/ProductCard";
import ProductFilterSidebar from "../../component/ProductFilter/ProductFilterSidebar";
import data from "../../sample/sample";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getBrandBySlugAPI, getCategoryBySlugAPI } from "../../services/client/product.api";
import type { IProduct } from "../../types/product.type";


export default function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = data.sampleProducts;
  const [filters, setFilters] = useState<any>({});

  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageTitle, setPageTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const page = parseInt(searchParams.get("page") || "1");


  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();
  const isBrandRoute = location.pathname.includes('/products/brands/');
  const isCategoryRoute = location.pathname.includes('/products/categories/');

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let response;
        if (isBrandRoute) {
          response = await getBrandBySlugAPI(slug!, page, 64);
        }
        else if (isCategoryRoute) {
          response = await getCategoryBySlugAPI(slug!, page, 64);
        }
        if (response) {
          setProducts(response.data || []);
          setTotalPages(response.totalPages || 1);
          setTotalItems(response.total || 0);
          setPageTitle(response.entityName || "Products");
        }
      }
      catch (error) {
        console.error("Failed to fetch products:", error);
      }
      finally {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    fetchProducts();
  }, [slug, isBrandRoute, isCategoryRoute, page])

  // Convert price string "16.830.000₫" → number
  const parsePrice = (price: string) => Number(price.replace(/[^\d]/g, "")) || 0;

  const filtered = products.filter((p: any) => {
    // Giữ nguyên các filters từ Sidebar
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

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Nếu nhiều trang, xử lý dấu "..."
      if (page <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-20 mt-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <ProductFilterSidebar products={allProducts} onFilterChange={(f: any) => setFilters((prev: any) => ({ ...prev, ...f }))} />
          </div>

          <section className="md:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-800">
                {isLoading ? "Loading..." : pageTitle}
              </h2>
              <p className="text-sm text-gray-500">
                Total {totalItems} items
              </p>
            </div>

            {isLoading ? (
              <div className="h-64 flex items-center justify-center">Loading...</div>
            ) :
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center py-10 text-gray-500">No products found.</div>
                )}

                {products.length > 0 && totalPages > 1 && (
                  <div className="flex flex-col items-center my-6">
                    <div className="flex text-gray-700">

                      {/* Previous button */}
                      <div
                        onClick={() => page > 1 && handlePageChange(page - 1)}
                        className={`h-12 w-12 mr-1 flex justify-center items-center cursor-pointer transition duration-150 ease-in 
          ${page === 1 ? 'cursor-not-allowed' : ''}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left w-6 h-6">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </div>

                      <div className="flex h-12 font-medium rounded-full">

                        {renderPageNumbers().map((pageNum, index) => {
                          if (pageNum === "...") {
                            return (
                              <div key={`dots-${index}`} className="w-12 md:flex justify-center items-center hidden cursor-default leading-5">
                                ...
                              </div>
                            );
                          }
                          return (
                            <div
                              key={pageNum}
                              onClick={() => handlePageChange(Number(pageNum))}
                              className={`w-12 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in
                ${page === pageNum ? 'font-bold text-yellow-600' : 'hover:opacity-80'}`}
                            >
                              {pageNum}
                            </div>
                          );
                        })}
                      </div>

                      {/* Next button */}
                      <div
                        onClick={() => page < totalPages && handlePageChange(page + 1)}
                        className={`h-12 w-12 ml-1 flex justify-center items-center cursor-pointer transition duration-150 ease-in 
          ${page === totalPages ? 'cursor-not-allowed' : ''}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right w-6 h-6">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>

                    </div>
                  </div>
                )}
              </>
            }
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
