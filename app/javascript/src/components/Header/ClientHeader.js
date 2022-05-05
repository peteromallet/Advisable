import React from "react";
import HeaderLogo from "../HeaderLogo";
import Searchbox from "../Searchbox";
import CurrentUser from "./CurrentUser";
import HeaderBar from "./HeaderBar";
import MessagesDropdown from "./MessagesDropdown";
import Notifications from "./Notifications";

export default function ClientHeader() {
  return (
    <HeaderBar>
      <div className="w-full flex items-center">
        <HeaderLogo />
        <div className="px-6 flex-1">
          <div className="hidden md:block max-w-[400px]">
            <Searchbox name="headerSearch" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MessagesDropdown />
          <Notifications />
          <CurrentUser />
        </div>
      </div>
    </HeaderBar>
  );
}
