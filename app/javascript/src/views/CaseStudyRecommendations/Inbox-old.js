import React from "react";
import { useQuery } from "@apollo/client";
import { Switch, Route, useParams } from "react-router-dom";
import { AnimateSharedLayout, motion } from "framer-motion";
import INBOX from "./queries/getRecommendations.gql";
import { Box, Container, Text } from "@advisable/donut";
import RecommendationCard from "./RecommendationCard";
import CaseStudyRecommendationsNavigation from "./Navigation";
import ArchivedRecommendations from "./ArchivedRecommendations";
import InboxEmpty from "./InboxEmpty";

export default function RecommendationsInbox() {
  const { id } = useParams();
  const { loading, data } = useQuery(INBOX, {
    variables: { id },
  });

  if (loading) return <>loading...</>;

  const search = data.caseStudySearch;
  const caseStudies = search.results.edges.map((e) => e.node);

  return (
    <Container maxWidth="900px" py={10}>
      <Box maxWidth="500px" marginX="auto" textAlign="center" mb={10}>
        <Box maxWidth="440px" mx="auto" mb={6}>
          <Text
            fontSize="4xl"
            fontWeight="550"
            lineHeight="28px"
            letterSpacing="-0.05rem"
          >
            {search.name}
          </Text>
        </Box>
        <CaseStudyRecommendationsNavigation inboxCount={caseStudies.length} />
      </Box>
      <Box position="relative">
        <Switch>
          <Route path="/explore/:id/inbox">
            {caseStudies.length === 0 && <InboxEmpty />}
            <AnimateSharedLayout>
              {caseStudies.map((c) => (
                <motion.div initial={false} layoutId={c.id} key={c.id}>
                  <Box paddingBottom={4}>
                    <RecommendationCard caseStudy={c} search={search} />
                  </Box>
                </motion.div>
              ))}
            </AnimateSharedLayout>
          </Route>
          <Route path="/explore/:id/archived">
            <ArchivedRecommendations />
          </Route>
        </Switch>
      </Box>
    </Container>
  );
}
