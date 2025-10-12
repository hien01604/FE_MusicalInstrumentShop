import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
<nav
  className="max-w-7xl mx-auto w-full px-4 py-4 md:px-6 lg:px-20 text-sm text-gray-600 border-b border-gray-200 pb-3"
  aria-label="Breadcrumb"
>
  <ol className="flex items-center space-x-2">
    <li>
      <Link to="/" className="hover:text-yellow-600 font-medium">
        Home
      </Link>
    </li>
    {pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;
      const label = name.charAt(0).toUpperCase() + name.slice(1);
      return (
        <li key={routeTo} className="flex items-center">
          <span className="ml-0 mr-2 text-gray-400">/</span>
          {isLast ? (
            <span className="text-yellow-700 font-semibold">{label}</span>
          ) : (
            <Link to={routeTo} className="hover:text-yellow-600 font-medium">
              {label}
            </Link>
          )}
        </li>
      );
    })}
  </ol>
</nav>

  );  
};

export default Breadcrumb;
