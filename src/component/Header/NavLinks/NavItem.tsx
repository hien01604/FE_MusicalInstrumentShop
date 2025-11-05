import React, { useState } from "react";

interface NavItemProps {
  label: string;
  DrawerComponent?: React.ComponentType<{ open: boolean; onClose: () => void }>;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, DrawerComponent, className }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className={`hover:text-orange-600 focus:outline-none transition ${className || ''}`}
      >
        {label}
      </button>

      {DrawerComponent && <DrawerComponent open={open} onClose={handleClose} />}
    </>
  );
};

export default NavItem;
