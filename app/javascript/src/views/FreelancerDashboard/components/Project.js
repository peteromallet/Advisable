import React from "react";
import { Link, Box, Text } from "@advisable/donut";
import styled from "styled-components";
import css from "@styled-system/css";
import Card from "./Card";

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
    <Card
      as={Link}
      to={`/freelancers/${caseStudy.specialist?.id}/case_studies/${caseStudy.id}`}
    >
      <Box display="flex" css={css({ columnGap: 4 })}>
        <Box
          position="relative"
          bg="neutral100"
          width="120px"
          minWidth="120px"
          height="92px"
          borderRadius="12px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          css={`
            overflow: hidden;
          `}
        >
          <StyledCoverImage src={caseStudy.coverPhoto} />
          <StyledAvatar src={caseStudy.specialist?.avatar} />
        </Box>
        <Box>
          <Text
            fontSize="xs"
            color="neutral500"
            fontWeight={450}
            lineHeight="xs"
            mb={1}
          >
            {caseStudy.specialist?.name}
          </Text>
          <Text color="neutral900" lineHeight="s" fontWeight={450}>
            {caseStudy.title}
          </Text>
        </Box>
      </Box>
    </Card>
  );
}
