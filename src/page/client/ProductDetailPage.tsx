import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import Breadcrumb from "../../component/Breadcrumb";
import ProductDetailLayout from "../../component/ProductDetail/ProductDetailLayout";
import ProductLayout from "../../component/BestSellingProduct/ProductLayout";
import Layout from "../../component/Layout";
import { getDetailProductAPI } from "../../services/client/product.api";
import type { IProduct } from "../../types/product.type";

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const initialProduct = (location.state as { productData?: IProduct })?.productData;

  const [product, setProduct] = useState<IProduct | undefined>(initialProduct);
  const [isLoading, setIsLoading] = useState(!initialProduct);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    
    if (!slug) return;
        
    const fetchDetail = async () => {
      if (!initialProduct) {
        setIsLoading(true);
      }
      try {
        const response = await getDetailProductAPI(slug);
        if (response) {
          setProduct(response);         
        } else {          
          setError('Không tìm thấy sản phẩm.');          
          setProduct(undefined);
        }
      } catch (e) {       
        setError('Lỗi khi tải chi tiết sản phẩm.');      
        setProduct(undefined);    
      } finally {
        setIsLoading(false);      
      }
    };

    fetchDetail();

  }, [slug]);

  if (isLoading) {
        return (
            <>
                <Header />
                <div className="text-center py-20 text-gray-600">
                    Đang tải chi tiết sản phẩm... ⏳
                </div>
                <Footer />
            </>
        );
    }
    
    if (error || !product) {
        return (
            <>
                <Header />
                <div className="text-center py-20 text-gray-600">
                    {error || "Sản phẩm không tồn tại 😢"}
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            {/* 🧭 Header */}
            <Header />

            {/* 📍 Breadcrumb */}
            <Breadcrumb />

            {/* 📦 Nội dung chính */}
            <Layout>
                <ProductDetailLayout product={product} />

                {/* Sản phẩm liên quan */}
                <ProductLayout /> 
            </Layout>

            {/* 🦶 Footer */}
            <Footer />
        </>
    );
};

export default ProductDetailPage;
