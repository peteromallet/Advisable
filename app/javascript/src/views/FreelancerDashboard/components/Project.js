import React from "react";
import { Box, Text } from "@advisable/donut";
import styled from "styled-components";

const StyledCoverImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transform: scale(2);
`;

const StyledAvatar = styled.img`
  z-index: 1;
  border-radius: 12px;
  border: 2px solid white;
  width: 42px;
  height: 62px;
  object-fit: cover;
`;

export default function Project({ caseStudy }) {
  return (
    <Box display="flex">
      <Box
        position="relative"
        width="120px"
        height="92px"
        css={`
          overflow: hidden;
        `}
        borderRadius="12px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <StyledCoverImage src={caseStudy.coverPhoto} />
        <StyledAvatar src={caseStudy.specialist?.avatar} />
      </Box>
      <Box>
        <Text>{caseStudy.specialist?.name}</Text>
        <Text>{caseStudy.title}</Text>
      </Box>
    </Box>
  );
}
