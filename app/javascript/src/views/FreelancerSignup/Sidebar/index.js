import { get } from "lodash-es";
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
      bg="neutral50"
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
