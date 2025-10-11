import Layout from "../../component/Layout";
import Slider from "../../component/Slider";
import { Link } from "react-router-dom"; 
import ProductLayout from "../../component/BestSellingProduct/ProductLayout";

import PedalBoard from "../../assets/banner/Pedalboard.webp"
import Guitar_Amply from "../../assets/banner/Guitar_Amply.webp"

export default function () {
    return (
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
            <ProductLayout/>
        </Layout>
    )
}