import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useCandidates } from "./queries";
import { Box, Skeleton } from "@advisable/donut";
import CandidateCard from "./CandidateCard";
import CandidatesEmptyState from "./CandidatesEmptyState";

export default function Candidates() {
  const { id } = useParams();
  const { loading, data, error } = useCandidates({ variables: { id } });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const candidates = data?.project.candidates || [];
  const hasCandidates = !loading && candidates.length > 0;

  if (!hasCandidates) return <CandidatesEmptyState />;

  return (
    <Box
      display="grid"
      gridGap="24px"
      paddingY="32px"
      gridTemplateColumns="1fr 1fr 1fr"
    >
      {loading ? (
        <>
          <Skeleton borderRadius="12px" height="420px" />
          <Skeleton borderRadius="12px" height="420px" />
          <Skeleton borderRadius="12px" height="420px" />
          <Skeleton borderRadius="12px" height="420px" />
          <Skeleton borderRadius="12px" height="420px" />
        </>
      ) : (
        candidates.map((candidate, i) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
          >
            <CandidateCard application={candidate} />
          </motion.div>
        ))
      )}
    </Box>
  );
}
