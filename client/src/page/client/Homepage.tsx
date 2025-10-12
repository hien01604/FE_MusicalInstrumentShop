import Layout from "../../component/Layout";
import Slider from "../../component/Slider";
import { Link } from "react-router-dom"; 
import ProductLayout from "../../component/BestSellingProduct/ProductLayout";
import BrandSlider from "../../component/BrandSlider";
import Header from "../../component/Header/Header";
import Breadcrumb from "../../component/Breadcrumb";
import Footer from "../../component/Footer/Footer";

import PedalBoard from "../../assets/banner/Pedalboard.webp"
import Guitar_Amply from "../../assets/banner/Guitar_Amply.webp"

export default function () {
    return (
        <>
            <Header/>
            <Breadcrumb />
        <Layout>
            <Slider />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                    to="/" 
                    className="block rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 hover:scale-[1.02]"
                >
                    <img 
                        src={PedalBoard} 
                        alt="Pedalboards cho Mọi Setup" 
                        className="w-full object-cover"
                    />
                </Link>
                <Link 
                    to="/"
                    className="block rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 hover:scale-[1.02]"
                >
                    <img 
                        src={Guitar_Amply}
                        alt="Giảm đến 20% cho Guitar và Amply"
                        className="w-full object-cover"
                    />
                </Link>
            </div>
            <ProductLayout />
            <h2 className="text-xl font-bold text-[#2c3e50] md:text-xl">
                Shop by brand
            </h2>
            <BrandSlider/>
        </Layout>
        <Footer/>
        </>
    )
}