import React from "react";
import { Box } from "@advisable/donut";
import { AnimatePresence, motion } from "framer-motion";
import Recommendation from "../components/Recommendation";

export default function Recommendations({
  shortlist,
  recommendations,
  onClick,
}) {
  return (
    <AnimatePresence initial={false}>
      {recommendations.map((result, index) => (
        <motion.div
          key={result.id}
          style={{ zIndex: 4 }}
          layoutId={result.id}
          animate={{
            opacity: 1,
          }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.32 }}
        >
          <Box marginY={10}>
            <Recommendation
              number={index + 1}
              search={shortlist}
              onClick={onClick}
              recommendation={result}
            />
          </Box>
          <Box height="1px" bg="neutral100" />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
