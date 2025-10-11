import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks/NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

const Header: React.FC = () => {
  return (
    <header className="bg-[#FFE6C1] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Menu */}
        <NavLinks />

        {/* Search */}
        <SearchBar />

        {/* User */}
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
