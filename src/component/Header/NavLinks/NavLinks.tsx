import React from "react";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import BrandDrawer from "./BrandDrawer";
import CategoryDrawer from "./CategoryDrawer";

const NavLinks: React.FC = () => {
  const baseClasses = "py-2 transition";
  return (
    <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-gray-800">
      <NavItem label="Brand" DrawerComponent={BrandDrawer} className={baseClasses} />
      <NavItem label="Category" DrawerComponent={CategoryDrawer} className={baseClasses} />

      <NavLink
        to="/accessories"
        className={({ isActive }) =>
          `${baseClasses} hover:text-orange-600 ${
            isActive 
              ? "border-orange-600 text-orange-700" 
              : "border-transparent" 
          }`
        }
      >
        Accessories
      </NavLink>

    </nav>
  );
};

export default NavLinks;
