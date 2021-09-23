import React from "react";
import styled from "styled-components";
import css from "@styled-system/css";
import SuperEllipse from "react-superellipse";
import { ChatAlt } from "@styled-icons/heroicons-solid/ChatAlt";
import { Trash } from "@styled-icons/heroicons-solid/Trash";
import { Box, Text, Button } from "@advisable/donut";
import RecommendationAvatar from "./RecommendationAvatar";

const StyledRecommendationTitle = styled(Text)(
  css({
    fontSize: "4xl",
    fontWeight: 560,
    marginBottom: 3,
    lineHeight: "28px",
    letterSpacing: "-0.025em",
  }),
);

const StyledRecommendation = styled(SuperEllipse)(
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

export default function Recommendation({ recommendation, number, onClick }) {
  const handleClick = () => {
    onClick(recommendation);
  };

  return (
    <StyledRecommendation onClick={handleClick}>
      <Box display="flex" alignItems="center">
        <Box flexShrink={0}>
          <RecommendationAvatar
            specialist={recommendation.specialist}
            number={number}
          />
        </Box>
        <Box paddingLeft={8}>
          <StyledRecommendationTitle>
            {recommendation.title}
          </StyledRecommendationTitle>
          <Text fontSize="lg" lineHeight="24px" marginBottom={6}>
            {recommendation.comment}
          </Text>
          <Box>
            <Button prefix={<ChatAlt />} mr={3}>
              Message
            </Button>
            <Button prefix={<Trash />} variant="outlined">
              Remove
            </Button>
          </Box>
        </Box>
      </Box>
    </StyledRecommendation>
  );
}
