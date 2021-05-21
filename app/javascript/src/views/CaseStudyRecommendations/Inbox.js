import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { AnimateSharedLayout, motion } from "framer-motion";
import INBOX from "./queries/getRecommendations.gql";
import { Box, Container, Text } from "@advisable/donut";
import RecommendationCard from "./RecommendationCard";
import pluralize from "src/utilities/pluralize";
import CaseStudyRecommendationsNavigation from "./Navigation";

export default function RecommendationsInbox() {
  const { id } = useParams();
  const { loading, data } = useQuery(INBOX, {
    variables: { id },
  });

  if (loading) return <>loading...</>;

  const search = data.caseStudySearch;
  const caseStudies = search.results.nodes;

  return (
    <Container maxWidth="900px" py={10}>
      <Box maxWidth="500px" marginX="auto" textAlign="center" mb={10}>
        <Box maxWidth="440px" mx="auto" mb={3}>
          <Text
            fontSize="4xl"
            fontWeight="550"
            lineHeight="28px"
            letterSpacing="-0.05rem"
          >
            Project recommendations for Dunder Mifflin
          </Text>
        </Box>
        <Text fontSize="lg" lineHeight="24px" color="neutral700" mb={4}>
          You have{" "}
          {pluralize(
            caseStudies.length,
            "project recommendation",
            "project recommendations",
          )}{" "}
          of how freelancers in our network have solved a similar problem for
          other companies.
        </Text>
        <CaseStudyRecommendationsNavigation inboxCount={caseStudies.length} />
      </Box>
      <Box position="relative">
        <AnimateSharedLayout>
          {caseStudies.map((c) => (
            <motion.div initial={false} layoutId={c.id} key={c.id}>
              <Box paddingBottom={4}>
                <RecommendationCard caseStudy={c} search={search} />
              </Box>
            </motion.div>
          ))}
        </AnimateSharedLayout>
      </Box>
    </Container>
  );
}
