import React from "react";
import NavigationLink from "./NavigationLink";
import Logo from "../Logo";
import Button from "../Button";
import { Link } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import MobileMenu, { MobileMenuLink } from "./MobileMenu";
import { useBreakpoint } from "src/../../../donut/src";

const LINKS = [
  { to: "https://advisable.com/testing/freelancers", label: "Get Featured" },
  { to: "https://advisable.com/testing/clients", label: "Recruit Talent" },
  // { to: "https://advisable.com/testing/pricing", label: "Pricing" },
];

function MobilePublicHeader() {
  return (
    <HeaderBar className="justify-between px-5">
      <MobileMenu className="mr-4">
        <MobileMenuLink href="/clients/join">Sign Up</MobileMenuLink>
        {LINKS.map((link, index) => (
          <MobileMenuLink key={index} href={link.to}>
            {link.label}
          </MobileMenuLink>
        ))}
      </MobileMenu>
      <a href="/">
        <Logo height={20} />
      </a>
      <a href="/login" className="text-neutral-600">
        Login
      </a>
    </HeaderBar>
  );
}

export default function PublicHeader() {
  const isDesktop = useBreakpoint("lUp");

  if (!isDesktop) {
    return <MobilePublicHeader />;
  }

  return (
    <HeaderBar>
      <div className="flex justify-between items-center px-10 mx-auto w-full max-w-[1300px]">
        <div className="flex items-center">
          <a href="/">
            <Logo height={20} />
          </a>

          <div>
            {LINKS.map((link, index) => (
              <NavigationLink key={index} to={link.to}>
                {link.label}
              </NavigationLink>
            ))}
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link to="/login">
            <Button variant="outlined">Login</Button>
          </Link>
          <Link to="/join">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </HeaderBar>
  );
}
