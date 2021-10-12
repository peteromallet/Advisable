import React from "react";
import { Box, Heading } from "@advisable/donut";
import Page from "src/components/Page";
import { useCandidates } from "./queries";
import ErrorBoundary from "src/components/ErrorBoundary";
import CandidateCard from "./components/CandidateCard";

export default function Hire() {
  const { data, loading } = useCandidates();

  if (loading) return <>loading</>;

  const candidates = data?.currentCompany?.candidates?.nodes || [];

  return (
    <ErrorBoundary>
      <Page width="1020px">
        <Box paddingY={{ _: 8, m: 12 }} paddingX={{ _: 4, m: 8 }}>
          <Heading
            fontSize={{ _: "28px", m: "36px" }}
            fontWeight={650}
            letterSpacing="-0.06rem"
          >
            Hire
          </Heading>
          <Box height="1px" bg="neutral200" my={8} />
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="20px">
            {candidates.map((application) => (
              <CandidateCard key={application.id} application={application} />
            ))}
          </Box>
        </Box>
      </Page>
    </ErrorBoundary>
  );
}
