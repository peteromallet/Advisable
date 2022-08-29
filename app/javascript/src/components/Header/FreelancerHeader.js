import React from "react";
import CurrentUser from "./CurrentUser";
import { useBreakpoint } from "@advisable/donut";
import HeaderLogo from "src/components/HeaderLogo";
import MessagesDropdown from "./MessagesDropdown";
import Notifications from "./Notifications";
import HeaderBar from "./HeaderBar";
import MobileMenu, { MobileMenuLink } from "./MobileMenu";
import { useLogout } from "src/graphql/mutations";
import { StyledNav } from "./styles";
import NavigationLink from "./NavigationLink";

function MobileFreelancerHeader() {
  const logout = useLogout();

  return (
    <HeaderBar className="justify-between px-5">
      <MobileMenu>
        <MobileMenuLink href="/">Dashboard</MobileMenuLink>
        <MobileMenuLink href="/payment_requests">Payments</MobileMenuLink>
        <MobileMenuLink href="/messages">Messages</MobileMenuLink>
        <MobileMenuLink href="/profile">Profile</MobileMenuLink>
        <MobileMenuLink href="/settings">Settings</MobileMenuLink>
        <MobileMenuLink href="#" onClick={logout}>
          Logout
        </MobileMenuLink>
      </MobileMenu>

      <HeaderLogo />

      <Notifications />
    </HeaderBar>
  );
}

function DesktopFreelancerHeader() {
  return (
    <HeaderBar className="px-5">
      <div className="flex gap-4 justify-start items-center">
        <HeaderLogo />
      </div>

      <StyledNav>
        <NavigationLink to="/" exact>
          Dashboard
        </NavigationLink>
        <NavigationLink to="/payment_requests">Payments</NavigationLink>
        <NavigationLink to="/profile">Profile</NavigationLink>
      </StyledNav>

      <div className="flex flex-1 gap-3 justify-end items-center ml-auto">
        <MessagesDropdown />
        <Notifications />
        <CurrentUser />
      </div>
    </HeaderBar>
  );
}

export default function FreelancerHeader() {
  const isDesktop = useBreakpoint("lUp");

  if (isDesktop) {
    return <DesktopFreelancerHeader />;
  }

  return <MobileFreelancerHeader />;
}
