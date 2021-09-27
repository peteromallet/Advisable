import React, { Suspense } from "react";
import { useImage } from "react-image";
import { motion } from "framer-motion";
import styled from "styled-components";
import { matchPath, useParams } from "react-router";
import { Box, Text, Link, Skeleton, theme } from "@advisable/donut";
import CompanyLogo from "./CompanyLogo";

const StyledSkillTag = styled.div`
  background: rgba(0, 13, 32, 0.08);
  color: rgba(0, 0, 0, 0.58);
  line-height: ${theme.lineHeights.xs};
  padding: 4px 12px;
  border-radius: 8px;
  margin-right: ${theme.space[2]};
  margin-bottom: ${theme.space[2]};
`;

const StyledBackgroundImg = styled.img`
  pointer-events: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

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
        <Box
          p={7}
          pb={12}
          width="100%"
          bg="neutral100"
          position="relative"
          borderRadius="20px"
          overflow="hidden"
        >
          {caseStudy.coverPhoto ? (
            <CaseStudyBackgroundImage url={caseStudy.coverPhoto} />
          ) : null}
          <Box
            position="relative"
            display="flex"
            css={`
              pointer-events: none;
            `}
          >
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
                fontSize="13px"
                fontWeight="semibold"
                letterSpacing="0.04rem"
                lineHeight="l"
                color="neutral700"
                mb={1}
              >
                {caseStudy.companyType}
              </Text>
              <Text
                fontSize="4xl"
                fontWeight="semibold"
                letterSpacing="-0.02rem"
                color="neutral900"
                mb={8}
              >
                {caseStudy.title}
              </Text>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {skills}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
}
