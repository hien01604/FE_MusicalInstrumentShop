import React, { useState, type ChangeEvent } from "react";
import { Search } from "lucide-react";
import type { ISearchResponse } from "../../types/product.type";
import { searchAPI } from "../../services/client/product.api";
import { useDebounce } from "../../hooks/useRebounce";

const SearchBar: React.FC = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<ISearchResponse>({
    collections: [],
    products: [],
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const debouncedSearch = useDebounce(async (q: string) => {
    if (!q.trim()) {
      setResults({ collections: [], products: [] });
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const data: ISearchResponse = await searchAPI(q);
      setResults(data);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValue(text);
    debouncedSearch(text);
  };

  const handleFocus = () => {
    if (
      (results.collections.length > 0 || results.products.length > 0) &&
      value.trim()
    ) {
      setOpen(true);
    }
  };

  const handleBlur = () => {
    // cho chút thời gian click vào item, xong hãy đóng
    setTimeout(() => setOpen(false), 150);
  };

  const hasResults =
    results.collections.length > 0 || results.products.length > 0;



  return (
    <div className="relative inline-block">
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-[300px] sm:w-[400px] md:w-[410px] shadow-sm focus-within:ring-2 focus-within:ring-yellow-500 transition">
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for instruments..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {open && (loading || results) && (
          <div className="absolute left-0 top-full mt-[2px] w-full bg-[#FFF9E6] border border-[#d2bf9b] rounded-sm shadow-md z-50">
            {loading && (
              <div className="px-3 py-2 text-sm text-[#8A6C22]">
                Searching...
              </div>
            )}

            {!loading && !hasResults && (
              <div className="px-3 py-2 text-sm text-[#8A6C22]">
                No results
              </div>
            )}
            {!loading && hasResults && (
              <>
                <div className="px-3 py-1 text-sm font-semibold text-[#8A6C22] bg-[#F6E3AE] border-b border-[#D1A960]">
                  Collection
                </div>
                {results.collections.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="w-full text-left px-3 py-1.5 text-sm hover:bg-[#F4E4B6] border-b border-[#E9D7A4] last:border-b-0"
                  >
                    <span className="font-semibold">{c.name}</span>
                  </button>
                ))}
                <div className="px-3 py-1 text-sm font-semibold text-[#8A6C22] bg-[#F6E3AE] border-b border-[#D1A960]">
                  Products
                </div>
                {results.products.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="w-full text-left px-3 py-1.5 text-sm hover:bg-[#F4E4B6] border-b border-[#E9D7A4] last:border-b-0"
                  >
                    <span className="font-semibold">{p.product_name}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
