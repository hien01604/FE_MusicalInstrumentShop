import { useState } from "react";
import data from '../../sample/sample';
import ProductGrid from './ProductGrid';
import ProductTab from "./ProductTab"

export default function ProductLayout() {
    const [activeTab, setActiveTab] = useState('electric');
    const sampleProducts = data.sampleProducts;

    return (
        <>
            <h2 className="text-xl font-bold text-[#2c3e50] md:text-xl">
                Best Selling Product
            </h2>
            <ProductTab activeTab={activeTab} setActiveTab={setActiveTab} />
            <ProductGrid products={sampleProducts}></ProductGrid>
        </>
    )
}