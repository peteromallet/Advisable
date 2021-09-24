import React from "react";
import styled from "styled-components";
import css from "@styled-system/css";
import SuperEllipse from "react-superellipse";
import { ChatAlt } from "@styled-icons/heroicons-solid/ChatAlt";
import { Trash } from "@styled-icons/heroicons-solid/Trash";
import { Box, Text, Button } from "@advisable/donut";
import RecommendationAvatar from "./RecommendationAvatar";
import { useArchiveArticle } from "../queries";

const StyledRecommendationTitle = styled(Text)(
  css({
    fontWeight: 560,
    marginBottom: 3,
    lineHeight: "28px",
    paddingRight: "32px",
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
  const [archive] = useArchiveArticle(recommendation);

  const handleClick = () => {
    onClick(recommendation);
  };

  const handleArchive = (e) => {
    e.stopPropagation();
    archive();
  };

  return (
    <StyledRecommendation onClick={handleClick}>
      <Box display="flex" alignItems="center">
        <Box flexShrink={0}>
          <RecommendationAvatar
            number={number}
            size={{ _: "md", l: "lg" }}
            specialist={recommendation.specialist}
          />
        </Box>
        <Box paddingLeft={6}>
          <StyledRecommendationTitle fontSize={{ _: "24px", l: "28px" }}>
            {recommendation.title}
          </StyledRecommendationTitle>
          <Text fontSize="lg" lineHeight="24px" marginBottom={6}>
            {recommendation.comment}
          </Text>
          <Box>
            <Button variant="gradient" prefix={<ChatAlt />} mr={3}>
              Message
            </Button>
            <Button
              prefix={<Trash />}
              variant="outlined"
              onClick={handleArchive}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Box>
    </StyledRecommendation>
  );
}
