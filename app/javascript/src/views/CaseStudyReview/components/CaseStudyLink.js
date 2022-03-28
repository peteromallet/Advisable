import React from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import { ExternalLink } from "@styled-icons/heroicons-outline";
import { Box, Link } from "@advisable/donut";

const StyledLinkType = styled.span(
  css({
    color: "neutral400",
    textTransform: "uppercase",
    fontSize: "2xs",
    fontWeight: 500,
    lineHeight: "s",
    transition: "color 0.2s",
    letterSpacing: "0.03em",
  }),
);

export const StyledCaseStudyHeader = styled.h3(
  css({
    fontSize: ["20px", "22px"],
    color: "neutral800",
    lineHeight: ["m", "xl"],
    fontWeight: 550,
    letterSpacing: "-0.01em",
    transition: "color 0.2s",
  }),
);

const StyledCaseStudyIcon = styled.div(
  css({
    color: "neutral300",
    height: ["36px", "44px"],
    minWidth: ["36px", "44px"],
    transition: "color 0.2s",
  }),
);

export const StyledCaseStudy = styled.div(
  css({
    backgroundColor: "white",
    width: "100%",
    display: "flex",
    userSelect: "none",
    borderRadius: ["12px", "20px"],
    cursor: "pointer",
    border: "2px solid transparent",
    borderColor: "neutral100",
    transition:
      "border-color 200ms, box-shadow 200ms, color 200ms, transform 200ms",
    p: [3, 4],
    pt: [2, 3],
    gap: [2, 2],

    "&:hover": {
      transform: "translateY(-2px)",
      borderColor: "neutral100",
      boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.12)",
      color: "neutral600",
      [StyledLinkType]: {
        color: "neutral400",
      },
      [StyledCaseStudyHeader]: {
        color: "neutral900",
      },
      [StyledCaseStudyIcon]: {
        color: "neutral300",
      },
    },
  }),
);

export default function CaseStudyLink({ to, children }) {
  return (
    <Link to={to} target="_blank" mb={4}>
      <StyledCaseStudy p={4} pt={3}>
        <StyledCaseStudyIcon>
          <ExternalLink color="neutral200" size={28} />
        </StyledCaseStudyIcon>
        <Box pt={1}>
          <StyledLinkType>Case Study</StyledLinkType>
          <StyledCaseStudyHeader>{children}</StyledCaseStudyHeader>
        </Box>
      </StyledCaseStudy>
    </Link>
  );
}
