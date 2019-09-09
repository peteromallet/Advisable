import React from "react";
import { get } from "lodash";
import { Box } from "@advisable/donut";
import Testimonial from "./Testimonial";
import OpenProject from "./OpenProject";

const Sidebar = ({ specialist }) => {
  const invite = get(specialist, "invitations[0]");

  return (
    <Box
      top={0}
      right={0}
      width="40%"
      bg="neutral.0"
      display={{ _: "none", m: "flex" }}
      position="fixed"
      minHeight="100vh"
      alignItems="center"
    >
      <Testimonial />
      {invite && <OpenProject project={invite.project} />}
    </Box>
  );
};

export default Sidebar;
