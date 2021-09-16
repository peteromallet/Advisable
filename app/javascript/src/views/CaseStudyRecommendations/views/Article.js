import React from "react";
import truncate from "lodash/truncate";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Box, Text, theme, Heading } from "@advisable/donut";
import Loading from "src/components/Loading";
import PassportAvatar from "src/components/PassportAvatar";
import CaseStudyResultsRow from "src/components/CaseStudyResultsRow";
import CaseStudyContent from "src/components/CaseStudyContent";
import AdvisableComment from "src/components/AdvisableComment";
import { useCaseStudy } from "../queries";
import ActionBar from "../components/ActionBar";
import { isNotFound } from "../../NotFound";
import NotFound from "./NotFound";
import useScrollToTop from "src/hooks/useScrollToTop";
import { motion } from "framer-motion";
import PrimaryButton from "./PrimaryButton";

const StyledName = styled.a`
  display: block;
  font-size: 22px;
  line-height: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: -0.04rem;
  color: ${theme.colors.neutral800};

  &:hover {
    color: ${theme.colors.blue600};
    text-decoration: underline;
  }
`;

function FreelancerDetails({ caseStudy }) {
  const { specialist } = caseStudy;

  return (
    <Box>
      <PassportAvatar
        size="lg"
        marginBottom={6}
        src={caseStudy.specialist.avatar}
        name={caseStudy.specialist.name}
      />
      <StyledName target="_blank" href={`/freelancers/${specialist.id}`}>
        {specialist.name}
      </StyledName>
      <Text
        fontSize="sm"
        fontWeight={350}
        lineHeight="20px"
        paddingBottom={6}
        color="neutral700"
      >
        {truncate(specialist.bio, { length: 110 })}
      </Text>
      <PrimaryButton specialist={specialist} />
    </Box>
  );
}

export default function CaseStudy({ showActionBar = true }) {
  useScrollToTop();
  const { id } = useParams();
  const { data, loading, error } = useCaseStudy(id);

  if (loading) return <Loading />;

  if (isNotFound(error)) {
    return <NotFound />;
  }

  const { caseStudy } = data;

  return (
    <Box
      paddingTop={14}
      maxWidth={{ m: "960px", _: "1080px" }}
      paddingX={6}
      mx="auto"
      as={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box maxWidth="700px" textAlign="center" mx="auto" marginBottom={10}>
        <Box
          mx="auto"
          justifyContent="center"
          display={{ _: "flex", m: "none" }}
        >
          <PassportAvatar
            size="md"
            marginBottom={4}
            src={caseStudy.specialist.avatar}
            name={caseStudy.specialist.name}
          />
        </Box>
        <Heading
          size={{ _: "4xl", s: "5xl", m: "6xl" }}
          fontWeight={{ _: 700, m: 600 }}
          marginBottom={{ _: 4, m: 6 }}
        >
          {caseStudy.title}
        </Heading>
        <Box maxWidth="500px" mx="auto">
          {caseStudy.skills.map((as) => (
            <Text
              mb={2}
              mx={1.5}
              key={as.id}
              fontSize="sm"
              fontWeight={450}
              color="neutral500"
              display="inline-block"
              letterSpacing="-0.01rem"
            >
              #{as.skill.name}
            </Text>
          ))}
        </Box>
      </Box>
      <Box marginBottom={12}>
        <CaseStudyResultsRow caseStudy={caseStudy} />
      </Box>
      <Box justifyContent="center" display="flex">
        <Box
          width="220px"
          flexShrink={0}
          marginRight={14}
          display={{ _: "none", l: "block" }}
        >
          <Box top="108px" position={{ _: null, l: "sticky" }}>
            <FreelancerDetails caseStudy={caseStudy} />
          </Box>
        </Box>
        <Box maxWidth="700px" position="relative">
          <Text fontSize="2xl" lineHeight="28px" fontWeight={450}>
            {caseStudy.subtitle}
          </Text>
          {caseStudy.comment ? (
            <Box marginTop={12}>
              <AdvisableComment>{caseStudy.comment}</AdvisableComment>
            </Box>
          ) : null}
          <Box height="1px" bg="neutral200" marginY={12} />
          <CaseStudyContent caseStudy={caseStudy} />
        </Box>
      </Box>
      <Box display={{ _: "block", l: "none" }} paddingBottom={12}>
        <Box height="1px" bg="neutral200" marginBottom={12} />
        <FreelancerDetails caseStudy={caseStudy} />
      </Box>
      {showActionBar && <ActionBar caseStudy={caseStudy} />}
    </Box>
  );
}
