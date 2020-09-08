import React from "react";
import { useBreakpoint } from "@advisable/donut";
import MobileLoading from "./MobileLoading";
import DesktopLoading from "./DesktopLoading";

function Loading() {
  const isDesktop = useBreakpoint("mUp");
  return isDesktop ? <DesktopLoading /> : <MobileLoading />;
}

export default Loading;
