import React from "react";
import truncate from "lodash/truncate";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { Box, Text, Button, theme, Heading } from "@advisable/donut";
import Loading from "src/components/Loading";
import PassportAvatar from "src/components/PassportAvatar";
import CaseStudyContent from "src/components/CaseStudyContent";
import { useCaseStudy } from "../queries";
import ActionBar from "../components/ActionBar";
import { isNotFound } from "../../NotFound";
import NotFound from "./NotFound";
import useScrollToTop from "src/hooks/useScrollToTop";
import { motion } from "framer-motion";
import CaseStudyResultsRow from "../components/CaseStudyResultsRow";
import AdvisableComment from "../components/AdvisableComment";

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

export default function CaseStudy() {
  useScrollToTop();
  const { id } = useParams();
  const { data, loading, error } = useCaseStudy(id);

  if (loading) return <Loading />;

  if (isNotFound(error)) {
    return <NotFound />;
  }

  const { caseStudy } = data;
  const { specialist } = caseStudy;

  return (
    <Box
      paddingTop={14}
      maxWidth="1000px"
      paddingX={2}
      mx="auto"
      as={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box maxWidth="700px" textAlign="center" mx="auto" marginBottom={10}>
        <Heading size="6xl" marginBottom={6}>
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
            <Button
              as={Link}
              variant="gradient"
              target="_blank"
              to={`/request_consultation/${specialist.id}`}
            >
              Work Together
            </Button>
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
          <Box height="1px" bg="neutral100" marginY={12} />
          <CaseStudyContent caseStudy={caseStudy} />
        </Box>
      </Box>
      <ActionBar caseStudy={caseStudy} />
    </Box>
  );
}
