import Header from "../../component/Header/Header";
import Breadcrumb from "../../component/Breadcrumb";
import Footer from "../../component/Footer/Footer";
import Layout from "../../component/Layout"; // 👈 Thêm dòng này
import Aboutus from "../../assets/Aboutus.jpg";

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* 🔝 Header */}
      <Header />
      <Breadcrumb />

      {/* 🌿 Content */}
      <Layout>
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">About Solar Strings</h1>

        {/* --- Main Content --- */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Text content */}
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              <strong>Solar Strings</strong> is a specialty store providing{" "}
              <strong>guitars</strong> and a full range of{" "}
              <strong>musical accessories</strong> for music lovers. Our goal is
              to bring high-quality instruments from reputable brands such as{" "}
              <em>Fender, Gibson, Gretsch, Yamaha</em>, and many more.
            </p>

            <p>
              With a passion for music and creativity, Solar Strings not only
              sells guitars but also offers all related gear such as strings,
              pedals, amplifiers, capos, and professional care accessories to
              help you craft your perfect tone.
            </p>

            <p>
              At Solar Strings, every product is carefully selected to ensure
              top-tier sound quality, durability, and aesthetics. We proudly
              accompany you on your musical journey — from beginners to
              professional artists.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <p className="text-2xl font-bold text-yellow-600">15+</p>
                <p className="text-gray-500 text-sm">Partner Brands</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">5k+</p>
                <p className="text-gray-500 text-sm">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">1.2k+</p>
                <p className="text-gray-500 text-sm">Products</p>
              </div>
            </div>
          </div>

          {/* Right: Overlapping Images */}
          <div className="relative flex justify-center items-center w-full">
            {/* Main large image */}
            <img
              src={Aboutus}
              alt="Main guitar"
              className="rounded-2xl shadow-lg w-[85%] md:w-[80%] object-cover h-80 md:h-96"
            />

            {/* Bottom right image */}
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80"
              alt="Detail guitar"
              className="absolute bottom-0 right-[0%] w-[42%] rounded-xl shadow-md border-4 border-white transform rotate-2 hover:rotate-0 transition duration-300"
            />

            {/* Top left image */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToWlzdZjqc_vvaM4odA5SnN9LzvxTPNvRodw&s"
              alt="Pedal board"
              className="absolute -top-6 left-[10%] w-[38%] rounded-xl shadow-md border-4 border-white transform -rotate-3 hover:rotate-0 transition duration-300"
            />
          </div>
        </div>

        {/* --- Feature Section --- */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Premium Quality",
              desc: "Every instrument is hand-selected for exceptional tone, durability, and craftsmanship.",
            },
            {
              title: "Dedicated Support",
              desc: "Our team is ready to help you find the perfect guitar and gear for your musical journey.",
            },
            {
              title: "Fast Delivery",
              desc: "Nationwide delivery within 3–5 days — secure, reliable, and fast.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-yellow-200 rounded-xl shadow-sm p-5 text-center 
                         hover:shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:border-yellow-400 
                         transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]
                         md:max-w-[350px] mx-auto relative"
            >
              <h4 className="font-semibold text-gray-800 text-lg mb-2 relative z-10 tracking-wide">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed relative z-10 px-1">
                {item.desc}
              </p>
              <div className="mt-4 mx-auto w-12 h-1.5 rounded-full bg-gradient-to-r 
                              from-yellow-400 via-orange-400 to-amber-500 opacity-80 relative z-10"></div>
            </div>
          ))}
        </div>
      </Layout>

      {/* Footer */}
      <Footer />
    </div>
  );
}
