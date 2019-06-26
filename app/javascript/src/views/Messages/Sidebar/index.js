import React from "react";
import ClientSidebar from "./ClientSidebar";
import useViewer from "../../../hooks/useViewer";
import { useBreakpoint } from "@advisable/donut";
import SpecialistSidebar from "./SpecialistSidebar";
import { Sidebar as SidebarStyles } from "../styles";

const Sidebar = props => {
  const viewer = useViewer();
  const isMobile = useBreakpoint("m");

  if (isMobile) return null;

  return (
    <SidebarStyles>
      {viewer.__typename === "User" ? (
        <ClientSidebar {...props} />
      ) : (
        <SpecialistSidebar {...props} />
      )}
    </SidebarStyles>
  );
};

export default Sidebar;
