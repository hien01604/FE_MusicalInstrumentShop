import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import Breadcrumb from "../../component/Breadcrumb";
import Layout from "../../component/Layout";
import { MessageSquare, Facebook, Phone, MapPin } from "lucide-react";

const ContactUs: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Breadcrumb />

      <Layout>
        {/* Heading */}
        <div className="text-center mb-3">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#A67C00] to-[#D4AF37] text-transparent bg-clip-text">
            Get in touch with us
          </h1>
          <p className="text-gray-600 mt-2">
            We’d love to hear from you — our support team is ready to assist with any questions.
          </p>
        </div>

        {/* Contact options */}
<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-5">
  {[
    {
      icon: MessageSquare,
      title: "Chat",
      desc: "Speak with our experts 10:00am–7:00pm",
      button: "Open Chat",
    },
    {
      icon: Facebook,
      title: "Messenger",
      desc: "Contact us on Facebook Messenger",
      button: "Open Messenger",
    },
    {
      icon: Phone,
      title: "Phone",
      desc: "+84 909 123 456",
      button: "Call Now",
    },
    {
      icon: MapPin,
      title: "Stores",
      desc: "Find your nearest store and visit us",
      button: "Find a Store",
    },
  ].map((item, i) => (
    <div
      key={i}
      className="h-full bg-white border border-[#E7D7A7] rounded-xl p-6 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md transition"
    >
      {/* Nội dung trên */}
      <div className="flex flex-col items-center">
        <div className="bg-[#E8D3A3]/60 p-3 rounded-full mb-3">
          <item.icon className="w-6 h-6 text-gray-800" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
      </div>

      {/* Button dưới */}
      <button className="mt-6 bg-[#E8D3A3] hover:bg-[#d4b97a] text-gray-800 font-medium px-4 py-2 rounded-lg transition">
        {item.button}
      </button>
    </div>
  ))}
</div>


        {/* Contact form */}
        <div className="max-w-3xl mx-auto bg-white border border-[#E7D7A7] rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
            Or fill out the form below — we’ll get back to you shortly.
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Our friendly Sales & Support Team is here to assist you.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-[#E8D3A3]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-[#E8D3A3]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-[#E8D3A3]"
                placeholder="+84..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-[#E8D3A3]">
                <option>General Inquiry</option>
                <option>Orders & Shipping</option>
                <option>Product Support</option>
                <option>Partnership</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-[#E8D3A3]"
                placeholder="Write your message here..."
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <input type="checkbox" id="subscribe" className="w-4 h-4" />
              <label htmlFor="subscribe" className="text-sm text-gray-700">
                Join our newsletter for exclusive offers and the latest news
              </label>
            </div>

            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="bg-[#E8D3A3] hover:bg-[#d4b97a] text-gray-800 font-semibold px-6 py-2 rounded-lg transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </Layout>

      <Footer />
    </div>
  );
};

export default ContactUs;
