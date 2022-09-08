import React from "react";
import { Link } from "react-router-dom";
import { useBreakpoint } from "src/../../../donut/src";
import { useLogout } from "src/graphql/mutations";
import useViewer from "src/hooks/useViewer";
import Button from "../Button";
import HeaderLogo from "../HeaderLogo";
import Searchbox from "../Searchbox";
import CurrentUser from "./CurrentUser";
import HeaderBar from "./HeaderBar";
import HeaderToggle, { useIsCollaborationView } from "./HeaderToggle";
import MessagesDropdown from "./MessagesDropdown";
import MobileMenu, { MobileMenuLink } from "./MobileMenu";
import Notifications from "./Notifications";

function MobileHeader() {
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

function CollaboratePrompt() {
  const viewer = useViewer();
  if (!viewer?.isSpecialist || viewer.isAccepted) return null;

  return (
    <Link to="/collaborate">
      <Button variant="subtle" to="/collaborate">
        Share your work
      </Button>
    </Link>
  );
}

function DesktopHeader() {
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
        <CollaboratePrompt />
        <MessagesDropdown />
        <Notifications />
        <CurrentUser />
      </div>
    </HeaderBar>
  );
}

export default function AppHeader() {
  const isDesktop = useBreakpoint("lUp");

  if (isDesktop) {
    return <DesktopHeader />;
  }

  return <MobileHeader />;
}
