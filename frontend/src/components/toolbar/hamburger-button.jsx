"use client";

import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";

export const HamburgerButton = () => {
  const { isMenuOpen, toggleMenu } = useStore(
    (state) => ({
      isMenuOpen: state.isMenuOpen,
      toggleMenu: state.toggleMenu,
    }),
    shallow,
  );

  return (
    <Button
      variant="outline"
      size="icon"
      className="lg:hidden"
      onClick={toggleMenu}
    >
      {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </Button>
  );
};
