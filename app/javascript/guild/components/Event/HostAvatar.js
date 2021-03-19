import React from "react";
import styled from "styled-components";
import { Box, Tag, Text, Avatar } from "@advisable/donut";

const StyledHostAvatar = styled(Box)`
  position: relative;
`;

const StyledHostTag = styled(Tag)`
  width: 50px;
  height: 24px;
  bottom: -10px;
  position: absolute;
  align-items: center;
  border-radius: 12px;
  justify-content: center;
  border: 3px solid white;
`;

export default function HostAvatar({ host, variant = "orange", ...props }) {
  return (
    <StyledHostAvatar
      display="flex"
      alignItems="center"
      flexDirection="column"
      {...props}
    >
      <Avatar name={host.name} url={host.avatar} size="m" />
      <StyledHostTag variant={variant}>
        <Text fontWeight="semibold" fontSize="2xs">
          Host
        </Text>
      </StyledHostTag>
    </StyledHostAvatar>
  );
}
