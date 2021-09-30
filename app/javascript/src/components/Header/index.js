import React from "react";
import { useBreakpoint } from "@advisable/donut";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  const isDesktop = useBreakpoint("mUp");
  return isDesktop ? <DesktopHeader /> : <MobileHeader />;
}
