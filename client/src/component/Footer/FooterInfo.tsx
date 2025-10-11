import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const FooterInfo: React.FC = () => {
  return (
    <div className="space-y-3 max-w-sm">
      <h2 className="text-lg font-semibold text-gray-800">Solar Strings</h2>
      <p className="text-sm text-gray-600">
        Solar Strings is a leading musical instrument store, specializing in authentic guitars, pianos, drums,
        and professional audio equipment. We bring the power of music closer to you.
      </p>
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <MapPin className="w-4 h-4 mt-1 text-yellow-600" />
        <span>81 Green St, Huntington, Ontario, NY 11743, USA</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Mail className="w-4 h-4 text-yellow-600" />
        <span>example@gmail.com</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Phone className="w-4 h-4 text-yellow-600" />
        <span>+91 123 4567890</span>
      </div>
    </div>
  );
};

export default FooterInfo;
