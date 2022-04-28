import React from "react";
import HeaderLogo from "../HeaderLogo";
import Searchbox from "../Searchbox";
import CurrentUser from "./CurrentUser";
import MessagesDropdown from "./MessagesDropdown";
import Notifications from "./Notifications";

export default function ClientHeader() {
  return (
    <div className="w-full flex items-center">
      <HeaderLogo />
      <div className="px-6 flex-1">
        <div className="max-w-[400px]">
          <Searchbox />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <MessagesDropdown />
        <Notifications />
        <CurrentUser />
      </div>
    </div>
  );
}
