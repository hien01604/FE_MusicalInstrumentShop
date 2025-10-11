import React from "react";
import FooterInfo from "./FooterInfo";
import FooterLinks from "./FooterLinks";
import Newsletter from "./Newsletter";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-yellow-50 to-white border-t mt-30">
      <div className="max-w-7xl mx-auto px-10 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="justify-self-start">
          <FooterInfo />
        </div>

        <div className="justify-self-center">
          <FooterLinks />
        </div>

        <div className="justify-self-end">
          <Newsletter />
        </div>
      </div>

      <div className="border-t text-center py-3 text-xs text-gray-400 tracking-wide">
        © 2025 <span className="text-yellow-600 font-semibold">Solar Strings</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
