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
      <div className="flex items-center justify-start flex-1">
        <HeaderLogo />
      </div>

      <div className="flex items-center justify-center flex-1">
        <div className="w-[500px] flex justify-center">
          <Searchbox name="headerSearch" />
        </div>
      </div>

      <div className="flex items-center justify-end flex-1 ml-auto gap-3">
        <MessagesDropdown />
        <Notifications />
        <CurrentUser />
      </div>
    </HeaderBar>
  );
}
