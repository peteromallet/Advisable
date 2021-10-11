import React, { Suspense } from "react";
import { rgba } from "polished";
import { useImage } from "react-image";
import { motion } from "framer-motion";
import styled from "styled-components";
import { matchPath, useParams } from "react-router";
import { Box, Text, Link, Skeleton, theme } from "@advisable/donut";
import CompanyLogo from "./CompanyLogo";
import { variant } from "styled-system";
import css from "@styled-system/css";

const StyledContentWrapper = styled.div(
  css({
    position: "relative",
    display: "flex",
    pointerEvents: "none",
  }),
);

const StyledSkillTag = styled.div`
  line-height: 1;
  padding: 6px 12px 7px 12px;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  position: relative;
  letter-spacing: -0.012em;
  border-radius: 8px;
  margin-right: ${theme.space[2]};
  margin-bottom: ${theme.space[2]};
  background: rgba(255, 255, 255, 0.72);
  color: ${rgba(theme.colors.blue900, 0.72)};
`;

const StyledBackgroundImg = styled.img`
  pointer-events: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const StyledCaseStudyCard = styled.div(
  variant({
    prop: "type",
    variants: {
      profile: {
        transition: "transform 200ms, box-shadow 200ms",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `
          0 16px 40px -16px ${rgba(theme.colors.blue800, 0.08)},
          0 4px 8px -2px ${rgba(theme.colors.neutral900, 0.04)}
        `,
        },
      },
      article: {
        [StyledContentWrapper]: {
          pointerEvents: "auto",
        },
      },
    },
  }),
  css({
    padding: 8,
    pb: 10,
    width: "100%",
    bg: "neutral100",
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
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
    <Box top="0" left="0" width="100%" height="100%" position="absolute">
      <StyledBackgroundImg as={motion.img} src={src} />
    </Box>
  );
});

export default function CaseStudyCard({ caseStudy }) {
  const params = useParams();

  const isArticle = !!matchPath(location.pathname, {
    path: "/freelancers/:id/case_studies/:case_study_id",
  });

  const skills = caseStudy.skills.map(({ skill }) => (
    <StyledSkillTag key={skill.id}>{skill.name}</StyledSkillTag>
  ));

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Box
        as={isArticle ? null : Link}
        to={`/freelancers/${params.id}/case_studies/${caseStudy.id}`}
        notInline="true"
      >
        <StyledCaseStudyCard type={isArticle ? "article" : "profile"}>
          {caseStudy.coverPhoto ? (
            <CaseStudyBackgroundImage url={caseStudy.coverPhoto} />
          ) : null}
          <StyledContentWrapper>
            <Box
              minWidth="56px"
              height="64px"
              bg="white"
              borderRadius="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={4}
            >
              <CompanyLogo src={caseStudy.company?.favicon} />
            </Box>
            <Box>
              <Text
                textTransform="uppercase"
                fontSize="12px"
                fontWeight="semibold"
                letterSpacing="0.02rem"
                lineHeight="16px"
                color="neutral700"
                mb={1.5}
              >
                {caseStudy.companyType}
              </Text>
              <Text
                fontSize="4xl"
                fontWeight={600}
                letterSpacing="-0.032rem"
                color="neutral900"
                marginBottom={6}
              >
                {caseStudy.title}
              </Text>

              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {skills}
              </Box>
            </Box>
          </StyledContentWrapper>
        </StyledCaseStudyCard>
      </Box>
    </Suspense>
  );
}
