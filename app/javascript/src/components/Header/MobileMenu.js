import { Menu, X } from '@styled-icons/heroicons-outline';
import React, { useState } from 'react';
import { useLogout } from 'src/graphql/mutations';

function MobileMenuLink({ children, ...props }) {
  return (
    <a className="text-lg py-3 block" {...props}>
      {children}
    </a>
  )
}

export default function MobileMenu() {
  const logout = useLogout();
  const [open, setOpen] = useState(false);

  const toggleMenu = e => {
    e.preventDefault();
    setOpen(!open)
  }

  return (
    <>
      <button onClick={toggleMenu}>
        <Menu className="w-6 h-6" />
      </button>
      {open && (
        <div className="fixed inset-0 bg-white p-5 pt-10">
          <button onClick={toggleMenu}>
            <X className="w-6 h-6 absolute top-5 right-5" />
          </button>
          <div className="divide-y divide-solid divide-neutral-200">
            <MobileMenuLink href="/">
              Discover
            </MobileMenuLink>
            <MobileMenuLink href="/messages">
              Messages
            </MobileMenuLink>
            <MobileMenuLink href="/payment_requests">
              Payments
            </MobileMenuLink>
            <MobileMenuLink href="/settings">
              Settings
            </MobileMenuLink>
            <MobileMenuLink href="#" onClick={logout}>
              Logout
            </MobileMenuLink>
          </div>
        </div>
      )}
    </>
  );
}
