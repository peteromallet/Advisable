import { Menu, X } from "@styled-icons/heroicons-outline";
import React, { useState } from "react";
import { forwardClassName } from "src/utilities/forwardClassName";

export function MobileMenuLink({ children, ...props }) {
  return (
    <a className="block py-3 text-lg" {...props}>
      {children}
    </a>
  );
}

export default function MobileMenu({ children, className }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className={forwardClassName("lg:hidden", className)}
      >
        {open ? (
          <X className="right-5 w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      {open && (
        <div className="fixed inset-0 top-[var(--header-height)] p-5 z-10 bg-white border-t border-solid border-neutral-200">
          <div className="divide-y divide-solid divide-neutral-200">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
