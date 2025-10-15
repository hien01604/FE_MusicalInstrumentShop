import { Link } from "react-router-dom";

export default function FooterLinks() {
  return (
    <div className="flex flex-col gap-1 text-sm text-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Company</h3>
      <Link to="/about-us" className="hover:text-yellow-600 transition">About Us</Link>
      <Link to="/delivery-information" className="hover:text-yellow-600 transition">Delivery Information</Link>
      <Link to="/privacy-policy" className="hover:text-yellow-600 transition">Privacy Policy</Link>
      <Link to="/terms-and-conditions" className="hover:text-yellow-600 transition">Terms & Conditions</Link>
      <Link to="/contact-us" className="hover:text-yellow-600 transition">Contact Us</Link>
    </div>
  );
}
