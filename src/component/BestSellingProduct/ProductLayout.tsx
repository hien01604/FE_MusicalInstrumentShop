import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import ProductTab from "./ProductTab"
import { getTop10Products } from '../../services/client/product.api';

type TabId = "electric" | "acoustic" | "bass";

type BestSellingProduct = {
    id: number;
    slug: string;
    productName: string;
    priceDisplay?: string;
    priceNumeric?: number;
    imageUrl?: string | null;
    sold?: number;
};

const TAB_TO_SLUG: Record<TabId, string> = {
    electric: "electric-guitars",
    acoustic: "acoustic-guitars",
    bass: "bass-guitars",
};

export default function ProductLayout() {
    const [activeTab, setActiveTab] = useState<TabId>("electric");
    const [products, setProducts] = useState<BestSellingProduct[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const slug = TAB_TO_SLUG[activeTab];

        (async () => {
            setLoading(true);
            try {
                const data = await getTop10Products(slug);

                if (mounted) setProducts(Array.isArray(data) ? data : []);
            } catch (e) {
                if (mounted) setProducts([]);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [activeTab]);

    return (
        <>
            <h2 className="text-xl font-bold text-[#2c3e50] md:text-xl">
                Best Selling Product
            </h2>
            <ProductTab activeTab={activeTab} setActiveTab={setActiveTab} />
            <ProductGrid products={products} loading={loading} />
        </>
    )
}