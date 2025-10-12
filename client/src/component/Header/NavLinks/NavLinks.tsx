import React from "react";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import BrandDrawer from "./BrandDrawer";
import CategoryDrawer from "./CategoryDrawer";

const NavLinks: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-gray-800">
      {/* Drawer-based menu items */}
      <NavItem label="Brand" DrawerComponent={BrandDrawer} />
      <NavItem label="Category" DrawerComponent={CategoryDrawer} />

      {/* Regular route link */}
      <NavLink
        to="/accessories"
        className={({ isActive }) =>
          `hover:text-orange-600 border-b-2 transition ${
            isActive ? "border-orange-600 text-orange-700" : "border-transparent"
          }`
        }
      >
        Accessories
      </NavLink>

      {/* 🆕 Product link */}
      <NavLink
        to="/product"
        className={({ isActive }) =>
          `hover:text-orange-600 border-b-2 transition ${
            isActive ? "border-orange-600 text-orange-700" : "border-transparent"
          }`
        }
      >
        Product
      </NavLink>
    </nav>
  );
};

export default NavLinks;
