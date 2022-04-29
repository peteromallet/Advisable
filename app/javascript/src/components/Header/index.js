import React from "react";
import { useBreakpoint } from "@advisable/donut";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import useViewer from "src/hooks/useViewer";
import ClientHeader from "./ClientHeader";

export default function Header() {
  const viewer = useViewer();
  const isDesktop = useBreakpoint("mUp");

  if (viewer?.isClient) return <ClientHeader />;

  return isDesktop ? <DesktopHeader /> : <MobileHeader />;
}
