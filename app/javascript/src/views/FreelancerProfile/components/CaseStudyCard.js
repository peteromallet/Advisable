import React, { Suspense } from "react";
import * as Sentry from "@sentry/react";
import { Link, useLocation } from "react-router-dom";
import { rgba } from "polished";
import css from "@styled-system/css";
import { useImage } from "react-image";
import styled from "styled-components";
import SuperEllipse from "react-superellipse";
import { Box, Text, Skeleton, useModal, theme } from "@advisable/donut";
import LogoMark from "src/components/LogoMark";
import MeatballMenu, { StyledMeatballButton } from "./MeatballMenu";
import EditCaseStudyDropdownLink from "./EditCaseStudyDropdownLink";
import EditCaseStudyModal from "./EditCaseStudyModal";

const StyledLink = styled(Link)(
  css({
    position: "relative",
    borderRadius: "20px",
  }),
);

const StyledContentWrapper = styled.div(
  css({
    position: "relative",
    display: "flex",
    pointerEvents: "none",
  }),
);

const StyledCompanyType = styled(Text)(
  css({
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: ["medium", 550],
    letterSpacing: "0.02rem",
    lineHeight: "16px",
    color: "neutral700",
    mt: [2, 0.5],
    mb: [2, 1],
    paddingRight: 8,
  }),
);

const StyledTitle = styled(Text)(
  css({
    fontSize: ["xl", "4xl"],
    fontWeight: [550, 600],
    letterSpacing: "-0.032rem",
    color: "neutral900",
    marginBottom: 6,
    paddingRight: [8, 4],
  }),
);

const StyledSkillTag = styled.div(
  css({
    lineHeight: 1,
    padding: ["4px 8px 5px 8px", "6px 12px 7px 12px"],
    fontSize: ["2xs", "m"],
    display: "inline-flex",
    alignItems: "center",
    fontWeight: 450,
    position: "relative",
    letterSpacing: "-0.012em",
    borderRadius: "8px",
    marginRight: [1, 2],
    marginBottom: [1, 2],
    background: "rgba(255, 255, 255, 0.72)",
    color: rgba(theme.colors.blue900, 0.72),
  }),
);

const StyledLogoSquircle = styled(SuperEllipse)(
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ["42px", "56px"],
    minWidth: ["42px", "56px"],
    height: ["48px", "64px"],
    bg: "white",
    marginRight: [2, 4],
    svg: {
      width: "100%",
    },
  }),
);

const StyledFaviconWrapper = styled.div(
  css({
    borderRadius: "2px",
    overflow: "hidden",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
);

const StyledBackgroundImg = styled.img`
  pointer-events: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const StyledCaseStudyCard = styled.div(
  css({
    padding: [4, 8],
    paddingBottom: [6, 10],
    width: "100%",
    bg: "neutral100",
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
    transition: "transform 200ms, box-shadow 200ms",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `
          0 16px 40px -16px ${rgba(theme.colors.blue800, 0.08)},
          0 4px 8px -2px ${rgba(theme.colors.neutral900, 0.04)}
        `,
      [StyledMeatballButton]: {
        opacity: 1,
      },
    },
  }),
);

const LoadingSkeleton = () => (
  <Box p={7} pb={12} bg="neutral50" borderRadius="20px">
    <Box position="relative" display="flex">
      <Skeleton minWidth="56px" height="64px" mr="16px" />
      <Box width="100%">
        <Skeleton width="80px" height="14px" mt={1.5} mb={2} />
        <Skeleton width="85%" height="24px" mb={1.5} />
        <Skeleton width="90%" height="24px" mb={1.5} />
        <Skeleton width="35%" height="24px" mb={8} />
        <Box display="flex">
          <Skeleton width="35%" height="25px" mb={2} mr={2} />
          <Skeleton width="32%" height="25px" mb={2} mr={2} />
        </Box>
      </Box>
    </Box>
  </Box>
);

const CaseStudyBackgroundImage = React.memo(function CaseStudyBackgroundImage({
  url,
}) {
  const { src } = useImage({ srcList: url });

  return (
    <Box
      top="0"
      left="0"
      width="100%"
      height="100%"
      borderRadius="20px"
      position="absolute"
    >
      <StyledBackgroundImg src={src} />
    </Box>
  );
});

export default function CaseStudyCard({ caseStudy, isOwner }) {
  const modal = useModal();
  const location = useLocation();

  const skills = caseStudy.skills.map(({ skill }) => (
    <StyledSkillTag key={skill.id}>{skill.name}</StyledSkillTag>
  ));

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Box
        as={StyledLink}
        to={caseStudy.path}
        state={{
          backgroundLocation: location?.state?.backgroundLocation || location,
        }}
        width="100%"
      >
        <StyledCaseStudyCard data-testid="caseStudyCard">
          {Boolean(caseStudy.coverPhoto) && (
            <Sentry.ErrorBoundary>
              <CaseStudyBackgroundImage url={caseStudy.coverPhoto} />
            </Sentry.ErrorBoundary>
          )}
          <StyledContentWrapper>
            <StyledLogoSquircle r1={0.1} r2={0.362}>
              <StyledFaviconWrapper>
                {caseStudy.company?.favicon ? (
                  <img
                    src={caseStudy.company?.favicon}
                    width="24px"
                    height="24px"
                  />
                ) : (
                  <LogoMark size={16} color="subtle" />
                )}
              </StyledFaviconWrapper>
            </StyledLogoSquircle>
            <Box>
              <StyledCompanyType>
                {caseStudy.companyType?.join(", ")}
              </StyledCompanyType>
              <StyledTitle>{caseStudy.title}</StyledTitle>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {skills}
              </Box>
            </Box>
          </StyledContentWrapper>
          {isOwner && caseStudy.editorUrl && (
            <MeatballMenu>
              <EditCaseStudyDropdownLink modal={modal} />
            </MeatballMenu>
          )}
        </StyledCaseStudyCard>
      </Box>
      <EditCaseStudyModal modal={modal} caseStudy={caseStudy} />
    </Suspense>
  );
}
