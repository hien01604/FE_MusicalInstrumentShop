import React, { useState } from "react";

interface NavItemProps {
  label: string;
  DrawerComponent?: React.ComponentType<{ open: boolean; onClose: () => void }>;
}

const NavItem: React.FC<NavItemProps> = ({ label, DrawerComponent }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className="hover:text-orange-600 focus:outline-none transition"
      >
        {label}
      </button>

      {DrawerComponent && <DrawerComponent open={open} onClose={handleClose} />}
    </>
  );
};

export default NavItem;
