import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import Breadcrumb from "../../component/Breadcrumb";
import Layout from "../../component/Layout";
import {
  Truck,
  MapPin,
  DollarSign,
  Clock,
  Package,
  Phone,
  Info,
} from "lucide-react";

const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="h-full bg-[#FAF8F3] border border-[#E7D7A7] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center gap-3 mb-3">
      <div className="bg-[#E8D3A3] p-2 rounded-lg">
        <Icon className="w-5 h-5 text-gray-800" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="text-gray-700 leading-relaxed">{children}</div>
  </div>
);

const DeliveryInformation: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Breadcrumb />

      <Layout>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#A67C00] to-[#D4AF37] text-transparent bg-clip-text">
            Delivery Information
          </h1>
          <p className="text-gray-600">
            Learn more about our shipping options, fees, and delivery timeframes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-3 items-stretch">
  {[
    {
      icon: Truck,
      title: "1. Delivery Options",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Standard Delivery (3–5 working days)</li>
          <li>Express Delivery (1–2 working days for selected cities)</li>
          <li>Store Pickup after confirmation email</li>
        </ul>
      ),
    },
    {
      icon: MapPin,
      title: "2. Delivery Areas",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Free shipping in Ho Chi Minh City for orders over 1,000,000 VND</li>
          <li>Other provinces: shipping fee based on distance & weight</li>
          <li>Remote areas may take longer delivery time</li>
        </ul>
      ),
    },
    {
      icon: DollarSign,
      title: "3. Shipping Fees",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>Accessories: 30,000 – 50,000 VND</li>
          <li>Instruments: 80,000 – 150,000 VND</li>
          <li>Free delivery on orders over 2,000,000 VND</li>
        </ul>
      ),
    },
    {
      icon: Clock,
      title: "4. Delivery Time",
      content: (
        <p>
          Orders placed before <b>3 PM</b> are processed the same day. Delivery
          takes <b>3–5 business days</b> nationwide. Orders placed on weekends or
          holidays are processed the next working day.
        </p>
      ),
    },
    {
      icon: Package,
      title: "5. Packaging & Handling",
      content: (
        <p>
          All instruments are carefully inspected, tuned, and securely packaged
          before shipment to ensure safety during transit.
        </p>
      ),
    },
    {
      icon: Phone,
      title: "6. Tracking & Support",
      content: (
        <>
          <p>
            Once your order is shipped, you will receive a tracking link via
            email or SMS.
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Hotline: 0909 xxx xxx</li>
            <li>Email: support@solarstrings.vn</li>
          </ul>
        </>
      ),
    },
    {
      icon: Info,
      title: "7. Notes",
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li>We currently do not ship internationally.</li>
          <li>
            If an item is out of stock, our staff will contact you to confirm the
            restock date or offer an alternative.
          </li>
        </ul>
      ),
    },
  ].map((section, index, arr) => (
    <div key={section.title} className={index === arr.length - 1 ? "md:col-span-2" : ""}>
      <SectionCard icon={section.icon} title={section.title}>
        {section.content}
      </SectionCard>
    </div>
  ))}
</div>

        
      </Layout>

      <Footer />
    </div>
  );
};

export default DeliveryInformation;
