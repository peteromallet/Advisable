import React from "react";
import { useBreakpoint } from "src/../../../donut/src";
import { useLogout } from "src/graphql/mutations";
import HeaderLogo from "../HeaderLogo";
import Searchbox from "../Searchbox";
import CurrentUser from "./CurrentUser";
import HeaderBar from "./HeaderBar";
import HeaderToggle, { useIsCollaborationView } from "./HeaderToggle";
import MessagesDropdown from "./MessagesDropdown";
import MobileMenu, { MobileMenuLink } from "./MobileMenu";
import Notifications from "./Notifications";

function MobileClientHeader() {
  const logout = useLogout();
  return (
    <HeaderBar className="justify-between px-5">
      <MobileMenu>
        <div className="mb-5">
          <Searchbox name="headerSearch" />
        </div>
        <MobileMenuLink href="/">Discover</MobileMenuLink>
        <MobileMenuLink href="/payment_requests">Collaborate</MobileMenuLink>
        <MobileMenuLink href="/messages">Messages</MobileMenuLink>
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

function DesktopClientHeader() {
  const isCollaborationView = useIsCollaborationView();

  return (
    <HeaderBar className="gap-4 px-5">
      <div className="flex flex-1 gap-4 justify-start items-center">
        <HeaderLogo />
        <HeaderToggle />
      </div>

      <div className="flex flex-1 items-center">
        {!isCollaborationView && (
          <div className="flex justify-center w-[500px]">
            <Searchbox name="headerSearch" />
          </div>
        )}
      </div>

      <div className="flex flex-1 gap-3 justify-end items-center ml-auto">
        <MessagesDropdown />
        <Notifications />
        <CurrentUser />
      </div>
    </HeaderBar>
  );
}

export default function ClientHeader() {
  const isDesktop = useBreakpoint("lUp");

  if (isDesktop) {
    return <DesktopClientHeader />;
  }

  return <MobileClientHeader />;
}
