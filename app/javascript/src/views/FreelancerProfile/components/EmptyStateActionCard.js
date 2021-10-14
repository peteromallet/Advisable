import React from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import { StyledCircle, Box } from "@advisable/donut";

const StyledCard = styled(Box)(
  css({
    backgroundColor: "white",
    width: "100%",
    userSelect: "none",
    borderRadius: "20px",
    border: "2px solid",
    borderColor: "neutral100",
    cursor: "pointer",
    transition:
      "border-color 200ms, box-shadow 200ms, color 200ms, transform 200ms",
    paddingX: 8,
    paddingTop: 12,
    paddingBottom: 10,
    [StyledCircle]: {
      transition: "border-color 200ms, color 200ms",
    },

    "&:hover": {
      borderColor: "neutral200",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.12)",
      color: "neutral600",
      [StyledCircle]: {
        borderColor: "neutral300",
        color: "neutral300",
      },
    },
  }),
);

export default function EmptyStateActionCard(props) {
  return <StyledCard role="button" {...props} />;
}
