import React from "react";
import { Box } from "@advisable/donut";
import Avatar from "./Avatar";
import Biography from "./Biography";
import ButtonsBar from "./ButtonsBar";
import NameLocation from "./NameLocation";

function Wide({ specialist, isOwner }) {
  return (
    <Box display="flex">
      <Avatar avatar={specialist.avatar} isOwner={isOwner} />
      <Box pt="l" pl={[null, null, "l", "xl"]} width="100%">
        <Box display="flex">
          <NameLocation specialist={specialist} />
          <ButtonsBar isOwner={isOwner} specialist={specialist} />
        </Box>
        <Biography bio={specialist.bio} />
      </Box>
    </Box>
  );
}

export default Wide;
