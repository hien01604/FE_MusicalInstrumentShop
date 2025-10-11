import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import Fender from "../assets/brand/Fender.avif"
import Elixir from "../assets/brand/Elixir.avif"
import Heritage from "../assets/brand/Heritage.avif"
import Hotone from "../assets/brand/Hotone.webp"
import Ibanez from "../assets/brand/Ibanez.avif"
import Marshall from "../assets/brand/Marshall.avif"
import Martin from "../assets/brand/Martin.avif"
import PRS from "../assets/brand/PRS.avif"
import Squier from "../assets/brand/Squier.avif"


const brandLogos = [
    { image: Fender, brand: 'Fender' },
    { image: Elixir, brand: 'Elixir' },
    { image: Heritage, brand: 'Heritage' },
    { image: Hotone, brand: 'Hotone' },
    { image: Ibanez, brand: 'Ibanez' },
    { image: Marshall, brand: 'Marshall' },
    { image: Martin, brand: 'Martin' },
    { image: PRS, brand: 'PRS' },
    { image: Squier, brand: 'Squier' },
];

const brandSliderStyles = `
    .brand-swiper-container .swiper-button-prev,
    .brand-swiper-container .swiper-button-next {
        --swiper-navigation-color: #A0AEC0; 
        --swiper-navigation-size: 20px;
        top: 65%;
        transform: translateY(-50%);
    }
    .brand-swiper-container .swiper-button-prev:after,
    .brand-swiper-container .swiper-button-next:after {
        font-size: 1.25rem !important; 
    }
    .brand-swiper-container .swiper-button-prev,
    .brand-swiper-container .swiper-button-next {
        background-image: none !important;
    }
`;

export default function BrandSlider() {
    return (
        <div className='container mx-auto  brand-swiper-container'>
            
            <style dangerouslySetInnerHTML={{ __html: brandSliderStyles }} />
            
            <hr className="border-gray-300" /> 

            <Swiper
                modules={[Navigation]}
                
                breakpoints={{
                    0: { slidesPerView: 4, spaceBetween: 15 }, 
                    768: { slidesPerView: 8, spaceBetween: 30 },
                    1024: { slidesPerView: 8, spaceBetween: 40 },
                }}
                
                navigation
                loop={true} 
                
                className="w-full h-20"
            >
                {brandLogos.map((brand, index) => (
                    <SwiperSlide key={index}> 
                        <div className="flex items-center justify-center h-full">
                            <img
                                src={brand.image}
                                alt={brand.brand}
                                className="w-auto max-h-24 object-contain opacity-60 hover:opacity-100 transition duration-300" 
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            <hr className="border-gray-300" /> 
            
        </div>
    );
}