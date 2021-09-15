import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { Box, Text, Link, theme } from "@advisable/donut";
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

export default function CaseStudyCard({ caseStudy }) {
  const location = useLocation();

  const skills = caseStudy.skills.map(({ skill }) => (
    <StyledSkillTag key={skill.id}>{skill.name}</StyledSkillTag>
  ));

  return (
    <Link to={`${location.pathname}/case_studies/${caseStudy.id}`}>
      <Box
        p={7}
        pb={12}
        display="flex"
        bg="neutral100"
        backgroundImage={`url(${caseStudy.coverPhoto})`}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="20px"
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
        <Box display="inline-block">
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
    </Link>
  );
}
