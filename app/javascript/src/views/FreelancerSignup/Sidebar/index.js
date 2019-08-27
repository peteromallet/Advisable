import React from "react";
import { get } from "lodash";
import { Sidebar as SidebarStyles } from "./styles";
import Testimonial from "./Testimonial";
import OpenProject from "./OpenProject";

const Sidebar = ({ specialist }) => {
  console.log(specialist);
  const invite = get(specialist, "invitations[0]");

  return (
    <SidebarStyles>
      <Testimonial />
      {invite && <OpenProject project={invite.project} />}
    </SidebarStyles>
  );
};

export default Sidebar;
