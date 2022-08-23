import React from "react";
import HeaderLogo from "../HeaderLogo";
import Searchbox from "../Searchbox";
import CurrentUser from "./CurrentUser";
import HeaderBar from "./HeaderBar";
import HeaderToggle, { useIsCollaborationView } from "./HeaderToggle";
import MessagesDropdown from "./MessagesDropdown";
import MobileMenu from "./MobileMenu";
import Notifications from "./Notifications";

export default function ClientHeader() {
  const isCollaborationView = useIsCollaborationView();

  return (
    <HeaderBar className="gap-4">
      <div className="flex items-center justify-start md:flex-1 gap-4">
        <HeaderLogo />
        <div className="hidden lg:block">
          <HeaderToggle />
        </div>
      </div>

      <div className="flex items-center  flex-1">
        {!isCollaborationView && (
          <div className="w-full md:w-[500px] flex justify-center">
            <Searchbox name="headerSearch" />
          </div>
        )}
      </div>

      <div className="inline-flex md:hidden">
        <MobileMenu />
      </div>

      <div className="hidden md:flex items-center justify-end flex-1 ml-auto gap-3">
        <MessagesDropdown />
        <Notifications />
        <CurrentUser />
      </div>
    </HeaderBar>
  );
}
