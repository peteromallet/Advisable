import React from "react";
import truncate from "lodash/truncate";
import styled from "styled-components";
import { useParams } from "react-router";
import { Check } from "@styled-icons/heroicons-solid/Check";
import {
  Circle,
  Box,
  Text,
  Card,
  Avatar,
  Button,
  Stack,
  theme,
} from "@advisable/donut";
import CaseStudyContent from "src/components/CaseStudyContent";
import { useCaseStudy } from "./queries";
import Sticky from "react-stickynode";
import ActionBar from "./ActionBar";

const StyledName = styled.a`
  display: block;
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: -0.04rem;
  color: ${theme.colors.neutral800};

  &:hover {
    color: ${theme.colors.blue600};
    text-decoration: underline;
  }
`;

const StyledArticleTitle = styled.h1`
  font-size: 36px;
  line-height: 40px;
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
  const { id } = useParams();
  const { data, loading } = useCaseStudy(id);

  if (loading) return <>loading</>;
  const { caseStudy } = data;
  const { specialist } = caseStudy;

  return (
    <Box padding={12} justifyContent="center" display="flex">
      <Box
        width="240px"
        flexShrink={0}
        paddingRight={12}
        display={{ _: "none", l: "block" }}
      >
        <Sticky enabled top={108}>
          <Avatar
            size="l"
            name={specialist.name}
            url={specialist.avatar}
            marginBottom={4}
          />
          <StyledName target="_blank" href={`/freelancers/${specialist.id}`}>
            {specialist.name}
          </StyledName>
          <Text
            fontSize="xs"
            fontWeight={350}
            lineHeight="20px"
            paddingBottom={6}
            color="neutral600"
          >
            {truncate(specialist.bio, { length: 170 })}
          </Text>
          <Button variant="gradient">Work with {specialist.firstName}</Button>
        </Sticky>
      </Box>
      <Box maxWidth="680px" paddingBottom={20} position="relative">
        <StyledArticleTitle>{caseStudy.title}</StyledArticleTitle>
        {caseStudy.comment ? (
          <Card padding={5} borderRadius="16px">
            <Text fontSize="lg" lineHeight="20px" fontStyle="italic">
              &quot;{caseStudy.comment}&quot;
            </Text>
          </Card>
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
