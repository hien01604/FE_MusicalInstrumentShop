import React from "react";

const FooterLinks: React.FC = () => {
  const links = ["About Us", "Delivery Information", "Privacy Policy", "Terms & Conditions", "Contact Us"];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center md:text-left">Company</h3>
      <ul className="space-y-2 text-sm text-gray-600 text-center md:text-left">
        {links.map((link) => (
          <li key={link} className="hover:text-yellow-600 cursor-pointer transition-colors">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
