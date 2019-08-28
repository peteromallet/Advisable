import React from "react";
import NoProjects from "./NoProjects";
import ProjectPending from "./ProjectPending";

const OnHold = ({ invitations }) => {
  if (invitations.length > 0) {
    return <ProjectPending invitation={invitations[0]} />;
  }

  return <NoProjects />;
};

export default OnHold;
