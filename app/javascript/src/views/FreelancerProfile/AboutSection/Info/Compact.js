import React from "react";
import { Box } from "@advisable/donut";
import Avatar from "./Avatar";
import Biography from "./Biography";
import ButtonsBar from "./ButtonsBar";
import NameLocation from "./NameLocation";

function Compact({ specialist, isOwner }) {
  return (
    <Box>
      <Box display="flex">
        <Avatar avatar={specialist.avatar} isOwner={isOwner} />
        <ButtonsBar isOwner={isOwner} specialist={specialist} />
      </Box>
      <Box pt="m" pl={["s", "l"]} width="100%">
        <NameLocation specialist={specialist} />
        <Biography bio={specialist.bio} />
      </Box>
    </Box>
  );
}

export default Compact;
