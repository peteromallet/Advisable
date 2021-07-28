import React from "react";
import truncate from "lodash/truncate";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { Check } from "@styled-icons/heroicons-solid/Check";
import { Circle, Box, Text, Button, Stack, theme } from "@advisable/donut";
import Loading from "src/components/Loading";
import PassportAvatar from "src/components/PassportAvatar";
import CaseStudyContent from "src/components/CaseStudyContent";
import { useCaseStudy } from "../queries";
import ActionBar from "../components/ActionBar";
import { isNotFound } from "../../NotFound";
import NotFound from "./NotFound";
import useScrollToTop from "src/hooks/useScrollToTop";
import { motion } from "framer-motion";

const StyledName = styled.a`
  display: block;
  font-size: 24px;
  line-height: 24px;
  font-weight: 550;
  margin-bottom: 8px;
  letter-spacing: -0.04rem;
  color: ${theme.colors.neutral800};

  &:hover {
    color: ${theme.colors.blue600};
    text-decoration: underline;
  }
`;

const StyledArticleTitle = styled.h1`
  font-size: 32px;
  line-height: 36px;
  font-weight: 600;
  margin-bottom: 32px;
  letter-spacing: -0.06rem;
`;

function CaseStudySummaryResults({ caseStudy }) {
  const outcomeSection = caseStudy.sections.find((s) => s.type === "outcome");
  if (!outcomeSection) return null;
  const resultsBlock = outcomeSection.contents.find(
    (c) => c.__typename === "Results",
  );
  if (!resultsBlock) return null;

  return (
    <Box paddingTop={4} paddingBottom={4}>
      <Stack divider="neutral100" spacing="lg">
        {resultsBlock.results.map((result, index) => (
          <Box key={index} display="flex" alignItems="center">
            <Circle
              size={20}
              marginRight={2}
              bg="cyan600"
              color="white"
              flexShrink={0}
            >
              <Check size={12} />
            </Circle>
            <Text fontSize="md" fontWeight="350" lineHeight="20px">
              {result}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

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
      as={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      padding={12}
      justifyContent="center"
      display="flex"
    >
      <Box
        width="280px"
        flexShrink={0}
        paddingRight={16}
        display={{ _: "none", l: "block" }}
      >
        <Box top="108px" position={{ _: null, l: "sticky" }}>
          <PassportAvatar
            size="2xl"
            marginBottom={6}
            src={caseStudy.specialist.avatar}
            name={caseStudy.specialist.name}
          />
          <StyledName target="_blank" href={`/freelancers/${specialist.id}`}>
            {specialist.name}
          </StyledName>
          <Text
            fontSize="xs"
            fontWeight={350}
            lineHeight="20px"
            paddingBottom={6}
            color="neutral700"
          >
            {truncate(specialist.bio, { length: 170 })}
          </Text>
          <Button
            as={Link}
            variant="gradient"
            target="_blank"
            to={`/request_consultation/${specialist.id}`}
          >
            Work with {specialist.firstName}
          </Button>
        </Box>
      </Box>
      <Box maxWidth="700px" position="relative">
        <StyledArticleTitle>{caseStudy.title}</StyledArticleTitle>
        {caseStudy.comment ? (
          <Box bg="neutral100" padding={5} borderRadius="16px">
            <Text fontSize="lg" lineHeight="20px" fontStyle="italic">
              &quot;{caseStudy.comment}&quot;
            </Text>
          </Box>
        ) : null}
        <Text
          fontSize="xl"
          lineHeight="28px"
          fontWeight={350}
          paddingTop={10}
          paddingBottom={6}
        >
          {caseStudy.subtitle}
        </Text>
        <CaseStudySummaryResults caseStudy={caseStudy} />
        <CaseStudyContent caseStudy={caseStudy} />
        <ActionBar caseStudy={caseStudy} />
      </Box>
    </Box>
  );
}
