import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import Breadcrumb from "../../component/Breadcrumb";
import ProductDetailLayout from "../../component/ProductDetail/ProductDetailLayout";
import productData from "../../sample/sample";
import ProductLayout from "../../component/BestSellingProduct/ProductLayout";
import Layout from "../../component/Layout";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = productData.sampleProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-gray-600">
          Product not found 😢
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
        <Breadcrumb />

      {/* Main Content (Layout Wrapper) */}
      <Layout>
        {/* Product Detail */}
        <ProductDetailLayout product={product} />

        {/* Best Selling / Related Products */}
          <ProductLayout />
      </Layout>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductDetailPage;
