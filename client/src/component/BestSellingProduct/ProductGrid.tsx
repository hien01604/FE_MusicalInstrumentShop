import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type SwiperCore from 'swiper';

import ProductCard from "../ProductCard";

export interface SimpleProduct {
    id: number;
    name: string;
    price: string;
    image: string[];
    status: 'Có hàng' | 'Hết hàng';
    brand?: string;
    description: string;
}

interface ProductGridProps {
    products: SimpleProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    
    const swiperRef = useRef<SwiperCore | null>(null); 

    const swiperCustomStyles = `
        .product-grid-swiper-container .swiper-button-prev,
        .product-grid-swiper-container .swiper-button-next {
            --swiper-navigation-size: 28px;
            --swiper-navigation-color: #9CA3AF;
            margin-top: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        .product-grid-swiper-container .swiper-button-prev:after,
        .product-grid-swiper-container .swiper-button-next:after {
            font-size: 1.5rem !important;
        }
        .product-grid-swiper-container .swiper-button-prev,
        .product-grid-swiper-container .swiper-button-next {
            background-image: none !important;
        }
    `;

    return (
        <div className="relative product-grid-swiper-container">
            
            <style dangerouslySetInnerHTML={{ __html: swiperCustomStyles }} />
            
            <Swiper
                modules={[Navigation]} 
                breakpoints={{
                    0: { slidesPerView: 1.2, spaceBetween: 16 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 24 },
                }}
                navigation 
                className="w-full product-grid-swiper h-full"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}> 
                        <ProductCard product={product} /> 
                    </SwiperSlide>
                ))}
            </Swiper>
            
            <button
                onClick={() => swiperRef.current?.slidePrev()} 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 
                           w-8 h-8 bg-white border border-gray-100 rounded-full shadow-md 
                           flex items-center justify-center cursor-pointer 
                           text-gray-500 hover:text-gray-700 hover:shadow-lg transition duration-150"
                aria-label="Previous slide"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            <button
                onClick={() => swiperRef.current?.slideNext()} 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 
                           w-8 h-8 bg-white border border-gray-100 rounded-full shadow-md 
                           flex items-center justify-center cursor-pointer 
                           text-gray-500 hover:text-gray-700 hover:shadow-lg transition duration-150"
                aria-label="Next slide"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    );
}