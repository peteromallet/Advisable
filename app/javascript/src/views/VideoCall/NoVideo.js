import React from "react";
import styled from "styled-components";
import { Circle } from "@advisable/donut";
import { PersonCircle } from "@styled-icons/ionicons-outline";

const StyledNoVideoCircle = styled(Circle)`
  background-size: cover;
  background-position: center;
  background-image: ${(p) => (p.$avatar ? `url(${p.$avatar})` : null)};
`;

export default function NoVideo({ avatar }) {
  return (
    <StyledNoVideoCircle
      size={160}
      bg="neutral300"
      color="neutral500"
      $avatar={avatar}
    >
      {avatar ? null : <PersonCircle size={80} />}
    </StyledNoVideoCircle>
  );
}
