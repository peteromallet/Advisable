import React from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import SuperEllipse from "react-superellipse";
import { Box, Text } from "@advisable/donut";
import RecommendationAvatar from "./RecommendationAvatar";
import { useHistory } from "react-router";

const StyledShortlistCard = styled(SuperEllipse)(
  css({
    padding: "20px",
    margin: "-20px",
    cursor: "pointer",
    transition: "background 200ms",
    "&:hover": {
      bg: "neutral100",
    },
  }),
);

export default function ShortlistCard({ shortlist }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/explore/${shortlist.id}`);
  };

  return (
    <StyledShortlistCard r1={0.005} r2={0.3} onClick={handleClick}>
      <Text
        fontSize="4xl"
        fontWeight={600}
        marginBottom={6}
        letterSpacing="-0.025em"
      >
        {shortlist.name}
      </Text>
      <Box display="flex" justifyContent="space-between">
        {shortlist.results.nodes.map((result, index) => (
          <Box key={result.id}>
            <RecommendationAvatar
              size="md"
              specialist={result.specialist}
              number={index + 1}
            />
          </Box>
        ))}
      </Box>
    </StyledShortlistCard>
  );
}
