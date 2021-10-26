import React from "react";
import { Box, Heading, useBackground } from "@advisable/donut";
import { useCandidates } from "../queries";
import Loading from "src/components/Loading";
import CandidateCard from "../components/CandidateCard";
import NoCandidates from "../components/NoCandidates";

export default function Candidates() {
  useBackground("beige");
  const { data, loading } = useCandidates();

  const candidates = data?.currentCompany?.candidates?.nodes || [];

  return (
    <>
      <Heading
        fontSize={{ _: "28px", m: "36px" }}
        fontWeight={650}
        letterSpacing="-0.06rem"
      >
        Hire
      </Heading>
      <Box height="1px" bg="neutral100" my={8} />
      {loading && <Loading />}
      <Box
        display="grid"
        gridTemplateColumns={{
          _: "1fr",
          m: "1fr 1fr",
          l: "1fr 1fr 1fr",
        }}
        gridGap="20px"
      >
        {candidates.map((application) => (
          <CandidateCard key={application.id} application={application} />
        ))}
      </Box>
      {!loading && candidates.length === 0 && <NoCandidates />}
    </>
  );
}
