import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Box, Tag, Text, Avatar, StyledAvatar } from "@advisable/donut";

const StyledHostAvatar = styled(Box)`
  position: relative;
  padding-bottom: 12px;
  ${StyledAvatar} {
    transition: transform 100ms;
  }

  &:hover {
    ${StyledAvatar} {
      transform: scale(1.08);
    }
  }
`;

const StyledHostTag = styled(Tag)`
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  width: 46px;
  border-radius: 27px;
  border: 3px solid white;
  position: absolute;
  bottom: 0;
`;

export default function HostAvatar({ host, variant = "orange", ...props }) {
  return (
    <StyledHostAvatar
      as={Link}
      to={`/freelancers/${host.id}`}
      width="70px"
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
