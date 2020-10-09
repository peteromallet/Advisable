import React from "react";
import RequestTalkButton from "./RequestTalkButton";
import IconLink from "./IconLink";
import { LinkedinIn } from "@styled-icons/fa-brands";
import { Link as LinkIcon } from "@styled-icons/feather";
import EditInfo from "./EditInfo";
import useViewer from "src/hooks/useViewer";
import { Box } from "@advisable/donut";

function ButtonsBar({ isOwner, specialist }) {
  const viewer = useViewer();
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      ml="auto"
      mt={{ _: "l", s: "l", m: 0 }}
      mr={{ l: "m", s: "12px" }}
    >
      {specialist.linkedin && (
        <IconLink url={specialist.linkedin} Icon={LinkedinIn} />
      )}
      {specialist.website && (
        <IconLink url={specialist.website} Icon={LinkIcon} strokeWidth={2} />
      )}
      {isOwner && <EditInfo specialist={specialist}>Edit Info</EditInfo>}
      {!isOwner && viewer && (
        <RequestTalkButton id={specialist.id}>Request a talk</RequestTalkButton>
      )}
    </Box>
  );
}

export default ButtonsBar;
